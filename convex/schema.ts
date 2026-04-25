import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    primaryWallet: v.string(),
    displayName: v.string(),
    role: v.union(v.literal("member"), v.literal("reviewer"), v.literal("admin")),
    createdAt: v.string(),
    updatedAt: v.string(),
    lastSeenAt: v.string(),
  }).index("by_primary_wallet", ["primaryWallet"]),

  profiles: defineTable({
    userId: v.id("users"),
    displayName: v.string(),
    bio: v.string(),
    organizationName: v.string(),
    role: v.union(v.literal("member"), v.literal("reviewer"), v.literal("admin")),
    verificationStatus: v.union(v.literal("unverified"), v.literal("pending"), v.literal("verified"), v.literal("rejected")),
    statusScore: v.number(),
    governanceWeight: v.number(),
    regions: v.array(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_user", ["userId"]),

  linkedWallets: defineTable({
    userId: v.id("users"),
    address: v.string(),
    chain: v.string(),
    label: v.string(),
    isPrimary: v.boolean(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_address", ["address"]),

  activitySubmissions: defineTable({
    userId: v.id("users"),
    walletAddress: v.string(),
    kind: v.union(v.literal("activity"), v.literal("status")),
    title: v.string(),
    description: v.string(),
    location: v.optional(v.string()),
    occurredAt: v.string(),
    payloadHash: v.string(),
    attachmentName: v.optional(v.string()),
    attachmentMimeType: v.optional(v.string()),
    attachmentSizeBytes: v.optional(v.number()),
    submissionStatus: v.union(
      v.literal("submitted"),
      v.literal("under_review"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("needs_info"),
    ),
    reviewNote: v.optional(v.string()),
    chainMirrorStatus: v.union(v.literal("not_started"), v.literal("queued"), v.literal("mirrored"), v.literal("failed")),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_wallet", ["walletAddress"])
    .index("by_status", ["submissionStatus"])
    .index("by_kind", ["kind"]),

  proofRecords: defineTable({
    submissionId: v.id("activitySubmissions"),
    userId: v.id("users"),
    proofKind: v.union(v.literal("poat"), v.literal("post")),
    recordStatus: v.union(v.literal("pending"), v.literal("verified"), v.literal("rejected")),
    verifierMode: v.union(v.literal("ai_assist"), v.literal("human_review"), v.literal("protocol_sync")),
    confidenceScore: v.optional(v.number()),
    rationale: v.optional(v.string()),
    attestationRef: v.optional(v.string()),
    chainEventRef: v.optional(v.string()),
    mirroredAt: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_submission", ["submissionId"])
    .index("by_user", ["userId"]),

  governanceProposals: defineTable({
    slug: v.string(),
    title: v.string(),
    summary: v.string(),
    body: v.string(),
    category: v.string(),
    proposalStatus: v.union(
      v.literal("draft"),
      v.literal("review"),
      v.literal("active"),
      v.literal("passed"),
      v.literal("rejected"),
      v.literal("archived"),
    ),
    proposerUserId: v.optional(v.id("users")),
    proposerWallet: v.optional(v.string()),
    reviewSummary: v.optional(v.string()),
    votingStartAt: v.optional(v.string()),
    votingEndAt: v.optional(v.string()),
    tags: v.array(v.string()),
    participationCount: v.number(),
    yesWeight: v.number(),
    noWeight: v.number(),
    abstainWeight: v.number(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["proposalStatus"]),

  votes: defineTable({
    proposalId: v.id("governanceProposals"),
    userId: v.id("users"),
    walletAddress: v.string(),
    choice: v.union(v.literal("yes"), v.literal("no"), v.literal("abstain")),
    weight: v.number(),
    rationale: v.optional(v.string()),
    isSimulated: v.boolean(),
    source: v.union(v.literal("app"), v.literal("mock"), v.literal("protocol_sync")),
    createdAt: v.string(),
  })
    .index("by_proposal", ["proposalId"])
    .index("by_wallet", ["walletAddress"])
    .index("by_proposal_wallet", ["proposalId", "walletAddress"]),

  learnProgress: defineTable({
    userId: v.id("users"),
    moduleSlug: v.string(),
    lessonSlug: v.string(),
    completionStatus: v.union(v.literal("not_started"), v.literal("in_progress"), v.literal("completed")),
    score: v.optional(v.number()),
    xpEarned: v.number(),
    lastViewedAt: v.string(),
    completedAt: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_user_module", ["userId", "moduleSlug"])
    .index("by_user_lesson", ["userId", "lessonSlug"]),

  docsSections: defineTable({
    slug: v.string(),
    sectionType: v.union(v.literal("whitepaper"), v.literal("docs"), v.literal("learn")),
    title: v.string(),
    summary: v.string(),
    href: v.string(),
    sortOrder: v.number(),
    published: v.boolean(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_type", ["sectionType"]),

  notifications: defineTable({
    userId: v.id("users"),
    category: v.union(v.literal("submission"), v.literal("governance"), v.literal("learn"), v.literal("system"), v.literal("review")),
    title: v.string(),
    message: v.string(),
    href: v.optional(v.string()),
    readAt: v.optional(v.string()),
    createdAt: v.string(),
  }).index("by_user", ["userId"]),

  adminReviewQueue: defineTable({
    submissionId: v.id("activitySubmissions"),
    queueStatus: v.union(v.literal("pending"), v.literal("in_review"), v.literal("resolved")),
    priority: v.union(v.literal("low"), v.literal("normal"), v.literal("high")),
    reviewType: v.union(v.literal("poat"), v.literal("post")),
    assignedReviewerWallet: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_status", ["queueStatus"])
    .index("by_submission", ["submissionId"]),

  auditLog: defineTable({
    actorUserId: v.optional(v.id("users")),
    actorWallet: v.optional(v.string()),
    eventType: v.string(),
    entityType: v.string(),
    entityId: v.string(),
    message: v.string(),
    metadata: v.optional(v.string()),
    createdAt: v.string(),
  })
    .index("by_entity", ["entityType", "entityId"])
    .index("by_event", ["eventType"]),

  ecosystemMetrics: defineTable({
    scope: v.union(v.literal("global"), v.literal("wallet")),
    walletAddress: v.optional(v.string()),
    metricsDate: v.string(),
    verifiedActivities: v.number(),
    statusApprovals: v.number(),
    deriIssued: v.number(),
    rightsIssued: v.number(),
    activeLearners: v.number(),
    openProposals: v.number(),
    reviewBacklog: v.number(),
    sustainabilityScore: v.number(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_scope", ["scope"])
    .index("by_wallet", ["walletAddress"]),

  // --- DRP CORE TABLES ---

  drpActivities: defineTable({
    userId: v.id("users"),
    type: v.string(),
    category: v.string(),
    metadata: v.any(),
    proof: v.string(),
    hash: v.string(),
    signature: v.object({
      edSig: v.string(),
      pqSig: v.optional(v.string()),
    }),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected"), v.literal("flagged")),
    score: v.number(),
    reward: v.object({
      deri: v.number(),
      rights: v.number(),
    }),
    createdAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  drpTransactions: defineTable({
    txId: v.string(),
    userId: v.id("users"),
    activityHash: v.string(),
    category: v.string(),
    reward: v.object({
      deri: v.number(),
      rights: v.number(),
    }),
    timestamp: v.string(),
    blockIndex: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_block", ["blockIndex"])
    .index("by_txid", ["txId"]),

  drpBalances: defineTable({
    userId: v.id("users"),
    deri: v.number(),
    rights: v.number(),
    updatedAt: v.string(),
  }).index("by_user", ["userId"]),

  drpBlocks: defineTable({
    index: v.number(),
    timestamp: v.string(),
    transactions: v.array(v.any()),
    previousHash: v.string(),
    blockHash: v.string(),
    poatScore: v.number(),
    signature: v.object({
      edSig: v.string(),
      pqSig: v.optional(v.string()),
    }),
  }).index("by_index", ["index"]),
});
