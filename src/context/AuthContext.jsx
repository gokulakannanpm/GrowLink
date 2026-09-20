import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('growlink_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password, roleType) => {
    // Demo authentication check
    let authenticatedUser = null;

    if (roleType === 'mentor' || email.includes('mentor')) {
      if (password === 'mentor123') {
        authenticatedUser = {
          name: "Dr. S. Ramanathan",
          email: "mentor@growlink.demo",
          role: "mentor",
          title: "Professor & Academic Mentor"
        };
      }
    } else if (roleType === 'student' || email.includes('rahul') || email.includes('student')) {
      if (password === 'student123') {
        authenticatedUser = {
          id: "rahul-kumar",
          name: "Rahul Kumar",
          email: "rahul@growlink.demo",
          role: "student",
          studentId: "IT2024-042",
          department: "Information Technology",
          year: "II Year",
          section: "A"
        };
      }
    }

    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('growlink_session', JSON.stringify(authenticatedUser));
      return { success: true, user: authenticatedUser };
    } else {
      return { success: false, error: 'Invalid email or password. Use demo credentials.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('growlink_session');
  };

  return (
    <AuthContext.Provider value={{
      user,
      role: user?.role || null,
      isAuthenticated: !!user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
