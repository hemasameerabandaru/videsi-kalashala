"use client";
import React, { useState } from 'react';

export default function VisaTraining() {
  // Mock Students scheduled for Mock Interviews
  const [sessions, setSessions] = useState([
    { id: 1, student: "Rohan Das", country: "USA", type: "F-1 Visa", date: "Today, 4:00 PM", status: "Scheduled", score: null },
    { id: 2, student: "Sarah Khan", country: "UK", type: "Tier 4", date: "Tomorrow, 11:00 AM", status: "Scheduled", score: null },
    { id: 3, student: "Amit Verma", country: "Germany", type: "Student Visa", date: "Yesterday", status: "Completed", score: "8.5/10" },
  ]);

  // Evaluation Modal State
  const [showEvalModal, setShowEvalModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  
  // Scorecard State
  const [scores, setScores] = useState({ confidence: 5, clarity: 5, documents: 5, honesty: 5 });
  const [feedback, setFeedback] = useState("");

  const startEvaluation = (session: any) => {
    setCurrentStudent(session);
    setScores({ confidence: 5, clarity: 5, documents: 5, honesty: 5 });
    setFeedback("");
    setShowEvalModal(true);
  };

  const submitEvaluation = () => {
    const totalScore = scores.confidence + scores.clarity + scores.documents + scores.honesty;
    const finalRating = (totalScore / 2).toFixed(1); // Out of 10

    const updatedSessions = sessions.map(s => 
      s.id === currentStudent.id ? { ...s, status: "Completed", score: `${finalRating}/10` } : s
    );

    setSessions(updatedSessions);
    setShowEvalModal(false);
    alert(`Evaluation Saved! ${currentStudent.student} scored ${finalRating}/10.`);
  };

  return (
    <main className="p-8 bg-slate-100 min-h-screen">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Visa Training Simulator 🎤</h1>
          <p className="text-slate-500 mt-1">Conduct 1-1 mock interviews and grade student readiness.</p>
        </div>
        <div className="bg-indigo-900 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-md">
          Total Mocks: {sessions.length}
        </div>
      </header>

      {/* SESSIONS LIST */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Target Country</th>
              <th className="px-6 py-4">Scheduled Time</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Score</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sessions.map((session) => (
              <tr key={session.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-bold text-slate-800">{session.student}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <span className="text-lg">
                    {session.country === 'USA' ? '🇺🇸' : session.country === 'UK' ? '🇬🇧' : '🇩🇪'}
                  </span>
                  {session.country} ({session.type})
                </td>
                <td className="px-6 py-4 font-medium">{session.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    session.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700 animate-pulse'
                  }`}>
                    {session.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-slate-800">
                  {session.score || "-"}
                </td>
                <td className="px-6 py-4 text-right">
                  {session.status !== 'Completed' ? (
                    <button 
                      onClick={() => startEvaluation(session)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-indigo-700 transition shadow-md"
                    >
                      Start Mock 📹
                    </button>
                  ) : (
                    <button className="text-indigo-600 font-bold text-xs hover:underline">View Report</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- EVALUATION MODAL (THE SCORECARD) --- */}
      {showEvalModal && currentStudent && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl animate-fade-in-up h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Mock Interview Scorecard</h2>
                <p className="text-slate-500 text-sm">Candidate: <span className="font-bold text-indigo-600">{currentStudent.student}</span></p>
              </div>
              <button onClick={() => setShowEvalModal(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>

            {/* Criteria Sliders */}
            <div className="space-y-6 mb-8">
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-slate-700">Confidence & Eye Contact</label>
                  <span className="font-bold text-indigo-600">{scores.confidence}/5</span>
                </div>
                <input type="range" min="1" max="5" value={scores.confidence} onChange={(e) => setScores({...scores, confidence: parseInt(e.target.value)})} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                <p className="text-xs text-slate-400 mt-1">Is the student nervous? Do they maintain eye contact?</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-slate-700">Clarity of Answers</label>
                  <span className="font-bold text-indigo-600">{scores.clarity}/5</span>
                </div>
                <input type="range" min="1" max="5" value={scores.clarity} onChange={(e) => setScores({...scores, clarity: parseInt(e.target.value)})} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                <p className="text-xs text-slate-400 mt-1">Are answers concise and to the point?</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-slate-700">Document Readiness</label>
                  <span className="font-bold text-indigo-600">{scores.documents}/5</span>
                </div>
                <input type="range" min="1" max="5" value={scores.documents} onChange={(e) => setScores({...scores, documents: parseInt(e.target.value)})} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                <p className="text-xs text-slate-400 mt-1">Did they have all files ready immediately?</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-slate-700">Intent & Honesty</label>
                  <span className="font-bold text-indigo-600">{scores.honesty}/5</span>
                </div>
                <input type="range" min="1" max="5" value={scores.honesty} onChange={(e) => setScores({...scores, honesty: parseInt(e.target.value)})} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                <p className="text-xs text-slate-400 mt-1">Do they clearly state their intent to study?</p>
              </div>

            </div>

            {/* Written Feedback */}
            <div className="mb-8">
              <label className="block font-bold text-slate-700 mb-2">Counselor Feedback</label>
              <textarea 
                className="w-full border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-32"
                placeholder="e.g. Needs to work on explaining 'Why this university'. Good financial explanation."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>

            {/* Verdict */}
            <button 
              onClick={submitEvaluation}
              className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg flex items-center justify-center gap-2"
            >
              <span>Submit Evaluation & Grade</span>
              <span>🎓</span>
            </button>

          </div>
        </div>
      )}

    </main>
  );
}