"""
Knowledge module for DRP Ethical AI.

This module provides human rights knowledge base and RAG capabilities
for the Ethical LangChain Service.
"""

from .human_rights_knowledge import HumanRightsKnowledgeBase, KnowledgeDocument

__all__ = [
    "HumanRightsKnowledgeBase",
    "KnowledgeDocument"
]
