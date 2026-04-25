export type ActivityCategory = "learning" | "developer" | "content" | "productivity" | "web3";

export type ActivityType = 
  | "reading" | "video" | "course" | "notes" // Learning
  | "commit" | "pr" | "repo" | "contribution" // Developer
  | "blog" | "social" | "video_upload" | "design" // Content
  | "task" | "document" | "time_track" // Productivity
  | "wallet_tx" | "contract_call"; // Web3

export interface ActivityMetadata {
  url?: string;
  title?: string;
  duration?: number;
  repo?: string;
  platform?: string;
  [key: string]: any;
}

export interface ActivityClaim {
  userId: string;
  type: ActivityType;
  category: ActivityCategory;
  metadata: ActivityMetadata;
  proof: string;
  timestamp: string;
}

export interface VerificationResult {
  score: number;
  verdict: "approved" | "rejected" | "flagged";
  rationale: string;
  reward: {
    deri: number;
    rights: number;
  };
}

export interface DRPTransaction {
  txId: string;
  userId: string;
  activityHash: string;
  category: ActivityCategory;
  reward: {
    deri: number;
    rights: number;
  };
  timestamp: string;
  blockIndex?: number;
}

export interface DRPBlock {
  index: number;
  timestamp: string;
  transactions: DRPTransaction[];
  previousHash: string;
  blockHash: string;
  poatScore: number;
  signature: {
    edSig: string;
    pqSig?: string;
  };
}
