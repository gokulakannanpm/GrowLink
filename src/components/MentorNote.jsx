import React from 'react';
import { MessageSquare, Calendar, User } from 'lucide-react';

export default function MentorNote({ note }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <User className="w-3.5 h-3.5 text-indigo-600" />
          <span>{note.author}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 font-mono">
          <Calendar className="w-3 h-3" />
          <span>{note.date}</span>
        </div>
      </div>

      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        "{note.text}"
      </p>

      {note.tag && (
        <div className="pt-1 flex justify-end">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
            <MessageSquare className="w-3 h-3" />
            {note.tag}
          </span>
        </div>
      )}
    </div>
  );
}
