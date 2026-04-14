"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";

export const ingestProtocolMirror = action({
  args: {
    source: v.string(),
    entityType: v.string(),
    entityId: v.string(),
    payload: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.audit.recordProtocolMirror, {
      entityType: args.entityType,
      entityId: args.entityId,
      message: `Protocol mirror received from ${args.source}`,
      metadata: args.payload,
    });

    return {
      accepted: true,
      sourceOfTruth: "Dr-Blockchain",
      mirroredInto: "Convex app-layer store",
    };
  },
});
