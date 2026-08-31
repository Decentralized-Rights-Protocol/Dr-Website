import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import {
  appendAudit,
  createNotification,
  ensureUserForWallet,
  requireReviewer,
} from "./lib/domain";
import { nowIso } from "./lib/time";
import { PolicyEngine } from "./lib/drp/elders";
import { ActivityClaim, ActivityCategory, ActivityType } from "./lib/drp/types";

export const triggerAIReview = internalMutation({
  args: { submissionId: v.id("activitySubmissions") },
  handler: async (ctx, args) => {
    const submission = await ctx.db.get(args.submissionId);
    if (!submission) return;

    const proof = await ctx.db
      .query("proofRecords")
      .withIndex("by_submission", (q) => q.eq("submissionId", submission._id))
      .unique();
    if (!proof) return;

    // Status claims are intentionally not auto-approved by the activity
    // PolicyEngine. Identity/status claims remain in the human review queue.
    if (submission.kind === "status") {
      await ctx.db.patch(proof._id, {
        verifierMode: "human_review",
        rationale: "Status claims require human review before a rights-bearing attestation is issued.",
        updatedAt: nowIso(),
      });
      return;
    }

    const claim: ActivityClaim = {
      userId: submission.userId,
      type: "contribution" as ActivityType,
      category: (["learning", "developer", "content", "productivity", "web3"].includes(
        submission.location ?? "",
      )
        ? submission.location
        : "learning") as ActivityCategory,
      metadata: {
        title: submission.title,
        url: submission.location,
      },
      proof: submission.payloadHash,
      timestamp: submission.occurredAt,
    };

    const result = PolicyEngine.assessActivity(claim);
    const updatedAt = nowIso();

    await ctx.db.patch(submission._id, {
      submissionStatus:
        result.verdict === "approved"
          ? "approved"
          : result.verdict === "rejected"
            ? "rejected"
            : "needs_info",
      reviewNote: result.rationale,
      chainMirrorStatus: result.verdict === "approved" ? "queued" : "not_started",
      updatedAt,
    });

    await ctx.db.patch(proof._id, {
      recordStatus: result.verdict === "approved" ? "verified" : "rejected",
      verifierMode: "ai_assist",
      confidenceScore: result.score / 100,
      rationale: result.rationale,
      attestationRef: submission.payloadHash,
      updatedAt,
    });

    if (result.verdict !== "approved") {
      return;
    }

    const existingActivity = await ctx.db
      .query("drpActivities")
      .withIndex("by_user", (q) => q.eq("userId", submission.userId))
      .order("desc")
      .take(20);
    if (existingActivity.some((activity) => activity.hash === submission.payloadHash)) {
      return;
    }

    const txId = `tx_${submission.payloadHash.slice(0, 20)}`;
    await ctx.db.insert("drpActivities", {
      userId: submission.userId,
      type: claim.type,
      category: claim.category,
      metadata: claim.metadata,
      proof: claim.proof,
      hash: submission.payloadHash,
      signature: "server_policy_attestation",
      status: "approved",
      score: result.score,
      reward: result.reward,
      createdAt: updatedAt,
    });

    await ctx.db.insert("drpTransactions", {
      txId,
      userId: submission.userId,
      activityHash: submission.payloadHash,
      category: claim.category,
      reward: result.reward,
      timestamp: updatedAt,
    });

    const balance = await ctx.db
      .query("drpBalances")
      .withIndex("by_user", (q) => q.eq("userId", submission.userId))
      .unique();

    if (balance) {
      await ctx.db.patch(balance._id, {
        deri: balance.deri + result.reward.deri,
        rights: balance.rights + result.reward.rights,
        updatedAt,
      });
    } else {
      await ctx.db.insert("drpBalances", {
        userId: submission.userId,
        deri: result.reward.deri,
        rights: result.reward.rights,
        updatedAt,
      });
    }
  },
});

export const createSubmission = mutation({
  args: {
    walletAddress: v.string(),
    kind: v.union(v.literal("activity"), v.literal("status")),
    title: v.string(),
    description: v.string(),
    location: v.optional(v.string()),
    occurredAt: v.string(),
    payloadHash: v.string(),
    attachmentName: v.optional(v.string()),
    attachmentMimeType: v.optional(v.string()),
    attachmentSizeBytes: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // ... existing intake logic
    const actor = await ensureUserForWallet(ctx, args.walletAddress);
    const createdAt = nowIso();
    const submissionId = await ctx.db.insert("activitySubmissions", {
      userId: actor.user._id,
      walletAddress: actor.linkedWallet.address,
      kind: args.kind,
      title: args.title,
      description: args.description,
      location: args.location,
      occurredAt: args.occurredAt,
      payloadHash: args.payloadHash,
      attachmentName: args.attachmentName,
      attachmentMimeType: args.attachmentMimeType,
      attachmentSizeBytes: args.attachmentSizeBytes,
      submissionStatus: "under_review",
      chainMirrorStatus: "not_started",
      createdAt,
      updatedAt: createdAt,
    });

    await ctx.db.insert("proofRecords", {
      submissionId,
      userId: actor.user._id,
      proofKind: args.kind === "activity" ? "poat" : "post",
      recordStatus: "pending",
      verifierMode: "ai_assist",
      createdAt,
      updatedAt: createdAt,
    });

    await ctx.db.insert("adminReviewQueue", {
      submissionId,
      queueStatus: "pending",
      priority: args.kind === "status" ? "high" : "normal",
      reviewType: args.kind === "activity" ? "poat" : "post",
      createdAt,
      updatedAt: createdAt,
    });

    // Trigger AI Review asynchronously
    await ctx.scheduler.runAfter(0, internal.submissions.triggerAIReview, {
      submissionId,
    });

    await createNotification(
      ctx,
      actor.user._id,
      "submission",
      args.kind === "activity"
        ? "Proof of Activity submitted"
        : "Proof of Status submitted",
      "Your submission is now in the review queue. AI is performing initial assessment.",
      args.kind === "activity" ? "/proofs/activities" : "/proofs/status",
    );

    await appendAudit(ctx, {
      actorUserId: actor.user._id,
      actorWallet: actor.linkedWallet.address,
      eventType: "submission_created",
      entityType: "activitySubmission",
      entityId: submissionId,
      message: `${args.kind} submission created`,
      metadata: JSON.stringify({ kind: args.kind }),
    });

    return await ctx.db.get(submissionId);
  },
});

export const listSubmissions = query({
  args: {
    walletAddress: v.union(v.string(), v.null()),
    kind: v.optional(v.union(v.literal("activity"), v.literal("status"))),
    status: v.optional(
      v.union(
        v.literal("submitted"),
        v.literal("under_review"),
        v.literal("approved"),
        v.literal("rejected"),
        v.literal("needs_info"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    let submissions = args.status
      ? await ctx.db
          .query("activitySubmissions")
          .withIndex("by_status", (q) => q.eq("submissionStatus", args.status!))
          .collect()
      : await ctx.db.query("activitySubmissions").collect();

    if (args.walletAddress) {
      const normalized = args.walletAddress.trim().toLowerCase();
      submissions = submissions.filter(
        (submission) => submission.walletAddress === normalized,
      );
    }
    if (args.kind) {
      submissions = submissions.filter(
        (submission) => submission.kind === args.kind,
      );
    }

    const sorted = submissions.sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );

    return await Promise.all(
      sorted.map(async (submission) => {
        const proof = await ctx.db
          .query("proofRecords")
          .withIndex("by_submission", (q) =>
            q.eq("submissionId", submission._id),
          )
          .unique();
        return {
          ...submission,
          proofStatus: proof?.recordStatus ?? "pending",
        };
      }),
    );
  },
});

export const getSubmission = query({
  args: {
    submissionId: v.id("activitySubmissions"),
  },
  handler: async (ctx, args) => {
    const submission = await ctx.db.get(args.submissionId);
    if (!submission) {
      return null;
    }
    const proof = await ctx.db
      .query("proofRecords")
      .withIndex("by_submission", (q) => q.eq("submissionId", submission._id))
      .unique();
    const reviewQueue = await ctx.db
      .query("adminReviewQueue")
      .withIndex("by_submission", (q) => q.eq("submissionId", submission._id))
      .unique();
    return { submission, proof, reviewQueue };
  },
});

export const updateSubmissionReviewStatus = mutation({
  args: {
    reviewerWallet: v.string(),
    submissionId: v.id("activitySubmissions"),
    nextStatus: v.union(
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("needs_info"),
    ),
    reviewNote: v.string(),
    confidenceScore: v.optional(v.number()),
    chainEventRef: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Reviewers can record application-layer adjudication here.
    // This does not by itself constitute protocol finality or on-chain confirmation.
    const reviewer = await requireReviewer(ctx, args.reviewerWallet);
    const submission = await ctx.db.get(args.submissionId);
    if (!submission) {
      throw new Error("Submission not found.");
    }

    const proof = await ctx.db
      .query("proofRecords")
      .withIndex("by_submission", (q) => q.eq("submissionId", submission._id))
      .unique();
    const queueItem = await ctx.db
      .query("adminReviewQueue")
      .withIndex("by_submission", (q) => q.eq("submissionId", submission._id))
      .unique();
    const updatedAt = nowIso();

    await ctx.db.patch(submission._id, {
      submissionStatus: args.nextStatus,
      reviewNote: args.reviewNote,
      chainMirrorStatus:
        args.nextStatus === "approved"
          ? "queued"
          : submission.chainMirrorStatus,
      updatedAt,
    });

    if (proof) {
      await ctx.db.patch(proof._id, {
        recordStatus: args.nextStatus === "approved" ? "verified" : "rejected",
        verifierMode: "human_review",
        rationale: args.reviewNote,
        confidenceScore: args.confidenceScore,
        chainEventRef: args.chainEventRef,
        updatedAt,
      });
    }

    if (queueItem) {
      await ctx.db.patch(queueItem._id, {
        queueStatus: "resolved",
        assignedReviewerWallet: reviewer.linkedWallet.address,
        updatedAt,
      });
    }

    if (submission.kind === "status") {
      const profile = await ctx.db
        .query("profiles")
        .withIndex("by_user", (q) => q.eq("userId", submission.userId))
        .unique();
      if (profile) {
        const verified = args.nextStatus === "approved";
        await ctx.db.patch(profile._id, {
          verificationStatus: verified
            ? "verified"
            : args.nextStatus === "needs_info"
              ? "pending"
              : "rejected",
          statusScore: verified
            ? profile.statusScore + 20
            : profile.statusScore,
          governanceWeight: verified
            ? Math.max(profile.governanceWeight, 2)
            : profile.governanceWeight,
          updatedAt,
        });
      }
    }

    await createNotification(
      ctx,
      submission.userId,
      "review",
      args.nextStatus === "approved"
        ? "Submission approved"
        : "Submission reviewed",
      args.reviewNote,
      submission.kind === "activity" ? "/proofs/activities" : "/proofs/status",
    );

    await appendAudit(ctx, {
      actorUserId: reviewer.user._id,
      actorWallet: reviewer.linkedWallet.address,
      eventType: "submission_reviewed",
      entityType: "activitySubmission",
      entityId: submission._id,
      message: `Submission ${args.nextStatus}`,
      metadata: JSON.stringify({ nextStatus: args.nextStatus }),
    });

    return await ctx.db.get(submission._id);
  },
});
