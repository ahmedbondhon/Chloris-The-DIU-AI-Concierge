import asyncio
import os
from google import genai
from core.config import settings

async def main():
    client = genai.Client(api_key=settings.GOOGLE_API_KEY)
    print("Listing all models to models.txt...")
    try:
        models = client.models.list()
        with open("models.txt", "w") as f:
            for m in models:
                f.write(f"{m.name}\n")
        print("Done!")
    except Exception as e:
        print(f"Failed: {e}")

if __name__ == "__main__":
    asyncio.run(main())
