import sys, traceback
from ai.rag_engine import ask_chloris_rag

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

print("Testing RAG Engine...")
try:
    res = ask_chloris_rag('What is CIS?')
    print(res)
except Exception as e:
    print("Caught Exception directly:")
    traceback.print_exc()
