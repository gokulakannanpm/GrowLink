# GrowLink FastAPI Backend Service

FastAPI REST API service for **GrowLink — Student Development Platform**, interfacing with Supabase PostgreSQL.

---

## 🚀 Quick Start Guide

### 1. Create Python Virtual Environment
```bash
cd backend
python -m venv venv
```

Activate virtual environment:
- **Windows (PowerShell)**: `.\venv\Scripts\Activate.ps1`
- **Linux / macOS**: `source venv/bin/activate`

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` to configure your Supabase project credentials:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-or-service-role-key
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173
```

> **Note on Unconfigured State**: If Supabase credentials are missing or default placeholders are used, `GET /api/health` will return status `200 OK`, while database-dependent endpoints will return a clean `503 Service Unavailable` status explaining that Supabase credentials are not configured.

### 4. Run Development Server
```bash
uvicorn main:app --reload --port 8000
```

Access API Documentation:
- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
- **OpenAPI Schema**: [http://127.0.0.1:8000/openapi.json](http://127.0.0.1:8000/openapi.json)

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health check |
| `GET` | `/api/students` | List all assigned student profiles |
| `GET` | `/api/students/{student_id}` | Get single student details |
| `GET` | `/api/students/{student_id}/academics` | CAT scores & average per subject |
| `GET` | `/api/students/{student_id}/attendance` | Cumulative & subject-wise attendance |
| `GET` | `/api/students/{student_id}/activities` | Hackathons, workshops, projects |
| `GET` | `/api/students/{student_id}/skills` | Generic skill progress tracking |
| `GET` | `/api/students/{student_id}/weekly-review` | Latest weekly development summary |
| `GET` | `/api/students/{student_id}/notes` | Get mentor notes |
| `POST` | `/api/students/{student_id}/notes` | Create mentor observation note |
| `PATCH` | `/api/notes/{note_id}` | Update mentor note |
| `GET` | `/api/students/{student_id}/actions` | Get mentor follow-up action items |
| `POST` | `/api/students/{student_id}/actions` | Create mentor action item |
| `PATCH` | `/api/actions/{action_id}` | Update action status or due date |
| `GET` | `/api/students/{student_id}/meetings` | Get student mentoring meetings |
| `POST` | `/api/students/{student_id}/meetings` | Schedule or log external meeting/call |
| `PATCH` | `/api/meetings/{meeting_id}` | Update meeting status/outcome/summary |
| `DELETE` | `/api/meetings/{meeting_id}` | Delete meeting record |
| `GET` | `/api/students/{student_id}/assessments` | Get assessment scan uploads |
| `GET` | `/api/assessments/{assessment_id}/analysis` | Get assessment diagnostic analysis |

---

## 🔐 Security & Auth Roadmap
- **Phase 2 Development State**: Standard CORS enabled for Vite frontend (`localhost:3000` / `localhost:5173`).
- **Phase 3 Authentication**: Supabase Auth JWT validation middleware will inspect Bearer tokens in incoming headers and pass `auth.uid()` to Supabase RLS.

---

## 🤖 Future AI & Gemini Integration Roadmap
- **Phase 4 OCR & AI Analysis**: `POST /api/assessments/upload-and-analyze` will receive CAT answer sheet scans, call Google Gemini Vision API for handwriting OCR, map question scores against syllabus modules, and generate cautious diagnostic feedback recommendations.
