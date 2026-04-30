const { ConvexHttpClient } = require('convex/browser');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!CONVEX_URL) {
  console.error('NEXT_PUBLIC_CONVEX_URL is not defined');
  process.exit(1);
}

// We need a way to reference the API from JS
// Since we don't have the generated api object easily in JS, we'll use string names
const convex = new ConvexHttpClient(CONVEX_URL);

/**
 * Mock Blockchain Event Listener
 */
async function pollBlockchain() {
  console.log('[Indexer] Polling blockchain for new proofs...');
  
  try {
    // 1. Fetch proofs with "Processing" status from DB
    // In a real indexer, you'd fetch events from the chain
    // Here we simulate picking up "Processing" proofs and "Confirming" them
    const proofs = await convex.query("proofs:getExplorerProofs", { limit: 10 });
    
    for (const proof of proofs) {
      if (proof.status === 'Processing') {
        console.log(`[Indexer] Detected confirmed proof on-chain: ${proof.proofHash}`);
        
        // 2. Update status to "Verified" (Task 7)
        // Simulate a delay to represent block confirmation
        await convex.mutation("proofs:updateProofTx", {
          proofId: proof._id,
          txHash: proof.txHash,
          status: 'Verified'
        });
        
        console.log(`[Indexer] Proof ${proof.proofHash} marked as Verified`);
      }
    }
  } catch (err) {
    console.error('[Indexer] Error polling blockchain:', err);
  }
}

// Run indexer continuously (Task 3)
console.log('[Indexer] Service started');
setInterval(pollBlockchain, 5000); // Poll every 5 seconds
