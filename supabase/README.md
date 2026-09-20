# GrowLink Supabase Database & Architecture

This directory contains the relational database schema, initial seed data, and security policies for **GrowLink — Student Development Platform**.

---

## 🏗️ System Architecture

```text
+-------------------------------------------------------------+
|                     React + Vite Frontend                   |
|      (Mentor Dashboard / Student Portal / Meetings UI)       |
+-------------------------------------------------------------+
                              │
                              ▼  (REST / WebSocket API)
+-------------------------------------------------------------+
|                       FastAPI Backend                       |
|           (Auth Middleware, OCR Processing, Rules)          |
+-------------------------------------------------------------+
               │                               │
               ▼                               ▼
+-----------------------------+ +-----------------------------+
|    Supabase PostgreSQL DB   | |      Google Gemini API      |
|  (13 Relational Tables/RLS) | | (Assessment OCR/Analysis)  |
+-----------------------------+ +-----------------------------+
```

---

## 🗄️ Relational Schema Structure (13 Tables)

```text
mentors (id, name, email, department)
  │
  ├──► mentor_students (mentor_id, student_id)
  │         │
  │         ▼
students (id, student_id, name, email, department, year, section, cgpa, status)
  │
  ├──► attendance (subject, attended_classes, total_classes, percentage)
  ├──► academics (subject, cat1, cat2, average)
  ├──► activities (activity_type, title, description, date, status)
  ├──► skills (skill_name, platform, progress, evidence)
  ├──► mentor_notes (note, tag, created_at)
  ├──► mentor_actions (area, title, description, status, due_date)
  ├──► assessments (subject, assessment_type, assessment_name, file_url)
  │       └──► assessment_analysis (syllabus_module, topic, evidence, potential_area)
  ├──► weekly_reviews (week_start, summary, attendance_summary, academic_summary)
  └──► meetings (meeting_type, mode, scheduled_date, status, agenda, discussion_summary, outcome)
```

### Table Definitions

| Table | Description | Primary Key | Foreign Keys |
|---|---|---|---|
| `mentors` | College mentor accounts and details | `id` (UUID) | None |
| `students` | Student profiles and CGPA metrics | `id` (UUID) | None |
| `mentor_students` | Mentorship assignment mapping | `id` (UUID) | `mentor_id`, `student_id` |
| `attendance` | Subject-wise attendance percentages | `id` (UUID) | `student_id` |
| `academics` | CAT 1 & CAT 2 scores per subject | `id` (UUID) | `student_id` |
| `activities` | Hackathons, workshops, symposiums, projects | `id` (UUID) | `student_id` |
| `skills` | Generic skill progress tracking across platforms | `id` (UUID) | `student_id` |
| `mentor_notes` | Observation notes recorded by mentors | `id` (UUID) | `student_id`, `mentor_id` |
| `mentor_actions` | Assigned follow-up actions and deadlines | `id` (UUID) | `student_id`, `mentor_id` |
| `assessments` | Exam answer sheet scan records | `id` (UUID) | `student_id` |
| `assessment_analysis` | Diagnostic breakdown against syllabus modules | `id` (UUID) | `assessment_id` |
| `weekly_reviews` | Automated weekly progress summaries | `id` (UUID) | `student_id`, `mentor_id` |
| `meetings` | Scheduled & logged phone/in-person meetings | `id` (UUID) | `student_id`, `mentor_id` |

---

## ⚡ Setup & Deployment Instructions

### 1. Execute DDL Schema
In the Supabase SQL Editor, paste and execute `supabase/schema.sql`:
```bash
# Or via Supabase CLI
supabase db push
```

### 2. Run Seed Script
Execute `supabase/seed.sql` to populate the 5 demo students and 1 demo mentor along with meeting logs.

---

## 🔒 Row Level Security (RLS) Policy Design

1. **Mentors**:
   - Mentors can view records for any student where a entry exists in `mentor_students(mentor_id, student_id)`.
   - Mentors can insert/update `mentor_notes`, `mentor_actions`, `weekly_reviews`, and `meetings`.

2. **Students**:
   - Students can view **ONLY** their own records (`auth.uid() = student_id`).
   - Students are restricted from querying the `mentor_students` roster or other student accounts.
