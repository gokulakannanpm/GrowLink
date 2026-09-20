from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database import get_supabase
from models.schemas import AcademicResponse

router = APIRouter(prefix="/students", tags=["Academics"])

@router.get("/{student_id}/academics", response_model=List[AcademicResponse])
def get_student_academics(student_id: str, db: Client = Depends(get_supabase)):
    """Fetch CAT scores and average per subject for a student."""
    # First verify student exists or get DB student UUID
    student_res = db.table("students").select("id").or_(f"id.eq.{student_id},student_id.eq.{student_id}").execute()
    if not student_res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Student '{student_id}' not found.")
    
    target_uuid = student_res.data[0]["id"]
    res = db.table("academics").select("*").eq("student_id", target_uuid).execute()
    return res.data or []
