import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { STUDENTS_DATA } from '../data/studentsData';
import StatusBadge from '../components/StatusBadge';
import AttendanceBar from '../components/AttendanceBar';
import AcademicTrend from '../components/AcademicTrend';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import { Search, ChevronRight, LayoutGrid, List } from 'lucide-react';

export default function MentorStudentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'

  const filteredStudents = useMemo(() => {
    return STUDENTS_DATA.filter((student) => {
      const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
      const matchesSearch = 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.department.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'attendance') return b.attendance - a.attendance;
      if (sortBy === 'cat') return b.cat.average - a.cat.average;
      return a.name.localeCompare(b.name);
    });
  }, [statusFilter, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mentored Students Roster</h1>
          <p className="text-xs text-slate-500 mt-1">Detailed list of students in Information Technology department</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-slate-200/70 p-1 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
              viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-4 h-4" /> Table
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
              viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Cards
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input
          placeholder="Search by student name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={Search}
        />

        <Select
          label="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: 'All', label: 'All Statuses' },
            { value: 'Needs Attention', label: 'Needs Attention' },
            { value: 'Monitor', label: 'Monitor' },
            { value: 'On Track', label: 'On Track' }
          ]}
        />

        <Select
          label="Sort By"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          options={[
            { value: 'name', label: 'Student Name (A-Z)' },
            { value: 'attendance', label: 'Highest Attendance' },
            { value: 'cat', label: 'Highest CAT Score' }
          ]}
        />
      </div>

      {/* Roster Table View */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Student Details</th>
                  <th className="px-6 py-3.5">Dept / Sec</th>
                  <th className="px-6 py-3.5">Attendance</th>
                  <th className="px-6 py-3.5">CAT Avg</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={student.avatar} 
                          alt={student.name} 
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-400 font-mono">{student.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">
                      <p className="font-medium text-slate-800">{student.department}</p>
                      <p className="text-slate-500">{student.year} • Sec {student.section}</p>
                    </td>
                    <td className="px-6 py-4 w-48">
                      <AttendanceBar percentage={student.attendance} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <AcademicTrend cat1={student.cat.cat1} cat2={student.cat.cat2} average={student.cat.average} compact={true} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={student.status} size="sm" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/mentor/students/${student.id}`}>
                        <Button variant="outline" size="sm" icon={ChevronRight}>
                          Profile
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover border" />
                  <div>
                    <h4 className="font-semibold text-slate-900">{student.name}</h4>
                    <p className="text-xs text-slate-500">{student.year} ({student.section}) • {student.studentId}</p>
                  </div>
                </div>
                <StatusBadge status={student.status} size="sm" />
              </div>
              <AttendanceBar percentage={student.attendance} label="Attendance" />
              <AcademicTrend cat1={student.cat.cat1} cat2={student.cat.cat2} average={student.cat.average} compact={true} />
              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <Link to={`/mentor/students/${student.id}`}>
                  <Button variant="outline" size="sm" icon={ChevronRight}>View Profile</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
