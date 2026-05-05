# Root Cause Analysis & Fix Summary

## 1. Activity Verification Failure
### Root Cause
- **Incorrect Endpoint**: The Next.js API route `/api/submit-activity` was attempting to call `${NEXT_PUBLIC_API_URL}/api/verify`. However, neither the main backend nor the AI service had a `/verify` endpoint. The correct endpoint for verification was `/assess-activity` on the AI service.
- **Data Model Mismatch**: The frontend was sending a simplified activity object `{ category, type, metadata, proof }`, while the AI service expected an `ActivityClaim` model with fields like `title`, `description`, `hash`, etc.
- **Field Naming Discrepancy**: The API was returning `chain_tx_hash`, but the Convex mutation and frontend components were expecting `chainTxHash`.

### Fixes
- **Updated API Route**: Modified `src/app/api/submit-activity/route.ts` to call the AI service's `/assess-activity` endpoint.
- **Data Mapping**: Implemented mapping in the Next.js route to transform frontend data into the `ActivityClaim` format and enriched the response with calculated rewards and a mock transaction hash.
- **Synchronized Naming**: Changed the API response field from `chain_tx_hash` to `chainTxHash` to match the Convex schema and mutation.

## 2. Recent Activities Stuck Loading
### Root Cause
- **Auth Dependency**: The Convex queries `getActivities` and `getUserBalance` strictly required `ctx.auth.getUserIdentity()`. Since the frontend was using `ConvexProvider` without authentication, these queries were returning empty results or throwing errors, leading to an empty or stuck UI state.
- **Missing Loading UI**: The `ActivitiesPage` lacked a proper loading indicator for the activities list, showing "No recent activities found" immediately while loading or when unauthenticated.
- **Malformed Explorer URL**: A bug in `src/lib/api.ts` resulted in malformed URLs like `/api/v1/explorer/activity&limit=50` (missing the `?` if no other params were present).

### Fixes
- **Wallet-Based Queries**: Updated Convex queries in `convex/activities.ts` to accept an optional `walletAddress` argument, allowing data retrieval based on the connected wallet even without a full auth session.
- **Frontend Integration**: Updated `ActivitiesPage` and `WalletPage` to retrieve the wallet address from `useAppStore` and pass it to the Convex queries.
- **Enhanced UI**: Added `Loader2` spinners and better empty state messages (including a "Connect wallet" hint) to the Recent Activities lists.
- **Fixed API Client**: Corrected the URL construction logic in `src/lib/api.ts`.

## 3. Convex Schema Harmonization
### Root Cause
- The `drpActivities` table schema was too restrictive for the `signature` field (only allowing one specific object format) and was missing the `chainTxHash` field, causing insertion failures.

### Fixes
- **Flexible Schema**: Updated `convex/schema.ts` to allow `signature` to be a string or one of several object formats (supporting both `edSig` and `ed_sig`).
- **Added Missing Fields**: Added `chainTxHash` to the `drpActivities` table and updated the mutation to handle it.

## Testing Steps
1. **Verify Activity Submission**:
   - Go to the PoAT submission page.
   - Fill in activity details and click "Submit for Verification".
   - Confirm that "Verifying your activity..." appears and then shows the verdict and rewards.
   - Click "Submit to DRP" and confirm the activity appears in "Recent Activities".
2. **Verify Recent Activities**:
   - Connect your wallet.
   - Confirm that the "Recent Activities" list shows your previous submissions with a loading spinner appearing initially.
3. **Verify Explorer**:
   - Navigate to the Explorer Activity Feed and confirm it loads without errors (even if empty, it should stop loading).
