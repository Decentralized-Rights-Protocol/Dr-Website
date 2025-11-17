"""
OrbitDB client for DRP.
Connects to remote IPFS node and manages OrbitDB instances.
"""

import os
import json
import httpx
from pathlib import Path
from typing import Dict, Any, Optional, List

IPFS_API_URL = os.getenv("IPFS_API_URL", "https://ipfs.decentralizedrights.com/api/v0")
ORBITDB_ADDR = os.getenv("ORBITDB_ADDR", "")

class OrbitClient:
    """Client for interacting with OrbitDB instances."""
    
    def __init__(self, orbit_service_url: Optional[str] = None):
        """
        Initialize OrbitDB client.
        
        Args:
            orbit_service_url: URL of OrbitDB service (if separate). Otherwise uses ORBITDB_ADDR.
        """
        self.orbit_url = orbit_service_url or ORBITDB_ADDR or "http://localhost:3002"
        self.ipfs_url = IPFS_API_URL
        
        # OrbitDB database addresses (persisted)
        self.db_addresses = {
            "drp.activities": "",
            "drp.status": "",
            "drp.explorer.summaries": ""
        }
        
        # Load persisted addresses if available
        self._load_addresses()
    
    def _load_addresses(self):
        """Load OrbitDB addresses from persisted file."""
        # Look for infrastructure directory relative to backend root
        backend_root = Path(__file__).parent.parent
        addresses_file = backend_root / "infrastructure" / "orbit_addresses.json"
        if os.path.exists(addresses_file):
            try:
                with open(addresses_file, "r") as f:
                    self.db_addresses.update(json.load(f))
            except Exception:
                pass
    
    def _save_addresses(self):
        """Save OrbitDB addresses to file."""
        backend_root = Path(__file__).parent.parent
        addresses_file = backend_root / "infrastructure" / "orbit_addresses.json"
        addresses_file.parent.mkdir(parents=True, exist_ok=True)
        with open(addresses_file, "w") as f:
            json.dump(self.db_addresses, f, indent=2)
    
    async def add(self, db_name: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Add an entry to an OrbitDB database.
        
        Args:
            db_name: Name of the database (e.g., "drp.activities")
            payload: Payload to add
        
        Returns:
            Dict with "hash" and optionally "db_address"
        """
        # If OrbitDB service is available, use it
        if self.orbit_url and self.orbit_url != "":
            async with httpx.AsyncClient() as client:
                try:
                    response = await client.post(
                        f"{self.orbit_url}/orbit/add",
                        json={"db": db_name, "payload": payload},
                        timeout=30.0
                    )
                    response.raise_for_status()
                    result = response.json()
                    
                    # Update database address if provided
                    if "db_address" in result:
                        self.db_addresses[db_name] = result["db_address"]
                        self._save_addresses()
                    
                    return result
                except Exception as e:
                    # Fallback: store directly in IPFS
                    return await self._fallback_add(db_name, payload)
        
        # Fallback: store directly in IPFS
        return await self._fallback_add(db_name, payload)
    
    async def _fallback_add(self, db_name: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Fallback: store payload directly in IPFS."""
        async with httpx.AsyncClient() as client:
            try:
                # Upload to IPFS
                response = await client.post(
                    f"{self.ipfs_url}/add",
                    files={"file": (None, json.dumps(payload))},
                    timeout=30.0
                )
                response.raise_for_status()
                result = response.json()
                cid = result.get("Hash") or result.get("cid", "")
                
                return {
                    "hash": cid,
                    "db_address": f"/orbitdb/{cid}/{db_name}",
                    "fallback": True
                }
            except Exception as e:
                raise Exception(f"Failed to add to OrbitDB/IPFS: {str(e)}")
    
    async def get(self, db_name: str, entry_hash: Optional[str] = None) -> Optional[Dict[str, Any]]:
        """
        Get entry(ies) from OrbitDB database.
        
        Args:
            db_name: Name of the database
            entry_hash: Optional specific entry hash to retrieve
        
        Returns:
            Entry data or None
        """
        if self.orbit_url and self.orbit_url != "":
            async with httpx.AsyncClient() as client:
                try:
                    params = {"db": db_name}
                    if entry_hash:
                        params["hash"] = entry_hash
                    
                    response = await client.get(
                        f"{self.orbit_url}/orbit/get",
                        params=params,
                        timeout=30.0
                    )
                    response.raise_for_status()
                    return response.json()
                except Exception:
                    return None
        
        return None
    
    async def list_entries(self, db_name: str, limit: int = 100) -> List[Dict[str, Any]]:
        """
        List recent entries from a database.
        
        Args:
            db_name: Name of the database
            limit: Maximum number of entries to return
        
        Returns:
            List of entries
        """
        result = await self.get(db_name)
        if result and isinstance(result, list):
            return result[:limit]
        elif result:
            return [result]
        return []

