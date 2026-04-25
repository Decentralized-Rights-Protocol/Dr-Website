import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { api } from "./_generated/api";

/**
 * Submit a digital activity for verification and reward.
 */
export const _createActivityRecord = internalMutation({
  args: {
    userId: v.id("users"),
    type: v.string(),
    category: v.string(),
    metadata: v.any(),
    proof: v.string(),
    hash: v.string(),
    signature: v.string(),
    status: v.string(), // Corresponds to PolicyEngine.verdict
    score: v.number(), // Corresponds to PolicyEngine.score
    reward: v.any(), // Corresponds to PolicyEngine.reward
    chainTxHash: v.optional(v.string()), // New field for the blockchain transaction hash
  },
  handler: async (ctx, args) => {
    // Store Activity Record
    const activityId = await ctx.db.insert("drpActivities", {
      userId: args.userId,
      type: args.type,
      category: args.category,
      metadata: args.metadata,
      proof: args.proof,
      hash: args.hash,
      signature: args.signature,
      status: args.status,
      score: args.score,
      reward: args.reward,
      chainTxHash: args.chainTxHash, // Store the chain transaction hash
      createdAt: new Date().toISOString(),
    });

    // If approved, create a transaction and update balance
    if (args.status === "approved") {
      const txId = args.chainTxHash || `tx_${args.hash.slice(0, 16)}`; // Use chainTxHash if available
      
      await ctx.db.insert("drpTransactions", {
        txId,
        userId: args.userId,
        activityHash: args.hash,
        category: args.category,
        reward: args.reward,
        chainTxHash: args.chainTxHash, // Store the chain transaction hash
        timestamp: new Date().toISOString(),
      });

      // Update User Balance
      const balance = await ctx.db
        .query("drpBalances")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .unique();

      if (balance) {
        await ctx.db.patch(balance._id, {
          deri: balance.deri + args.reward.deri,
          rights: balance.rights + args.reward.rights,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await ctx.db.insert("drpBalances", {
          userId: args.userId,
          deri: args.reward.deri,
          rights: args.reward.rights,
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
      verdict: args.status,
      score: args.score,
      reward: args.reward,
      chainTxHash: args.chainTxHash,
    };
  },
});

export const submitActivity = mutation({
  args: {
    type: v.string(),
    category: v.string(),
    metadata: v.any(),
    proof: v.string(),
    hash: v.string(),
    signature: v.string(),
    status: v.string(), // Corresponds to FastAPI's verdict
    score: v.number(), // Corresponds to FastAPI's score
    reward: v.any(), // Corresponds to FastAPI's reward (e.g., { deri: number, rights: number })
    chainTxHash: v.optional(v.string()), // From FastAPI
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_primary_wallet", (q) => q.eq("primaryWallet", identity.address!))
      .unique();
    if (!user) throw new Error("User not found");

    // Call the internal mutation to create the activity record
    return await ctx.scheduler.run(api.activities._createActivityRecord, {
      userId: user._id,
      ...args,
    });
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
