import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { api } from "./_generated/api";
import { hashData, signData } from "./lib/drp/crypto";
import { PolicyEngine } from "./lib/drp/elders";
import { ActivityClaim, ActivityCategory, ActivityType } from "./lib/drp/types";

/**
 * Submit a digital activity for verification and reward.
 */
export const submitActivity = mutation({
  args: {
    type: v.string(),
    category: v.string(),
    metadata: v.any(),
    proof: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_primary_wallet", (q) => q.eq("primaryWallet", identity.address!))
      .unique();
    if (!user) throw new Error("User not found");

    const claim: ActivityClaim = {
      userId: user._id,
      type: args.type as ActivityType,
      category: args.category as ActivityCategory,
      metadata: args.metadata,
      proof: args.proof,
      timestamp: new Date().toISOString(),
    };

    // 1. Elder Verification (AI Simulation)
    const verification = PolicyEngine.assessActivity(claim);

    // 2. Cryptographic Hashing & Signing
    const activityHash = hashData(claim);
    const signature = signData(activityHash);

    // 3. Store Activity Record
    const activityId = await ctx.db.insert("drpActivities", {
      userId: user._id,
      type: args.type,
      category: args.category,
      metadata: args.metadata,
      proof: args.proof,
      hash: activityHash,
      signature,
      status: verification.verdict,
      score: verification.score,
      reward: verification.reward,
      createdAt: new Date().toISOString(),
    });

    // 4. If approved, create a transaction and update balance
    if (verification.verdict === "approved") {
      const txId = `tx_${activityHash.slice(0, 16)}`;
      
      await ctx.db.insert("drpTransactions", {
        txId,
        userId: user._id,
        activityHash,
        category: args.category,
        reward: verification.reward,
        timestamp: new Date().toISOString(),
      });

      // Update User Balance
      const balance = await ctx.db
        .query("drpBalances")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .unique();

      if (balance) {
        await ctx.db.patch(balance._id, {
          deri: balance.deri + verification.reward.deri,
          rights: balance.rights + verification.reward.rights,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await ctx.db.insert("drpBalances", {
          userId: user._id,
          deri: verification.reward.deri,
          rights: verification.reward.rights,
          updatedAt: new Date().toISOString(),
        });
      }

      // Check if we should mint a block (simplified: every N transactions)
      const pendingTxs = await ctx.db.query("drpTransactions").filter(q => q.eq(q.field("blockIndex"), undefined)).collect();
      if (pendingTxs.length >= 5) {
        await ctx.scheduler.runAfter(0, api.blockchain.mintBlock, {});
      }
    }

    return {
      activityId,
      verdict: verification.verdict,
      score: verification.score,
      reward: verification.reward,
    };
  },
});

export const getActivities = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_primary_wallet", (q) => q.eq("primaryWallet", identity.address!))
      .unique();
    if (!user) return [];

    return await ctx.db
      .query("drpActivities")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(args.limit || 50);
  },
});

export const getUserBalance = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { deri: 0, rights: 0 };

    const user = await ctx.db
      .query("users")
      .withIndex("by_primary_wallet", (q) => q.eq("primaryWallet", identity.address!))
      .unique();
    if (!user) return { deri: 0, rights: 0 };

    const balance = await ctx.db
      .query("drpBalances")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    return balance || { deri: 0, rights: 0 };
  },
});
