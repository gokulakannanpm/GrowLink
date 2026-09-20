import React from 'react';
import { Award, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function CGPACard({ currentCGPA, previousCGPA, cgpaTrend, className = '' }) {
  const curr = Number(currentCGPA) || 0;
  const prev = Number(previousCGPA) || 0;
  const trendVal = cgpaTrend || (curr >= prev ? `+${(curr - prev).toFixed(2)}` : `${(curr - prev).toFixed(2)}`);

  const isPositive = trendVal.startsWith('+');
  const isNegative = trendVal.startsWith('-');

  let Icon = Minus;
  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';

  if (isPositive) {
    Icon = TrendingUp;
    badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (isNegative) {
    Icon = TrendingDown;
    badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';
  }

  return (
    <div className={`rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-indigo-950 font-bold">
          <Award className="w-4 h-4 text-indigo-600" /> CGPA Score
        </span>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold border ${badgeStyle}`}>
          <Icon className="w-3.5 h-3.5" />
          <span>{trendVal}</span>
        </span>
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <div>
          <span className="text-3xl font-extrabold text-indigo-950 tracking-tight">{curr.toFixed(2)}</span>
          <span className="text-xs text-slate-500 font-medium ml-1">/ 10.0</span>
        </div>

        <div className="text-right text-xs">
          <p className="text-slate-400">Previous Sem</p>
          <p className="font-semibold text-slate-700 font-mono">{prev.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
