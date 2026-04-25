import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { appendAudit, createNotification, ensureUserForWallet, findProfileByWallet } from "./lib/domain";
import { nowIso } from "./lib/time";

function computeVoteWeight(input: { statusScore: number; governanceWeight: number; completedModules: number }) {
  return Math.max(1, Math.round(input.governanceWeight + input.statusScore / 20 + input.completedModules * 0.5));
}

export const listGovernanceProposals = query({
  args: {},
  handler: async (ctx) => {
    const proposals = await ctx.db.query("governanceProposals").collect();
    return proposals.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
});

export const getProposalDetails = query({
  args: {
    proposalId: v.id("governanceProposals"),
  },
  handler: async (ctx, args) => {
    const proposal = await ctx.db.get(args.proposalId);
    if (!proposal) {
      return null;
    }
    const votes = await ctx.db
      .query("votes")
      .withIndex("by_proposal", (q) => q.eq("proposalId", args.proposalId))
      .collect();
    return {
      proposal,
      votes: votes.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    };
  },
});

export const createVoteRecord = mutation({
  args: {
    walletAddress: v.string(),
    proposalId: v.id("governanceProposals"),
    choice: v.union(v.literal("yes"), v.literal("no"), v.literal("abstain")),
    rationale: v.optional(v.string()),
    isSimulated: v.optional(v.boolean()),
    source: v.optional(v.union(v.literal("app"), v.literal("mock"), v.literal("protocol_sync"))),
  },
  handler: async (ctx, args) => {
    const actor = await ensureUserForWallet(ctx, args.walletAddress);
    const proposal = await ctx.db.get(args.proposalId);
    if (!proposal) {
      throw new Error("Proposal not found.");
    }

    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_proposal_wallet", (q) => q.eq("proposalId", proposal._id).eq("walletAddress", actor.linkedWallet.address))
      .unique();
    if (existingVote) {
      throw new Error("This wallet has already recorded a vote for the proposal.");
    }

    const progress = await ctx.db
      .query("learnProgress")
      .withIndex("by_user", (q) => q.eq("userId", actor.user._id))
      .collect();
    const completedModules = progress.filter((item) => item.completionStatus === "completed").length;
    const weight = computeVoteWeight({
      statusScore: actor.profile.statusScore,
      governanceWeight: actor.profile.governanceWeight,
      completedModules,
    });

    const voteId = await ctx.db.insert("votes", {
      proposalId: proposal._id,
      userId: actor.user._id,
      walletAddress: actor.linkedWallet.address,
      choice: args.choice,
      weight,
      rationale: args.rationale,
      isSimulated: args.isSimulated ?? true,
      source: args.source ?? "app",
      createdAt: nowIso(),
    });

    await ctx.db.patch(proposal._id, {
      yesWeight: proposal.yesWeight + (args.choice === "yes" ? weight : 0),
      noWeight: proposal.noWeight + (args.choice === "no" ? weight : 0),
      abstainWeight: proposal.abstainWeight + (args.choice === "abstain" ? weight : 0),
      participationCount: proposal.participationCount + 1,
      updatedAt: nowIso(),
    });

    if (proposal.proposerUserId) {
      await createNotification(
        ctx,
        proposal.proposerUserId,
        "governance",
        "New vote recorded",
        `${actor.profile.displayName} cast a ${args.choice} vote on ${proposal.title}.`,
        "/governance",
      );
    }

    await appendAudit(ctx, {
      actorUserId: actor.user._id,
      actorWallet: actor.linkedWallet.address,
      eventType: "governance_vote_recorded",
      entityType: "governanceProposal",
      entityId: proposal._id,
      message: `Vote recorded with weight ${weight}`,
      metadata: JSON.stringify({ choice: args.choice, weight }),
    });

    return { voteId, weight };
  },
});

export const bootstrapProposal = mutation({
  args: {
    proposerWallet: v.string(),
    title: v.string(),
    summary: v.string(),
    body: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const proposer = await ensureUserForWallet(ctx, args.proposerWallet);
    const slug = args.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const proposalId = await ctx.db.insert("governanceProposals", {
      slug,
      title: args.title,
      summary: args.summary,
      body: args.body,
      category: args.category,
      proposalStatus: "active",
      proposerUserId: proposer.user._id,
      proposerWallet: proposer.linkedWallet.address,
      tags: args.tags,
      participationCount: 0,
      yesWeight: 0,
      noWeight: 0,
      abstainWeight: 0,
      votingStartAt: nowIso(),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    });

    await appendAudit(ctx, {
      actorUserId: proposer.user._id,
      actorWallet: proposer.linkedWallet.address,
      eventType: "proposal_created",
      entityType: "governanceProposal",
      entityId: proposalId,
      message: "Governance proposal created",
      metadata: JSON.stringify({ slug }),
    });

    return await ctx.db.get(proposalId);
  },
});
