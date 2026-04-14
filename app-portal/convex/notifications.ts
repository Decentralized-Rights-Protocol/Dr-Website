import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { findProfileByWallet } from "./lib/domain";
import { nowIso } from "./lib/time";

export const listNotifications = query({
  args: {
    walletAddress: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    if (!args.walletAddress) {
      return [];
    }
    const record = await findProfileByWallet(ctx, args.walletAddress);
    if (!record) {
      return [];
    }
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_user", (q) => q.eq("userId", record.user._id))
      .collect();
    return notifications.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
});

export const markNotificationRead = mutation({
  args: {
    notificationId: v.id("notifications"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.notificationId, { readAt: nowIso() });
    return { ok: true };
  },
});
