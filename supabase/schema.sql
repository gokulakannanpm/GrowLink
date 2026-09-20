-- GrowLink Supabase PostgreSQL Schema
-- Version 1.0 (Student Development Platform)

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. MENTORS TABLE
CREATE TABLE IF NOT EXISTS mentors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) DEFAULT 'Professor & Academic Mentor',
    department VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(255) NOT NULL,
    year VARCHAR(50) NOT NULL,
    section VARCHAR(10) NOT NULL,
    cgpa NUMERIC(4,2) NOT NULL DEFAULT 0.00,
    previous_cgpa NUMERIC(4,2) NOT NULL DEFAULT 0.00,
    cgpa_trend VARCHAR(20) DEFAULT '0.00',
    status VARCHAR(50) NOT NULL DEFAULT 'On Track',
    avatar_url TEXT,
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. MENTOR_STUDENTS TABLE (Mentorship Assignment)
CREATE TABLE IF NOT EXISTS mentor_students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mentor_id UUID NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_mentor_student UNIQUE (mentor_id, student_id)
);

-- 4. ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subject VARCHAR(255) NOT NULL,
    attended_classes INT NOT NULL DEFAULT 0,
    total_classes INT NOT NULL DEFAULT 0,
    attendance_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    target_percentage NUMERIC(5,2) DEFAULT 75.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ACADEMICS TABLE (CAT Scores)
CREATE TABLE IF NOT EXISTS academics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subject VARCHAR(255) NOT NULL,
    cat1 NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    cat2 NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    average NUMERIC(5,2) GENERATED ALWAYS AS ((cat1 + cat2) / 2.0) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    activity_type VARCHAR(100) NOT NULL, -- Hackathon, Symposium, Workshop, Course, Project, Certification
    title VARCHAR(255) NOT NULL,
    role_or_organizer VARCHAR(255),
    description TEXT,
    date VARCHAR(100),
    status VARCHAR(100) DEFAULT 'Completed',
    evidence_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. SKILLS TABLE (Generic Skill Development)
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    skill_name VARCHAR(255) NOT NULL,
    platform VARCHAR(255) NOT NULL,
    progress VARCHAR(255) NOT NULL,
    previous_progress VARCHAR(255),
    evidence TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. MENTOR_NOTES TABLE
CREATE TABLE IF NOT EXISTS mentor_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    mentor_id UUID NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    tag VARCHAR(100) DEFAULT 'Academic Guidance',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. MENTOR_ACTIONS TABLE
CREATE TABLE IF NOT EXISTS mentor_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    mentor_id UUID NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
    area VARCHAR(255) NOT NULL, -- e.g. Integration by Parts
    title VARCHAR(255) NOT NULL, -- Action Title
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending', -- Pending, In Progress, Completed
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. ASSESSMENTS TABLE
CREATE TABLE IF NOT EXISTS assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subject VARCHAR(255) NOT NULL,
    assessment_type VARCHAR(100) NOT NULL, -- CAT 1, CAT 2, Model Exam
    assessment_name VARCHAR(255) NOT NULL,
    date DATE,
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. ASSESSMENT_ANALYSIS TABLE
CREATE TABLE IF NOT EXISTS assessment_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    syllabus_module VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    evidence TEXT NOT NULL,
    potential_area VARCHAR(255) NOT NULL, -- Cautious phrasing
    recommendation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. WEEKLY_REVIEWS TABLE
CREATE TABLE IF NOT EXISTS weekly_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    mentor_id UUID NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
    week_start DATE NOT NULL,
    summary TEXT NOT NULL,
    attendance_summary VARCHAR(255),
    academic_summary VARCHAR(255),
    activity_summary VARCHAR(255),
    skill_summary VARCHAR(255),
    follow_up VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. MEETINGS TABLE
CREATE TABLE IF NOT EXISTS meetings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    mentor_id UUID NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
    meeting_type VARCHAR(100) NOT NULL, -- Performance Review, Academic Follow-up, Attendance Review, Career Discussion, General
    mode VARCHAR(50) NOT NULL, -- In-person, Phone, Online
    scheduled_date DATE NOT NULL,
    scheduled_time VARCHAR(50) DEFAULT '02:00 PM',
    status VARCHAR(50) NOT NULL DEFAULT 'Scheduled', -- Scheduled, Completed, Cancelled
    agenda TEXT,
    discussion_summary TEXT,
    outcome TEXT,
    action_items TEXT,
    follow_up_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES FOR OPTIMAL QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(student_id);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_mentors_email ON mentors(email);
CREATE INDEX IF NOT EXISTS idx_mentor_students_mentor_student ON mentor_students(mentor_id, student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_academics_student_id ON academics(student_id);
CREATE INDEX IF NOT EXISTS idx_activities_student_id ON activities(student_id);
CREATE INDEX IF NOT EXISTS idx_skills_student_id ON skills(student_id);
CREATE INDEX IF NOT EXISTS idx_mentor_notes_student_id ON mentor_notes(student_id);
CREATE INDEX IF NOT EXISTS idx_mentor_actions_student_id ON mentor_actions(student_id);
CREATE INDEX IF NOT EXISTS idx_meetings_student_id ON meetings(student_id);
CREATE INDEX IF NOT EXISTS idx_meetings_mentor_id ON meetings(mentor_id);
CREATE INDEX IF NOT EXISTS idx_meetings_date ON meetings(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_assessments_student_id ON assessments(student_id);
CREATE INDEX IF NOT EXISTS idx_assessment_analysis_assessment ON assessment_analysis(assessment_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE academics ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

-- Note on RLS Enforcement:
-- Supabase authenticated users will connect via auth.uid().
-- Mentors can view & edit records for students mapped in mentor_students.
-- Students can ONLY view records matching their authenticated user ID.
