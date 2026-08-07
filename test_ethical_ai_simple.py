#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Simple test script for Ethical AI integration.
"""

import asyncio
import sys
import os

# Add the backend path to sys.path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend', 'drp-website-api'))

def test_knowledge_base():
    """Test the human rights knowledge base."""
    print("[TEST] Testing Knowledge Base...")
    
    try:
        from api.knowledge.human_rights_knowledge import HumanRightsKnowledgeBase, KnowledgeDocument
        
        # Create knowledge base
        kb = HumanRightsKnowledgeBase(load_from_file=False)
        
        # Test basic properties
        assert len(kb.documents) > 0, "Knowledge base should have documents"
        assert len(kb.categories) > 0, "Knowledge base should have categories"
        assert len(kb.tags_index) > 0, "Knowledge base should have tags index"
        
        print(f"[OK] Knowledge Base: {len(kb.documents)} documents loaded")
        print(f"   Categories: {list(kb.categories.keys())[:3]}...")
        print(f"   Tags: {len(kb.tags_index)} unique tags")
        
        return True
        
    except Exception as e:
        print(f"[FAIL] Knowledge Base test failed: {e}")
        return False


async def test_ethical_langchain_service():
    """Test the Ethical LangChain Service."""
    print("\n[TEST] Testing Ethical LangChain Service...")
    
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
        
        print("[OK] Ethical LangChain Service initialized")
        
        # Test health check
        health = await service.health_check()
        assert health["status"] == "healthy", "Service should be healthy"
        print(f"[OK] Health check: {health['status']}")
        print(f"   Provider: {health['provider']}")
        
        # Test filters
        hr_filter = service.human_rights_filter
        bias_detector = service.bias_detector
        privacy_guard = service.privacy_guard
        
        # Test human rights filter
        safe_content = "I contributed to a human rights education project"
        unsafe_content = "This promotes hate and violence"
        
        safe_result = hr_filter.check_content(safe_content)
        unsafe_result = hr_filter.check_content(unsafe_content)
        
        print(f"[OK] Human Rights Filter: Safe -> {safe_result[0].value}, Unsafe -> {unsafe_result[0].value}")
        
        # Test bias detector
        biased_text = "This opportunity is only for young male developers"
        bias_result = bias_detector.detect_bias(biased_text)
        print(f"[OK] Bias Detector: {bias_result['bias_detected']} biases detected")
        
        # Test privacy guard
        private_text = "My email is user@example.com and my SSN is 123-45-6789"
        privacy_result = privacy_guard.check_privacy(private_text, "0x123...abc")
        print(f"[OK] Privacy Guard: Violations -> {privacy_result['violations']}")
        
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
        print(f"[OK] Proof Verification: {assessment.verdict.value}, Score: {assessment.score}")
        
        # Test concept explanation
        explanation = await service.explain_concept("what is drp", "beginner")
        print(f"[OK] Concept Explanation: {len(explanation)} characters")
        
        # Clean up
        await service.close()
        
        return True
        
    except Exception as e:
        print(f"[FAIL] Ethical LangChain Service test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


async def test_ai_service_integration():
    """Test AIService integration with Ethical LangChain Service."""
    print("\n[TEST] Testing AIService Integration...")
    
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
        print("[OK] AIService with Ethical AI integration initialized")
        
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
        print(f"[OK] Activity Assessment: {assessment['verdict']}, Score: {assessment['score']}")
        
        # Test explain_concept method
        explanation = await ai_service.explain_concept("proof of activity", "beginner")
        print(f"[OK] Explanation: {len(explanation)} characters")
        
        # Clean up
        await ai_service.close()
        
        return True
        
    except Exception as e:
        print(f"[FAIL] AIService integration test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


async def test_fastapi_router():
    """Test the FastAPI router for ethical AI endpoints."""
    print("\n[TEST] Testing FastAPI Router...")
    
    try:
        import os
        import sys
        
        # Change to the backend directory and set up paths
        backend_path = os.path.join(os.path.dirname(__file__), 'backend', 'drp-website-api')
        original_cwd = os.getcwd()
        os.chdir(backend_path)
        sys.path.insert(0, backend_path)
        
        # Set environment variables
        os.environ['AI_ENABLED'] = 'true'
        os.environ['AI_PROVIDER'] = 'huggingface'
        
        from fastapi.testclient import TestClient
        
        # Import app directly from backend directory
        import main
        app = main.app
        
        # Create test client
        client = TestClient(app)
        
        # Restore original directory
        os.chdir(original_cwd)
        
        # Test health endpoint
        response = client.get("/api/v1/ethical-ai/health")
        if response.status_code != 200:
            print(f"[FAIL] Health endpoint failed: {response.status_code} - {response.text}")
            return False
        
        health_data = response.json()
        print(f"[OK] Health endpoint: {health_data['status']}")
        print(f"   Provider: {health_data['provider']}")
        
        # Test concept explanation endpoint
        response = client.get("/api/v1/ethical-ai/explain-concept?concept=proof+of+activity&user_level=beginner")
        if response.status_code != 200:
            print(f"[FAIL] Explain concept endpoint failed: {response.status_code}")
            return False
        
        explanation_data = response.json()
        print(f"[OK] Explain concept endpoint: {len(explanation_data['explanation'])} characters")
        
        # Test knowledge query endpoint
        response = client.post("/api/v1/ethical-ai/query-knowledge", json={
            "query": "human rights",
            "max_results": 3
        })
        if response.status_code != 200:
            print(f"[FAIL] Query knowledge endpoint failed: {response.status_code}")
            return False
        
        knowledge_data = response.json()
        print(f"[OK] Query knowledge endpoint: {knowledge_data['count']} results")
        
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
            print(f"[FAIL] Verify proof endpoint failed: {response.status_code}")
            return False
        
        verification_data = response.json()
        print(f"[OK] Verify proof endpoint: {verification_data['verdict']}, Score: {verification_data['score']}")
        
        return True
        
    except Exception as e:
        print(f"[FAIL] FastAPI router test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


async def main():
    """Run all tests."""
    print("[TEST] Running Ethical AI Integration Tests")
    print("=" * 50)
    
    # Set environment variables for testing
    os.environ["AI_ENABLED"] = "true"
    os.environ["AI_PROVIDER"] = "huggingface"
    os.environ["NVIDIA_NIM_API_KEY"] = ""
    
    # Run synchronous tests first
    kb_test = test_knowledge_base()
    
    # Run async tests
    ethical_service_test = await test_ethical_langchain_service()
    ai_service_test = await test_ai_service_integration()
    fastapi_test = await test_fastapi_router()
    
    # Summary
    print("\n" + "=" * 50)
    print("[SUMMARY] TEST SUMMARY")
    print("=" * 50)
    
    tests = [
        ("Knowledge Base", kb_test),
        ("Ethical LangChain Service", ethical_service_test),
        ("AI Service Integration", ai_service_test),
        ("FastAPI Router", fastapi_test)
    ]
    
    passed = sum(1 for _, result in tests if result)
    total = len(tests)
    
    for test_name, result in tests:
        status = "[OK] PASS" if result else "[FAIL] FAIL"
        print(f"{status} {test_name}")
    
    print(f"\n[TOTAL] {passed}/{total} tests passed")
    
    if passed == total:
        print("[SUCCESS] All tests passed! Ethical AI integration is working correctly.")
        return 0
    else:
        print("[WARNING] Some tests failed. Please check the error messages above.")
        return 1


if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)