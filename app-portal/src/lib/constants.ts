export const DRP_CHAIN_ID = 31337

export const CONTRACT_ADDRESSES = {
  deriToken: '0x000000000000000000000000000000000000dEri',
  rightsToken: '0x000000000000000000000000000000000000RiGh',
  proofRegistry: '0x000000000000000000000000000000000000Pr00f'
} as const

export const STORAGE_KEYS = {
  session: 'drp.session',
  wallet: 'drp.wallet',
  locale: 'drp.locale'
} as const

export const JWT_EXPIRY_SECONDS = 60 * 15
export const REFRESH_EXPIRY_SECONDS = 60 * 60 * 24 * 7
