import { v } from "convex/values";
import { query } from "./_generated/server";
import { findProfileByWallet } from "./lib/domain";

export const listReviewQueue = query({
  args: {
    walletAddress: v.union(v.string(), v.null()),
    queueStatus: v.optional(v.union(v.literal("pending"), v.literal("in_review"), v.literal("resolved"))),
  },
  handler: async (ctx, args) => {
    if (!args.walletAddress) {
      return { authorized: false, items: [] as any[] };
    }

    const reviewer = await findProfileByWallet(ctx, args.walletAddress);
    if (!reviewer || !["admin", "reviewer"].includes(reviewer.profile.role)) {
      return { authorized: false, items: [] as any[] };
    }

    const queue = args.queueStatus
      ? await ctx.db.query("adminReviewQueue").withIndex("by_status", (q) => q.eq("queueStatus", args.queueStatus!)).collect()
      : await ctx.db.query("adminReviewQueue").collect();

    const items = await Promise.all(
      queue
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map(async (item) => {
          const submission = await ctx.db.get(item.submissionId);
          return {
            ...item,
            submission,
          };
        }),
    );

    return { authorized: true, items };
  },
});
