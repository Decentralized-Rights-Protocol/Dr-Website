import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { appendAudit, createNotification, ensureUserForWallet, findProfileByWallet } from "./lib/domain";
import { nowIso } from "./lib/time";

export const saveLearnProgress = mutation({
  args: {
    walletAddress: v.string(),
    moduleSlug: v.string(),
    lessonSlug: v.string(),
    completionStatus: v.union(v.literal("not_started"), v.literal("in_progress"), v.literal("completed")),
    score: v.optional(v.number()),
    xpEarned: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const actor = await ensureUserForWallet(ctx, args.walletAddress);
    const existing = (
      await ctx.db
        .query("learnProgress")
        .withIndex("by_user_lesson", (q) => q.eq("userId", actor.user._id).eq("lessonSlug", args.lessonSlug))
        .collect()
    )[0];
    const updatedAt = nowIso();

    if (existing) {
      await ctx.db.patch(existing._id, {
        moduleSlug: args.moduleSlug,
        completionStatus: args.completionStatus,
        score: args.score,
        xpEarned: args.xpEarned ?? existing.xpEarned,
        lastViewedAt: updatedAt,
        completedAt: args.completionStatus === "completed" ? updatedAt : existing.completedAt,
        updatedAt,
      });
    } else {
      await ctx.db.insert("learnProgress", {
        userId: actor.user._id,
        moduleSlug: args.moduleSlug,
        lessonSlug: args.lessonSlug,
        completionStatus: args.completionStatus,
        score: args.score,
        xpEarned: args.xpEarned ?? 0,
        lastViewedAt: updatedAt,
        completedAt: args.completionStatus === "completed" ? updatedAt : undefined,
        createdAt: updatedAt,
        updatedAt,
      });
    }

    if (args.completionStatus === "completed") {
      await createNotification(
        ctx,
        actor.user._id,
        "learn",
        "Learning milestone recorded",
        `${args.lessonSlug} is now marked complete in your DRP learning record.`,
        "/learn",
      );
    }

    await appendAudit(ctx, {
      actorUserId: actor.user._id,
      actorWallet: actor.linkedWallet.address,
      eventType: "learn_progress_saved",
      entityType: "learnProgress",
      entityId: `${actor.user._id}:${args.lessonSlug}`,
      message: `Learn progress saved as ${args.completionStatus}`,
      metadata: JSON.stringify({ moduleSlug: args.moduleSlug, score: args.score }),
    });

    return { ok: true };
  },
});

export const listLearnProgress = query({
  args: {
    walletAddress: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    if (!args.walletAddress) {
      return [];
    }
    const actor = await findProfileByWallet(ctx, args.walletAddress);
    if (!actor) {
      return [];
    }
    const progress = await ctx.db
      .query("learnProgress")
      .withIndex("by_user", (q) => q.eq("userId", actor.user._id))
      .collect();
    return progress.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  },
});
