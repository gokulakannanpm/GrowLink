from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database import get_supabase
from models.schemas import SkillResponse
from routes.student_resolver import resolve_student_uuid

router = APIRouter(prefix="/students", tags=["Skills"])

@router.get("/{student_id}/skills", response_model=List[SkillResponse])
def get_student_skills(student_id: str, db: Client = Depends(get_supabase)):
    """Fetch generic skill development progress for a student."""
    target_uuid = resolve_student_uuid(student_id, db)
    res = db.table("skills").select("*").eq("student_id", target_uuid).execute()
    return res.data or []

