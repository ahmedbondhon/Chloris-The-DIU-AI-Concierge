from ai.prompts import NO_CONTEXT_RESPONSE, FALLBACK_RESPONSE


def format_response(raw_result: dict) -> dict:
    """
    Takes the raw dict from intent_router.route_question()
    and formats it cleanly for the React frontend.

    Input:
        {
            "answer":       str,
            "sources":      list[str],
            "intent":       str,
            "chunks_found": int,
        }

    Output (matches your existing ChatResponse schema):
        {
            "response": str,
            "sources":  list[str],
        }
    """
    answer  = raw_result.get("answer", FALLBACK_RESPONSE)
    sources = raw_result.get("sources", [])
    intent  = raw_result.get("intent", "POLICY")

    # Clean up source file names for display
    # e.g. "diu_handbook.pdf" → "DIU Handbook"
    clean_sources = []
    for src in sources:
        name = src.replace(".pdf", "").replace("_", " ").title()
        clean_sources.append(name)

    # Remove duplicates while preserving order
    seen     = set()
    unique   = []
    for src in clean_sources:
        if src not in seen:
            seen.add(src)
            unique.append(src)

    return {
        "response": answer,
        "sources":  unique,
    }