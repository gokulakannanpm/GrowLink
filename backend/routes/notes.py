from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database import get_supabase
from models.schemas import MentorNoteResponse, MentorNoteCreate, MentorNoteUpdate

router = APIRouter(tags=["Mentor Notes"])

@router.get("/students/{student_id}/notes", response_model=List[MentorNoteResponse])
def get_student_notes(student_id: str, db: Client = Depends(get_supabase)):
    """Fetch mentor notes for a student."""
    student_res = db.table("students").select("id").or_(f"id.eq.{student_id},student_id.eq.{student_id}").execute()
    if not student_res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Student '{student_id}' not found.")
    
    target_uuid = student_res.data[0]["id"]
    res = db.table("mentor_notes").select("*").eq("student_id", target_uuid).order("created_at", desc=True).execute()
    return res.data or []

@router.post("/students/{student_id}/notes", response_model=MentorNoteResponse, status_code=status.HTTP_201_CREATED)
def create_student_note(student_id: str, note_data: MentorNoteCreate, db: Client = Depends(get_supabase)):
    """Create a new mentor note for a student."""
    student_res = db.table("students").select("id").or_(f"id.eq.{student_id},student_id.eq.{student_id}").execute()
    if not student_res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Student '{student_id}' not found.")
    
    target_uuid = student_res.data[0]["id"]
    
    # Default mentor ID if not provided
    mentor_id = note_data.mentor_id or "a1111111-1111-1111-1111-111111111111"
    
    payload = {
        "student_id": target_uuid,
        "mentor_id": mentor_id,
        "note": note_data.note,
        "tag": note_data.tag or "Academic Guidance"
    }

    res = db.table("mentor_notes").insert(payload).execute()
    if not res.data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to create note.")
    return res.data[0]

@router.patch("/notes/{note_id}", response_model=MentorNoteResponse)
def update_note(note_id: str, update_data: MentorNoteUpdate, db: Client = Depends(get_supabase)):
    """Update an existing mentor note."""
    payload = {k: v for k, v in update_data.model_dump().items() if v is not None}
    if not payload:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields provided to update.")

    res = db.table("mentor_notes").update(payload).eq("id", note_id).execute()
    if not res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with ID '{note_id}' not found.")
    return res.data[0]
