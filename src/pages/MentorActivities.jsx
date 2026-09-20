import React from 'react';
import { STUDENTS_DATA } from '../data/studentsData';
import ActivitySummary from '../components/ActivitySummary';
import StatusBadge from '../components/StatusBadge';
import { Trophy, Award, Users, CheckCircle } from 'lucide-react';

export default function MentorActivities() {
  // Aggregate total activities across batch
  const totalCounts = STUDENTS_DATA.reduce((acc, s) => {
    acc.hackathons += s.activitiesCount.hackathons || 0;
    acc.symposiums += s.activitiesCount.symposiums || 0;
    acc.workshops += s.activitiesCount.workshops || 0;
    acc.courses += s.activitiesCount.courses || 0;
    acc.projects += s.activitiesCount.projects || 0;
    acc.certifications += s.activitiesCount.certifications || 0;
    return acc;
  }, { hackathons: 0, symposiums: 0, workshops: 0, courses: 0, projects: 0, certifications: 0 });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Batch Activities Overview</h1>
        <p className="text-xs text-slate-500 mt-1">Co-curricular & technical achievements across mentored students</p>
      </div>

      {/* Aggregate metrics */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-500">Total Batch Achievements</h2>
        <ActivitySummary counts={totalCounts} />
      </div>

      {/* Student Participation Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <h2 className="text-base font-bold text-slate-900">Student Activity Leaderboard & Status</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3 text-center">Hackathons</th>
                <th className="p-3 text-center">Symposiums</th>
                <th className="p-3 text-center">Workshops</th>
                <th className="p-3 text-center">Courses</th>
                <th className="p-3 text-center">Projects</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {STUDENTS_DATA.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900 flex items-center gap-2">
                    <img src={student.avatar} alt={student.name} className="w-7 h-7 rounded-full border object-cover" />
                    <span>{student.name}</span>
                  </td>
                  <td className="p-3 text-center font-bold text-amber-700">{student.activitiesCount.hackathons}</td>
                  <td className="p-3 text-center text-slate-700">{student.activitiesCount.symposiums}</td>
                  <td className="p-3 text-center text-slate-700">{student.activitiesCount.workshops}</td>
                  <td className="p-3 text-center text-slate-700">{student.activitiesCount.courses}</td>
                  <td className="p-3 text-center font-bold text-indigo-700">{student.activitiesCount.projects}</td>
                  <td className="p-3 text-right">
                    <StatusBadge status={student.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
