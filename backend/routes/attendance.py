from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database import get_supabase
from models.schemas import AttendanceResponse
from routes.student_resolver import resolve_student_uuid

router = APIRouter(prefix="/students", tags=["Attendance"])

@router.get("/{student_id}/attendance", response_model=List[AttendanceResponse])
def get_student_attendance(student_id: str, db: Client = Depends(get_supabase)):
    """Fetch subject-wise attendance for a student."""
    target_uuid = resolve_student_uuid(student_id, db)
    res = db.table("attendance").select("*").eq("student_id", target_uuid).execute()
    return res.data or []

