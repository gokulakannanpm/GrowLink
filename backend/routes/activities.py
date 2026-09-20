from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database import get_supabase
from models.schemas import ActivityResponse

router = APIRouter(prefix="/students", tags=["Activities"])

@router.get("/{student_id}/activities", response_model=List[ActivityResponse])
def get_student_activities(student_id: str, db: Client = Depends(get_supabase)):
    """Fetch extracurricular activities for a student."""
    student_res = db.table("students").select("id").or_(f"id.eq.{student_id},student_id.eq.{student_id}").execute()
    if not student_res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Student '{student_id}' not found.")
    
    target_uuid = student_res.data[0]["id"]
    res = db.table("activities").select("*").eq("student_id", target_uuid).execute()
    return res.data or []
