import sys, os

# This makes sure Python can find your app folder
sys.path.insert(0, 'app')
os.chdir('app')

from ai.rag_engine import ask_chloris_rag

questions = [
    "What is the re-admission fee at DIU?",
    "What is the minimum GPA required for CSE admission?",
    "What happens if I withdraw after 2 weeks?",
    "When does the Spring 2026 semester begin?",
    "What documents do I need to apply?"
]

print("🧠 Waking up Chloris RAG Engine...\n")

for q in questions:
    print(f"Q: {q}")
    result = ask_chloris_rag(q)
    print(f"A: {result['answer'][:300]}")
    print(f"Sources: {result['sources']}")
    print(f"Chunks found: {result['chunks_found']}")
    print("-" * 50)