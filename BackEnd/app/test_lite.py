import os
from google import genai
from core.config import settings

client = genai.Client(api_key=settings.GOOGLE_API_KEY)

print("--- TESTING GEMINI 2.0 FLASH LITE ---")
try:
    response = client.models.generate_content(
        model='models/gemini-2.0-flash-lite',
        contents="Hello, say 'LITE is working' if you can read this."
    )
    print(f"RESPONSE: {response.text}")
except Exception as e:
    print(f"FAILED: {e}")
