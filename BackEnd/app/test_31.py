import os
from google import genai
from core.config import settings

client = genai.Client(api_key=settings.GOOGLE_API_KEY)

print("--- TESTING GEMINI 3.1 FLASH ---")
try:
    response = client.models.generate_content(
        model='models/gemini-3.1-flash-live-preview',
        contents="Hello, say 'API is working' if you can read this."
    )
    print(f"RESPONSE: {response.text}")
except Exception as e:
    print(f"FAILED: {e}")
