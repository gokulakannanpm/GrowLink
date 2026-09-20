import React from 'react';

export default function StatusBadge({ status, size = 'md', className = '' }) {
  let badgeStyle = '';
  let dotStyle = '';

  switch (status) {
    case 'Needs Attention':
      badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';
      dotStyle = 'bg-rose-500';
      break;
    case 'Monitor':
      badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
      dotStyle = 'bg-amber-500';
      break;
    case 'On Track':
      badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      dotStyle = 'bg-emerald-500';
      break;
    default:
      badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
      dotStyle = 'bg-slate-400';
  }

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs' 
    : size === 'lg' 
    ? 'px-3 py-1 text-sm' 
    : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${badgeStyle} ${sizeClasses} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyle}`}></span>
      <span>{status}</span>
    </span>
  );
}
