from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database import get_supabase
from models.schemas import WeeklyReviewResponse
from routes.student_resolver import resolve_student_uuid

router = APIRouter(prefix="/students", tags=["Weekly Reviews"])

@router.get("/{student_id}/weekly-review", response_model=Optional[WeeklyReviewResponse])
def get_student_weekly_review(student_id: str, db: Client = Depends(get_supabase)):
    """Fetch latest weekly review summary for a student."""
    target_uuid = resolve_student_uuid(student_id, db)
    res = db.table("weekly_reviews").select("*").eq("student_id", target_uuid).order("created_at", desc=True).limit(1).execute()
    
    if not res.data:
        return None
    return res.data[0]


