from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database import get_supabase
from models.schemas import AssessmentResponse, AssessmentAnalysisResponse
from routes.student_resolver import resolve_student_uuid

router = APIRouter(tags=["Assessments"])

@router.get("/students/{student_id}/assessments", response_model=List[AssessmentResponse])
def get_student_assessments(student_id: str, db: Client = Depends(get_supabase)):
    """Fetch assessment upload records for a student."""
    target_uuid = resolve_student_uuid(student_id, db)
    res = db.table("assessments").select("*").eq("student_id", target_uuid).execute()
    return res.data or []


@router.get("/assessments/{assessment_id}", response_model=AssessmentResponse)
def get_assessment(assessment_id: str, db: Client = Depends(get_supabase)):
    """Fetch single assessment record."""
    res = db.table("assessments").select("*").eq("id", assessment_id).execute()
    if not res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Assessment '{assessment_id}' not found.")
    return res.data[0]

@router.get("/assessments/{assessment_id}/analysis", response_model=List[AssessmentAnalysisResponse])
def get_assessment_analysis(assessment_id: str, db: Client = Depends(get_supabase)):
    """Fetch diagnostic analysis breakdown for an assessment."""
    res = db.table("assessment_analysis").select("*").eq("assessment_id", assessment_id).execute()
    if not res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No analysis found for assessment '{assessment_id}'.")
    return res.data
