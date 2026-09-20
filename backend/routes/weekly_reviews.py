from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database import get_supabase
from models.schemas import WeeklyReviewResponse

router = APIRouter(prefix="/students", tags=["Weekly Reviews"])

@router.get("/{student_id}/weekly-review", response_model=WeeklyReviewResponse)
def get_student_weekly_review(student_id: str, db: Client = Depends(get_supabase)):
    """Fetch latest weekly review summary for a student."""
    student_res = db.table("students").select("id").or_(f"id.eq.{student_id},student_id.eq.{student_id}").execute()
    if not student_res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Student '{student_id}' not found.")
    
    target_uuid = student_res.data[0]["id"]
    res = db.table("weekly_reviews").select("*").eq("student_id", target_uuid).order("created_at", desc=True).limit(1).execute()
    
    if not res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No weekly review found for student '{student_id}'.")
    return res.data[0]
