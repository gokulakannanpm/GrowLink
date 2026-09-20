from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database import get_supabase
from models.schemas import MeetingResponse, MeetingCreate, MeetingUpdate
from routes.student_resolver import resolve_student_uuid

router = APIRouter(tags=["Meetings"])

@router.get("/students/{student_id}/meetings", response_model=List[MeetingResponse])
def get_student_meetings(student_id: str, db: Client = Depends(get_supabase)):
    """Fetch scheduled and logged mentoring sessions for a student."""
    target_uuid = resolve_student_uuid(student_id, db)
    res = db.table("meetings").select("*").eq("student_id", target_uuid).order("scheduled_date", desc=True).execute()
    return res.data or []

@router.post("/students/{student_id}/meetings", response_model=MeetingResponse, status_code=status.HTTP_201_CREATED)
def create_student_meeting(student_id: str, meeting_data: MeetingCreate, db: Client = Depends(get_supabase)):
    """Schedule a new mentoring session or log an external phone call/interaction."""
    target_uuid = resolve_student_uuid(student_id, db)
    mentor_id = meeting_data.mentor_id or "a1111111-1111-1111-1111-111111111111"


    payload = {
        "student_id": target_uuid,
        "mentor_id": mentor_id,
        "meeting_type": meeting_data.meeting_type,
        "mode": meeting_data.mode,
        "scheduled_date": meeting_data.scheduled_date,
        "scheduled_time": meeting_data.scheduled_time or "02:00 PM",
        "status": meeting_data.status or "Scheduled",
        "agenda": meeting_data.agenda,
        "discussion_summary": meeting_data.discussion_summary,
        "outcome": meeting_data.outcome,
        "action_items": meeting_data.action_items,
        "follow_up_date": meeting_data.follow_up_date
    }

    res = db.table("meetings").insert(payload).execute()
    if not res.data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to create meeting record.")
    return res.data[0]

@router.patch("/meetings/{meeting_id}", response_model=MeetingResponse)
def update_meeting(meeting_id: str, update_data: MeetingUpdate, db: Client = Depends(get_supabase)):
    """Update meeting status, discussion summary, outcome, action items, or follow-up date."""
    payload = {k: v for k, v in update_data.model_dump().items() if v is not None}
    if not payload:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields provided to update.")

    res = db.table("meetings").update(payload).eq("id", meeting_id).execute()
    if not res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Meeting with ID '{meeting_id}' not found.")
    return res.data[0]

@router.delete("/meetings/{meeting_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_meeting(meeting_id: str, db: Client = Depends(get_supabase)):
    """Delete a meeting record."""
    res = db.table("meetings").delete().eq("id", meeting_id).execute()
    if not res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Meeting with ID '{meeting_id}' not found.")
    return None
