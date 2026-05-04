import os
from google import genai
from core.config import settings

client = genai.Client(api_key=settings.GOOGLE_API_KEY)

print("--- TESTING GEMINI 2.0 FLASH LITE ---")
try:
    response = client.models.generate_content(
        model='models/gemini-2.0-flash-lite',
        contents="Hello, briefly introduce yourself as Chloris and say you are ready to help."
    )
    print(f"SUCCESS: {response.text}")
except Exception as e:
    print(f"FAILED: {e}")
