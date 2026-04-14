import { v } from "convex/values";
import { query } from "./_generated/server";
import { findProfileByWallet } from "./lib/domain";
import { toMonthBucket } from "./lib/time";

export const getDashboardMetrics = query({
  args: {
    walletAddress: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    const proposals = await ctx.db.query("governanceProposals").collect();
    const submissions = await ctx.db.query("activitySubmissions").collect();
    const queue = await ctx.db.query("adminReviewQueue").collect();
    const learn = await ctx.db.query("learnProgress").collect();
    const proofs = await ctx.db.query("proofRecords").collect();

    let userId = null;
    if (args.walletAddress) {
      const record = await findProfileByWallet(ctx, args.walletAddress);
      userId = record?.user._id ?? null;
    }

    const scopedSubmissions = userId ? submissions.filter((submission) => submission.userId === userId) : submissions;
    const scopedLearn = userId ? learn.filter((entry) => entry.userId === userId) : learn;
    const scopedProofs = userId ? proofs.filter((entry) => entry.userId === userId) : proofs;

    const monthlyMap = new Map<string, { month: string; activities: number; rewards: number }>();
    for (const submission of scopedSubmissions) {
      const month = toMonthBucket(submission.createdAt);
      const entry = monthlyMap.get(month) ?? { month, activities: 0, rewards: 0 };
      entry.activities += 1;
      if (submission.submissionStatus === "approved") {
        entry.rewards += submission.kind === "activity" ? 35 : 15;
      }
      monthlyMap.set(month, entry);
    }

    const approvedActivities = scopedSubmissions.filter((submission) => submission.kind === "activity" && submission.submissionStatus === "approved").length;
    const approvedStatuses = scopedSubmissions.filter((submission) => submission.kind === "status" && submission.submissionStatus === "approved").length;
    const completedModules = scopedLearn.filter((entry) => entry.completionStatus === "completed").length;

    return {
      cards: {
        verifiedActivities: approvedActivities,
        statusApprovals: approvedStatuses,
        deriIssued: approvedActivities * 35 + completedModules * 12,
        rightsIssued: approvedStatuses * 15 + proposals.reduce((total, proposal) => total + proposal.yesWeight + proposal.noWeight + proposal.abstainWeight, 0),
        openProposals: proposals.filter((proposal) => proposal.proposalStatus === "active" || proposal.proposalStatus === "review").length,
        reviewBacklog: queue.filter((item) => item.queueStatus !== "resolved").length,
        activeLearners: scopedLearn.length,
        proofsPending: scopedProofs.filter((proof) => proof.recordStatus === "pending").length,
      },
      activityHistory: Array.from(monthlyMap.values()).sort((a, b) => a.month.localeCompare(b.month)).slice(-6),
      rewardBreakdown: [
        { label: "$DeRi", amount: approvedActivities * 35 + completedModules * 12 },
        { label: "$RIGHTS", amount: approvedStatuses * 15 },
        { label: "Governance", amount: userId ? proposals.filter((proposal) => proposal.proposerUserId === userId).length * 10 : proposals.length * 3 },
      ],
    };
  },
});

export const listLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    const profiles = await ctx.db.query("profiles").collect();
    const submissions = await ctx.db.query("activitySubmissions").collect();
    const learn = await ctx.db.query("learnProgress").collect();
    const votes = await ctx.db.query("votes").collect();

    const rows = await Promise.all(
      profiles.map(async (profile) => {
        const wallet = await ctx.db.query("linkedWallets").withIndex("by_user", (q) => q.eq("userId", profile.userId)).unique();
        const approved = submissions.filter((submission) => submission.userId === profile.userId && submission.submissionStatus === "approved").length;
        const learning = learn.filter((entry) => entry.userId === profile.userId && entry.completionStatus === "completed").length;
        const voting = votes.filter((vote) => vote.userId === profile.userId).length;
        const impactScore = profile.statusScore + approved * 25 + learning * 15 + voting * 10;
        return {
          address: wallet?.address ?? "unknown",
          displayName: profile.displayName,
          totalRewards: approved * 35 + learning * 12 + voting * 4,
          impactScore,
        };
      }),
    );

    return rows
      .sort((a, b) => b.impactScore - a.impactScore)
      .slice(0, 10)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));
  },
});

export const getRewardHistory = query({
  args: {
    walletAddress: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    if (!args.walletAddress) {
      return {
        summary: { deri: 0, rights: 0, boosts: 0, lastUpdated: new Date().toISOString() },
        logs: [],
      };
    }

    const record = await findProfileByWallet(ctx, args.walletAddress);
    if (!record) {
      return {
        summary: { deri: 0, rights: 0, boosts: 0, lastUpdated: new Date().toISOString() },
        logs: [],
      };
    }

    const submissions = (await ctx.db.query("activitySubmissions").withIndex("by_user", (q) => q.eq("userId", record.user._id)).collect()).filter(
      (submission) => submission.submissionStatus === "approved",
    );
    const learn = (await ctx.db.query("learnProgress").withIndex("by_user", (q) => q.eq("userId", record.user._id)).collect()).filter(
      (entry) => entry.completionStatus === "completed",
    );

    const submissionLogs = submissions.map((submission) => ({
      id: `${submission._id}`,
      type: submission.kind,
      token: submission.kind === "activity" ? "$DeRi" : "$RIGHTS",
      amount: submission.kind === "activity" ? 35 : 15,
      createdAt: submission.updatedAt,
      txHash: submission.chainMirrorStatus === "mirrored" ? submission.payloadHash : undefined,
    }));

    const learningLogs = learn.map((entry) => ({
      id: `${entry._id}`,
      type: "learn",
      token: "$DeRi",
      amount: 12,
      createdAt: entry.updatedAt,
      txHash: undefined,
    }));

    const logs = [...submissionLogs, ...learningLogs].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return {
      summary: {
        deri: submissionLogs.filter((entry) => entry.token === "$DeRi").reduce((sum, entry) => sum + entry.amount, 0) + learningLogs.length * 12,
        rights: submissionLogs.filter((entry) => entry.token === "$RIGHTS").reduce((sum, entry) => sum + entry.amount, 0),
        boosts: Math.round(record.profile.statusScore / 5),
        lastUpdated: new Date().toISOString(),
      },
      logs,
    };
  },
});

export const getEcosystemSnapshot = query({
  args: {},
  handler: async (ctx) => {
    const submissions = await ctx.db.query("activitySubmissions").collect();
    const profiles = await ctx.db.query("profiles").collect();
    const proposals = await ctx.db.query("governanceProposals").collect();
    const learn = await ctx.db.query("learnProgress").collect();

    return {
      verifiedActivities: submissions.filter((submission) => submission.kind === "activity" && submission.submissionStatus === "approved").length,
      activeUsers: profiles.length,
      rewardedActions: submissions.filter((submission) => submission.submissionStatus === "approved").length + learn.filter((entry) => entry.completionStatus === "completed").length,
      activeProposals: proposals.filter((proposal) => proposal.proposalStatus === "active").length,
    };
  },
});
