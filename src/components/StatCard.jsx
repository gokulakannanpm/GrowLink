import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon = null, 
  variant = 'default',
  active = false,
  onClick = null,
  className = ''
}) {
  const variantStyles = {
    default: 'border-slate-200 bg-white hover:border-slate-300',
    attention: 'border-rose-200 bg-rose-50/40 hover:bg-rose-50/70',
    monitor: 'border-amber-200 bg-amber-50/40 hover:bg-amber-50/70',
    ontrack: 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/70',
    indigo: 'border-indigo-200 bg-indigo-50/40 hover:bg-indigo-50/70'
  };

  const iconColors = {
    default: 'text-slate-600 bg-slate-100',
    attention: 'text-rose-600 bg-rose-100',
    monitor: 'text-amber-600 bg-amber-100',
    ontrack: 'text-emerald-600 bg-emerald-100',
    indigo: 'text-indigo-600 bg-indigo-100'
  };

  const activeBorder = active ? 'ring-2 ring-indigo-500 border-indigo-500' : '';

  return (
    <div 
      onClick={onClick}
      className={`rounded-xl border p-4 transition-all ${variantStyles[variant] || variantStyles.default} ${activeBorder} ${onClick ? 'cursor-pointer hover:shadow-xs' : ''} ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-lg ${iconColors[variant] || iconColors.default}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
