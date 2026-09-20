import React from 'react';
import { Info, Database } from 'lucide-react';

export default function DevBanner({ isDevFallback, message }) {
  if (!isDevFallback) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2 text-xs font-medium flex items-center justify-center gap-2">
      <Database className="w-4 h-4 text-amber-600 shrink-0" />
      <span>
        {message || "Development Mode — Backend API / Supabase unavailable. Showing local demo data for review."}
      </span>
    </div>
  );
}
