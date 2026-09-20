from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database import get_supabase
from models.schemas import MentorActionResponse, MentorActionCreate, MentorActionUpdate

router = APIRouter(tags=["Mentor Actions"])

@router.get("/students/{student_id}/actions", response_model=List[MentorActionResponse])
def get_student_actions(student_id: str, db: Client = Depends(get_supabase)):
    """Fetch mentor follow-up actions for a student."""
    student_res = db.table("students").select("id").or_(f"id.eq.{student_id},student_id.eq.{student_id}").execute()
    if not student_res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Student '{student_id}' not found.")
    
    target_uuid = student_res.data[0]["id"]
    res = db.table("mentor_actions").select("*").eq("student_id", target_uuid).order("created_at", desc=True).execute()
    return res.data or []

@router.post("/students/{student_id}/actions", response_model=MentorActionResponse, status_code=status.HTTP_201_CREATED)
def create_student_action(student_id: str, action_data: MentorActionCreate, db: Client = Depends(get_supabase)):
    """Create a new mentor follow-up action item for a student."""
    student_res = db.table("students").select("id").or_(f"id.eq.{student_id},student_id.eq.{student_id}").execute()
    if not student_res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Student '{student_id}' not found.")
    
    target_uuid = student_res.data[0]["id"]
    mentor_id = action_data.mentor_id or "a1111111-1111-1111-1111-111111111111"

    payload = {
        "student_id": target_uuid,
        "mentor_id": mentor_id,
        "area": action_data.area,
        "title": action_data.title,
        "description": action_data.description,
        "status": action_data.status or "Pending",
        "due_date": action_data.due_date
    }

    res = db.table("mentor_actions").insert(payload).execute()
    if not res.data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to create mentor action.")
    return res.data[0]

@router.patch("/actions/{action_id}", response_model=MentorActionResponse)
def update_action(action_id: str, update_data: MentorActionUpdate, db: Client = Depends(get_supabase)):
    """Update status, area, title or due date of a mentor action."""
    payload = {k: v for k, v in update_data.model_dump().items() if v is not None}
    if not payload:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields provided to update.")

    res = db.table("mentor_actions").update(payload).eq("id", action_id).execute()
    if not res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Action with ID '{action_id}' not found.")
    return res.data[0]
