import { ethers } from 'ethers'
import { env } from '@/lib/env'
import { CONTRACT_ADDRESSES, DRP_CHAIN_ID } from '@/lib/constants'

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider
  }
}

interface MintPayload {
  address: string
  amount: bigint
}

export function getProvider(): ethers.JsonRpcProvider {
  return new ethers.JsonRpcProvider(env.NEXT_PUBLIC_RPC_URL, DRP_CHAIN_ID)
}

export async function getSigner(): Promise<ethers.Signer | null> {
  if (typeof window === 'undefined' || !window.ethereum) return null
  const provider = new ethers.BrowserProvider(window.ethereum)
  await provider.send('eth_requestAccounts', [])
  return provider.getSigner()
}

async function loadContract(address: string, abi: ethers.InterfaceAbi) {
  const signer = await getSigner()
  if (!signer) {
    throw new Error('Wallet not connected')
  }
  return new ethers.Contract(address, abi, signer)
}

const erc20Abi = [
  'function balanceOf(address owner) view returns (uint256)',
  'function mint(address to, uint256 amount)',
  'event Transfer(address indexed from, address indexed to, uint256 value)'
]

export async function mintDeRi({ address, amount }: MintPayload) {
  const contract = await loadContract(CONTRACT_ADDRESSES.deriToken, erc20Abi)
  return contract.mint(address, amount)
}

export async function mintRights({ address, amount }: MintPayload) {
  const contract = await loadContract(CONTRACT_ADDRESSES.rightsToken, erc20Abi)
  return contract.mint(address, amount)
}

export async function getBalance(address: string) {
  const provider = getProvider()
  const deriContract = new ethers.Contract(CONTRACT_ADDRESSES.deriToken, erc20Abi, provider)
  const rightsContract = new ethers.Contract(CONTRACT_ADDRESSES.rightsToken, erc20Abi, provider)

  const [deriBalance, rightsBalance] = await Promise.all([
    deriContract.balanceOf(address),
    rightsContract.balanceOf(address)
  ])

  return {
    deri: Number(ethers.formatUnits(deriBalance, 18)),
    rights: Number(ethers.formatUnits(rightsBalance, 18))
  }
}

export async function getLeaderboard() {
  // Placeholder implementation – replace with contract event scans or backend aggregation.
  return [] as Array<{ address: string; totalRewards: number; impactScore: number }>
}
