import urllib.request
import urllib.error
import json

BASE = "http://localhost:8000/api/v1"

def post(url, data):
    body = json.dumps(data).encode()
    req  = urllib.request.Request(
        url, data=body,
        headers={"Content-Type": "application/json"}
    )
    try:
        res = urllib.request.urlopen(req)
        return res.status, json.loads(res.read())
    except urllib.error.HTTPError as e:
        raw = e.read()
        try:    return e.code, json.loads(raw)
        except: return e.code, {"raw": raw.decode()}
    except urllib.error.URLError as e:
        return 0, {"error": f"Server not running: {e.reason}"}

questions = [
    "What is the minimum GPA required for BBA admission?"   # should say not found in handbook
]

print("Testing Chloris API...\n")
for q in questions:
    print(f"Q: {q}")
    status, res = post(f"{BASE}/chat/query", {"message": q})
    if status == 200:
        print(f"A: {res.get('response', '')[:250]}")
        print(f"Sources: {res.get('sources', [])}")
    else:
        print(f"ERROR {status}: {res}")
    print("-" * 55)