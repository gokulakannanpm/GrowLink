import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, Search, Bell, UserCheck, GraduationCap, ArrowLeftRight, LogOut } from 'lucide-react';

export default function Header({ onOpenSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();

  const isStudentRoute = location.pathname.startsWith('/student');

  const toggleRoleView = () => {
    if (isStudentRoute) {
      navigate('/mentor');
    } else {
      navigate('/student');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Left section: mobile hamburger & breadcrumb/role pill */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Perspective Badge */}
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
            isStudentRoute 
              ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
              : 'bg-slate-100 text-slate-800 border-slate-200'
          }`}>
            {isStudentRoute ? (
              <>
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                <span>Student View</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5 text-slate-600" />
                <span>Mentor View</span>
              </>
            )}
          </span>

          {role === 'mentor' && (
            <button
              onClick={toggleRoleView}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Switch perspective"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Switch to {isStudentRoute ? 'Mentor' : 'Student'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search students, subjects, or review topics..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Right User & Actions */}
      <div className="flex items-center gap-3">
        <button 
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User Profile Chip */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'GL'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-900 leading-tight">{user?.name || 'GrowLink User'}</p>
              <p className="text-[10px] text-slate-500 capitalize">{user?.role || 'Guest'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
