const requiredEnvVars = [
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
    throw new Error(`Missing required environment variable: ${key}`)
  }
  envCache[key] = value
  return value
}

export const env: EnvMap = {
  NEXT_PUBLIC_API_URL: readEnv('NEXT_PUBLIC_API_URL'),
  NEXT_PUBLIC_RPC_URL: readEnv('NEXT_PUBLIC_RPC_URL'),
  NEXT_PUBLIC_CHAIN_ID: readEnv('NEXT_PUBLIC_CHAIN_ID'),
  NEXT_PUBLIC_IPFS_GATEWAY: readEnv('NEXT_PUBLIC_IPFS_GATEWAY'),
  NEXT_PUBLIC_AI_API: readEnv('NEXT_PUBLIC_AI_API'),
  NEXT_PUBLIC_LEARN_URL: readEnv('NEXT_PUBLIC_LEARN_URL')
}
