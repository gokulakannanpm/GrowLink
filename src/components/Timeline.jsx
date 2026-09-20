import React from 'react';
import { Calendar, AlertCircle, Award, UserCheck, BookOpen } from 'lucide-react';

export default function Timeline({ items = [] }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-xs text-slate-500 italic p-4 text-center">No timeline events logged yet.</p>
    );
  }

  const getIcon = (type, alert) => {
    if (alert) return <AlertCircle className="w-4 h-4 text-rose-600" />;
    switch (type) {
      case 'academic': return <BookOpen className="w-4 h-4 text-indigo-600" />;
      case 'mentor': return <UserCheck className="w-4 h-4 text-emerald-600" />;
      case 'activity': return <Award className="w-4 h-4 text-amber-600" />;
      default: return <Calendar className="w-4 h-4 text-slate-600" />;
    }
  };

  const getBadgeStyle = (type, alert) => {
    if (alert) return 'bg-rose-50 border-rose-200 text-rose-700';
    switch (type) {
      case 'academic': return 'bg-indigo-50 border-indigo-200 text-indigo-700';
      case 'mentor': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'activity': return 'bg-amber-50 border-amber-200 text-amber-700';
      default: return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {items.map((event, eventIdx) => (
          <li key={eventIdx}>
            <div className="relative pb-6">
              {eventIdx !== items.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className={`relative flex h-8 w-8 items-center justify-center rounded-full border shadow-2xs ${getBadgeStyle(event.type, event.alert)}`}>
                  {getIcon(event.type, event.alert)}
                </div>
                <div className="min-w-0 flex-1 bg-white p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-semibold text-slate-900">
                      {event.title}
                    </h5>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {event.date}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
