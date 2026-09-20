import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { STUDENTS_DATA, MENTOR_INFO } from '../data/studentsData';
import StatusBadge from '../components/StatusBadge';
import AttendanceBar from '../components/AttendanceBar';
import AcademicTrend from '../components/AcademicTrend';
import CGPACard from '../components/CGPACard';
import SkillDevelopmentCard from '../components/SkillDevelopmentCard';
import AssessmentIntelligenceModal from '../components/AssessmentIntelligenceModal';
import MentorActionModal from '../components/MentorActionModal';
import WeeklyReviewSection from '../components/WeeklyReviewSection';
import ActivitySummary from '../components/ActivitySummary';
import Timeline from '../components/Timeline';
import MentorNote from '../components/MentorNote';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Select from '../components/Select';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle, 
  Calendar, 
  MessageSquare, 
  AlertCircle,
  Plus,
  Brain,
  Sparkles,
  Phone,
  Mail,
  Target,
  CheckCircle2
} from 'lucide-react';

export default function MentorStudentDetail() {
  const { id } = useParams();
  
  const initialStudent = STUDENTS_DATA.find(s => s.id === id) || STUDENTS_DATA[0];
  const [student, setStudent] = useState(initialStudent);

  // Mentor Actions state loaded from localStorage
  const [mentorActions, setMentorActions] = useState([]);
  const [actionModalInitialData, setActionModalInitialData] = useState(null);

  // Modal open states
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  // Note form state
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteTag, setNewNoteTag] = useState('Academic Guidance');

  // Load actions from localStorage
  useEffect(() => {
    try {
      const storedStr = localStorage.getItem('growlink_actions');
      if (storedStr) {
        const parsed = JSON.parse(storedStr);
        const filtered = parsed.filter(a => a.studentId === student.id || !a.studentId);
        setMentorActions(filtered.length > 0 ? filtered : student.initialActions || []);
      } else {
        setMentorActions(student.initialActions || []);
      }
    } catch {
      setMentorActions(student.initialActions || []);
    }
  }, [student.id, student.initialActions]);

  const handleActionSaved = (savedAction) => {
    setMentorActions(prev => {
      const existsIdx = prev.findIndex(a => a.id === savedAction.id);
      if (existsIdx >= 0) {
        const copy = [...prev];
        copy[existsIdx] = savedAction;
        return copy;
      }
      return [savedAction, ...prev];
    });
  };

  const handleOpenActionModalWithData = (data = null) => {
    setActionModalInitialData(data);
    setIsActionModalOpen(true);
  };

  const handleAddNoteSubmit = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNoteObj = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: MENTOR_INFO.name,
      text: newNoteText.trim(),
      tag: newNoteTag
    };

    setStudent(prev => ({
      ...prev,
      mentorNotes: [newNoteObj, ...(prev.mentorNotes || [])]
    }));

    setNewNoteText('');
    setIsAddNoteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/mentor/students">
          <Button variant="ghost" size="sm" icon={ArrowLeft}>
            Back to Roster
          </Button>
        </Link>
        <span className="text-xs text-slate-400 font-mono">ID: {student.studentId}</span>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <img 
              src={student.avatar} 
              alt={student.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 bg-slate-100" 
            />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {student.name}
                </h1>
                <StatusBadge status={student.status} size="lg" />
              </div>
              <p className="text-sm text-slate-600 font-medium mt-0.5">
                {student.department} • {student.year} (Section {student.section})
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {student.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {student.phone}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="md" 
              icon={Plus}
              onClick={() => handleOpenActionModalWithData()}
            >
              Add Mentor Action
            </Button>
            <Button 
              variant="primary" 
              size="md" 
              icon={Brain}
              onClick={() => setIsAnalysisModalOpen(true)}
            >
              Analyze Assessment
            </Button>
          </div>
        </div>

        {/* Highlight flag if present */}
        {student.potentialReviewArea && (
          <div className="mt-5 p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-900">
                Potential Area for Review: <span className="underline decoration-amber-400">{student.potentialReviewArea}</span>
              </p>
              <p className="text-xs text-amber-800 mt-0.5">
                {student.reviewDescription}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Grid Layout: Left Column (Academics, CGPA, Weekly Review) | Right Column (Actions, Notes, Timeline) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 spans on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* ACADEMICS SECTION (CGPA + CAT) */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-slate-900">Academic Performance & CGPA</h2>
              </div>
              <span className="text-xs font-medium text-slate-500">Cumulative & CAT Analysis</span>
            </div>

            {/* CGPA Card & Academic Trend Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CGPACard 
                currentCGPA={student.currentCGPA}
                previousCGPA={student.previousCGPA}
                cgpaTrend={student.cgpaTrend}
              />
              <AcademicTrend 
                cat1={student.cat.cat1} 
                cat2={student.cat.cat2} 
                average={student.cat.average} 
              />
            </div>

            {/* Subject Breakdown Table */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2">Subject-wise Assessment Marks</h3>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="p-3">Subject</th>
                      <th className="p-3 text-center">CAT 1 (100)</th>
                      <th className="p-3 text-center">CAT 2 (100)</th>
                      <th className="p-3 text-center">Average</th>
                      <th className="p-3 text-right">Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.subjects?.map((sub) => {
                      const avg = Math.round((sub.cat1 + sub.cat2) / 2);
                      return (
                        <tr key={sub.name} className="hover:bg-slate-50/70">
                          <td className="p-3 font-semibold text-slate-800">{sub.name}</td>
                          <td className="p-3 text-center text-slate-700">{sub.cat1}</td>
                          <td className="p-3 text-center text-slate-700">{sub.cat2}</td>
                          <td className="p-3 text-center font-bold text-indigo-700">{avg}%</td>
                          <td className="p-3 text-right">
                            <span className={`px-2 py-0.5 rounded font-mono text-[11px] ${
                              sub.attendance < 75 ? 'bg-rose-100 text-rose-800 font-bold' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {sub.attendance}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* WEEKLY DEVELOPMENT REVIEW SECTION */}
          <WeeklyReviewSection 
            student={student} 
            onAddAction={() => handleOpenActionModalWithData({ area: student.potentialReviewArea || "Integration" })} 
          />

          {/* ATTENDANCE SECTION */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">Attendance Tracker</h2>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                student.attendance < 75 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                Overall: {student.attendance}%
              </span>
            </div>

            <AttendanceBar percentage={student.attendance} label="Overall Cumulative Attendance" size="lg" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {student.subjects?.map((sub) => (
                <div key={sub.name} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                  <AttendanceBar percentage={sub.attendance} label={sub.name} size="sm" />
                </div>
              ))}
            </div>
          </section>

          {/* SKILL DEVELOPMENT SECTION */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Skill Development Activity</h2>
              <p className="text-xs text-slate-500">Cross-platform progress across coding, courses, and technical workshops</p>
            </div>

            <SkillDevelopmentCard skills={student.skillDevelopment} />
          </section>

          {/* ASSESSMENT INTELLIGENCE TRIGGER CARD */}
          <section className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Assessment Intelligence</h3>
                  <p className="text-xs text-slate-400">Diagnostic review of recent exam responses and learning patterns</p>
                </div>
              </div>
              <Button 
                variant="primary" 
                size="sm"
                icon={Sparkles}
                onClick={() => setIsAnalysisModalOpen(true)}
              >
                Analyze Assessment
              </Button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upload assessment papers to map question accuracy against syllabus modules and generate mentor follow-up actions.
            </p>
          </section>

        </div>

        {/* Right Column (1 span on desktop) */}
        <div className="space-y-6">
          
          {/* SAVED MENTOR ACTIONS SECTION */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-slate-900">Mentor Actions & Follow-ups</h2>
              </div>
              <button 
                onClick={() => handleOpenActionModalWithData()}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> New
              </button>
            </div>

            <div className="space-y-3">
              {mentorActions && mentorActions.length > 0 ? (
                mentorActions.map((act) => (
                  <div key={act.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-950 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {act.area}
                      </span>
                      <span className={`px-2 py-0.5 rounded font-medium ${
                        act.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        act.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {act.status}
                      </span>
                    </div>

                    <p className="font-bold text-slate-900">{act.action}</p>

                    {act.notes && (
                      <p className="text-slate-600 italic bg-white p-2 rounded border border-slate-100">
                        "{act.notes}"
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/50">
                      <span>Follow-up: <strong className="text-slate-700">{act.followUpDate}</strong></span>
                      <button 
                        onClick={() => handleOpenActionModalWithData(act)}
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No active follow-up actions recorded.</p>
              )}
            </div>
          </section>

          {/* MENTOR NOTES SECTION */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-slate-900">Mentor Observation Notes</h2>
              </div>
              <button 
                onClick={() => setIsAddNoteModalOpen(true)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            <div className="space-y-3">
              {student.mentorNotes?.map((note) => (
                <MentorNote key={note.id} note={note} />
              ))}
            </div>
          </section>

          {/* DEVELOPMENT TIMELINE */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Development Timeline</h2>
            </div>
            <Timeline items={student.timeline} />
          </section>

        </div>
      </div>

      {/* ASSESSMENT INTELLIGENCE MODAL FLOW */}
      <AssessmentIntelligenceModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        student={student}
        onAddMentorAction={(actionData) => handleOpenActionModalWithData(actionData)}
      />

      {/* MENTOR ACTION MODAL */}
      <MentorActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        studentId={student.id}
        initialData={actionModalInitialData}
        onActionSaved={handleActionSaved}
      />

      {/* ADD MENTOR NOTE MODAL */}
      <Modal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
        title={`Add Mentor Note for ${student.name}`}
        subtitle="This note will be recorded in the student development log."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddNoteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddNoteSubmit}>
              Save Note
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddNoteSubmit} className="space-y-4">
          <Select
            label="Note Category"
            value={newNoteTag}
            onChange={(e) => setNewNoteTag(e.target.value)}
            options={[
              { value: 'Academic Guidance', label: 'Academic Guidance' },
              { value: 'Attendance Notice', label: 'Attendance Notice' },
              { value: 'Skill Development', label: 'Skill Development' },
              { value: 'Career Counseling', label: 'Career Counseling' }
            ]}
          />

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Observation Details
            </label>
            <textarea
              rows={4}
              required
              className="w-full rounded-lg border border-slate-300 text-sm p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Record observation..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
