import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { hashData, signData } from "./lib/drp/crypto";

/**
 * Mint a new block containing pending transactions.
 */
export const mintBlock = internalMutation({
  args: {},
  handler: async (ctx) => {
    // 1. Get pending transactions
    const pendingTransactions = await ctx.db
      .query("drpTransactions")
      .withIndex("by_block", (q) => q.eq("blockIndex", undefined))
      .collect();

    if (pendingTransactions.length === 0) return null;

    // 2. Get latest block for previous hash
    const latestBlock = await ctx.db
      .query("drpBlocks")
      .order("desc")
      .first();

    const newIndex = (latestBlock?.index ?? -1) + 1;
    const previousHash = latestBlock?.blockHash ?? "0000000000000000000000000000000000000000000000000000000000000000";

    // 3. Calculate PoAT Score (average score of activities in this block)
    // For demo, we just use a default or sum up rewards
    const totalDeri = pendingTransactions.reduce((acc, tx) => acc + tx.reward.deri, 0);
    const poatScore = Math.min(100, totalDeri / pendingTransactions.length);

    // 4. Create block content and hash it
    const blockContent = {
      index: newIndex,
      timestamp: new Date().toISOString(),
      transactions: pendingTransactions.map(tx => tx.txId),
      previousHash,
      poatScore,
    };
    
    const blockHash = hashData(blockContent);
    const signature = signData(blockHash);

    // 5. Save the block
    const blockId = await ctx.db.insert("drpBlocks", {
      ...blockContent,
      transactions: pendingTransactions,
      blockHash,
      signature,
    });

    // 6. Update transactions with block index
    for (const tx of pendingTransactions) {
      await ctx.db.patch(tx._id, { blockIndex: newIndex });
    }

    return blockId;
  },
});

export const getBlocks = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("drpBlocks")
      .order("desc")
      .take(args.limit || 20);
  },
});

export const getTransactions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("drpTransactions")
      .order("desc")
      .take(args.limit || 50);
  },
});

export const getBlockchainStats = query({
  args: {},
  handler: async (ctx) => {
    const blocks = await ctx.db.query("drpBlocks").collect();
    const txs = await ctx.db.query("drpTransactions").collect();
    
    const totalDeri = txs.reduce((acc, tx) => acc + tx.reward.deri, 0);
    const totalRights = txs.reduce((acc, tx) => acc + tx.reward.rights, 0);

    return {
      blockCount: blocks.length,
      txCount: txs.length,
      totalDeri,
      totalRights,
      latestBlockHash: blocks[0]?.blockHash || "N/A",
    };
  },
});
