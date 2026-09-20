import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';
import Select from './Select';

export default function MentorActionModal({ 
  isOpen, 
  onClose, 
  studentId, 
  initialData = null, 
  onActionSaved 
}) {
  const [area, setArea] = useState('Integration');
  const [action, setAction] = useState('Schedule remedial discussion');
  const [status, setStatus] = useState('Pending');
  const [followUpDate, setFollowUpDate] = useState('2026-09-24');
  const [notes, setNotes] = useState('Review Module 3 problem set before next assessment.');

  useEffect(() => {
    if (initialData) {
      if (initialData.area) setArea(initialData.area);
      if (initialData.action) setAction(initialData.action);
      if (initialData.status) setStatus(initialData.status);
      if (initialData.followUpDate) setFollowUpDate(initialData.followUpDate);
      if (initialData.notes) setNotes(initialData.notes);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!area.trim() || !action.trim()) return;

    const newActionItem = {
      id: initialData?.id || `act-${Date.now()}`,
      studentId,
      area: area.trim(),
      action: action.trim(),
      status,
      followUpDate,
      notes: notes.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Save to localStorage
    try {
      const existingStr = localStorage.getItem('growlink_actions');
      let existingActions = existingStr ? JSON.parse(existingStr) : [];
      
      // Update existing or prepend new
      const existsIndex = existingActions.findIndex(a => a.id === newActionItem.id);
      if (existsIndex >= 0) {
        existingActions[existsIndex] = newActionItem;
      } else {
        existingActions = [newActionItem, ...existingActions];
      }

      localStorage.setItem('growlink_actions', JSON.stringify(existingActions));
    } catch (err) {
      console.error('Failed to save action to localStorage:', err);
    }

    if (onActionSaved) {
      onActionSaved(newActionItem);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Mentor Follow-up Action"
      subtitle="Define action items, review topics, and target follow-up date."
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            Save Action
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Area / Subject Topic"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="e.g. Integration by Parts"
          required
        />

        <Input
          label="Mentor Action Description"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="e.g. Schedule remedial discussion and problem set #3"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: 'Pending', label: 'Pending' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' }
            ]}
          />

          <Input
            label="Follow-up Date"
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Additional Action Notes
          </label>
          <textarea
            rows={3}
            className="w-full text-xs rounded-lg border border-slate-300 p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes on student progress or instructions..."
          />
        </div>
      </form>
    </Modal>
  );
}
