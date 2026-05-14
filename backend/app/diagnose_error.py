import asyncio
import os
from services.llm_service import ask_chloris
from core.config import settings

async def main():
    print(f"Testing Chloris AI with API Key starting with: {settings.GOOGLE_API_KEY[:5]}...")
    
    from google import genai
    client = genai.Client(api_key=settings.GOOGLE_API_KEY)

    # List ALL available models
    print("\nListing ALL available models:")
    try:
        models = client.models.list()
        for m in models:
            print(f" - {m.name}")
    except Exception as e:
        print(f"Failed to list models: {e}")

    try:
        # Simulate a conversation
        history = [
            {"role": "user", "content": "How's it going?"},
            {"role": "assistant", "content": "I'm doing well, thank you! I'm Chloris, your AI concierge."}
        ]
        
        # Test Query
        query = "hey"
        print(f"Sending Query: {query}")
        
        # ask_chloris does NOT take history in its current implementation
        result = await ask_chloris(query)
        print("\n--- AI Result ---")
        print(result)
        
    except Exception as e:
        print("\n[FAILED] CRITICAL ERROR CAUGHT:")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
