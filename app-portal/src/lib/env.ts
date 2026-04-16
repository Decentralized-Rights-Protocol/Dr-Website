const requiredEnvVars = [
  'NEXT_PUBLIC_CONVEX_URL',
  'NEXT_PUBLIC_API_URL',
  'NEXT_PUBLIC_RPC_URL',
  'NEXT_PUBLIC_CHAIN_ID',
  'NEXT_PUBLIC_IPFS_GATEWAY',
  'NEXT_PUBLIC_AI_API',
  'NEXT_PUBLIC_LEARN_URL'
] as const

type EnvKey = (typeof requiredEnvVars)[number]

type EnvMap = Record<EnvKey, string>

const envCache: Partial<EnvMap> = {}

function readEnv(key: EnvKey): string {
  if (envCache[key]) return envCache[key] as string
  const value = process.env[key]
  if (!value) {
    const defaults: Partial<EnvMap> = {
      NEXT_PUBLIC_CONVEX_URL: 'https://placeholder.convex.cloud',
      NEXT_PUBLIC_API_URL: 'https://api.decentralizedrights.com',
      NEXT_PUBLIC_RPC_URL: 'https://rpc.decentralizedrights.com',
      NEXT_PUBLIC_CHAIN_ID: '31337',
      NEXT_PUBLIC_IPFS_GATEWAY: 'https://ipfs.decentralizedrights.com',
      NEXT_PUBLIC_AI_API: 'https://ai.decentralizedrights.com',
      NEXT_PUBLIC_LEARN_URL: 'https://decentralizedrights.com/learn'
    }
    const defaultValue = defaults[key]
    if (defaultValue) {
      if (key === 'NEXT_PUBLIC_CONVEX_URL') {
        console.warn('NEXT_PUBLIC_CONVEX_URL is not set. Using placeholder. Run npx convex dev to get your real URL.')
      }
      envCache[key] = defaultValue
      return defaultValue
    }
    return ''
  }
  envCache[key] = value
  return value
}

export const env: EnvMap = {
  NEXT_PUBLIC_CONVEX_URL: readEnv('NEXT_PUBLIC_CONVEX_URL'),
  NEXT_PUBLIC_API_URL: readEnv('NEXT_PUBLIC_API_URL'),
  NEXT_PUBLIC_RPC_URL: readEnv('NEXT_PUBLIC_RPC_URL'),
  NEXT_PUBLIC_CHAIN_ID: readEnv('NEXT_PUBLIC_CHAIN_ID'),
  NEXT_PUBLIC_IPFS_GATEWAY: readEnv('NEXT_PUBLIC_IPFS_GATEWAY'),
  NEXT_PUBLIC_AI_API: readEnv('NEXT_PUBLIC_AI_API'),
  NEXT_PUBLIC_LEARN_URL: readEnv('NEXT_PUBLIC_LEARN_URL')
}
