import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const submitProof = mutation({
  args: {
    userId: v.string(),
    walletAddress: v.string(),
    type: v.union(v.literal("PoST"), v.literal("PoAT")),
    data: v.any(),
    metadata: v.optional(v.any()),
    proofHash: v.string(),
    timestamp: v.string(),
  },
  handler: async (ctx, args) => {
    const proofId = await ctx.db.insert("indexedProofs", {
      proofHash: args.proofHash,
      walletAddress: args.walletAddress,
      type: args.type,
      data: args.data,
      metadata: args.metadata,
      timestamp: args.timestamp,
      txHash: "", // To be filled after blockchain write
      status: "Pending",
    });

    return { success: true, proofId, proofHash: args.proofHash };
  },
});

export const updateProofTx = mutation({
  args: {
    proofId: v.id("indexedProofs"),
    txHash: v.string(),
    status: v.union(v.literal("Pending"), v.literal("Processing"), v.literal("Verified")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.proofId, {
      txHash: args.txHash,
      status: args.status,
    });
  },
});

export const getExplorerProofs = query({
  args: {
    limit: v.optional(v.number()),
    type: v.optional(v.union(v.literal("PoST"), v.literal("PoAT"))),
    walletAddress: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("indexedProofs");
    
    if (args.type) {
      q = q.withIndex("by_type", (q) => q.eq("type", args.type!));
    } else if (args.walletAddress) {
      q = q.withIndex("by_wallet", (q) => q.eq("walletAddress", args.walletAddress!));
    }
    
    const results = await q.order("desc").take(args.limit || 50);
    return results;
  },
});
