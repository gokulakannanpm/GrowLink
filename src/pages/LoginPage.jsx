import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { GraduationCap, UserCheck, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('mentor'); // 'mentor' | 'student'
  const [email, setEmail] = useState('mentor@growlink.demo');
  const [password, setPassword] = useState('mentor123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError('');
    if (role === 'mentor') {
      setEmail('mentor@growlink.demo');
      setPassword('mentor123');
    } else {
      setEmail('rahul@growlink.demo');
      setPassword('student123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password, selectedRole);
      setLoading(false);
      if (res.success) {
        if (res.user.role === 'mentor') {
          navigate('/mentor');
        } else {
          navigate('/student');
        }
      } else {
        setError(res.error);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">GrowLink</h1>
          <p className="text-sm font-medium text-slate-500">
            Student Development, Connected.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          
          {/* Role Selector Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
              Select Login Role
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleRoleSelect('mentor')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  selectedRole === 'mentor'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span>Mentor</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  selectedRole === 'student'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>Student</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              placeholder="Enter email address..."
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              placeholder="Enter password..."
            />

            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              disabled={loading}
              icon={ArrowRight}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>

          {/* Helper info / Quick Login */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Demo Credentials
            </p>
            <div className="space-y-2 text-xs">
              <div 
                onClick={() => handleRoleSelect('mentor')}
                className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100 cursor-pointer flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-slate-800">Demo Mentor</p>
                  <p className="text-slate-500 font-mono text-[11px]">mentor@growlink.demo • password: mentor123</p>
                </div>
                <span className="text-[11px] font-semibold text-indigo-600">Fill →</span>
              </div>

              <div 
                onClick={() => handleRoleSelect('student')}
                className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100 cursor-pointer flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-slate-800">Demo Student (Rahul)</p>
                  <p className="text-slate-500 font-mono text-[11px]">rahul@growlink.demo • password: student123</p>
                </div>
                <span className="text-[11px] font-semibold text-indigo-600">Fill →</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Frontend Mock Authentication
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
