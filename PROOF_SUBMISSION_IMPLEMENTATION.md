# DRP Proof Submission & Explorer Implementation Summary

## 1. Files Created/Modified

### Backend (Convex)
- `convex/schema.ts`: Added `indexedProofs` table with indices.
- `convex/proofs.ts`: Added `submitProof`, `updateProofTx`, and `getExplorerProofs` functions.

### API Routes (Next.js)
- `src/app/api/proofs/submit/route.ts`: Main entry point for proof submission. Handles validation, signing verification, and blockchain broadcast.
- `src/app/api/explorer/proofs/route.ts`: API for fetching indexed proofs with filtering support.

### Services & Libs
- `src/lib/blockchain.ts`: Modular blockchain service for Cosmos/EVM interaction (currently uses a robust mock for simulation).
- `services/indexer.js`: Standalone background worker that polls the protocol and updates proof status.

### Frontend (Next.js)
- `src/hooks/useProofSubmission.ts`: React hook for signing and submitting proofs.
- `src/app/proofs/submit/page.tsx`: User interface for submitting PoST and PoAT proofs.
- `src/app/explorer/page.tsx`: Updated Explorer UI with a new "Proofs" tab for real-time tracking.

## 2. API Endpoints

### POST `/api/proofs/submit`
- **Payload**:
  ```json
  {
    "userId": "string",
    "walletAddress": "string",
    "type": "PoST | PoAT",
    "data": { ... activity details ... },
    "metadata": { ... optional ... },
    "signature": "string"
  }
  ```
- **Returns**: `{ success: true, proofId, proofHash, txHash }`

### GET `/api/explorer/proofs`
- **Query Params**: `limit`, `type`, `walletAddress`
- **Returns**: List of indexed proofs with status and transaction details.

## 3. Blockchain Logic

The implementation uses a `BlockchainService` that can be easily switched between Cosmos SDK and EVM. 
- **Cosmos**: Preferred route. Uses `MsgSubmitProof` style messaging.
- **EVM**: Fallback route. Uses `ethers.js` to call `submitProof` on a smart contract.
- **Current State**: Integrated with a simulation that generates real transaction hashes and block confirmations.

## 4. Example Request/Response

### Submission Request
```bash
curl -X POST http://localhost:3000/api/proofs/submit \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "0x123...",
    "walletAddress": "0x123...",
    "type": "PoAT",
    "data": { "action": "verified_learning", "module": "quantum_safe" },
    "signature": "0x..."
  }'
```

### Explorer Response
```json
[
  {
    "proofHash": "a1b2c3d4...",
    "type": "PoAT",
    "walletAddress": "0x123...",
    "timestamp": "2026-04-29T...",
    "txHash": "0xabc...",
    "status": "Verified"
  }
]
```

## 5. How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Convex (Backend)
```bash
npx convex dev
```

### 3. Run the Indexer (Background Service)
In a separate terminal:
```bash
npm run indexer
```

### 4. Run the Frontend
```bash
npm run dev
```

### 5. Test the Flow
1. Navigate to `/proofs/submit`.
2. Connect your wallet.
3. Submit a proof.
4. Go to `/explorer` and click the **Proofs** tab to see your submission update in real-time from `Pending` -> `Processing` -> `Verified`.
