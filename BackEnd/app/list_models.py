import os
from google import genai
from core.config import settings

client = genai.Client(api_key=settings.GOOGLE_API_KEY)

print("--- LISTING AVAILABLE MODELS ---")
try:
    # List models to see exactly what this API key can access
    for model in client.models.list():
        print(f"MODEL: {model.name} | Display: {model.display_name}")
except Exception as e:
    print(f"FAILED TO LIST MODELS: {e}")
