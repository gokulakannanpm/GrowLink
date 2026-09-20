import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import * as api from '../services/api';
import { Calendar, Phone, Video, Users, CheckCircle2, Clock, Trash2 } from 'lucide-react';

export default function MeetingModal({ 
  isOpen, 
  onClose, 
  studentId, 
  studentName = '',
  initialMode = 'schedule', // 'schedule' | 'log' | 'update'
  initialMeetingData = null,
  onMeetingSaved,
  onMeetingDeleted
}) {
  const [modalMode, setModalMode] = useState(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Fields
  const [meetingType, setMeetingType] = useState('Academic Follow-up');
  const [mode, setMode] = useState('In-person');
  const [scheduledDate, setScheduledDate] = useState('2026-09-24');
  const [scheduledTime, setScheduledTime] = useState('02:30 PM');
  const [status, setStatus] = useState('Scheduled');
  const [agenda, setAgenda] = useState('');
  const [discussionSummary, setDiscussionSummary] = useState('');
  const [outcome, setOutcome] = useState('');
  const [actionItems, setActionItems] = useState('');
  const [followUpDate, setFollowUpDate] = useState('2026-09-28');

  useEffect(() => {
    setModalMode(initialMode);
    if (initialMeetingData) {
      if (initialMeetingData.meeting_type) setMeetingType(initialMeetingData.meeting_type);
      if (initialMeetingData.mode) setMode(initialMeetingData.mode);
      if (initialMeetingData.scheduled_date) setScheduledDate(initialMeetingData.scheduled_date);
      if (initialMeetingData.scheduled_time) setScheduledTime(initialMeetingData.scheduled_time);
      if (initialMeetingData.status) setStatus(initialMeetingData.status);
      if (initialMeetingData.agenda) setAgenda(initialMeetingData.agenda || '');
      if (initialMeetingData.discussion_summary) setDiscussionSummary(initialMeetingData.discussion_summary || '');
      if (initialMeetingData.outcome) setOutcome(initialMeetingData.outcome || '');
      if (initialMeetingData.action_items) setActionItems(initialMeetingData.action_items || '');
      if (initialMeetingData.follow_up_date) setFollowUpDate(initialMeetingData.follow_up_date || '2026-09-28');
    } else {
      if (initialMode === 'log') {
        setStatus('Completed');
        setMode('Phone');
        setMeetingType('Performance Review');
      } else {
        setStatus('Scheduled');
        setMode('In-person');
      }
    }
  }, [initialMode, initialMeetingData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      meeting_type: meetingType,
      mode: mode,
      scheduled_date: scheduledDate,
      scheduled_time: scheduledTime,
      status: modalMode === 'log' ? 'Completed' : status,
      agenda: agenda.trim(),
      discussion_summary: discussionSummary.trim(),
      outcome: outcome.trim(),
      action_items: actionItems.trim(),
      follow_up_date: followUpDate,
    };

    let resultMeeting = null;

    try {
      if (initialMeetingData?.id && !initialMeetingData.id.startsWith('meet-')) {
        // Update via API
        resultMeeting = await api.updateMeeting(initialMeetingData.id, payload);
      } else if (modalMode === 'update' && initialMeetingData?.id) {
        resultMeeting = await api.updateMeeting(initialMeetingData.id, payload);
      } else {
        // Create via API
        resultMeeting = await api.createMeeting(studentId, payload);
      }
    } catch (err) {
      console.warn('API operation failed, updating local fallback storage:', err);
      // Fallback local persistence
      resultMeeting = {
        id: initialMeetingData?.id || `meet-${Date.now()}`,
        student_id: studentId,
        ...payload
      };
      try {
        const stored = localStorage.getItem('growlink_meetings');
        let meetings = stored ? JSON.parse(stored) : [];
        const idx = meetings.findIndex(m => m.id === resultMeeting.id);
        if (idx >= 0) meetings[idx] = resultMeeting;
        else meetings = [resultMeeting, ...meetings];
        localStorage.setItem('growlink_meetings', JSON.stringify(meetings));
      } catch (lErr) {
        console.error('LocalStorage write error:', lErr);
      }
    } finally {
      setIsSubmitting(false);
    }

    if (onMeetingSaved && resultMeeting) {
      onMeetingSaved(resultMeeting);
    }

    onClose();
  };

  const handleDelete = async () => {
    if (!initialMeetingData?.id) return;
    setIsDeleting(true);

    try {
      await api.deleteMeeting(initialMeetingData.id);
    } catch (err) {
      console.warn('API delete failed, updating local storage:', err);
      try {
        const stored = localStorage.getItem('growlink_meetings');
        if (stored) {
          const meetings = JSON.parse(stored).filter(m => m.id !== initialMeetingData.id);
          localStorage.setItem('growlink_meetings', JSON.stringify(meetings));
        }
      } catch {
        // Ignore
      }
    } finally {
      setIsDeleting(false);
    }

    if (onMeetingDeleted) {
      onMeetingDeleted(initialMeetingData.id);
    }

    onClose();
  };

  const getTitle = () => {
    if (modalMode === 'schedule') return `Schedule Mentoring Session ${studentName ? `with ${studentName}` : ''}`;
    if (modalMode === 'log') return `Log External / Phone Meeting ${studentName ? `with ${studentName}` : ''}`;
    return `Update Meeting Record ${studentName ? `— ${studentName}` : ''}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getTitle()}
      subtitle="Record mentoring interactions, agendas, and outcome follow-ups via FastAPI backend."
      maxWidth="max-w-xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div>
            {modalMode === 'update' && initialMeetingData?.id && (
              <Button 
                variant="danger" 
                size="sm" 
                icon={Trash2} 
                disabled={isDeleting}
                onClick={handleDelete}
              >
                {isDeleting ? 'Deleting...' : 'Delete Meeting'}
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Saving...' : modalMode === 'schedule' ? 'Save Scheduled Meeting' : modalMode === 'log' ? 'Log Completed Meeting' : 'Update Meeting'}
            </Button>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mode Selector Header */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setModalMode('schedule'); setStatus('Scheduled'); }}
            className={`flex-1 py-1.5 rounded transition-colors ${
              modalMode === 'schedule' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
            }`}
          >
            📅 Schedule Meeting
          </button>
          <button
            type="button"
            onClick={() => { setModalMode('log'); setStatus('Completed'); }}
            className={`flex-1 py-1.5 rounded transition-colors ${
              modalMode === 'log' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
            }`}
          >
            📞 Log External / Phone
          </button>
        </div>

        {/* Meeting Type & Mode */}
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Meeting Type"
            value={meetingType}
            onChange={(e) => setMeetingType(e.target.value)}
            options={[
              { value: 'Performance Review', label: 'Performance Review' },
              { value: 'Academic Follow-up', label: 'Academic Follow-up' },
              { value: 'Attendance Review', label: 'Attendance Review' },
              { value: 'Career Discussion', label: 'Career Discussion' },
              { value: 'General', label: 'General Mentoring' }
            ]}
          />

          <Select
            label="Interaction Mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            options={[
              { value: 'In-person', label: 'In-person (Office)' },
              { value: 'Phone', label: 'Phone Call' },
              { value: 'Online', label: 'Online Video Session' }
            ]}
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Meeting Date"
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            required
          />

          <Input
            label="Meeting Time"
            type="text"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            placeholder="e.g. 02:30 PM"
          />
        </div>

        {modalMode === 'update' && (
          <Select
            label="Meeting Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: 'Scheduled', label: 'Scheduled' },
              { value: 'Completed', label: 'Completed' },
              { value: 'Cancelled', label: 'Cancelled' }
            ]}
          />
        )}

        {/* Agenda */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Meeting Agenda / Objective
          </label>
          <input
            type="text"
            className="w-full text-xs rounded-lg border border-slate-300 p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            placeholder="e.g. Review CAT 2 math score drop and remedial integration problem set"
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
          />
        </div>

        {/* Discussion Summary & Outcome (Required for Log or Completed) */}
        {(modalMode === 'log' || status === 'Completed' || modalMode === 'update') && (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Discussion Summary (Log Notes)
              </label>
              <textarea
                rows={3}
                className="w-full text-xs rounded-lg border border-slate-300 p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Summarize discussion outcome or phone call details..."
                value={discussionSummary}
                onChange={(e) => setDiscussionSummary(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Outcome / Agreed Action
                </label>
                <input
                  type="text"
                  className="w-full text-xs rounded-lg border border-slate-300 p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="e.g. Agreed to attend remedial tutorials"
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                />
              </div>

              <Input
                label="Target Follow-up Date"
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
              />
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}
