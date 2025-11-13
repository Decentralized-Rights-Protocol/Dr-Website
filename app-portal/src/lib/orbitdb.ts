import { env } from '@/lib/env'

export interface OrbitRecord<T = unknown> {
  cid: string
  value: T
  timestamp: number
  hash: string
}

export async function pinToIpfs(file: File): Promise<{ cid: string }> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/storage/ipfs`, {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    throw new Error('Failed to pin file to IPFS')
  }

  return response.json() as Promise<{ cid: string }>
}

export async function appendOrbitRecord<TValue>(dbName: string, payload: TValue) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/storage/orbitdb/${dbName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error('Failed to write to OrbitDB')
  }

  return response.json() as Promise<OrbitRecord<TValue>>
}

export async function fetchOrbitRecords<TValue>(dbName: string) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/storage/orbitdb/${dbName}`)
  if (!response.ok) {
    throw new Error('Failed to load OrbitDB records')
  }
  return response.json() as Promise<Array<OrbitRecord<TValue>>>
}
