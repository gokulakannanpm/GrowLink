import React, { useState } from 'react';
import Button from './Button';
import { Calendar, Sparkles, Plus, CheckCircle, Clock, FileText } from 'lucide-react';

export default function WeeklyReviewSection({ student, onAddAction }) {
  const [showReview, setShowReview] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const reviewData = student.weeklyReview || {
    period: "14 – 20 SEP",
    attendanceStat: "4 / 5 classes",
    academicStat: `CAT 2: ${student.cat?.cat2 || 61}%`,
    skillStat: "LeetCode: 18 → 24 problems",
    activitiesStat: "1 Symposium",
    coursesStat: "72% → 81%",
    previousFollowUp: `${student.potentialReviewArea || 'Integration'} — Pending`,
    summaryText: "Attendance remained stable this week. Coding activity improved, while the previous academic follow-up remains pending."
  };

  const handleGenerateClick = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowReview(true);
    }, 600);
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Calendar className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">Weekly Development Review</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Automated weekly progress compilation across academic & skill metrics</p>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          icon={Sparkles}
          disabled={isGenerating}
          onClick={handleGenerateClick}
        >
          {isGenerating ? 'Generating...' : 'Generate Weekly Review'}
        </Button>
      </div>

      {showReview && (
        <div className="space-y-4">
          {/* Header Banner */}
          <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{student.name}</p>
              <p className="text-sm font-bold mt-0.5">WEEKLY SUMMARY • {reviewData.period}</p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-indigo-600/60 text-indigo-100 border border-indigo-400/30">
              Weekly Snapshot
            </span>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
              <p className="text-[11px] text-slate-400 font-medium uppercase">Attendance</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{reviewData.attendanceStat}</p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
              <p className="text-[11px] text-slate-400 font-medium uppercase">Academic</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{reviewData.academicStat}</p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
              <p className="text-[11px] text-slate-400 font-medium uppercase">Skill Development</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{reviewData.skillStat}</p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
              <p className="text-[11px] text-slate-400 font-medium uppercase">Activities</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{reviewData.activitiesStat}</p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
              <p className="text-[11px] text-slate-400 font-medium uppercase">Courses</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{reviewData.coursesStat}</p>
            </div>

            <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/60">
              <p className="text-[11px] text-amber-800 font-medium uppercase">Previous Follow-up</p>
              <p className="font-bold text-amber-950 text-xs mt-0.5">{reviewData.previousFollowUp}</p>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Weekly Summary</p>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              "{reviewData.summaryText}"
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-1">
            <Button 
              variant="primary" 
              size="sm" 
              icon={Plus} 
              onClick={onAddAction}
            >
              Add Mentor Action
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
