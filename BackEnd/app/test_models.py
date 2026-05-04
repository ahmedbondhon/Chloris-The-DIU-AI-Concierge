import os
from google import genai
from core.config import settings

client = genai.Client(api_key=settings.GOOGLE_API_KEY)

# Trying common model IDs WITH the models/ prefix
models_to_test = [
    "models/gemini-1.5-flash",
    "models/gemini-1.5-pro",
    "models/gemini-2.0-flash",
]

print("--- TESTING MODEL AVAILABILITY (WITH PREFIX) ---")
for model_id in models_to_test:
    try:
        response = client.models.generate_content(
            model=model_id,
            contents="Hello"
        )
        print(f"SUCCESS: {model_id}")
    except Exception as e:
        # Check if it's a quota issue or a 404
        err_msg = str(e)
        if "429" in err_msg or "RESOURCE_EXHAUSTED" in err_msg:
             print(f"AVAILABLE (BUT EXHAUSTED): {model_id}")
        else:
             print(f"FAILED: {model_id} | Error: {err_msg[:50]}")
