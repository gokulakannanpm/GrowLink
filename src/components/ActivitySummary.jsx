import React from 'react';
import { Trophy, Award, Briefcase, BookOpen, Code, FileCheck } from 'lucide-react';

export default function ActivitySummary({ counts, compact = false }) {
  const items = [
    { label: "Hackathons", count: counts?.hackathons || 0, icon: Trophy, color: "text-amber-600 bg-amber-50 border-amber-100" },
    { label: "Symposiums", count: counts?.symposiums || 0, icon: Award, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { label: "Workshops", count: counts?.workshops || 0, icon: Briefcase, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { label: "Courses", count: counts?.courses || 0, icon: BookOpen, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Projects", count: counts?.projects || 0, icon: Code, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { label: "Certifications", count: counts?.certifications || 0, icon: FileCheck, color: "text-teal-600 bg-teal-50 border-teal-100" }
  ];

  if (compact) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={`p-2 rounded-lg border flex items-center gap-2 ${item.color}`}>
              <Icon className="w-4 h-4 shrink-0" />
              <div>
                <p className="text-xs font-bold leading-none">{item.count}</p>
                <p className="text-[10px] opacity-80 leading-tight mt-0.5">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center gap-3">
            <div className={`p-2.5 rounded-lg border ${item.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900 leading-none">{item.count}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
