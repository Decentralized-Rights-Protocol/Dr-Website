"""
Crypto abstraction layer for DRP.
Supports ed25519 (current) and post-quantum stubs (future migration).

This module provides a unified interface for cryptographic operations
that can be migrated to post-quantum algorithms (e.g., Dilithium, Kyber) in the future.
"""

import os
import base64
from typing import Dict, Tuple, Optional
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey, Ed25519PublicKey
from cryptography.hazmat.primitives import serialization

# Feature flag for post-quantum support
POST_QUANTUM_ENABLED = os.getenv("POST_QUANTUM_ENABLED", "false").lower() == "true"

def generate_keypair(alg: str = "ed25519") -> Tuple[bytes, bytes]:
    """
    Generate a keypair for the specified algorithm.
    
    Args:
        alg: Algorithm identifier ("ed25519" or future PQ algorithms)
    
    Returns:
        Tuple of (public_key_bytes, private_key_bytes)
    """
    if alg == "ed25519":
        private_key = Ed25519PrivateKey.generate()
        public_key = private_key.public_key()
        
        # Serialize keys
        priv_bytes = private_key.private_bytes(
            encoding=serialization.Encoding.Raw,
            format=serialization.PrivateFormat.Raw,
            encryption_algorithm=serialization.NoEncryption()
        )
        pub_bytes = public_key.public_bytes(
            encoding=serialization.Encoding.Raw,
            format=serialization.PublicFormat.Raw
        )
        
        return (pub_bytes, priv_bytes)
    
    elif POST_QUANTUM_ENABLED and alg in ["dilithium", "kyber"]:
        # TODO: Implement post-quantum key generation
        # Example: use liboqs-python or similar
        raise NotImplementedError(f"Post-quantum algorithm {alg} not yet implemented")
    
    else:
        raise ValueError(f"Unsupported algorithm: {alg}")

def sign_message(alg: str, private_key: bytes, message: bytes) -> bytes:
    """
    Sign a message using the specified algorithm.
    
    Args:
        alg: Algorithm identifier
        private_key: Private key bytes
        message: Message to sign
    
    Returns:
        Signature bytes
    """
    if alg == "ed25519":
        priv_key_obj = Ed25519PrivateKey.from_private_bytes(private_key)
        signature = priv_key_obj.sign(message)
        return signature
    
    elif POST_QUANTUM_ENABLED and alg in ["dilithium"]:
        # TODO: Implement post-quantum signing
        raise NotImplementedError(f"Post-quantum signing for {alg} not yet implemented")
    
    else:
        raise ValueError(f"Unsupported algorithm: {alg}")

def verify_signature(alg: str, public_key: bytes, message: bytes, signature: bytes) -> bool:
    """
    Verify a signature.
    
    Args:
        alg: Algorithm identifier
        public_key: Public key bytes
        message: Original message
        signature: Signature bytes
    
    Returns:
        True if signature is valid, False otherwise
    """
    if alg == "ed25519":
        try:
            pub_key_obj = Ed25519PublicKey.from_public_bytes(public_key)
            pub_key_obj.verify(signature, message)
            return True
        except Exception:
            return False
    
    elif POST_QUANTUM_ENABLED and alg in ["dilithium"]:
        # TODO: Implement post-quantum verification
        raise NotImplementedError(f"Post-quantum verification for {alg} not yet implemented")
    
    else:
        raise ValueError(f"Unsupported algorithm: {alg}")

def get_private_key_from_env(env_var: str) -> Optional[bytes]:
    """
    Load private key from environment variable (base64 encoded).
    
    Args:
        env_var: Environment variable name
    
    Returns:
        Private key bytes, or None if not found
    """
    key_b64 = os.getenv(env_var, "")
    if not key_b64:
        return None
    
    try:
        return base64.b64decode(key_b64)
    except Exception:
        return None

def get_public_key_from_env(env_var: str) -> Optional[bytes]:
    """
    Load public key from environment variable (base64 encoded).
    
    Args:
        env_var: Environment variable name
    
    Returns:
        Public key bytes, or None if not found
    """
    key_b64 = os.getenv(env_var, "")
    if not key_b64:
        return None
    
    try:
        return base64.b64decode(key_b64)
    except Exception:
        return None

