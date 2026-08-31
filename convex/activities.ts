import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
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
 * Submit an activity claim. The wallet identifies the application actor;
 * the server-side policy engine independently derives score, verdict and reward.
 * No client-supplied verdict, score or reward is accepted.
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

    const createdAt = timestamp;
    const activityId = await ctx.db.insert("drpActivities", {
      userId: actor.user._id,
      type: args.type,
      category: args.category,
      metadata,
      proof: args.proof,
      hash,
      signature: "server_policy_attestation",
      status: result.verdict,
      score: result.score,
      reward: result.reward,
      createdAt,
    });

    if (result.verdict !== "approved") {
      return {
        activityId,
        verdict: result.verdict,
        score: result.score,
        reward: { deri: 0, rights: 0 },
        rationale: result.rationale,
        hash,
      };
    }

    // Ledger writes are performed in this server mutation so the return type
    // is inferred without a circular reference through the generated API.
    const txId = `tx_${hash.slice(0, 20)}`;
    await ctx.db.insert("drpTransactions", {
      txId,
      userId: actor.user._id,
      activityHash: hash,
      category: args.category,
      reward: result.reward,
      timestamp: createdAt,
    });

    const balance = await ctx.db
      .query("drpBalances")
      .withIndex("by_user", (q) => q.eq("userId", actor.user._id))
      .unique();

    if (balance) {
      await ctx.db.patch(balance._id, {
        deri: balance.deri + result.reward.deri,
        rights: balance.rights + result.reward.rights,
        updatedAt: createdAt,
      });
    } else {
      await ctx.db.insert("drpBalances", {
        userId: actor.user._id,
        deri: result.reward.deri,
        rights: result.reward.rights,
        updatedAt: createdAt,
      });
    }

    return {
      activityId,
      verdict: result.verdict,
      score: result.score,
      reward: result.reward,
      rationale: result.rationale,
      hash,
      chainTxHash: undefined,
    };
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
