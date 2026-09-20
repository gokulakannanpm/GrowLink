import os
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes.students import router as students_router
from routes.academics import router as academics_router
from routes.attendance import router as attendance_router
from routes.activities import router as activities_router
from routes.skills import router as skills_router
from routes.notes import router as notes_router
from routes.actions import router as actions_router
from routes.weekly_reviews import router as weekly_reviews_router
from routes.meetings import router as meetings_router
from routes.assessments import router as assessments_router

# Load environment variables
load_dotenv()

app = FastAPI(
    title="GrowLink API",
    description="Backend API service for GrowLink - Student Development Platform",
    version="1.0.0",
    docs_url="/docs",
    openapi_url="/openapi.json"
)

# CORS origins setup
raw_origins = os.getenv(
    "CORS_ORIGINS", 
    "http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173"
)
origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root API Router
api_router = APIRouter(prefix="/api")

@api_router.get("/health", tags=["Health Check"])
def health_check():
    """Health check endpoint."""
    return {
        "status": "ok",
        "service": "GrowLink API"
    }

# Include all module routers under /api
api_router.include_router(students_router)
api_router.include_router(academics_router)
api_router.include_router(attendance_router)
api_router.include_router(activities_router)
api_router.include_router(skills_router)
api_router.include_router(notes_router)
api_router.include_router(actions_router)
api_router.include_router(weekly_reviews_router)
api_router.include_router(meetings_router)
api_router.include_router(assessments_router)

# Mount API router
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
