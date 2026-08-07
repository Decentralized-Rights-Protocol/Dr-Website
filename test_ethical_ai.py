#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Test script for Ethical AI integration.

This script tests:
1. Knowledge base initialization
2. Ethical LangChain Service
3. AI Service integration
4. FastAPI endpoints
5. NVIDIA NIM support
"""

import asyncio
import sys
import os

# Add the backend path to sys.path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend', 'drp-website-api'))

def test_knowledge_base():
    """Test the human rights knowledge base."""
    print("🔍 Testing Knowledge Base...")
    
    try:
        from api.knowledge.human_rights_knowledge import HumanRightsKnowledgeBase, KnowledgeDocument
        
        # Create knowledge base
        kb = HumanRightsKnowledgeBase(load_from_file=False)
        
        # Test basic properties
        assert len(kb.documents) > 0, "Knowledge base should have documents"
        assert len(kb.categories) > 0, "Knowledge base should have categories"
        assert len(kb.tags_index) > 0, "Knowledge base should have tags index"
        
        print(f"[OK] Knowledge Base: {len(kb.documents)} documents loaded")
        print(f"   Categories: {list(kb.categories.keys())[:5]}...")
        print(f"   Tags: {len(kb.tags_index)} unique tags")
        
        return True
        
    except Exception as e:
        print(f"❌ Knowledge Base test failed: {e}")
        return False


async def test_ethical_langchain_service():
    """Test the Ethical LangChain Service."""
    print("\n🤖 Testing Ethical LangChain Service...")
    
    try:
        from api.services.ethical_langchain_service import (
            EthicalLangChainService, 
            EthicalAssessment,
            ProofSubmission,
            VerificationType,
            HumanRightsFilter,
            BiasDetector,
            PrivacyGuard
        )
        
        # Create service
        service = EthicalLangChainService(
            provider="huggingface",
            huggingface_key=None,  # Will use fallback
            use_vector_store=True
        )
        
        print("✅ Ethical LangChain Service initialized")
        
        # Test health check
        health = await service.health_check()
        assert health["status"] == "healthy", "Service should be healthy"
        print(f"✅ Health check: {health['status']}")
        print(f"   Provider: {health['provider']}")
        print(f"   Capabilities: {health['capabilities'][:3]}...")
        
        # Test filters
        hr_filter = service.human_rights_filter
        bias_detector = service.bias_detector
        privacy_guard = service.privacy_guard
        
        # Test human rights filter
        safe_content = "I contributed to a human rights education project"
        unsafe_content = "This promotes hate and violence"
        
        safe_result = hr_filter.check_content(safe_content)
        unsafe_result = hr_filter.check_content(unsafe_content)
        
        print(f"✅ Human Rights Filter: Safe content -> {safe_result[0].value}")
        print(f"   Unsafe content -> {unsafe_result[0].value}")
        
        # Test bias detector
        biased_text = "This opportunity is only for young male developers"
        bias_result = bias_detector.detect_bias(biased_text)
        print(f"✅ Bias Detector: {bias_result['bias_detected']} biases detected")
        
        # Test privacy guard
        private_text = "My email is user@example.com and my SSN is 123-45-6789"
        privacy_result = privacy_guard.check_privacy(private_text, "0x123...abc")
        print(f"✅ Privacy Guard: Violations -> {privacy_result['violations']}")
        
        # Test proof verification
        submission = ProofSubmission(
            submission_id="test_001",
            user_address="0x123...abc",
            verification_type=VerificationType.POAT,
            title="Open Source Contribution",
            description="I contributed to a human rights documentation project on GitHub by adding accessibility features for people with disabilities.",
            metadata={"url": "https://github.com/humanrights/docs", "type": "contribution"},
            context={"user_level": "intermediate"}
        )
        
        assessment = await service.verify_proof(submission)
        print(f"✅ Proof Verification: {assessment.verdict.value}, Score: {assessment.score}")
        
        # Test knowledge query
        knowledge_result = await service.query_knowledge("human rights verification")
        print(f"✅ Knowledge Query: {knowledge_result['count']} results found")
        
        # Test concept explanation
        explanation = await service.explain_concept("what is drp", "beginner")
        print(f"✅ Concept Explanation: {len(explanation)} characters")
        
        # Clean up
        await service.close()
        
        return True
        
    except Exception as e:
        print(f"❌ Ethical LangChain Service test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


async def test_ai_service_integration():
    """Test AIService integration with Ethical LangChain Service."""
    print("\n🔧 Testing AIService Integration...")
    
    try:
        from services.ai_service import AIService
        
        # Create AIService with ethical AI enabled
        ai_service = AIService(
            provider="huggingface",
            huggingface_key=None,
            nvidia_nim_key=None,
            use_ethical_ai=True
        )
        
        assert ai_service.ethical_ai_service is not None, "Ethical AI service should be initialized"
        print("✅ AIService with Ethical AI integration initialized")
        
        # Test assess_activity method
        activity_data = {
            "submission_id": "test_002",
            "user_address": "0x456...def",
            "title": "Educational Content Creation",
            "description": "Created educational materials about human rights for my community",
            "metadata": {"type": "education", "audience": "students"},
            "context": {}
        }
        
        assessment = await ai_service.assess_activity(activity_data)
        print(f"✅ Activity Assessment: {assessment['verdict']}, Score: {assessment['score']}")
        
        # Test query method
        query_result = await ai_service.query("human rights education")
        print(f"✅ Query: Confidence {query_result['confidence']}")
        
        # Test explain_concept method
        explanation = await ai_service.explain_concept("proof of activity", "beginner")
        print(f"✅ Explanation: {len(explanation)} characters")
        
        # Clean up
        await ai_service.close()
        
        return True
        
    except Exception as e:
        print(f"❌ AIService integration test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


async def test_fastapi_router():
    """Test the FastAPI router for ethical AI endpoints."""
    print("\n🚀 Testing FastAPI Router...")
    
    try:
        from routers.ethical_ai import router
        from fastapi.testclient import TestClient
        
        # Import main app
        from main import app
        
        # Create test client
        client = TestClient(app)
        
        # Test health endpoint
        response = client.get("/api/v1/ethical-ai/health")
        if response.status_code != 200:
            print(f"❌ Health endpoint failed: {response.status_code} - {response.text}")
            return False
        
        health_data = response.json()
        print(f"✅ Health endpoint: {health_data['status']}")
        print(f"   Provider: {health_data['provider']}")
        
        # Test concept explanation endpoint
        response = client.get("/api/v1/ethical-ai/explain-concept?concept=proof+of+activity&user_level=beginner")
        if response.status_code != 200:
            print(f"❌ Explain concept endpoint failed: {response.status_code}")
            return False
        
        explanation_data = response.json()
        print(f"✅ Explain concept endpoint: {len(explanation_data['explanation'])} characters")
        
        # Test knowledge query endpoint
        response = client.post("/api/v1/ethical-ai/query-knowledge", json={
            "query": "human rights",
            "max_results": 3
        })
        if response.status_code != 200:
            print(f"❌ Query knowledge endpoint failed: {response.status_code}")
            return False
        
        knowledge_data = response.json()
        print(f"✅ Query knowledge endpoint: {knowledge_data['count']} results")
        
        # Test content safety endpoint
        response = client.post("/api/v1/ethical-ai/check-content-safety", json={
            "content": "This is safe educational content",
            "strict": True
        })
        if response.status_code != 200:
            print(f"❌ Content safety endpoint failed: {response.status_code}")
            return False
        
        safety_data = response.json()
        print(f"✅ Content safety endpoint: {safety_data['safety_level']}")
        
        # Test bias detection endpoint
        response = client.post("/api/v1/ethical-ai/detect-bias", json={
            "text": "This text should be checked for bias",
            "sensitivity": "HIGH"
        })
        if response.status_code != 200:
            print(f"❌ Bias detection endpoint failed: {response.status_code}")
            return False
        
        bias_data = response.json()
        print(f"✅ Bias detection endpoint: {bias_data['bias_detected']}")
        
        # Test proof verification endpoint
        response = client.post("/api/v1/ethical-ai/verify-proof", json={
            "submission_id": "test_003",
            "user_address": "0x789...ghi",
            "verification_type": "proof_of_activity",
            "title": "Community Education",
            "description": "Organized a community workshop on human rights awareness",
            "metadata": {},
            "context": {}
        })
        if response.status_code != 200:
            print(f"❌ Verify proof endpoint failed: {response.status_code}")
            return False
        
        verification_data = response.json()
        print(f"✅ Verify proof endpoint: {verification_data['verdict']}, Score: {verification_data['score']}")
        
        return True
        
    except Exception as e:
        print(f"❌ FastAPI router test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


async def test_nvidia_nim_support():
    """Test NVIDIA NIM support in Ethical LangChain Service."""
    print("\n🟢 Testing NVIDIA NIM Support...")
    
    try:
        from api.services.ethical_langchain_service import EthicalLangChainService
        
        # Create service with NVIDIA provider
        service = EthicalLangChainService(
            provider="nvidia",
            nvidia_nim_key=None,  # No key for testing
            use_vector_store=False  # Skip vector store for faster testing
        )
        
        print("✅ NVIDIA NIM provider supported")
        
        # Test health check
        health = await service.health_check()
        assert health["provider"] == "nvidia", "Provider should be nvidia"
        print(f"✅ NVIDIA provider: {health['provider']}")
        
        # Test fallback assessment (since we don't have a real NVIDIA key)
        from api.services.ethical_langchain_service import ProofSubmission, VerificationType
        submission = ProofSubmission(
            submission_id="nvidia_test_001",
            user_address="0xnvidia...test",
            verification_type=VerificationType.POAT,
            title="NVIDIA AI Testing",
            description="Testing NVIDIA NIM integration for ethical AI",
            metadata={},
            context={}
        )
        
        assessment = await service.verify_proof(submission)
        print(f"✅ NVIDIA fallback assessment: {assessment.verdict.value}, Score: {assessment.score}")
        
        # Clean up
        await service.close()
        
        return True
        
    except Exception as e:
        print(f"❌ NVIDIA NIM support test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


async def main():
    """Run all tests."""
    print("🧪 Running Ethical AI Integration Tests")
    print("=" * 50)
    
    # Run synchronous tests first
    kb_test = test_knowledge_base()
    
    # Run async tests
    ethical_service_test = await test_ethical_langchain_service()
    ai_service_test = await test_ai_service_integration()
    fastapi_test = await test_fastapi_router()
    nvidia_test = await test_nvidia_nim_support()
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 TEST SUMMARY")
    print("=" * 50)
    
    tests = [
        ("Knowledge Base", kb_test),
        ("Ethical LangChain Service", ethical_service_test),
        ("AI Service Integration", ai_service_test),
        ("FastAPI Router", fastapi_test),
        ("NVIDIA NIM Support", nvidia_test)
    ]
    
    passed = sum(1 for _, result in tests if result)
    total = len(tests)
    
    for test_name, result in tests:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
    
    print(f"\n🎯 Overall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Ethical AI integration is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Please check the error messages above.")
        return 1


if __name__ == "__main__":
    # Set environment variables for testing
    os.environ["AI_ENABLED"] = "true"
    os.environ["AI_PROVIDER"] = "huggingface"
    os.environ["NVIDIA_NIM_API_KEY"] = "test_key"  # Dummy key for testing
    
    exit_code = asyncio.run(main())
    sys.exit(exit_code)