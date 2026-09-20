import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { STUDENTS_DATA, MENTOR_INFO, getStudentMeetings } from '../data/studentsData';
import * as api from '../services/api';
import StatusBadge from '../components/StatusBadge';
import AttendanceBar from '../components/AttendanceBar';
import AcademicTrend from '../components/AcademicTrend';
import CGPACard from '../components/CGPACard';
import SkillDevelopmentCard from '../components/SkillDevelopmentCard';
import AssessmentIntelligenceModal from '../components/AssessmentIntelligenceModal';
import MentorActionModal from '../components/MentorActionModal';
import WeeklyReviewSection from '../components/WeeklyReviewSection';
import MeetingModal from '../components/MeetingModal';
import ActivitySummary from '../components/ActivitySummary';
import Timeline from '../components/Timeline';
import MentorNote from '../components/MentorNote';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Select from '../components/Select';
import DevBanner from '../components/DevBanner';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle, 
  Calendar, 
  MessageSquare, 
  AlertCircle,
  Plus,
  Brain,
  Phone,
  Mail,
  Target,
  Clock,
  Video,
  UserCheck,
  Edit3,
  Loader2
} from 'lucide-react';

export default function MentorStudentDetail() {
  const { id } = useParams();
  
  const initialLocal = STUDENTS_DATA.find(s => s.id === id) || STUDENTS_DATA[0];
  const [student, setStudent] = useState(initialLocal);

  // Related resources state
  const [academics, setAcademics] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [activities, setActivities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [notes, setNotes] = useState([]);
  const [actions, setActions] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [weeklyReview, setWeeklyReview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [isDevFallback, setIsDevFallback] = useState(false);

  // Modal open states
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetingModalMode, setMeetingModalMode] = useState('schedule');
  const [selectedMeetingData, setSelectedMeetingData] = useState(null);
  const [actionModalInitialData, setActionModalInitialData] = useState(null);

  // Note form state
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteTag, setNewNoteTag] = useState('Academic Guidance');

  // Load profile & related resources from API (with fallback)
  useEffect(() => {
    async function loadStudentProfileData() {
      setLoading(true);
      try {
        const studentProfile = await api.getStudent(id);
        setStudent(studentProfile);

        // Concurrent API requests for related resources
        const [
          acadRes,
          attRes,
          actRes,
          skillRes,
          notesRes,
          actionsRes,
          meetsRes,
          revRes
        ] = await Promise.allSettled([
          api.getStudentAcademics(id),
          api.getStudentAttendance(id),
          api.getStudentActivities(id),
          api.getStudentSkills(id),
          api.getStudentNotes(id),
          api.getStudentActions(id),
          api.getStudentMeetings(id),
          api.getWeeklyReview(id)
        ]);

        if (acadRes.status === 'fulfilled') setAcademics(acadRes.value || []);
        if (attRes.status === 'fulfilled') setAttendance(attRes.value || []);
        if (actRes.status === 'fulfilled') setActivities(actRes.value || []);
        if (skillRes.status === 'fulfilled') setSkills(skillRes.value || []);
        if (notesRes.status === 'fulfilled') setNotes(notesRes.value || []);
        if (actionsRes.status === 'fulfilled') setActions(actionsRes.value || []);
        if (meetsRes.status === 'fulfilled') setMeetings(meetsRes.value || []);
        if (revRes.status === 'fulfilled') setWeeklyReview(revRes.value || null);

        setIsDevFallback(false);
      } catch (err) {
        console.warn('API connection unconfigured or failed, using development fallback:', err);
        setStudent(initialLocal);
        setAcademics(initialLocal.subjects || []);
        setAttendance(initialLocal.subjects || []);
        setActivities(initialLocal.activityList || []);
        setSkills(initialLocal.skillDevelopment || []);
        setNotes(initialLocal.mentorNotes || []);
        setActions(initialLocal.initialActions || []);
        setMeetings(getStudentMeetings(initialLocal.id));
        setWeeklyReview(initialLocal.weeklyReview || null);
        setIsDevFallback(true);
      } finally {
        setLoading(false);
      }
    }

    loadStudentProfileData();
  }, [id]);

  const refreshMeetings = async () => {
    try {
      const freshMeets = await api.getStudentMeetings(student.id);
      setMeetings(freshMeets || []);
    } catch {
      setMeetings(getStudentMeetings(student.id));
    }
  };

  const handleMeetingSaved = async () => {
    await refreshMeetings();
  };

  const handleMeetingDeleted = async () => {
    await refreshMeetings();
  };

  const handleOpenScheduleMeeting = () => {
    setSelectedMeetingData(null);
    setMeetingModalMode('schedule');
    setIsMeetingModalOpen(true);
  };

  const handleOpenLogMeeting = () => {
    setSelectedMeetingData(null);
    setMeetingModalMode('log');
    setIsMeetingModalOpen(true);
  };

  const handleOpenUpdateMeeting = (meeting) => {
    setSelectedMeetingData(meeting);
    setMeetingModalMode('update');
    setIsMeetingModalOpen(true);
  };

  const handleActionSaved = async (savedAction) => {
    try {
      const freshActions = await api.getStudentActions(student.id);
      setActions(freshActions || []);
    } catch {
      setActions(prev => {
        const idx = prev.findIndex(a => a.id === savedAction.id);
        if (idx >= 0) { const c = [...prev]; c[idx] = savedAction; return c; }
        return [savedAction, ...prev];
      });
    }
  };

  const handleOpenActionModalWithData = (data = null) => {
    setActionModalInitialData(data);
    setIsActionModalOpen(true);
  };

  const handleAddNoteSubmit = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    try {
      const created = await api.createStudentNote(student.id, {
        note: newNoteText.trim(),
        tag: newNoteTag
      });
      setNotes(prev => [created, ...prev]);
    } catch {
      const localObj = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        author: MENTOR_INFO.name,
        text: newNoteText.trim(),
        tag: newNoteTag
      };
      setNotes(prev => [localObj, ...prev]);
    }

    setNewNoteText('');
    setIsAddNoteModalOpen(false);
  };

  const scheduledMeetings = meetings.filter(m => m.status === 'Scheduled');
  const pastMeetings = meetings.filter(m => m.status !== 'Scheduled');

  return (
    <div className="space-y-6">
      <DevBanner isDevFallback={isDevFallback} />

      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/mentor/students">
          <Button variant="ghost" size="sm" icon={ArrowLeft}>
            Back to Roster
          </Button>
        </Link>
        <span className="text-xs text-slate-400 font-mono">ID: {student.student_id || student.studentId}</span>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600 mb-2" />
          <p className="text-sm font-semibold">Loading Student Details from API...</p>
        </div>
      ) : (
        <>
          {/* Profile Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <img 
                  src={student.avatar || student.avatar_url || initialLocal.avatar} 
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
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {student.phone || '+91 98765 43210'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Button 
                  variant="outline" 
                  size="sm" 
                  icon={Phone}
                  onClick={handleOpenLogMeeting}
                >
                  Log External Call
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  icon={Calendar}
                  onClick={handleOpenScheduleMeeting}
                >
                  Schedule Session
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  icon={Brain}
                  onClick={() => setIsAnalysisModalOpen(true)}
                >
                  Analyze Assessment
                </Button>
              </div>
            </div>

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

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (2 spans on desktop) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* MENTORING MEETINGS SECTION */}
              <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                      <Calendar className="w-4 h-4" />
                    </span>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Mentoring Sessions & Logged Meetings</h2>
                      <p className="text-xs text-slate-500">In-person, phone calls, and online review sessions</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" icon={Phone} onClick={handleOpenLogMeeting}>
                      Log Phone/Offline
                    </Button>
                    <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenScheduleMeeting}>
                      Schedule Meeting
                    </Button>
                  </div>
                </div>

                {/* Scheduled Meetings */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Upcoming Scheduled Meetings ({scheduledMeetings.length})
                  </h3>
                  {scheduledMeetings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {scheduledMeetings.map((meet) => (
                        <div key={meet.id} className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-indigo-950 bg-white px-2 py-0.5 rounded border border-indigo-200">
                              {meet.meeting_type}
                            </span>
                            <span className="flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                              {meet.mode === 'Phone' ? <Phone className="w-3 h-3 text-indigo-600" /> : meet.mode === 'Online' ? <Video className="w-3 h-3 text-indigo-600" /> : <UserCheck className="w-3 h-3 text-indigo-600" />}
                              {meet.mode}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            <span>{meet.scheduled_date} at {meet.scheduled_time || '02:00 PM'}</span>
                          </div>

                          {meet.agenda && (
                            <p className="text-slate-600 leading-relaxed bg-white p-2 rounded border border-slate-100">
                              <strong>Agenda:</strong> {meet.agenda}
                            </p>
                          )}

                          <div className="pt-1 flex justify-end">
                            <Button variant="outline" size="sm" icon={Edit3} onClick={() => handleOpenUpdateMeeting(meet)}>
                              Log Outcome / Complete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-lg border border-slate-100">No upcoming meetings scheduled.</p>
                  )}
                </div>

                {/* Past / Logged Meetings */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Recent / Logged Interactions ({pastMeetings.length})
                  </h3>
                  {pastMeetings.length > 0 ? (
                    <div className="space-y-2">
                      {pastMeetings.map((meet) => (
                        <div key={meet.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">{meet.meeting_type}</span>
                              <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-mono">
                                {meet.mode}
                              </span>
                            </div>
                            <span className="text-slate-400 font-mono text-[11px]">{meet.scheduled_date}</span>
                          </div>

                          {meet.discussion_summary && (
                            <p className="text-slate-700 leading-relaxed">
                              <strong>Summary:</strong> "{meet.discussion_summary}"
                            </p>
                          )}

                          {meet.outcome && (
                            <div className="p-2 rounded bg-emerald-50 border border-emerald-100 text-emerald-950">
                              <strong>Outcome:</strong> {meet.outcome}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No past meeting logs recorded.</p>
                  )}
                </div>
              </section>

              {/* ACADEMICS SECTION */}
              <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-base font-bold text-slate-900">Academic Performance & CGPA</h2>
                  </div>
                  <span className="text-xs font-medium text-slate-500">Cumulative & CAT Analysis</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CGPACard 
                    currentCGPA={student.cgpa || student.currentCGPA || 8.42}
                    previousCGPA={student.previous_cgpa || student.previousCGPA || 8.18}
                    cgpaTrend={student.cgpa_trend || student.cgpaTrend || "+0.24"}
                  />
                  <AcademicTrend 
                    cat1={student.cat?.cat1 || 78} 
                    cat2={student.cat?.cat2 || 61} 
                    average={student.cat?.average || 69.5} 
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
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(academics.length > 0 ? academics : initialLocal.subjects || []).map((sub) => {
                          const avg = sub.average || Math.round(((sub.cat1 || 0) + (sub.cat2 || 0)) / 2);
                          return (
                            <tr key={sub.name || sub.subject} className="hover:bg-slate-50/70">
                              <td className="p-3 font-semibold text-slate-800">{sub.name || sub.subject}</td>
                              <td className="p-3 text-center text-slate-700">{sub.cat1}</td>
                              <td className="p-3 text-center text-slate-700">{sub.cat2}</td>
                              <td className="p-3 text-center font-bold text-indigo-700">{avg}%</td>
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
              </section>

              {/* SKILL DEVELOPMENT SECTION */}
              <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">Skill Development Activity</h2>
                  <p className="text-xs text-slate-500">Cross-platform progress across coding, courses, and technical workshops</p>
                </div>

                <SkillDevelopmentCard skills={skills.length > 0 ? skills : initialLocal.skillDevelopment} />
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
                  {(actions.length > 0 ? actions : initialLocal.initialActions || []).map((act) => (
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

                      <p className="font-bold text-slate-900">{act.action || act.title}</p>

                      {(act.notes || act.description) && (
                        <p className="text-slate-600 italic bg-white p-2 rounded border border-slate-100">
                          "{act.notes || act.description}"
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/50">
                        <span>Follow-up: <strong className="text-slate-700">{act.followUpDate || act.due_date || '2026-09-24'}</strong></span>
                        <button 
                          onClick={() => handleOpenActionModalWithData(act)}
                          className="text-indigo-600 hover:underline font-medium"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
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
                  {(notes.length > 0 ? notes : initialLocal.mentorNotes || []).map((note) => (
                    <MentorNote key={note.id} note={{
                      author: note.author || MENTOR_INFO.name,
                      date: note.date || note.created_at || 'Sep 2026',
                      text: note.text || note.note,
                      tag: note.tag
                    }} />
                  ))}
                </div>
              </section>

              {/* DEVELOPMENT TIMELINE */}
              <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">Development Timeline</h2>
                </div>
                <Timeline items={initialLocal.timeline} />
              </section>

            </div>
          </div>
        </>
      )}

      {/* MEETING MODAL (Schedule, Log External Call, Update, Delete) */}
      <MeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        studentId={student.id}
        studentName={student.name}
        initialMode={meetingModalMode}
        initialMeetingData={selectedMeetingData}
        onMeetingSaved={handleMeetingSaved}
        onMeetingDeleted={handleMeetingDeleted}
      />

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
