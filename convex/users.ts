import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ensureUserForWallet, findProfileByWallet, normalizeWallet } from "./lib/domain";
import { nowIso } from "./lib/time";

export const touchWalletSession = mutation({
  args: {
    walletAddress: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ensureUserForWallet(ctx, args.walletAddress);
    return {
      userId: record.user._id,
      role: record.profile.role,
      walletAddress: normalizeWallet(args.walletAddress),
    };
  },
});

export const getProfileByWallet = query({
  args: {
    walletAddress: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    if (!args.walletAddress) {
      return null;
    }

    const record = await findProfileByWallet(ctx, args.walletAddress);
    if (!record) {
      return null;
    }

    const attestations = await ctx.db
      .query("proofRecords")
      .withIndex("by_user", (q) => q.eq("userId", record.user._id))
      .collect();

    return {
      userId: record.user._id,
      walletAddress: record.linkedWallet.address,
      displayName: record.profile.displayName,
      bio: record.profile.bio,
      organizationName: record.profile.organizationName,
      role: record.profile.role,
      verificationStatus: record.profile.verificationStatus,
      statusScore: record.profile.statusScore,
      governanceWeight: record.profile.governanceWeight,
      regions: record.profile.regions,
      attestations: attestations.map((proof) => ({
        id: proof._id,
        proofKind: proof.proofKind,
        recordStatus: proof.recordStatus,
        verifierMode: proof.verifierMode,
        chainEventRef: proof.chainEventRef ?? null,
        createdAt: proof.createdAt,
      })),
      updatedAt: record.profile.updatedAt,
    };
  },
});

export const promoteWalletRole = mutation({
  args: {
    walletAddress: v.string(),
    role: v.union(v.literal("member"), v.literal("reviewer"), v.literal("admin")),
  },
  handler: async (ctx, args) => {
    const record = await ensureUserForWallet(ctx, args.walletAddress);
    await ctx.db.patch(record.user._id, {
      role: args.role,
      updatedAt: nowIso(),
    });
    await ctx.db.patch(record.profile._id, {
      role: args.role,
      updatedAt: nowIso(),
    });
    return { ok: true };
  },
});
