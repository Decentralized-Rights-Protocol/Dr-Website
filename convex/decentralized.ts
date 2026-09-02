"use node";

import { v } from "convex/values";
import { action, internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

const API_URL = () => process.env.DRP_STORAGE_API_URL || process.env.NEXT_PUBLIC_API_URL || "https://api.decentralizedrights.com";

export const createRecord = internalMutation({
  args: {
    entityType: v.string(),
    entityId: v.string(),
    walletAddress: v.optional(v.string()),
    payloadHash: v.string(),
    status: v.union(
      v.literal("pending"), v.literal("evidence_stored"), v.literal("orbitdb_recorded"),
      v.literal("anchored"), v.literal("failed"),
    ),
    evidenceCid: v.optional(v.string()),
    orbitDbHash: v.optional(v.string()),
    orbitDbAddress: v.optional(v.string()),
    chainTxHash: v.optional(v.string()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("decentralizedRecords", { ...args, createdAt: now, updatedAt: now });
  },
});

export const updateRecord = internalMutation({
  args: {
    id: v.id("decentralizedRecords"),
    status: v.union(
      v.literal("pending"), v.literal("evidence_stored"), v.literal("orbitdb_recorded"),
      v.literal("anchored"), v.literal("failed"),
    ),
    evidenceCid: v.optional(v.string()),
    orbitDbHash: v.optional(v.string()),
    orbitDbAddress: v.optional(v.string()),
    chainTxHash: v.optional(v.string()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    await ctx.db.patch(id, { ...patch, updatedAt: new Date().toISOString() });
  },
});

/**
 * Server-side bridge: Convex is the application source of truth; Render owns
 * Storacha/IPFS, OrbitDB and DRP-chain credentials. No browser gets those secrets.
 */
export const syncRecord = action({
  args: {
    entityType: v.string(),
    entityId: v.string(),
    walletAddress: v.optional(v.string()),
    payloadHash: v.string(),
    payload: v.string(),
    evidenceCid: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.runMutation(internal.decentralized.createRecord, {
      entityType: args.entityType,
      entityId: args.entityId,
      walletAddress: args.walletAddress,
      payloadHash: args.payloadHash,
      evidenceCid: args.evidenceCid,
      status: args.evidenceCid ? "evidence_stored" : "pending",
    });

    try {
      const response = await fetch(`${API_URL()}/storage/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity_type: args.entityType,
          entity_id: args.entityId,
          wallet_address: args.walletAddress,
          payload_hash: args.payloadHash,
          payload: args.payload,
          evidence_cid: args.evidenceCid,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `Storage sync failed (${response.status})`);

      await ctx.runMutation(internal.decentralized.updateRecord, {
        id,
        status: data.chain_tx_hash ? "anchored" : "orbitdb_recorded",
        evidenceCid: data.evidence_cid || args.evidenceCid,
        orbitDbHash: data.orbitdb_hash,
        orbitDbAddress: data.orbitdb_address,
        chainTxHash: data.chain_tx_hash,
      });

      return { recordId: id, ...data };
    } catch (error) {
      await ctx.runMutation(internal.decentralized.updateRecord, {
        id,
        status: "failed",
        error: error instanceof Error ? error.message : "Storage sync failed",
      });
      throw error;
    }
  },
});

export const getRecord = query({
  args: { entityType: v.string(), entityId: v.string() },
  handler: async (ctx, args) =>
    await ctx.db.query("decentralizedRecords")
      .withIndex("by_entity", q => q.eq("entityType", args.entityType).eq("entityId", args.entityId))
      .order("desc")
      .first(),
});
