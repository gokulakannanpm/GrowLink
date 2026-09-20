import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import AttendanceBar from './AttendanceBar';
import AcademicTrend from './AcademicTrend';
import Button from './Button';
import { ChevronRight, AlertCircle } from 'lucide-react';

export default function StudentCard({ student }) {
  const attendance = student.attendance ?? student.attendance_percentage ?? 0;
  const avatar = student.avatar || student.avatar_url;
  const studentId = student.studentId || student.student_id;
  const cat = student.cat || {};

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between">
      <div>
        {/* Top Header info */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt={student.name}
              className="w-11 h-11 rounded-full object-cover border border-slate-200 bg-slate-100"
            />
            <div>
              <h4 className="text-base font-semibold text-slate-900 leading-tight">
                {student.name}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {student.department} • {student.year} ({student.section})
              </p>
              <p className="text-xs text-slate-400 font-mono">{studentId}</p>
            </div>
          </div>
          <StatusBadge status={student.status} />
        </div>

        {/* Potential review flag if available */}
        {student.potentialReviewArea && (
          <div className="mb-4 bg-amber-50/80 border border-amber-200/80 rounded-lg p-2.5 flex items-start gap-2 text-xs">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-900">Review Flag: </span>
              <span className="text-amber-800">{student.potentialReviewArea}</span>
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="space-y-3 mb-4">
          <AttendanceBar percentage={attendance} label="Attendance" />

          <AcademicTrend
            cat1={cat.cat1 ?? 0}
            cat2={cat.cat2 ?? 0}
            average={cat.average ?? 0}
            compact={true}
          />
        </div>
      </div>

      {/* Footer link */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          <span className="font-medium text-slate-700">
            {(student.activitiesCount?.projects ?? 0) + (student.activitiesCount?.hackathons ?? 0)}
          </span> activities
        </div>

        <Link to={`/mentor/students/${student.id}`}>
          <Button variant="outline" size="sm" icon={ChevronRight}>
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}

