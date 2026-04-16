import { ActivityClaim, VerificationResult, ActivityCategory } from "./types";

export class PolicyEngine {
  /**
   * Assess a DRP activity claim.
   */
  static assessActivity(claim: ActivityClaim): VerificationResult {
    let score = 50; // Base score
    const rationaleParts: string[] = [];
    const categoryWeights: Record<ActivityCategory, { deri: number, rights: number }> = {
      learning: { deri: 10, rights: 2 },
      developer: { deri: 50, rights: 10 },
      content: { deri: 25, rights: 5 },
      productivity: { deri: 15, rights: 3 },
      web3: { deri: 30, rights: 8 },
    };

    // 1. Generic Validation
    if (claim.metadata.title && claim.metadata.title.length > 5) {
      score += 5;
    } else {
      score -= 5;
      rationaleParts.push("Minimal title required.");
    }

    if (claim.proof && claim.proof.length > 10) {
      score += 10;
    } else {
      score -= 10;
      rationaleParts.push("Substantial proof is required.");
    }

    // 2. Category Specific Logic
    switch (claim.category) {
      case "learning":
        if (claim.metadata.url) score += 10;
        if (claim.metadata.duration && claim.metadata.duration > 300) score += 10; // 5+ mins
        break;
      
      case "developer":
        if (claim.metadata.repo) score += 15;
        if (claim.type === "pr" || claim.type === "contribution") score += 20;
        break;

      case "content":
        if (claim.metadata.platform) score += 10;
        if (claim.type === "blog" || claim.type === "video_upload") score += 15;
        break;

      case "productivity":
        if (claim.metadata.duration) score += 10;
        break;

      case "web3":
        if (claim.proof.startsWith("0x")) score += 15;
        break;
    }

    // 3. Final Verdict
    let verdict: "approved" | "rejected" | "flagged" = "rejected";
    if (score >= 70) {
      verdict = "approved";
      rationaleParts.push("High confidence activity verified.");
    } else if (score >= 40) {
      verdict = "flagged";
      rationaleParts.push("Activity requires additional automated checks.");
    } else {
      verdict = "rejected";
      rationaleParts.push("Insufficient proof or invalid metadata.");
    }

    // 4. Calculate Rewards
    const weights = categoryWeights[claim.category];
    const rewardMultiplier = score / 100;
    
    const reward = {
      deri: Math.floor(weights.deri * rewardMultiplier),
      rights: Math.floor(weights.rights * rewardMultiplier),
    };

    return {
      score: Math.min(100, Math.max(0, score)),
      verdict,
      rationale: rationaleParts.join(" "),
      reward,
    };
  }
}
