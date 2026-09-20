import React from 'react';
import { Code, CheckCircle, ExternalLink, Zap } from 'lucide-react';

export default function SkillDevelopmentCard({ skills = [] }) {
  if (!skills || skills.length === 0) {
    return <p className="text-xs text-slate-400 italic">No skill development entries logged.</p>;
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skills.map((skill) => (
          <div key={skill.id || skill.platform} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span>{skill.platform}</span>
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                {skill.evidence || 'Verified'}
              </span>
            </div>

            <p className="text-xs text-slate-600 font-medium">{skill.activity}</p>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
              <span className="text-slate-400 text-[11px]">Progress</span>
              <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 font-mono">
                {skill.progress}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
