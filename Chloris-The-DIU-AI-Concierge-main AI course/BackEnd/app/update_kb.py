import os

# Now located inside the /app folder, so ai.rag_engine is directly accessible
try:
    from ai.rag_engine import build_knowledge_base
    print("--- Starting Knowledge Base Update ---")
    result = build_knowledge_base(force_rebuild=False)
    
    if result["status"] == "success":
        print(f"SUCCESS: {result['message']}")
        print(f"Total chunks now in database: {result['total_in_db']}")
    else:
        print(f"NOTICE: {result['message']}")
        
except ImportError as e:
    print(f"ERROR: Could not import rag_engine. {e}")
except Exception as e:
    print(f"ERROR: {e}")
