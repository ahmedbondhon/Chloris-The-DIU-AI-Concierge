import asyncio
import sys

# Ensure terminal can print emojis
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

# Now located inside the /app folder, so ai.rag_engine is directly accessible
async def test():
    try:
        from ai.rag_engine import ask_chloris_rag
        question = "tell me about CIS"
        print(f"QUESTION: {question}")
        print("Thinking...")
        
        result = ask_chloris_rag(question)
        
        print("\n--- AI RESPONSE ---")
        print(result["answer"])
        print("\n--- SOURCES ---")
        print(result["sources"])
        
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    asyncio.run(test())
