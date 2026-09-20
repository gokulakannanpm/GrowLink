import React, { useState, useMemo } from 'react';
import StatCard from '../components/StatCard';
import StudentCard from '../components/StudentCard';
import Input from '../components/Input';
import Button from '../components/Button';
import { STUDENTS_DATA } from '../data/studentsData';
import { Users, AlertTriangle, Eye, CheckCircle2, Search, Filter } from 'lucide-react';

export default function MentorDashboard() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate summary counts
  const totalCount = STUDENTS_DATA.length;
  const attentionCount = STUDENTS_DATA.filter(s => s.status === 'Needs Attention').length;
  const monitorCount = STUDENTS_DATA.filter(s => s.status === 'Monitor').length;
  const onTrackCount = STUDENTS_DATA.filter(s => s.status === 'On Track').length;

  // Filtered student list
  const filteredStudents = useMemo(() => {
    return STUDENTS_DATA.filter((student) => {
      const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
      const matchesSearch = 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Good afternoon, Mentor
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Student Development Overview • Department of Information Technology
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
            Active Batch: II Year (2024–2028)
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={totalCount}
          subtitle="Mentored students in batch"
          icon={Users}
          variant="default"
          active={statusFilter === 'All'}
          onClick={() => setStatusFilter('All')}
        />

        <StatCard
          title="Needs Attention"
          value={attentionCount}
          subtitle="Attendance < 75% or test drop"
          icon={AlertTriangle}
          variant="attention"
          active={statusFilter === 'Needs Attention'}
          onClick={() => setStatusFilter('Needs Attention')}
        />

        <StatCard
          title="Monitor"
          value={monitorCount}
          subtitle="Moderate performance / activity"
          icon={Eye}
          variant="monitor"
          active={statusFilter === 'Monitor'}
          onClick={() => setStatusFilter('Monitor')}
        />

        <StatCard
          title="On Track"
          value={onTrackCount}
          subtitle="Consistently meeting goals"
          icon={CheckCircle2}
          variant="ontrack"
          active={statusFilter === 'On Track'}
          onClick={() => setStatusFilter('On Track')}
        />
      </div>

      {/* Filters & Roster Section Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Student Roster Overview
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredStudents.length} of {totalCount} students
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full sm:w-72">
            <Input
              type="text"
              placeholder="Search by name, ID or dept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={Search}
            />
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-100 pt-3">
          <span className="text-xs font-semibold text-slate-400 uppercase mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Status:
          </span>
          {[
            { id: 'All', label: `All (${totalCount})` },
            { id: 'Needs Attention', label: `Needs Attention (${attentionCount})` },
            { id: 'Monitor', label: `Monitor (${monitorCount})` },
            { id: 'On Track', label: `On Track (${onTrackCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Student Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-sm font-semibold text-slate-700">No students match your selected filters</p>
          <p className="text-xs text-slate-500 mt-1">Try clearing the search query or changing status filters.</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={() => { setStatusFilter('All'); setSearchQuery(''); }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
