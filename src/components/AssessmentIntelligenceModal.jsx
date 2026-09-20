import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import Select from './Select';
import { 
  FileText, 
  UploadCloud, 
  Brain, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Sparkles, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function AssessmentIntelligenceModal({ 
  isOpen, 
  onClose, 
  student, 
  onAddMentorAction 
}) {
  const [step, setStep] = useState(1); // 1: Select & Upload, 2: Mock Analysis
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedAssessment, setSelectedAssessment] = useState('CAT 2');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(2);
    }, 800);
  };

  const handleResetModal = () => {
    setStep(1);
    setSelectedFile(null);
    onClose();
  };

  const handleOpenActionModal = () => {
    onClose();
    if (onAddMentorAction) {
      onAddMentorAction({
        area: "Integration by Parts",
        action: "Schedule remedial discussion on Integration by Parts and Definite Integrals",
        status: "Pending",
        followUpDate: "2026-09-24",
        notes: "Review underlying integration method and determine if difficulty is conceptual or procedural."
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetModal}
      title="Assessment Intelligence — Diagnostic Review"
      subtitle="Analyze student answer sheets against syllabus modules for targeted academic feedback."
      maxWidth="max-w-2xl"
      footer={
        step === 1 ? (
          <>
            <Button variant="outline" size="sm" onClick={handleResetModal}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              icon={Sparkles} 
              disabled={isAnalyzing} 
              onClick={handleRunAnalysis}
            >
              {isAnalyzing ? 'Analyzing Paper...' : 'Analyze Assessment'}
            </Button>
          </>
        ) : (
          <div className="flex items-center justify-between w-full">
            <Button variant="outline" size="sm" onClick={() => setStep(1)}>
              ← Back to Upload
            </Button>
            <div className="flex items-center gap-2">
              <Button 
                variant="primary" 
                size="sm" 
                icon={Plus} 
                onClick={handleOpenActionModal}
              >
                Add Mentor Action
              </Button>
            </div>
          </div>
        )
      }
    >
      {step === 1 ? (
        <div className="space-y-5">
          {/* Step 1: Options */}
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Select Subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              options={[
                { value: 'Mathematics', label: 'Mathematics' },
                { value: 'DBMS', label: 'DBMS' },
                { value: 'Java Programming', label: 'Java Programming' },
                { value: 'Physics', label: 'Physics' }
              ]}
            />

            <Select
              label="Select Assessment"
              value={selectedAssessment}
              onChange={(e) => setSelectedAssessment(e.target.value)}
              options={[
                { value: 'CAT 1', label: 'CAT 1 (Continuous Assessment 1)' },
                { value: 'CAT 2', label: 'CAT 2 (Continuous Assessment 2)' },
                { value: 'CAT 3', label: 'CAT 3 (Model Exam)' }
              ]}
            />
          </div>

          {/* Step 2: Upload CAT Paper */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Upload Answer Sheet / Assessment Paper
            </label>
            <div className="border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-xl p-6 text-center bg-slate-50/50 transition-colors">
              <UploadCloud className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-800">
                {selectedFile ? selectedFile.name : 'Drag and drop assessment scan, or browse file'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Supported Formats: <strong className="text-slate-600">PDF, JPG, PNG</strong> (Max 10MB)
              </p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
                id="assessment-file-upload"
              />
              <label
                htmlFor="assessment-file-upload"
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{selectedFile ? 'Change Selected File' : 'Select File'}</span>
              </label>
            </div>
          </div>
        </div>
      ) : (
        /* Step 3: Analysis Results */
        <div className="space-y-5">
          {/* Header summary */}
          <div className="flex items-center justify-between bg-indigo-50 border border-indigo-100 p-3.5 rounded-xl text-xs">
            <div>
              <p className="font-bold text-indigo-950 text-sm">Assessment Analysis Summary</p>
              <p className="text-indigo-800 font-medium">Subject: <strong>{selectedSubject}</strong> • Assessment: <strong>{selectedAssessment}</strong></p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white text-indigo-700 font-semibold border border-indigo-200 shadow-2xs">
              Completed
            </span>
          </div>

          {/* Syllabus Mapping */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" /> Syllabus Mapping
            </h4>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
              <p className="font-bold text-slate-800">Module 3 — Integral Calculus</p>
              <div className="flex flex-wrap gap-2 mt-1.5">
                <span className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium text-[11px]">
                  • Integration by Parts
                </span>
                <span className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium text-[11px]">
                  • Definite Integrals
                </span>
              </div>
            </div>
          </div>

          {/* Performance Evidence */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Performance Evidence</h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-rose-50/70 border border-rose-100 text-rose-950 font-medium">
                <span>Q4 — Integration by Parts</span>
                <span className="flex items-center gap-1 font-bold text-rose-700"><XCircle className="w-3.5 h-3.5" /> Incorrect</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-rose-50/70 border border-rose-100 text-rose-950 font-medium">
                <span>Q7 — Definite Integrals</span>
                <span className="flex items-center gap-1 font-bold text-rose-700"><XCircle className="w-3.5 h-3.5" /> Incorrect</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-emerald-50/70 border border-emerald-100 text-emerald-950 font-medium">
                <span>Q9 — Definite Integrals</span>
                <span className="flex items-center gap-1 font-bold text-emerald-700"><CheckCircle2 className="w-3.5 h-3.5" /> Correct</span>
              </div>
            </div>
          </div>

          {/* Potential Area for Review */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <h4 className="text-xs font-bold text-amber-950 uppercase">Potential Area for Review</h4>
            </div>
            <p className="text-sm font-bold text-amber-900">Integration by Parts</p>
            <p className="text-xs text-amber-800">
              <strong>Evidence:</strong> 2 of 3 related questions require review.
            </p>
            <div className="pt-2 border-t border-amber-200/80">
              <p className="text-[11px] font-bold text-amber-950 uppercase">Suggested Mentor Discussion:</p>
              <p className="text-xs text-amber-900 mt-0.5 leading-relaxed italic">
                "Review the underlying integration method and identify whether the difficulty is conceptual or procedural."
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
