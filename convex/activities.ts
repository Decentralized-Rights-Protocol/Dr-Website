import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalMutation, mutation, query } from "./_generated/server";
import { ensureUserForWallet, normalizeWallet } from "./lib/domain";
import { PolicyEngine } from "./lib/drp/elders";
import { ActivityCategory, ActivityMetadata, ActivityType } from "./lib/drp/types";
import { hashData } from "./lib/drp/crypto";
import { nowIso } from "./lib/time";

const categoryValidator = v.union(
  v.literal("learning"),
  v.literal("developer"),
  v.literal("content"),
  v.literal("productivity"),
  v.literal("web3"),
);

const typeValidator = v.union(
  v.literal("reading"), v.literal("video"), v.literal("course"), v.literal("notes"),
  v.literal("commit"), v.literal("pr"), v.literal("repo"), v.literal("contribution"),
  v.literal("blog"), v.literal("social"), v.literal("video_upload"), v.literal("design"),
  v.literal("task"), v.literal("document"), v.literal("time_track"),
  v.literal("wallet_tx"), v.literal("contract_call"),
);

/**
 * Final ledger write. Rewards are derived by the server-side policy engine;
 * clients never submit their own score, verdict, or token amounts.
 */
export const _createActivityRecord = internalMutation({
  args: {
    userId: v.id("users"),
    type: v.string(),
    category: v.string(),
    metadata: v.any(),
    proof: v.string(),
    hash: v.string(),
    status: v.union(v.literal("approved"), v.literal("rejected"), v.literal("flagged")),
    score: v.number(),
    reward: v.object({ deri: v.number(), rights: v.number() }),
    chainTxHash: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const createdAt = nowIso();
    const activityId = await ctx.db.insert("drpActivities", {
      userId: args.userId,
      type: args.type,
      category: args.category,
      metadata: args.metadata,
      proof: args.proof,
      hash: args.hash,
      signature: "server_policy_attestation",
      status: args.status,
      score: args.score,
      reward: args.reward,
      chainTxHash: args.chainTxHash,
      createdAt,
    });

    if (args.status !== "approved") {
      return {
        activityId,
        verdict: args.status,
        score: args.score,
        reward: { deri: 0, rights: 0 },
        chainTxHash: args.chainTxHash,
      };
    }

    const txId = args.chainTxHash ?? `tx_${args.hash.slice(0, 20)}`;
    await ctx.db.insert("drpTransactions", {
      txId,
      userId: args.userId,
      activityHash: args.hash,
      category: args.category,
      reward: args.reward,
      timestamp: createdAt,
    });

    const balance = await ctx.db
      .query("drpBalances")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();

    if (balance) {
      await ctx.db.patch(balance._id, {
        deri: balance.deri + args.reward.deri,
        rights: balance.rights + args.reward.rights,
        updatedAt: createdAt,
      });
    } else {
      await ctx.db.insert("drpBalances", {
        userId: args.userId,
        deri: args.reward.deri,
        rights: args.reward.rights,
        updatedAt: createdAt,
      });
    }

    return {
      activityId,
      verdict: args.status,
      score: args.score,
      reward: args.reward,
      chainTxHash: args.chainTxHash,
    };
  },
});

/**
 * Submit an activity claim. The wallet identifies the application actor,
 * while the policy engine independently decides score, verdict and reward.
 */
export const submitActivity = mutation({
  args: {
    walletAddress: v.string(),
    type: typeValidator,
    category: categoryValidator,
    metadata: v.any(),
    proof: v.string(),
  },
  handler: async (ctx, args) => {
    const actor = await ensureUserForWallet(ctx, args.walletAddress);
    const timestamp = nowIso();
    const metadata = args.metadata as ActivityMetadata;
    const claim = {
      userId: String(actor.user._id),
      type: args.type as ActivityType,
      category: args.category as ActivityCategory,
      metadata,
      proof: args.proof,
      timestamp,
    };

    const result = PolicyEngine.assessActivity(claim);
    const hash = hashData({
      actor: normalizeWallet(args.walletAddress),
      type: args.type,
      category: args.category,
      metadata,
      proof: args.proof,
      timestamp,
    });

    const ledger = await ctx.runMutation(internal.activities._createActivityRecord, {
      userId: actor.user._id,
      type: args.type,
      category: args.category,
      metadata,
      proof: args.proof,
      hash,
      status: result.verdict,
      score: result.score,
      reward: result.reward,
    });

    return { ...ledger, rationale: result.rationale, hash };
  },
});

export const getActivities = query({
  args: {
    limit: v.optional(v.number()),
    walletAddress: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let userId;
    const identity = await ctx.auth.getUserIdentity();

    if (identity?.address) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_primary_wallet", (q) =>
          q.eq("primaryWallet", normalizeWallet(identity.address!)),
        )
        .unique();
      if (user) userId = user._id;
    } else if (args.walletAddress) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_primary_wallet", (q) =>
          q.eq("primaryWallet", normalizeWallet(args.walletAddress!)),
        )
        .unique();
      if (user) userId = user._id;
    }

    if (!userId) return [];

    return await ctx.db
      .query("drpActivities")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(Math.min(args.limit ?? 50, 100));
  },
});

export const getUserBalance = query({
  args: { walletAddress: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let userId;
    const identity = await ctx.auth.getUserIdentity();

    if (identity?.address) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_primary_wallet", (q) =>
          q.eq("primaryWallet", normalizeWallet(identity.address!)),
        )
        .unique();
      if (user) userId = user._id;
    } else if (args.walletAddress) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_primary_wallet", (q) =>
          q.eq("primaryWallet", normalizeWallet(args.walletAddress!)),
        )
        .unique();
      if (user) userId = user._id;
    }

    if (!userId) return { deri: 0, rights: 0 };

    const balance = await ctx.db
      .query("drpBalances")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    return balance || { deri: 0, rights: 0 };
  },
});
