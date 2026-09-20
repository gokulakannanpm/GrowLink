import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedMentorRoute, ProtectedStudentRoute } from './components/ProtectedRoute';
import AppShell from './components/AppShell';

// Pages
import LoginPage from './pages/LoginPage';
import MentorDashboard from './pages/MentorDashboard';
import MentorStudentsList from './pages/MentorStudentsList';
import MentorStudentDetail from './pages/MentorStudentDetail';
import MentorActivities from './pages/MentorActivities';

import StudentDashboard from './pages/StudentDashboard';
import StudentAcademics from './pages/StudentAcademics';
import StudentActivities from './pages/StudentActivities';

function RootRedirect() {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'mentor') {
    return <Navigate to="/mentor" replace />;
  }

  return <Navigate to="/student" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Root Redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Protected Mentor Routes */}
          <Route path="/mentor" element={
            <ProtectedMentorRoute>
              <AppShell><MentorDashboard /></AppShell>
            </ProtectedMentorRoute>
          } />

          <Route path="/mentor/students" element={
            <ProtectedMentorRoute>
              <AppShell><MentorStudentsList /></AppShell>
            </ProtectedMentorRoute>
          } />

          <Route path="/mentor/students/:id" element={
            <ProtectedMentorRoute>
              <AppShell><MentorStudentDetail /></AppShell>
            </ProtectedMentorRoute>
          } />

          <Route path="/mentor/activities" element={
            <ProtectedMentorRoute>
              <AppShell><MentorActivities /></AppShell>
            </ProtectedMentorRoute>
          } />

          {/* Protected Student Routes */}
          <Route path="/student" element={
            <ProtectedStudentRoute>
              <AppShell><StudentDashboard /></AppShell>
            </ProtectedStudentRoute>
          } />

          <Route path="/student/academics" element={
            <ProtectedStudentRoute>
              <AppShell><StudentAcademics /></AppShell>
            </ProtectedStudentRoute>
          } />

          <Route path="/student/activities" element={
            <ProtectedStudentRoute>
              <AppShell><StudentActivities /></AppShell>
            </ProtectedStudentRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
