from uuid import UUID
from fastapi import HTTPException, status
from supabase import Client


def resolve_student_uuid(student_identifier, db=None) -> str:
    """
    Resolve frontend slug, student_id, or UUID into the database UUID.
    Returns the database UUID as a string.
    Raises HTTP 404 if the student does not exist.
    Supports both (student_identifier, db) and (db, student_identifier) call signatures.
    """
    if isinstance(student_identifier, Client):
        db, student_identifier = student_identifier, db
    elif db is None:
        raise ValueError("Database client 'db' must be provided.")

    student_id_str = str(student_identifier).strip()

    # 1. Try database UUID only when the value is a valid UUID
    try:
        UUID(student_id_str)
        res = (
            db.table("students")
            .select("id")
            .eq("id", student_id_str)
            .execute()
        )
        if res.data:
            return res.data[0]["id"]
    except ValueError:
        pass

    # 2. Try official student_id such as IT2024-042
    res = (
        db.table("students")
        .select("id")
        .eq("student_id", student_id_str)
        .execute()
    )
    if res.data:
        return res.data[0]["id"]

    # 3. Try frontend slug such as rahul-kumar -> Rahul Kumar
    name = student_id_str.replace("-", " ").strip()
    res = (
        db.table("students")
        .select("id")
        .ilike("name", name)
        .execute()
    )
    if res.data:
        return res.data[0]["id"]

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Student '{student_id_str}' not found"
    )


resolve_student_id = resolve_student_uuid