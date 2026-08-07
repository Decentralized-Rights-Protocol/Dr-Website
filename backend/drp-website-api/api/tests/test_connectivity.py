"""
Test Script - Verify connectivity with Dr-Blockchain and all frontends.
"""

import asyncio
import httpx
import sys
from typing import Dict, Any, List


BASE_URL = "http://localhost:8000"
FRONTENDS = {
    "main": "https://decentralizedrights.com",
    "explorer": "https://explorer.decentralizedrights.com",
    "app": "https://app.decentralizedrights.com",
    "api": "https://api.decentralizedrights.com"
}


async def test_health_check(client: httpx.AsyncClient) -> bool:
    """Test health check endpoint."""
    try:
        response = await client.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Health check passed: {data['status']}")
            return True
        else:
            print(f"✗ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Health check error: {e}")
        return False


async def test_token_balance(client: httpx.AsyncClient) -> bool:
    """Test token balance endpoint."""
    try:
        test_address = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
        response = await client.get(f"{BASE_URL}/api/v1/tokens/balance/{test_address}")
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Token balance endpoint works: {data['symbol']}")
            return True
        else:
            print(f"✗ Token balance failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Token balance error: {e}")
        return False


async def test_activities_endpoint(client: httpx.AsyncClient) -> bool:
    """Test activities submission endpoint."""
    try:
        test_submission = {
            "title": "Test Activity",
            "description": "This is a test activity submission",
            "timestamp": "2024-01-01T00:00:00Z",
            "hash": "0x" + "0" * 64,
            "actor_id": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
            "activity_type": "poat"
        }
        response = await client.post(
            f"{BASE_URL}/api/v1/activities/submit",
            json=test_submission
        )
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Activity submission works: {data['submission_id']}")
            return True
        else:
            print(f"✗ Activity submission failed: {response.status_code}")
            print(f"  Response: {response.text}")
            return False
    except Exception as e:
        print(f"✗ Activity submission error: {e}")
        return False


async def test_governance_endpoint(client: httpx.AsyncClient) -> bool:
    """Test governance proposals endpoint."""
    try:
        response = await client.get(f"{BASE_URL}/api/v1/governance/proposals")
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Governance proposals endpoint works: {len(data)} proposals")
            return True
        else:
            print(f"✗ Governance proposals failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Governance proposals error: {e}")
        return False


async def test_ai_endpoint(client: httpx.AsyncClient) -> bool:
    """Test AI service endpoint."""
    try:
        test_query = {
            "query": "What is DRP?",
            "context": {}
        }
        response = await client.post(
            f"{BASE_URL}/api/v1/ai/query",
            json=test_query
        )
        if response.status_code == 200:
            data = response.json()
            print(f"✓ AI query endpoint works: {data['answer'][:50]}...")
            return True
        else:
            print(f"✗ AI query failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ AI query error: {e}")
        return False


async def test_explorer_endpoint(client: httpx.AsyncClient) -> bool:
    """Test explorer transactions endpoint."""
    try:
        response = await client.get(f"{BASE_URL}/api/v1/explorer/transactions?limit=10")
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Explorer transactions endpoint works: {len(data)} transactions")
            return True
        else:
            print(f"✗ Explorer transactions failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Explorer transactions error: {e}")
        return False


async def test_frontend_connectivity(client: httpx.AsyncClient) -> Dict[str, bool]:
    """Test connectivity to all frontends."""
    results = {}
    
    for name, url in FRONTENDS.items():
        try:
            response = await client.get(url, timeout=5.0, follow_redirects=True)
            if response.status_code in [200, 301, 302]:
                print(f"✓ {name} frontend accessible: {url}")
                results[name] = True
            else:
                print(f"✗ {name} frontend failed: {response.status_code}")
                results[name] = False
        except Exception as e:
            print(f"✗ {name} frontend error: {e}")
            results[name] = False
    
    return results


async def run_all_tests():
    """Run all connectivity tests."""
    print("=" * 60)
    print("DRP Website API Connectivity Tests")
    print("=" * 60)
    print()
    
    async with httpx.AsyncClient() as client:
        tests = [
            ("Health Check", test_health_check(client)),
            ("Token Balance", test_token_balance(client)),
            ("Activities", test_activities_endpoint(client)),
            ("Governance", test_governance_endpoint(client)),
            ("AI Service", test_ai_endpoint(client)),
            ("Explorer", test_explorer_endpoint(client)),
        ]
        
        results = []
        for name, test_coro in tests:
            print(f"\nTesting {name}...")
            result = await test_coro
            results.append((name, result))
        
        print("\n" + "=" * 60)
        print("Frontend Connectivity Tests")
        print("=" * 60)
        print()
        
        frontend_results = await test_frontend_connectivity(client)
        
        print("\n" + "=" * 60)
        print("Test Summary")
        print("=" * 60)
        
        passed = sum(1 for _, result in results if result)
        total = len(results)
        
        print(f"\nAPI Tests: {passed}/{total} passed")
        for name, result in results:
            status = "✓ PASS" if result else "✗ FAIL"
            print(f"  {status} - {name}")
        
        frontend_passed = sum(1 for v in frontend_results.values() if v)
        frontend_total = len(frontend_results)
        
        print(f"\nFrontend Tests: {frontend_passed}/{frontend_total} passed")
        for name, result in frontend_results.items():
            status = "✓ PASS" if result else "✗ FAIL"
            print(f"  {status} - {name}")
        
        print()
        
        if passed == total and frontend_passed == frontend_total:
            print("✓ All tests passed!")
            return 0
        else:
            print("✗ Some tests failed")
            return 1


if __name__ == "__main__":
    exit_code = asyncio.run(run_all_tests())
    sys.exit(exit_code)


