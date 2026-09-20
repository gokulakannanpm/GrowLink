from typing import Optional, List
from pydantic import BaseModel, ConfigDict, Field

# --- STUDENT SCHEMAS ---
class StudentBase(BaseModel):
    student_id: str
    name: str
    email: str
    department: str
    year: str
    section: str
    cgpa: float = 0.0
    previous_cgpa: float = 0.0
    cgpa_trend: Optional[str] = "0.00"
    status: str = "On Track"
    avatar_url: Optional[str] = None
    phone: Optional[str] = None

class StudentResponse(StudentBase):
    id: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# --- ACADEMICS SCHEMAS ---
class AcademicBase(BaseModel):
    subject: str
    cat1: float = 0.0
    cat2: float = 0.0

class AcademicResponse(AcademicBase):
    id: str
    student_id: str
    average: float = 0.0
    created_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# --- ATTENDANCE SCHEMAS ---
class AttendanceBase(BaseModel):
    subject: str
    attended_classes: int = 0
    total_classes: int = 0
    attendance_percentage: float = 0.0
    target_percentage: float = 75.0

class AttendanceResponse(AttendanceBase):
    id: str
    student_id: str
    created_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# --- ACTIVITIES SCHEMAS ---
class ActivityBase(BaseModel):
    activity_type: str
    title: str
    role_or_organizer: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    status: Optional[str] = "Completed"
    evidence_url: Optional[str] = None

class ActivityResponse(ActivityBase):
    id: str
    student_id: str
    created_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# --- SKILLS SCHEMAS ---
class SkillBase(BaseModel):
    skill_name: str
    platform: str
    progress: str
    previous_progress: Optional[str] = None
    evidence: Optional[str] = None

class SkillResponse(SkillBase):
    id: str
    student_id: str
    updated_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# --- MENTOR NOTES SCHEMAS ---
class MentorNoteCreate(BaseModel):
    note: str
    tag: Optional[str] = "Academic Guidance"
    mentor_id: Optional[str] = None

class MentorNoteUpdate(BaseModel):
    note: Optional[str] = None
    tag: Optional[str] = None

class MentorNoteResponse(MentorNoteCreate):
    id: str
    student_id: str
    created_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# --- MENTOR ACTIONS SCHEMAS ---
class MentorActionCreate(BaseModel):
    area: str
    title: str
    description: Optional[str] = None
    status: str = "Pending"
    due_date: Optional[str] = None
    mentor_id: Optional[str] = None

class MentorActionUpdate(BaseModel):
    area: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[str] = None

class MentorActionResponse(MentorActionCreate):
    id: str
    student_id: str
    created_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# --- ASSESSMENTS & ANALYSIS SCHEMAS ---
class AssessmentResponse(BaseModel):
    id: str
    student_id: str
    subject: str
    assessment_type: str
    assessment_name: str
    date: Optional[str] = None
    file_url: Optional[str] = None
    created_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class AssessmentAnalysisResponse(BaseModel):
    id: str
    assessment_id: str
    syllabus_module: str
    topic: str
    evidence: str
    potential_area: str
    recommendation: str
    created_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# --- WEEKLY REVIEW SCHEMAS ---
class WeeklyReviewResponse(BaseModel):
    id: str
    student_id: str
    mentor_id: Optional[str] = None
    week_start: str
    summary: str
    attendance_summary: Optional[str] = None
    academic_summary: Optional[str] = None
    activity_summary: Optional[str] = None
    skill_summary: Optional[str] = None
    follow_up: Optional[str] = None
    created_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# --- MEETINGS SCHEMAS ---
class MeetingCreate(BaseModel):
    meeting_type: str  # Performance Review, Academic Follow-up, Attendance Review, Career Discussion, General
    mode: str  # In-person, Phone, Online
    scheduled_date: str
    scheduled_time: Optional[str] = "02:00 PM"
    status: str = "Scheduled"  # Scheduled, Completed, Cancelled
    agenda: Optional[str] = None
    discussion_summary: Optional[str] = None
    outcome: Optional[str] = None
    action_items: Optional[str] = None
    follow_up_date: Optional[str] = None
    mentor_id: Optional[str] = None

class MeetingUpdate(BaseModel):
    meeting_type: Optional[str] = None
    mode: Optional[str] = None
    scheduled_date: Optional[str] = None
    scheduled_time: Optional[str] = None
    status: Optional[str] = None
    agenda: Optional[str] = None
    discussion_summary: Optional[str] = None
    outcome: Optional[str] = None
    action_items: Optional[str] = None
    follow_up_date: Optional[str] = None

class MeetingResponse(MeetingCreate):
    id: str
    student_id: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
