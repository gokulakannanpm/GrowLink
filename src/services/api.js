// GrowLink Centralized API Service
// Connects React Frontend to FastAPI Backend (http://127.0.0.1:8000/api)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

/**
 * Generic HTTP Request Helper
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // TODO: Add JWT Authorization header when Supabase Auth middleware is integrated
  // const token = localStorage.getItem('growlink_jwt');
  // if (token) headers['Authorization'] = `Bearer ${token}`;

  const config = {
    ...options,
    headers,
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.detail) errorMessage = errorData.detail;
    } catch {
      // Ignore JSON parse failure on error response
    }
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// --- HEALTH CHECK ---
export async function getHealth() {
  return request('/health');
}

// --- STUDENTS ---
export async function getStudents() {
  return request('/students');
}

export async function getStudent(studentId) {
  return request(`/students/${studentId}`);
}

// --- ACADEMICS ---
export async function getStudentAcademics(studentId) {
  return request(`/students/${studentId}/academics`);
}

// --- ATTENDANCE ---
export async function getStudentAttendance(studentId) {
  return request(`/students/${studentId}/attendance`);
}

// --- ACTIVITIES ---
export async function getStudentActivities(studentId) {
  return request(`/students/${studentId}/activities`);
}

// --- SKILLS ---
export async function getStudentSkills(studentId) {
  return request(`/students/${studentId}/skills`);
}

// --- MENTOR NOTES ---
export async function getStudentNotes(studentId) {
  return request(`/students/${studentId}/notes`);
}

export async function createStudentNote(studentId, noteData) {
  return request(`/students/${studentId}/notes`, {
    method: 'POST',
    body: noteData,
  });
}

export async function updateNote(noteId, noteData) {
  return request(`/notes/${noteId}`, {
    method: 'PATCH',
    body: noteData,
  });
}

// --- MENTOR ACTIONS ---
export async function getStudentActions(studentId) {
  return request(`/students/${studentId}/actions`);
}

export async function createStudentAction(studentId, actionData) {
  return request(`/students/${studentId}/actions`, {
    method: 'POST',
    body: actionData,
  });
}

export async function updateAction(actionId, actionData) {
  return request(`/actions/${actionId}`, {
    method: 'PATCH',
    body: actionData,
  });
}

// --- WEEKLY REVIEWS ---
export async function getWeeklyReview(studentId) {
  return request(`/students/${studentId}/weekly-review`);
}

// --- MEETINGS (FULL CRUD) ---
export async function getStudentMeetings(studentId) {
  return request(`/students/${studentId}/meetings`);
}

export async function createMeeting(studentId, meetingData) {
  return request(`/students/${studentId}/meetings`, {
    method: 'POST',
    body: meetingData,
  });
}

export async function updateMeeting(meetingId, meetingData) {
  return request(`/meetings/${meetingId}`, {
    method: 'PATCH',
    body: meetingData,
  });
}

export async function deleteMeeting(meetingId) {
  return request(`/meetings/${meetingId}`, {
    method: 'DELETE',
  });
}

// --- ASSESSMENTS & DIAGNOSTICS ---
export async function getStudentAssessments(studentId) {
  return request(`/students/${studentId}/assessments`);
}

export async function getAssessmentAnalysis(assessmentId) {
  return request(`/assessments/${assessmentId}/analysis`);
}
