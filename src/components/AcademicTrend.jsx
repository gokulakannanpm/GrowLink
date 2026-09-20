import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function AcademicTrend({ cat1, cat2, average, compact = false }) {
  const c1 = Number(cat1) || 0;
  const c2 = Number(cat2) || 0;
  const diff = c2 - c1;
  const avg = average ?? Math.round((c1 + c2) / 2);

  let Icon = Minus;
  let trendColor = 'text-slate-600 bg-slate-100 border-slate-200';
  let diffText = '0%';

  if (diff > 0) {
    Icon = TrendingUp;
    trendColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    diffText = `+${diff}`;
  } else if (diff < 0) {
    Icon = TrendingDown;
    trendColor = 'text-rose-700 bg-rose-50 border-rose-200';
    diffText = `${diff}`;
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-800">{avg}% avg</span>
        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium border ${trendColor}`}>
          <Icon className="w-3 h-3" />
          <span>{diffText}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500">CAT Performance</span>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border ${trendColor}`}>
          <Icon className="w-3.5 h-3.5" />
          <span>{diffText} pts (CAT 1 → 2)</span>
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-white p-2 rounded border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">CAT 1</p>
          <p className="text-sm font-bold text-slate-800">{c1}</p>
        </div>
        <div className="bg-white p-2 rounded border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">CAT 2</p>
          <p className="text-sm font-bold text-slate-800">{c2}</p>
        </div>
        <div className="bg-indigo-50/70 p-2 rounded border border-indigo-100">
          <p className="text-xs text-indigo-600 font-semibold">Average</p>
          <p className="text-sm font-bold text-indigo-900">{avg}%</p>
        </div>
      </div>
    </div>
  );
}
