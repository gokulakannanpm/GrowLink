import React, { useState, useEffect } from 'react';
import { STUDENTS_DATA, MENTOR_INFO } from '../data/studentsData';
import StatCard from '../components/StatCard';
import CGPACard from '../components/CGPACard';
import AttendanceBar from '../components/AttendanceBar';
import AcademicTrend from '../components/AcademicTrend';
import ActivitySummary from '../components/ActivitySummary';
import SkillDevelopmentCard from '../components/SkillDevelopmentCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
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
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const student = STUDENTS_DATA[0]; // Rahul Kumar

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  // Dynamic mentor recommendation loaded from localStorage
  const [mentorRecommendation, setMentorRecommendation] = useState(null);

  useEffect(() => {
    try {
      const storedStr = localStorage.getItem('growlink_actions');
      if (storedStr) {
        const parsed = JSON.parse(storedStr);
        const rahulAction = parsed.find(a => a.studentId === 'rahul-kumar' || !a.studentId);
        if (rahulAction) {
          setMentorRecommendation(rahulAction);
        } else {
          setMentorRecommendation(student.initialActions[0]);
        }
      } else {
        setMentorRecommendation(student.initialActions[0]);
      }
    } catch {
      setMentorRecommendation(student.initialActions[0]);
    }
  }, [student.initialActions]);

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

  const totalActivities = 
    student.activitiesCount.hackathons + 
    student.activitiesCount.symposiums + 
    student.activitiesCount.workshops + 
    student.activitiesCount.projects;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Good afternoon, Rahul
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Department of {student.department} • {student.year} (Section {student.section}) • Roll: {student.studentId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            Status: Needs Attention
          </span>
        </div>
      </div>

      {/* Summary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance"
          value={`${student.attendance}%`}
          subtitle="Minimum target: 75%"
          icon={Calendar}
          variant="attention"
        />

        <StatCard
          title="CAT Average"
          value={`${student.cat.average}%`}
          subtitle={`CAT 1: ${student.cat.cat1} | CAT 2: ${student.cat.cat2}`}
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
          value={student.activitiesCount.courses}
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
                mentorRecommendation?.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                mentorRecommendation?.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                Status: {mentorRecommendation?.status || 'Pending'}
              </span>
            </div>

            <div className="bg-white rounded-lg p-4 border border-indigo-100 space-y-2">
              <p className="text-xs font-bold text-indigo-900 uppercase">
                Focus Area: {mentorRecommendation?.area || student.potentialReviewArea}
              </p>

              <p className="text-sm font-bold text-slate-900">
                "{mentorRecommendation?.action || "Focus on Integration by Parts before the next assessment."}"
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
                  <Clock className="w-3.5 h-3.5 text-indigo-600" /> Target Follow-up: <strong>{mentorRecommendation?.followUpDate || '24 Sep 2026'}</strong>
                </span>
                <span className="text-[11px] text-slate-400">Assigned by {MENTOR_INFO.name}</span>
              </div>
            </div>
          </div>

          {/* AREAS TO REVIEW SECTION */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <h2 className="text-base font-bold text-amber-950">Areas to Review</h2>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-amber-200/70">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-900">{student.potentialReviewArea}</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  Priority Review
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                "{student.reviewDescription}"
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Resource: Remedial Integration Problem Set #3</span>
                <Link to="/student/academics">
                  <span className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1">
                    Review Topic <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

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

            {/* Subject Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {student.subjects?.map((sub) => {
                const avg = Math.round((sub.cat1 + sub.cat2) / 2);
                return (
                  <div key={sub.name} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{sub.name}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">CAT 1: {sub.cat1} | CAT 2: {sub.cat2}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-indigo-700">{avg}%</span>
                      <p className="text-[10px] text-slate-400 font-mono">Avg Score</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SKILL DEVELOPMENT SECTION */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Skill Development Progress</h2>
              <p className="text-xs text-slate-500">Track coding platforms, course certifications, and project builds</p>
            </div>

            <SkillDevelopmentCard skills={student.skillDevelopment} />
          </section>

          {/* ATTENDANCE SECTION */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">Attendance Overview</h2>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                {student.attendance}% (Below 75%)
              </span>
            </div>

            <AttendanceBar percentage={student.attendance} label="Overall Cumulative Attendance" size="lg" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {student.subjects?.map((sub) => (
                <div key={sub.name} className="p-3 rounded-lg border border-slate-100 bg-slate-50/40">
                  <AttendanceBar percentage={sub.attendance} label={sub.name} size="sm" />
                </div>
              ))}
            </div>
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

            <ActivitySummary counts={student.activitiesCount} />
          </section>

        </div>

        {/* Right 1 Column (Mentor Info & Actions) */}
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

            {/* Latest recommendation */}
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 space-y-1">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Latest Recommendation</p>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{student.mentorNotes[0]?.text || 'Maintain regular attendance in all subjects.'}"
              </p>
            </div>

            {/* Next follow-up */}
            <div className="flex items-center justify-between text-xs bg-indigo-50/70 p-3 rounded-lg border border-indigo-100">
              <span className="font-semibold text-indigo-900">Next Follow-Up Date</span>
              <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                {mentorRecommendation?.followUpDate || MENTOR_INFO.nextFollowUpDate}
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
