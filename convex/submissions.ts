import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { appendAudit, createNotification, ensureUserForWallet, requireReviewer } from "./lib/domain";
import { nowIso } from "./lib/time";

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
    // Convex is the application source of truth for intake and review state.
    // Protocol verification and final chain-state mirroring must happen through Dr-Blockchain and the sync bridge.
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

    await createNotification(
      ctx,
      actor.user._id,
      "submission",
      args.kind === "activity" ? "Proof of Activity submitted" : "Proof of Status submitted",
      "Your submission is now in the review queue. AI can propose findings, but protocol verification and governance remain separate.",
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
      ? await ctx.db.query("activitySubmissions").withIndex("by_status", (q) => q.eq("submissionStatus", args.status!)).collect()
      : await ctx.db.query("activitySubmissions").collect();

    if (args.walletAddress) {
      const normalized = args.walletAddress.trim().toLowerCase();
      submissions = submissions.filter((submission) => submission.walletAddress === normalized);
    }
    if (args.kind) {
      submissions = submissions.filter((submission) => submission.kind === args.kind);
    }

    const sorted = submissions.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return await Promise.all(
      sorted.map(async (submission) => {
        const proof = await ctx.db
          .query("proofRecords")
          .withIndex("by_submission", (q) => q.eq("submissionId", submission._id))
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
    nextStatus: v.union(v.literal("approved"), v.literal("rejected"), v.literal("needs_info")),
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
      chainMirrorStatus: args.nextStatus === "approved" ? "queued" : submission.chainMirrorStatus,
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
      const profile = await ctx.db.query("profiles").withIndex("by_user", (q) => q.eq("userId", submission.userId)).unique();
      if (profile) {
        const verified = args.nextStatus === "approved";
        await ctx.db.patch(profile._id, {
          verificationStatus: verified ? "verified" : args.nextStatus === "needs_info" ? "pending" : "rejected",
          statusScore: verified ? profile.statusScore + 20 : profile.statusScore,
          governanceWeight: verified ? Math.max(profile.governanceWeight, 2) : profile.governanceWeight,
          updatedAt,
        });
      }
    }

    await createNotification(
      ctx,
      submission.userId,
      "review",
      args.nextStatus === "approved" ? "Submission approved" : "Submission reviewed",
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
