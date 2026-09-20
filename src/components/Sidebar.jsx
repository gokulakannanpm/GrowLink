import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  X,
  ChevronRight,
  LogOut,
  UserCheck
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const mentorNavItems = [
    { label: 'Dashboard', path: '/mentor', icon: LayoutDashboard, exact: true },
    { label: 'Students', path: '/mentor/students', icon: Users },
    { label: 'Activities', path: '/mentor/activities', icon: Activity }
  ];

  const studentNavItems = [
    { label: 'My Dashboard', path: '/student', icon: LayoutDashboard, exact: true },
    { label: 'Academics', path: '/student/academics', icon: BookOpen },
    { label: 'Activities', path: '/student/activities', icon: Trophy }
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100/80'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  const isStudentOnly = role === 'student';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 
        flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}
      `}>
        {/* Logo / Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight">GrowLink</h1>
              <p className="text-[10px] text-slate-500 font-medium">Student Development</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* MENTOR Section - Hidden for student logins */}
          {!isStudentOnly && (
            <div>
              <div className="px-3 mb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  MENTOR
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                  Mentor View
                </span>
              </div>
              <nav className="space-y-1">
                {mentorNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink 
                      key={item.path} 
                      to={item.path} 
                      end={item.exact}
                      className={navLinkClass}
                      onClick={() => onClose && onClose()}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100" />
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          )}

          {/* STUDENT Section */}
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                STUDENT
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono">
                {user?.name || 'Rahul Kumar'}
              </span>
            </div>
            <nav className="space-y-1">
              {studentNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink 
                    key={item.path} 
                    to={item.path} 
                    end={item.exact}
                    className={navLinkClass}
                    onClick={() => onClose && onClose()}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100" />
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
          <div className="rounded-lg border border-slate-200/80 bg-white p-2.5 text-xs text-slate-600 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800">{user?.name || 'User'}</p>
              <p className="text-[11px] text-slate-500 capitalize">{user?.role || 'Session'} View</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
