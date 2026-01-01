"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function StudentCommandCenter({ params }: { params: { id: string } }) {
  
  // Tabs State
  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'docs', 'unis'
  const [status, setStatus] = useState("Application Stage");
  const [note, setNote] = useState("");

  // Mock Student Data (Simulating what they did on their dashboard)
  const student = {
    id: params.id,
    name: "Rohan Das",
    email: "rohan@gmail.com",
    phone: "+91 98765 43210",
    target_country: "USA 🇺🇸",
    intake: "Fall 2026",
    
    // 🏛️ The Universities they Shortlisted
    shortlisted_unis: [
      { name: "Arizona State University", rank: "#156", fees: "$35k" },
      { name: "Northeastern University", rank: "#44", fees: "$42k" },
    ],

    // 📂 The Documents they Uploaded
    documents: [
      { name: "Passport", status: "uploaded", date: "Dec 20" },
      { name: "10th Marksheet", status: "uploaded", date: "Dec 21" },
      { name: "IELTS Score", status: "pending", date: "-" },
      { name: "SOP (Statement of Purpose)", status: "pending", date: "-" },
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-slate-400 hover:text-indigo-600 font-bold text-xl">←</Link>
            <div>
              <h1 className="text-xl font-bold text-slate-800">{student.name}</h1>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wide">
                <span>ID: {student.id}</span>
                <span>•</span>
                <span>{student.target_country}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
             <a href={`tel:${student.phone}`} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-100 transition flex items-center gap-2">
               📞 Call
             </a>
             <a href={`mailto:${student.email}`} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
               📧 Email
             </a>
          </div>
        </div>

        {/* TABS */}
        <div className="px-6 flex gap-6 mt-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-sm font-bold border-b-2 transition ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Overview & Notes
          </button>
          <button 
            onClick={() => setActiveTab('docs')}
            className={`pb-3 text-sm font-bold border-b-2 transition ${activeTab === 'docs' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Documents <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] ml-1">4</span>
          </button>
          <button 
            onClick={() => setActiveTab('unis')}
            className={`pb-3 text-sm font-bold border-b-2 transition ${activeTab === 'unis' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Shortlist <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] ml-1">2</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        
        {/* --- TAB 1: OVERVIEW --- */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
             {/* Left: Status Control */}
             <div className="md:col-span-2 space-y-6">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <h3 className="font-bold text-slate-800 mb-4">Current Stage</h3>
                 <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {['New Lead', 'Shortlisting', 'Application', 'Visa', 'Success'].map((s) => (
                      <button 
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition
                          ${status === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'}
                        `}
                      >
                        {s}
                      </button>
                    ))}
                 </div>
                 <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-start gap-3">
                   <span className="text-xl">💡</span>
                   <p className="text-sm text-indigo-800">
                     <strong>Next Step:</strong> Review the student's document checklist. 2 documents are still pending.
                   </p>
                 </div>
               </div>
             </div>

             {/* Right: Private Notes */}
             <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 h-fit">
                <h3 className="font-bold text-amber-900 mb-2">📝 Private Notes</h3>
                <textarea 
                  className="w-full h-40 bg-white border border-amber-200 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400 resize-none"
                  placeholder="Type notes here... (e.g. 'Student is worried about loan interest rates')"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
                <button className="mt-3 w-full bg-amber-200 text-amber-900 font-bold py-2 rounded-lg text-sm hover:bg-amber-300 transition">
                  Save Note
                </button>
             </div>
          </div>
        )}

        {/* --- TAB 2: DOCUMENTS --- */}
        {activeTab === 'docs' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Document Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Upload Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {student.documents.map((doc, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-700">{doc.name}</td>
                    <td className="px-6 py-4">
                      {doc.status === 'uploaded' ? (
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">Uploaded</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-xs font-bold">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{doc.date}</td>
                    <td className="px-6 py-4 text-right">
                      {doc.status === 'uploaded' ? (
                        <button className="text-indigo-600 hover:underline text-xs font-bold">Download ↓</button>
                      ) : (
                        <button className="text-slate-400 cursor-not-allowed text-xs font-bold">Waiting</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- TAB 3: UNIVERSITIES --- */}
        {activeTab === 'unis' && (
          <div className="grid md:grid-cols-2 gap-4 animate-fade-in-up">
            {student.shortlisted_unis.map((uni, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                <div>
                   <h3 className="font-bold text-slate-800">{uni.name}</h3>
                   <p className="text-xs font-bold text-slate-400 mt-1">Rank {uni.rank} • {uni.fees}</p>
                </div>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-700">
                  Start App →
                </button>
              </div>
            ))}
             <div className="border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center p-6 text-slate-400 font-bold text-sm cursor-pointer hover:border-indigo-400 hover:text-indigo-600 transition">
               + Suggest a University
             </div>
          </div>
        )}

      </main>
    </div>
  );
}