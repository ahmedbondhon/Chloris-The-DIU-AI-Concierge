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
        return 0, {"error": f"Cannot connect to server: {e.reason}"}

print("Testing server connection...")
status, res = post(f"{BASE}/chat/query", {"message": "hello"})
print(f"Status: {status}")
print(f"Response: {json.dumps(res, indent=2)}")