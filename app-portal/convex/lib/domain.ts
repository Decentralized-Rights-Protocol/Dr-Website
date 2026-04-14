import type { Doc, Id } from "../_generated/dataModel";
import type { MutationCtx, QueryCtx } from "../_generated/server";
import { nowIso } from "./time";

export type DrpCtx = MutationCtx | QueryCtx;

export function normalizeWallet(address: string) {
  return address.trim().toLowerCase();
}

export function buildDisplayName(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export async function findLinkedWallet(ctx: DrpCtx, walletAddress: string) {
  return await ctx.db
    .query("linkedWallets")
    .withIndex("by_address", (q) => q.eq("address", normalizeWallet(walletAddress)))
    .unique();
}

export async function findProfileByWallet(ctx: DrpCtx, walletAddress: string) {
  const linkedWallet = await findLinkedWallet(ctx, walletAddress);
  if (!linkedWallet) {
    return null;
  }

  const user = await ctx.db.get(linkedWallet.userId);
  const profile = await ctx.db
    .query("profiles")
    .withIndex("by_user", (q) => q.eq("userId", linkedWallet.userId))
    .unique();

  if (!user || !profile) {
    return null;
  }

  return { linkedWallet, user, profile };
}

export async function ensureUserForWallet(ctx: MutationCtx, walletAddress: string) {
  const normalized = normalizeWallet(walletAddress);
  const existing = await findProfileByWallet(ctx, normalized);
  if (existing) {
    await ctx.db.patch(existing.user._id, {
      lastSeenAt: nowIso(),
      updatedAt: nowIso(),
    });
    return existing;
  }

  const createdAt = nowIso();
  const userId = await ctx.db.insert("users", {
    primaryWallet: normalized,
    displayName: buildDisplayName(normalized),
    role: "member",
    createdAt,
    updatedAt: createdAt,
    lastSeenAt: createdAt,
  });

  const profileId = await ctx.db.insert("profiles", {
    userId,
    displayName: buildDisplayName(normalized),
    bio: "",
    organizationName: "",
    role: "member",
    verificationStatus: "unverified",
    statusScore: 0,
    governanceWeight: 1,
    regions: [],
    createdAt,
    updatedAt: createdAt,
  });

  const linkedWalletId = await ctx.db.insert("linkedWallets", {
    userId,
    address: normalized,
    chain: "evm",
    label: "Primary wallet",
    isPrimary: true,
    createdAt,
    updatedAt: createdAt,
  });

  const user = await ctx.db.get(userId);
  const profile = await ctx.db.get(profileId);
  const linkedWallet = await ctx.db.get(linkedWalletId);

  return {
    user: user as Doc<"users">,
    profile: profile as Doc<"profiles">,
    linkedWallet: linkedWallet as Doc<"linkedWallets">,
  };
}

export async function requireReviewer(ctx: MutationCtx, walletAddress: string) {
  const record = await ensureUserForWallet(ctx, walletAddress);
  if (!["admin", "reviewer"].includes(record.profile.role)) {
    throw new Error("Reviewer access is not enabled for this wallet. Configure role assignment before using admin flows.");
  }
  return record;
}

export async function createNotification(
  ctx: MutationCtx,
  userId: Id<"users">,
  category: "submission" | "governance" | "learn" | "system" | "review",
  title: string,
  message: string,
  href?: string,
) {
  return await ctx.db.insert("notifications", {
    userId,
    category,
    title,
    message,
    href,
    createdAt: nowIso(),
  });
}

export async function appendAudit(
  ctx: MutationCtx,
  input: {
    actorUserId?: Id<"users">;
    actorWallet?: string;
    eventType: string;
    entityType: string;
    entityId: string;
    message: string;
    metadata?: string;
  },
) {
  return await ctx.db.insert("auditLog", {
    actorUserId: input.actorUserId,
    actorWallet: input.actorWallet ? normalizeWallet(input.actorWallet) : undefined,
    eventType: input.eventType,
    entityType: input.entityType,
    entityId: input.entityId,
    message: input.message,
    metadata: input.metadata,
    createdAt: nowIso(),
  });
}
