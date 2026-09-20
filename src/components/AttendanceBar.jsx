import React from 'react';

export default function AttendanceBar({ 
  percentage, 
  target = 75, 
  showLabel = true, 
  label = null,
  size = 'md',
  className = ''
}) {
  const numericVal = Number(percentage) || 0;
  
  let barColor = 'bg-emerald-500';
  let textColor = 'text-emerald-700';
  let bgColor = 'bg-emerald-50';

  if (numericVal < 75) {
    barColor = 'bg-rose-500';
    textColor = 'text-rose-700';
    bgColor = 'bg-rose-50';
  } else if (numericVal < 80) {
    barColor = 'bg-amber-500';
    textColor = 'text-amber-700';
    bgColor = 'bg-amber-50';
  }

  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
          <span className="text-slate-700">{label || 'Attendance'}</span>
          <span className={`px-1.5 py-0.5 rounded font-semibold ${textColor} ${bgColor}`}>
            {numericVal}%
          </span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden relative ${heightClass}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${Math.min(100, Math.max(0, numericVal))}%` }}
        />
        {/* Subtle target line at 75% if applicable */}
        {target && (
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10 opacity-60"
            style={{ left: `${target}%` }}
            title={`Required Minimum: ${target}%`}
          />
        )}
      </div>
    </div>
  );
}
