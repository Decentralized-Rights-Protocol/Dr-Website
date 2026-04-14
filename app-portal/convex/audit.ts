import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { appendAudit } from "./lib/domain";

export const appendAuditEntry = mutation({
  args: {
    actorWallet: v.optional(v.string()),
    eventType: v.string(),
    entityType: v.string(),
    entityId: v.string(),
    message: v.string(),
    metadata: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await appendAudit(ctx, {
      actorWallet: args.actorWallet,
      eventType: args.eventType,
      entityType: args.entityType,
      entityId: args.entityId,
      message: args.message,
      metadata: args.metadata,
    });
  },
});

export const recordProtocolMirror = internalMutation({
  args: {
    entityType: v.string(),
    entityId: v.string(),
    message: v.string(),
    metadata: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await appendAudit(ctx, {
      eventType: "protocol_mirror_received",
      entityType: args.entityType,
      entityId: args.entityId,
      message: args.message,
      metadata: args.metadata,
    });
  },
});

export const listAuditEntries = query({
  args: {
    entityType: v.optional(v.string()),
    entityId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const entries = args.entityType && args.entityId
      ? await ctx.db
          .query("auditLog")
          .withIndex("by_entity", (q) => q.eq("entityType", args.entityType!).eq("entityId", args.entityId!))
          .collect()
      : await ctx.db.query("auditLog").collect();
    return entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
});
