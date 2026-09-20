from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database import get_supabase
from models.schemas import AcademicResponse
from routes.student_resolver import resolve_student_uuid

router = APIRouter(prefix="/students", tags=["Academics"])

@router.get("/{student_id}/academics", response_model=List[AcademicResponse])
def get_student_academics(student_id: str, db: Client = Depends(get_supabase)):
    """Fetch CAT scores and average per subject for a student."""
    target_uuid = resolve_student_uuid(student_id, db)
    res = db.table("academics").select("*").eq("student_id", target_uuid).execute()
    return res.data or []

