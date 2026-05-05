import os
import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Any, Dict
try:
    from .rag_query import answer_question, answer_question_debug
except ImportError:
    from rag_query import answer_question, answer_question_debug

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("ragfolio")
def get_resume_content():
    try:
        with open("resume.md", "r") as f:
            return f.read()
    except FileNotFoundError:
        return "Resume file not found."
app = FastAPI(
    title="Ragfolio RAG API",
    description="An orchestration layer for querying resume data using RAG.",
    version="1.0.0",
)

# CORS Configuration for development flexibility
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    """
    Middleware to log request start and end with latency.
    """
    logger.debug(f"Request start: {request.method} {request.url}")
    response = await call_next(request)
    logger.debug(f"Request end: {request.method} {request.url} - Status: {response.status_code}")
    return response

class AskRequest(BaseModel):
    """
    Schema for the RAG query request.
    """
    question: str


class AskResponse(BaseModel):
    """
    Schema for the RAG query response.
    """
    answer: str


class PortfolioResponse(BaseModel):
    about: str
    skills: list[str]
    experience: list[dict[str, Any]]
    projects: list[dict[str, Any]]

@app.get("/api/health")
async def health():
    """
    Simple health check endpoint.
    """
    return {"status": "ok"}


@app.post("/api/ask", response_model=AskResponse)
async def ask(request: AskRequest):
    """
    Primary RAG endpoint that takes a user question, retrieves context,
    and returns an AI-generated answer.
    """
    # Validate that the question is not empty or whitespace-only
    if not request.question or not request.question.strip():
        logger.debug("Validation failed: Question is empty or whitespace only.")
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty or whitespace only.",
        )

    try:
        # Log the incoming question
        logger.debug(f"Incoming question: {request.question}")

        # Integrate with the RAG query engine using debug path
        answer, debug_info = answer_question_debug(request.question)

        # Log observability data
        logger.debug("--- RAG OBSERVABILITY ---")
        logger.debug(f"Question: {request.question}")
        logger.debug("Retrieved Items:")
        for item in debug_info.get("retrieval", {}).get("retrieved", []):
            logger.debug(f"  - Source/ID: {item.get('id') or item.get('metadata', {}).get('source', 'unknown')}")
            logger.debug(f"    Distance: {item.get('distance', 'N/A')}")
            logger.debug(f"    Preview: {item.get('snippet', '')}")
            
        gemini_info = debug_info.get("gemini", {})
        logger.debug(f"Exact Gemini Input Prompt:\n{gemini_info.get('gemini_prompt', '')}")
        logger.debug(f"Gemini Output:\n{gemini_info.get('gemini_output', '')}")
        logger.debug("--- END OBSERVABILITY ---")

        return AskResponse(answer=answer)
    except Exception as e:
        # Log the exception with stack trace
        logger.exception("An error occurred during RAG processing.")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred during RAG processing: {str(e)}",
        )


@app.get("/api/portfolio", response_model=PortfolioResponse)
async def get_portfolio():
    # 1. Call the function first to get the text
    resume_text = get_resume_content() 
    
    # 2. Return the data properly formatted
    return PortfolioResponse(
        about=resume_text,
        skills=["Python", "JavaScript", "React", "FastAPI"],
        experience=[],
        projects=[
            {"title": "DischargeIQ", "description": "AI-powered hospital workflow system."},
            {"title": "VerseOnGo", "description": "Customizable poetry cards."}
        ]
    )

# Serve Frontend Static Files (only in production)
FRONTEND_DIST_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(FRONTEND_DIST_DIR):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST_DIR, "assets")), name="static")

    @app.get("/{full_path:path}")
    async def serve_react_app(request: Request, full_path: str):
        # Allow /api to pass through
        if full_path.startswith("api"):
            raise HTTPException(status_code=404)
        
        # Look for the file in the frontend/dist folder
        file_path = os.path.join(FRONTEND_DIST_DIR, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
            
        # Default to React's index.html
        return FileResponse(os.path.join(FRONTEND_DIST_DIR, "index.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

