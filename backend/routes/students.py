from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database import get_supabase
from models.schemas import StudentResponse

router = APIRouter(prefix="/students", tags=["Students"])

@router.get("", response_model=List[StudentResponse])
def get_students(db: Client = Depends(get_supabase)):
    """Fetch all assigned students."""
    res = db.table("students").select("*").execute()
    if res.data is None:
        return []
    return res.data

@router.get("/{student_id}", response_model=StudentResponse)
def get_student_by_id(student_id: str, db: Client = Depends(get_supabase)):
    """Fetch single student profile by UUID or student_id."""
    res = db.table("students").select("*").or_(f"id.eq.{student_id},student_id.eq.{student_id}").execute()
    if not res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Student with ID '{student_id}' not found.")
    return res.data[0]
