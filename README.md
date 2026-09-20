::: {align="center"}

GrowLink

Student Development, Connected.

<p>

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=22&duration=2800&pause=900&color=5B4BFF&center=true&vCenter=true&width=760&lines=From+student+data+to+mentor+action;One+shared+view+for+student+development;Academic+%2B+Attendance+%2B+Skills+%2B+Activities" alt="GrowLink animated tagline" />{=html}

</p>

<p>

<strong>{=html}A student--mentor development platform for
colleges.</strong>{=html}<br/>{=html} GrowLink brings fragmented
student-development data into one shared view,<br/>{=html} highlights
areas requiring attention, and gives mentors a simple workflow for
follow-up.

</p>

<p>

<img src="https://img.shields.io/badge/HACKDAY-1.0-5B4BFF?style=for-the-badge" alt="HACKDAY 1.0"/>{=html}
<img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Vite"/>{=html}
<img src="https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>{=html}
<img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/>{=html}

</p>

<p>

<b>{=html}Team One Piece</b>{=html} · HACKDAY 1.0 · Tech for a
Better Tomorrow

</p>

:::

🚀 What is GrowLink?

College student information is usually scattered across multiple places:

Marks → Attendance → Activities → Courses → Skills → Mentor Notes

The data may exist, but the development story of the student is
fragmented.

GrowLink connects that story.

Instead of making mentors search through disconnected records, GrowLink
provides a shared student-development layer where mentors can:

see the student's academic and development picture

identify areas requiring attention

record observations and mentor actions

schedule or log mentoring sessions

track follow-ups

review weekly progress

Students get their own focused view of the same development journey.

Student Data → Unified Profile → Identify Areas Requiring Attention
→ Mentor Intervention → Track Progress

🎯 The Problem

Fragmented Student Data

Academic marks, attendance, activities, certifications and
skill-development progress often live in separate systems or records.

Limited Mentor Visibility

Mentors may see individual metrics without having one concise view of
the student's overall development.

Delayed Intervention

A falling assessment score, attendance issue or stalled
skill-development activity can become visible only after the problem has
grown.

Missing Follow-up Loop

Even when a mentor identifies an issue, the action, target date and
later follow-up may not be tracked in one place.

💡 The GrowLink Approach

Traditional flow:

Data
  ↓
Stored
  ↓
Viewed

GrowLink flow:

Student Data
     ↓
Unified Development Profile
     ↓
Areas Requiring Attention
     ↓
Mentor Review
     ↓
Action / Meeting / Recommendation
     ↓
Follow-up
     ↓
Progress

GrowLink is not intended to replace a college ERP or LMS.

It acts as a development layer that brings relevant student information
together and makes mentor follow-up easier.

✨ Core Features

1. Unified Student Development Profile

A mentor can open a student's profile and view:

CGPA and semester trend

CAT / assessment performance

subject-wise marks

attendance

skill-development activity

courses and certifications

extracurricular participation

mentor notes

mentor actions and follow-ups

mentoring sessions

development timeline

2. Mentor Dashboard

Mentors get a roster-level view of assigned students.

The dashboard surfaces:

total mentees

students needing attention

students to monitor

students currently on track

attendance indicators

review flags

searchable student roster

Mentor roster



3. Mentor Actions & Follow-ups

Identifying an issue is only the first step.

GrowLink lets mentors create structured follow-up actions with:

subject / development area

action description

status

target follow-up date

additional notes

Example:

Area: Integration

Action:
Schedule remedial discussion on Integration by Parts

Status:
Pending

Follow-up:
24 Sep 2026



4. Mentoring Sessions

Mentors can schedule or log interactions such as:

academic follow-ups

in-person meetings

phone / external calls

online review sessions

Each interaction can contain an agenda, outcome and follow-up context.



5. Academic Performance & CGPA

GrowLink combines academic indicators into a development view rather
than displaying marks in isolation.

Example student snapshot:

CGPA       8.42 / 10.0
Previous   8.18
Trend      +0.24

CAT 1      78
CAT 2      61
Average    69.5%



6. Weekly Development Review

The weekly review compiles multiple development signals into a concise
mentor snapshot.

Example:

Area                 Weekly Signal

Attendance           4 / 5 classes
Academic             CAT 2: 61%
Skill Development    Coding: 18 → 24 problems
Activities           1 Symposium
Courses              72% → 81%
Previous Follow-up   Integration --- Pending

The goal is simple:

Give the mentor a useful weekly picture without making them manually
combine multiple records.



7. Assessment Intelligence

GrowLink includes an assessment-analysis workflow designed to connect
assessment evidence with the syllabus.

Intended workflow

Assessment / Answer Sheet
          ↓
OCR / Vision
          ↓
Question & Answer Extraction
          ↓
Syllabus Mapping
          ↓
Performance Evidence
          ↓
Potential Area for Review
          ↓
Mentor Discussion / Action

The system is deliberately framed around evidence and review, not
automated judgement.

For example:

Potential area for review: Integration by Parts

rather than:

"The student is weak."

This keeps the mentor in the decision loop.



👨‍🏫 Mentor Experience

The mentor workflow is built around a simple loop:

OPEN ROSTER
    ↓
SELECT STUDENT
    ↓
REVIEW DEVELOPMENT PROFILE
    ↓
IDENTIFY ATTENTION AREA
    ↓
ADD ACTION / NOTE
    ↓
SCHEDULE OR LOG SESSION
    ↓
FOLLOW UP

Mentor profile view



🎓 Student Experience

Students have a separate experience focused on their own
development.

Students can view:

personal development dashboard

attendance

CAT / academic performance

CGPA

skill-development progress

courses and activities

mentor recommendations

mentoring sessions

follow-up dates

communication with mentor

Student dashboard



Student mentoring sessions



Contact mentor



🔐 Role-Based Experience

GrowLink separates mentor and student workflows.

Capability                          Mentor        Student

View own dashboard                    ✅            ✅
View assigned students                ✅            ---
View own academic data               ---            ✅
View attendance                Assigned mentees     Own
View activities                Assigned mentees     Own
Add mentor notes                      ✅            ---
Create follow-up actions              ✅            ---
Schedule mentoring sessions           ✅            ---
View mentor recommendations          ---            ✅
Contact mentor                       ---            ✅

The current prototype demonstrates role-based frontend navigation and
access flow. Production deployment would enforce authorization at the
backend/API layer as well.

🧠 Development Intelligence

GrowLink is designed around decision support, not replacing the
mentor.

The platform can surface signals such as:

Attendance ↓
CAT performance ↓
Skill activity ↑
Previous follow-up = Pending

Instead of forcing the mentor to inspect each metric independently,
GrowLink turns those signals into a development context.

Example

CAT 2: 61%
Attendance: 4 / 5 classes
Coding activity: 18 → 24
Previous follow-up: Integration — Pending

                 ↓

Weekly Development Summary

"Attendance remained stable this week.
Coding activity improved, while the previous
academic follow-up remains pending."

The mentor then decides what action is appropriate.

🏗️ Technical Architecture

flowchart TB

    U[Student / Mentor] --> FE[React + Vite Frontend]

    FE --> API[FastAPI Backend]

    API --> DB[(Supabase PostgreSQL)]

    API --> AUTH[Role & Access Layer]

    API --> INTEL[Development Intelligence]

    INTEL --> ASSESS[Assessment Analysis]
    INTEL --> REVIEW[Weekly Review]
    INTEL --> SIGNALS[Development Signals]

    DB --> DATA[Academic • Attendance • Skills • Activities]
    DB --> MENTOR[Mentor Notes • Actions • Meetings]

🛠️ Tech Stack

Frontend

React

Vite

JavaScript

Tailwind CSS

React Router

Lucide React

Backend

Python

FastAPI

REST API

Data

Supabase

PostgreSQL

Row Level Security (RLS)

Intelligence Layer

Designed for:

assessment analysis

syllabus mapping

weekly development summaries

evidence-based attention signals

Development

Git

GitHub

VS Code / Antigravity

Vercel-ready frontend

Render-ready backend

📁 Project Structure

GrowLink/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── data/
│   ├── context/
│   └── App.jsx
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── database.py
│   ├── main.py
│   └── requirements.txt
│
├── screenshots/
│   ├── mentor-roster.png
│   ├── mentor-student-profile.png
│   ├── academic-performance.png
│   ├── weekly-development-review.png
│   ├── attendance-tracker.png
│   ├── assessment-intelligence.png
│   ├── schedule-mentoring-session.png
│   ├── mentor-follow-up-action.png
│   ├── student-dashboard.png
│   ├── student-mentoring-sessions.png
│   └── message-mentor.png
│
├── .env.example
├── README.md
└── package.json

⚙️ Getting Started

Prerequisites

Node.js 18+

Python 3.10+

Supabase project

1. Clone

git clone https://github.com/gokulakannanpm/GrowLink.git
cd GrowLink

2. Frontend

npm install
npm run dev

Frontend runs on:

http://localhost:3000

3. Backend

cd backend

python -m venv venv

Windows

venv\Scripts\activate

Install dependencies

pip install -r requirements.txt

Start FastAPI

uvicorn main:app --reload

Backend runs on:

http://127.0.0.1:8000

4. Environment Variables

Create the required .env files from the provided examples.

Frontend:

VITE_API_BASE_URL=http://127.0.0.1:8000

Backend environment variables include the Supabase connection details
and allowed frontend origins.

Never commit real API keys, Supabase secret keys or production
credentials.

🧪 Demo Experience

The prototype includes separate Mentor and Student experiences.

Mentor

mentor@growlink.demo

Student

rahul@growlink.demo

Demo passwords are intended only for the local prototype. Production
authentication should use secure identity management and
backend-enforced authorization.

📊 Example Development Profile

Rahul Kumar

CGPA                 8.42
Previous Semester    8.18
CGPA Trend           +0.24

CAT 1                78
CAT 2                61
CAT Average          69.5%

Attendance            75%
Review Flag           Integration

GrowLink connects these individual signals with:

Mentor Observation
       ↓
Mentor Action
       ↓
Scheduled Follow-up
       ↓
Weekly Review
       ↓
Progress Tracking

This is the central idea behind the platform.

🎯 Why GrowLink?

GrowLink focuses on a gap between student data collection and
student development follow-up.

Existing systems often answer:

"What is the student's mark?"

GrowLink aims to help answer:

"What is happening with this student's development, what needs
attention, and what did the mentor do about it?"

The differentiation

Traditional Data View     GrowLink Development View

Marks                     Academic trend
Attendance                Attendance signal
Activities                Skill / participation progress
Mentor notes              Structured follow-up
Meetings                  Action + outcome
Data stored separately    Shared development profile
Review happens manually   Weekly review workflow

🏫 Target Users

Students

Students get a focused view of their academic and development journey.

Mentors

Mentors get a consolidated view of assigned students and a structured
follow-up workflow.

Institutions

Institutions can use the platform as a development layer across
departments and mentoring programs.

💼 Market & Business Potential

GrowLink can be positioned as an institutional SaaS platform for
colleges and universities.

Potential institutional value:

reduced mentor administrative effort

centralized development visibility

structured mentoring workflows

earlier identification of attention areas

better continuity between mentoring sessions

scalable student-development records

Possible business model

Institution
    ↓
Annual / Institutional SaaS License
    ↓
Departments / Mentors / Students

Future pricing can be based on institutional size, active students or
enabled modules.

No fabricated market-size or revenue claims are used in this prototype.

📈 Scalability & Future Roadmap

Phase 1 --- Core Platform

Student development profile

Mentor dashboard

Academic data

Attendance

Activities

Mentor notes

Follow-up actions

Mentoring sessions

Phase 2 --- Development Intelligence

assessment OCR / vision

syllabus-aware mapping

weekly automated reviews

evidence-based attention signals

personalized recommendations

Phase 3 --- Institution Scale

department-level dashboards

configurable mentoring rules

ERP / LMS integrations

institutional analytics

notifications

mobile application

secure cloud deployment

🔮 If We Had More Time

01 --- Assessment Intelligence

Move from prototype workflow to production OCR / vision processing with
reliable syllabus mapping.

02 --- Automated Weekly Reviews

Generate concise weekly development summaries from verified academic,
attendance, skill and activity data.

03 --- Deeper Integrations

Connect existing college systems rather than requiring institutions to
duplicate their data.

04 --- Secure Production Authorization

Move role enforcement fully into the backend and identity layer.

05 --- Offline / Mobile Mentor Workflow

Enable mentors to review and update student development information from
mobile devices.

🖼️ Product Preview

<details>

<summary>

<strong>{=html}Mentor Dashboard</strong>{=html}

</summary>



</details>

<details>

<summary>

<strong>{=html}Student Development Profile</strong>{=html}

</summary>



</details>

<details>

<summary>

<strong>{=html}Assessment Intelligence</strong>{=html}

</summary>



</details>

<details>

<summary>

<strong>{=html}Student Experience</strong>{=html}

</summary>



</details>

🧩 Current MVP Status

Working prototype

React + Vite frontend

Responsive app shell

Mentor dashboard

Student roster

Student profile

Academic performance

CGPA tracking

Attendance view

Activities / skills

Mentor notes

Mentor actions

Mentoring sessions

Student dashboard

Student-side mentor recommendations

FastAPI backend

Supabase / PostgreSQL integration

Role-based prototype flow

Weekly review workflow

Assessment intelligence workflow UI

Next engineering steps

Production authentication

Backend authorization policies

Assessment OCR / vision integration

Production AI integration

ERP / LMS connectors

Notifications

Mobile deployment

🔒 Privacy & Security Direction

Student development data is sensitive.

The production version should include:

authenticated users

backend-enforced role permissions

least-privilege database access

Row Level Security

secure secret management

audit logging

institution-controlled data retention

encrypted transport and storage

GrowLink is designed so that students see their own development
information, while mentors see their assigned mentees.

🌱 Vision

GrowLink is built around a simple idea:

Student data should not just be stored. It should help people
support student development.

The long-term vision is a platform where academic performance,
attendance, skills, activities and mentoring history form one continuous
development journey.

DATA
  ↓
UNDERSTANDING
  ↓
MENTOR ACTION
  ↓
FOLLOW-UP
  ↓
PROGRESS

GrowLink --- connecting student data to meaningful development.

::: {align="center"}

Built with ❤️ for HACKDAY 1.0

Team One Piece
:::
