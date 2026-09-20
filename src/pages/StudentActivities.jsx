import React, { useState } from 'react';
import { STUDENTS_DATA } from '../data/studentsData';
import ActivitySummary from '../components/ActivitySummary';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Select from '../components/Select';
import { Trophy, Plus, CheckCircle2, Award } from 'lucide-react';

export default function StudentActivities() {
  const [student, setStudent] = useState(STUDENTS_DATA[0]); // Rahul Kumar
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Form states for new activity submission
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Hackathon');
  const [role, setRole] = useState('');

  const handleSubmitActivity = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newAct = {
      id: Date.now(),
      type,
      title: title.trim(),
      role: role.trim() || 'Participant',
      date: 'Sep 2026',
      status: 'Submitted for Verification'
    };

    setStudent(prev => ({
      ...prev,
      activityList: [newAct, ...(prev.activityList || [])]
    }));

    setTitle('');
    setRole('');
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Co-Curricular & Activity Log</h1>
          <p className="text-xs text-slate-500 mt-1">Hackathons, symposiums, workshops, online certifications and projects</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          icon={Plus}
          onClick={() => setIsSubmitModalOpen(true)}
        >
          Submit New Activity
        </Button>
      </div>

      <ActivitySummary counts={student.activitiesCount} />

      {/* Activity List */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <h2 className="text-base font-bold text-slate-900">Activity Showcase & Certificates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.activityList.map((act) => (
            <div key={act.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {act.type}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{act.date}</span>
              </div>
              
              <h3 className="text-sm font-bold text-slate-900">{act.title}</h3>
              <p className="text-xs text-slate-600">{act.role || act.organizer || act.platform || act.tech}</p>
              
              <div className="pt-2 flex justify-between items-center text-xs">
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {act.status}
                </span>
                <span className="text-slate-400 hover:text-indigo-600 cursor-pointer font-medium">View Credential →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBMIT ACTIVITY MODAL */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit New Activity / Certificate"
        subtitle="Log hackathon participation, workshop certificates or new project builds."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsSubmitModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmitActivity}>
              Submit Activity
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmitActivity} className="space-y-4">
          <Select
            label="Activity Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={[
              { value: 'Hackathon', label: 'Hackathon' },
              { value: 'Symposium', label: 'Symposium / Paper Presentation' },
              { value: 'Workshop', label: 'Technical Workshop' },
              { value: 'Course', label: 'Online Course / Certification' },
              { value: 'Project', label: 'Technical Project Showcase' }
            ]}
          />

          <Input
            label="Title / Name of Event"
            placeholder="e.g. Smart India Hackathon 2026"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            label="Role / Achievement"
            placeholder="e.g. Finalist, Team Lead, Certificate of Merit"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </form>
      </Modal>
    </div>
  );
}
