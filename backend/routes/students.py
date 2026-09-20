from typing import List
from uuid import UUID
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
    """Fetch single student by UUID, student_id, or frontend slug."""

    # Try database UUID only when the value is actually a UUID.
    try:
        UUID(student_id)

        res = (
            db.table("students")
            .select("*")
            .eq("id", student_id)
            .execute()
        )

        if res.data:
            return res.data[0]

    except ValueError:
        pass

    # Try college/student ID, e.g. IT2024-042
    res = (
        db.table("students")
        .select("*")
        .eq("student_id", student_id)
        .execute()
    )

    if res.data:
        return res.data[0]

    # Try frontend slug, e.g. rahul-kumar -> Rahul Kumar
    name_from_slug = student_id.replace("-", " ").strip()

    res = (
        db.table("students")
        .select("*")
        .ilike("name", name_from_slug)
        .execute()
    )

    if res.data:
        return res.data[0]

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Student with ID '{student_id}' not found."
    )
