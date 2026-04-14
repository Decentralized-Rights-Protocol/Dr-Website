# DRP Portal Environment

Use these frontend environment values for Vercel:

- `NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com`
- `NEXT_PUBLIC_RPC_URL=https://rpc.decentralizedrights.com`
- `NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.decentralizedrights.com`
- `NEXT_PUBLIC_AI_API=https://ai.decentralizedrights.com`
- `NEXT_PUBLIC_LEARN_URL=https://decentralizedrights.com/learn`
- `NEXT_PUBLIC_CONVEX_URL=<your Convex deployment URL>`

## Notes

- `NEXT_PUBLIC_CONVEX_URL` is required for the portal to boot.
- The external API, RPC, IPFS, and AI URLs remain available for protocol-facing, storage, and service integrations.
- App-layer reads and writes should prefer Convex over the legacy portal REST client.
