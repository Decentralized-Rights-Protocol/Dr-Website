import { sha3_512 } from "js-sha3";
import nacl from "tweetnacl";

/**
 * Standard DRP hashing using SHA3-512.
 */
export function hashData(data: string | object): string {
  const content = typeof data === "string" ? data : JSON.stringify(data, Object.keys(data).sort());
  return sha3_512(content);
}

/**
 * Simulate Post-Quantum signatures (Mock CRYSTALS-Dilithium).
 * Returns a dual signature object.
 */
export function signData(hash: string, privateKey?: Uint8Array) {
  // For demo, we use a constant or random key if not provided
  const key = privateKey || new Uint8Array(32).fill(1);
  const message = new TextEncoder().encode(hash);
  
  // Ed25519 part
  const keyPair = nacl.sign.keyPair.fromSeed(key);
  const edSig = nacl.sign.detached(message, keyPair.secretKey);
  
  // Mock PQ part (Dilithium)
  // In a real implementation, this would call a PQ library
  const pqSig = "pq_sim_" + Buffer.from(edSig).toString('hex').slice(0, 32);

  return {
    edSig: Buffer.from(edSig).toString('base64'),
    pqSig: pqSig
  };
}

/**
 * Verify signatures (Dual-sig).
 */
export function verifyData(hash: string, edSigB64: string, publicKeyB64: string): boolean {
  try {
    const message = new TextEncoder().encode(hash);
    const edSig = Buffer.from(edSigB64, 'base64');
    const publicKey = Buffer.from(publicKeyB64, 'base64');
    
    return nacl.sign.detached.verify(message, edSig, publicKey);
  } catch (e) {
    return false;
  }
}
