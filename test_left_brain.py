import urllib.request
import urllib.error
import json

BASE = "http://localhost:8000/api/v1"

def post(url, data, token=None):
    body    = json.dumps(data).encode()
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, data=body, headers=headers)
    try:
        res = urllib.request.urlopen(req)
        return res.status, json.loads(res.read())
    except urllib.error.HTTPError as e:
        raw = e.read()
        try:    return e.code, json.loads(raw)
        except: return e.code, {"raw": raw.decode()}
    except urllib.error.URLError as e:
        return 0, {"error": f"Server not running: {e.reason}"}

# ── Step 1: Login ─────────────────────────────────────────────────────────────
print("Logging in as Ahmed Hassan...")
status, res = post(f"{BASE}/auth/login", {
    "email":    "ahmed@diu.edu.bd",
    "password": "demo1234"
})
if status != 200:
    print(f"Login failed ({status}): {res}")
    print("Check your auth route — does it accept email+password?")
    exit()

token = res.get("access_token")
print(f"  Logged in! Role: {res.get('role', 'N/A')}\n")

# ── Step 2: Left Brain Questions ──────────────────────────────────────────────
questions = [
    ("What is my CGPA?",                         "DATA — should return 3.72"),
    ("Show me my class schedule",                "DATA — should return weekly timetable"),
    ("What courses am I taking this semester?",  "DATA — should list 6 courses"),
    ("What is my attendance in CSE301?",         "DATA — should return 85%"),
    ("Have I paid my fees?",                     "DATA — should show pending balance"),
    ("What is the re-admission fee at DIU?",     "POLICY — should use RAG/handbook"),
]

for question, expected in questions:
    print(f"Q: {question}")
    print(f"   Expected: {expected}")
    status, res = post(
        f"{BASE}/chat/query",
        {"message": question},
        token=token
    )
    if status == 200:
        answer  = res.get("response", "")
        sources = res.get("sources", [])
        print(f"A: {answer[:300]}")
        print(f"   Sources: {sources}")
    else:
        print(f"   ERROR {status}: {res}")
    print("-" * 60)