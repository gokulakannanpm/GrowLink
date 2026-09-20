import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { STUDENTS_DATA, MENTOR_INFO } from '../data/studentsData';
import * as api from '../services/api';
import StatCard from '../components/StatCard';
import CGPACard from '../components/CGPACard';
import AttendanceBar from '../components/AttendanceBar';
import AcademicTrend from '../components/AcademicTrend';
import ActivitySummary from '../components/ActivitySummary';
import SkillDevelopmentCard from '../components/SkillDevelopmentCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import DevBanner from '../components/DevBanner';
import { 
  BookOpen, 
  Calendar, 
  Award, 
  AlertCircle, 
  UserCheck, 
  Mail, 
  Send, 
  ChevronRight,
  CheckCircle2,
  Target,
  Clock,
  Video,
  Phone,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const { user } = useAuth();
  
  const initialLocal = STUDENTS_DATA.find(s => s.id === user?.id || s.email === user?.email) || STUDENTS_DATA[0];
  const [student, setStudent] = useState(initialLocal);

  const [academics, setAcademics] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [activities, setActivities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [actions, setActions] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isDevFallback, setIsDevFallback] = useState(false);

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    async function loadStudentData() {
      setLoading(true);
      const studentTargetId = user?.id || initialLocal.id;

      try {
        const studentProfile = await api.getStudent(studentTargetId);
        setStudent(studentProfile);

        const [
          acadRes,
          attRes,
          actRes,
          skillRes,
          actionsRes,
          meetsRes
        ] = await Promise.allSettled([
          api.getStudentAcademics(studentTargetId),
          api.getStudentAttendance(studentTargetId),
          api.getStudentActivities(studentTargetId),
          api.getStudentSkills(studentTargetId),
          api.getStudentActions(studentTargetId),
          api.getStudentMeetings(studentTargetId)
        ]);

        if (acadRes.status === 'fulfilled') setAcademics(acadRes.value || []);
        if (attRes.status === 'fulfilled') setAttendance(attRes.value || []);
        if (actRes.status === 'fulfilled') setActivities(actRes.value || []);
        if (skillRes.status === 'fulfilled') setSkills(skillRes.value || []);
        if (actionsRes.status === 'fulfilled') setActions(actionsRes.value || []);
        if (meetsRes.status === 'fulfilled') setMeetings(meetsRes.value || []);

        setIsDevFallback(false);
      } catch (err) {
        console.warn('API error, using local fallback dataset:', err);
        setStudent(initialLocal);
        setAcademics(initialLocal.subjects || []);
        setAttendance(initialLocal.subjects || []);
        setActivities(initialLocal.activityList || []);
        setSkills(initialLocal.skillDevelopment || []);
        setActions(initialLocal.initialActions || []);
        setMeetings(initialLocal.meetings || []);
        setIsDevFallback(true);
      } finally {
        setLoading(false);
      }
    }

    loadStudentData();
  }, [user, initialLocal]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setMessageText('');
      setIsMessageModalOpen(false);
    }, 1500);
  };

  const totalActivities = activities.length > 0 
    ? activities.length 
    : (student.activitiesCount?.hackathons || 0) + (student.activitiesCount?.workshops || 0);

  const upcomingMeetings = meetings.filter(m => m.status === 'Scheduled');
  const pastMeetings = meetings.filter(m => m.status !== 'Scheduled');
  const latestRecommendation = actions.length > 0 ? actions[0] : (student.initialActions ? student.initialActions[0] : null);

  return (
    <div className="space-y-6">
      <DevBanner isDevFallback={isDevFallback} />

      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Good afternoon, {student.name ? student.name.split(' ')[0] : 'Rahul'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Department of {student.department} • {student.year} (Section {student.section}) • Roll: {student.student_id || student.studentId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            student.status === 'Needs Attention' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
            student.status === 'Monitor' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
            'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}>
            Status: {student.status}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600 mb-2" />
          <p className="text-sm font-semibold">Loading Student Dashboard from API...</p>
        </div>
      ) : (
        <>
          {/* Summary Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Attendance"
              value={`${student.attendance}%`}
              subtitle="Minimum target: 75%"
              icon={Calendar}
              variant={student.attendance < 75 ? 'attention' : 'ontrack'}
            />

            <StatCard
              title="CAT Average"
              value={`${student.cat?.average || 69.5}%`}
              subtitle={`CAT 1: ${student.cat?.cat1 || 78} | CAT 2: ${student.cat?.cat2 || 61}`}
              icon={BookOpen}
              variant="indigo"
            />

            <StatCard
              title="Activities"
              value={totalActivities}
              subtitle="Hackathons & Workshops"
              icon={Award}
              variant="default"
            />

            <StatCard
              title="Courses"
              value={student.activitiesCount?.courses || 5}
              subtitle="Completed Certifications"
              icon={CheckCircle2}
              variant="ontrack"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* MENTOR RECOMMENDATION CARD */}
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-indigo-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-base font-bold text-indigo-950">Mentor Recommendation</h2>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    latestRecommendation?.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                    latestRecommendation?.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    Status: {latestRecommendation?.status || 'Pending'}
                  </span>
                </div>

                <div className="bg-white rounded-lg p-4 border border-indigo-100 space-y-2">
                  <p className="text-xs font-bold text-indigo-900 uppercase">
                    Focus Area: {latestRecommendation?.area || student.potentialReviewArea || 'Integration'}
                  </p>

                  <p className="text-sm font-bold text-slate-900">
                    "{latestRecommendation?.action || latestRecommendation?.title || "Focus on Integration by Parts before the next assessment."}"
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-700">
                    <p className="font-semibold text-slate-800">Recommended Steps:</p>
                    <ul className="space-y-1 pl-1 font-medium">
                      <li className="flex items-center gap-1.5">• Review Module 3 Integral Calculus notes</li>
                      <li className="flex items-center gap-1.5">• Complete Remedial Problem Set #3</li>
                      <li className="flex items-center gap-1.5">• Discuss doubts during Thursday mentor tutorial slot</li>
                    </ul>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" /> Target Follow-up: <strong>{latestRecommendation?.followUpDate || latestRecommendation?.due_date || '24 Sep 2026'}</strong>
                    </span>
                    <span className="text-[11px] text-slate-400">Assigned by {MENTOR_INFO.name}</span>
                  </div>
                </div>
              </div>

              {/* MY MENTORING MEETINGS SECTION */}
              <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-base font-bold text-slate-900">My Mentoring Sessions</h2>
                  </div>
                  <span className="text-xs font-medium text-slate-500 font-mono">
                    {meetings.length} Total Sessions
                  </span>
                </div>

                {/* Upcoming Meetings */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Scheduled Sessions</h3>
                  {upcomingMeetings.length > 0 ? (
                    upcomingMeetings.map((meet) => (
                      <div key={meet.id} className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-indigo-950">{meet.meeting_type}</span>
                            <span className="px-2 py-0.5 rounded bg-white text-indigo-700 border border-indigo-200 font-medium text-[10px]">
                              {meet.mode}
                            </span>
                          </div>
                          <p className="text-slate-600 mt-1">Agenda: {meet.agenda || 'Academic performance review'}</p>
                        </div>
                        <div className="text-left sm:text-right shrink-0">
                          <p className="font-bold text-slate-900">{meet.scheduled_date}</p>
                          <p className="text-slate-500 text-[11px]">{meet.scheduled_time || '02:00 PM'}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-lg border border-slate-100">No upcoming mentoring sessions scheduled.</p>
                  )}
                </div>

                {/* Past Meetings */}
                {pastMeetings.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Completed Sessions</h3>
                    {pastMeetings.map((meet) => (
                      <div key={meet.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{meet.meeting_type} ({meet.mode})</span>
                          <span className="text-slate-400 font-mono text-[11px]">{meet.scheduled_date}</span>
                        </div>
                        {meet.discussion_summary && (
                          <p className="text-slate-600">"{meet.discussion_summary}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* ACADEMIC PERFORMANCE & CGPA */}
              <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-base font-bold text-slate-900">Academic Performance & CGPA</h2>
                  </div>
                  <Link to="/student/academics">
                    <Button variant="ghost" size="sm" icon={ChevronRight}>View Details</Button>
                  </Link>
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
              </section>

              {/* SKILL DEVELOPMENT SECTION */}
              <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">Skill Development Progress</h2>
                  <p className="text-xs text-slate-500">Track coding platforms, course certifications, and project builds</p>
                </div>

                <SkillDevelopmentCard skills={skills.length > 0 ? skills : initialLocal.skillDevelopment} />
              </section>

              {/* ATTENDANCE SECTION */}
              <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-base font-bold text-slate-900">Attendance Overview</h2>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    student.attendance < 75 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {student.attendance}% {student.attendance < 75 ? '(Below 75%)' : ''}
                  </span>
                </div>

                <AttendanceBar percentage={student.attendance} label="Overall Cumulative Attendance" size="lg" />
              </section>

              {/* ACTIVITY SUMMARY */}
              <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <h2 className="text-base font-bold text-slate-900">Activity Summary</h2>
                  </div>
                  <Link to="/student/activities">
                    <Button variant="ghost" size="sm" icon={ChevronRight}>Activity Log</Button>
                  </Link>
                </div>

                <ActivitySummary counts={student.activitiesCount || initialLocal.activitiesCount} />
              </section>

            </div>

            {/* Right 1 Column */}
            <div className="space-y-6">
              
              {/* MENTOR INFO CARD */}
              <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <UserCheck className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-base font-bold text-slate-900">Assigned Academic Mentor</h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-800 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    SR
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{MENTOR_INFO.name}</h3>
                    <p className="text-xs text-slate-500">{MENTOR_INFO.title}</p>
                    <p className="text-[11px] text-indigo-600 font-medium mt-0.5">{MENTOR_INFO.email}</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 space-y-1">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Latest Recommendation</p>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{initialLocal.mentorNotes ? initialLocal.mentorNotes[0]?.text : 'Maintain regular attendance in all subjects.'}"
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs bg-indigo-50/70 p-3 rounded-lg border border-indigo-100">
                  <span className="font-semibold text-indigo-900">Next Follow-Up Date</span>
                  <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                    {latestRecommendation?.followUpDate || latestRecommendation?.due_date || MENTOR_INFO.nextFollowUpDate}
                  </span>
                </div>

                <Button 
                  variant="outline" 
                  size="md" 
                  className="w-full"
                  icon={Mail}
                  onClick={() => setIsMessageModalOpen(true)}
                >
                  Contact Mentor
                </Button>
              </section>

              {/* QUICK LINKS */}
              <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h3>
                <div className="space-y-2 text-xs">
                  <Link to="/student/academics" className="block p-3 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-between">
                    <span>View Full Subject Marks</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                  <Link to="/student/activities" className="block p-3 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-between">
                    <span>Submit Activity Certificate</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </div>
              </section>

            </div>
          </div>
        </>
      )}

      {/* CONTACT MENTOR MODAL */}
      <Modal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        title={`Message ${MENTOR_INFO.name}`}
        subtitle="Send a direct academic query or schedule office hours appointment."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsMessageModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" icon={Send} onClick={handleSendMessage}>
              Send Message
            </Button>
          </>
        }
      >
        {messageSent ? (
          <div className="p-6 text-center text-emerald-700 space-y-2">
            <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600" />
            <p className="font-bold text-sm">Message Sent Successfully!</p>
            <p className="text-xs text-slate-500">Your mentor will be notified for the next follow-up slot.</p>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Subject
              </label>
              <input 
                type="text" 
                defaultValue="Remedial Math Query & Office Hours Request"
                className="w-full text-xs rounded-lg border border-slate-300 p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Message Body
              </label>
              <textarea
                rows={4}
                required
                className="w-full text-xs rounded-lg border border-slate-300 p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Write your query or request..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
