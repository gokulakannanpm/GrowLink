from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database import get_supabase
from models.schemas import ActivityResponse
from routes.student_resolver import resolve_student_uuid

router = APIRouter(prefix="/students", tags=["Activities"])

@router.get("/{student_id}/activities", response_model=List[ActivityResponse])
def get_student_activities(student_id: str, db: Client = Depends(get_supabase)):
    """Fetch extracurricular activities for a student."""
    target_uuid = resolve_student_uuid(student_id, db)
    res = db.table("activities").select("*").eq("student_id", target_uuid).execute()
    return res.data or []

