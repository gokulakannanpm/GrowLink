import React from 'react';
import { STUDENTS_DATA } from '../data/studentsData';
import AcademicTrend from '../components/AcademicTrend';
import CGPACard from '../components/CGPACard';
import AttendanceBar from '../components/AttendanceBar';
import Button from '../components/Button';
import { BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentAcademics() {
  const student = STUDENTS_DATA[0]; // Rahul Kumar

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Records & Test Performance</h1>
        <p className="text-xs text-slate-500 mt-1">Continuous Assessment Tests (CAT 1 & CAT 2), CGPA metrics, and Subject Analytics</p>
      </div>

      {/* CGPA & CAT Performance Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CGPACard 
          currentCGPA={student.currentCGPA}
          previousCGPA={student.previousCGPA}
          cgpaTrend={student.cgpaTrend}
        />
        <AcademicTrend 
          cat1={student.cat.cat1} 
          cat2={student.cat.cat2} 
          average={student.cat.average} 
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
                <th className="p-3 text-center">Attendance %</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {student.subjects.map((sub) => {
                const avg = Math.round((sub.cat1 + sub.cat2) / 2);
                return (
                  <tr key={sub.name} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{sub.name}</td>
                    <td className="p-3 text-center text-slate-700">{sub.cat1}</td>
                    <td className="p-3 text-center text-slate-700">{sub.cat2}</td>
                    <td className="p-3 text-center font-bold text-indigo-700">{avg}%</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                        sub.attendance < 75 ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {sub.attendance}%
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {sub.attendance < 75 ? (
                        <span className="text-[11px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-medium">Needs Catch-up</span>
                      ) : (
                        <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">Satisfactory</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Focus Area Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <span>Remedial Topic Focus: {student.potentialReviewArea}</span>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          {student.reviewDescription}
        </p>
      </div>
    </div>
  );
}
