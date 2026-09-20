import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { STUDENTS_DATA } from '../data/studentsData';
import * as api from '../services/api';
import AcademicTrend from '../components/AcademicTrend';
import CGPACard from '../components/CGPACard';
import AttendanceBar from '../components/AttendanceBar';
import DevBanner from '../components/DevBanner';
import { BookOpen, AlertCircle, Loader2 } from 'lucide-react';

export default function StudentAcademics() {
  const { user } = useAuth();
  const initialLocal = STUDENTS_DATA.find(s => s.id === user?.id || s.email === user?.email) || STUDENTS_DATA[0];
  
  const [student, setStudent] = useState(initialLocal);
  const [academics, setAcademics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDevFallback, setIsDevFallback] = useState(false);

  useEffect(() => {
    async function loadAcademicData() {
      setLoading(true);
      const targetId = user?.id || initialLocal.id;

      try {
        const studentProfile = await api.getStudent(targetId);
        setStudent(studentProfile);

        const acadData = await api.getStudentAcademics(targetId);
        setAcademics(acadData || []);
        setIsDevFallback(false);
      } catch (err) {
        console.warn('API error in StudentAcademics, using fallback data:', err);
        setStudent(initialLocal);
        setAcademics(initialLocal.subjects || []);
        setIsDevFallback(true);
      } finally {
        setLoading(false);
      }
    }

    loadAcademicData();
  }, [user, initialLocal]);

  return (
    <div className="space-y-6">
      <DevBanner isDevFallback={isDevFallback} />

      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Records & Test Performance</h1>
        <p className="text-xs text-slate-500 mt-1">Continuous Assessment Tests (CAT 1 & CAT 2), CGPA metrics, and Subject Analytics</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600 mb-2" />
          <p className="text-sm font-semibold">Loading Academics from API...</p>
        </div>
      ) : (
        <>
          {/* CGPA & CAT Performance Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CGPACard 
              currentCGPA={student.cgpa || student.currentCGPA || 8.42}
              previousCGPA={student.previous_cgpa || student.previousCGPA || 8.18}
              cgpaTrend={student.cgpa_trend || student.cgpaTrend || "+0.24"}
            />
            <AcademicTrend 
              cat1={student.cat?.cat1 || 78} 
              cat2={student.cat?.cat2 || 61} 
              average={student.cat?.average || 69.5} 
            />
          </div>

          {/* Detailed Subject Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden p-5 space-y-4">
            <h2 className="text-base font-bold text-slate-900">Subject-wise Continuous Assessment Breakdown</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="p-3">Course Code & Name</th>
                    <th className="p-3 text-center">CAT 1 (100)</th>
                    <th className="p-3 text-center">CAT 2 (100)</th>
                    <th className="p-3 text-center">Average %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(academics.length > 0 ? academics : initialLocal.subjects || []).map((sub) => {
                    const avg = sub.average || Math.round(((sub.cat1 || 0) + (sub.cat2 || 0)) / 2);
                    return (
                      <tr key={sub.name || sub.subject} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">{sub.name || sub.subject}</td>
                        <td className="p-3 text-center text-slate-700">{sub.cat1}</td>
                        <td className="p-3 text-center text-slate-700">{sub.cat2}</td>
                        <td className="p-3 text-center font-bold text-indigo-700">{avg}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
