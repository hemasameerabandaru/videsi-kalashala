"use client";
import React, { useState, use } from 'react'; // 👈 Added 'use'
import Link from 'next/link';

// 👇 Type definition updated to Promise
export default function StudentCommandCenter({ params }: { params: Promise<{ id: string }> }) {
  
  // 👇 Unwrap the params using React.use()
  const { id } = use(params);

  // Tabs State
  const [activeTab, setActiveTab] = useState("overview"); 
  const [status, setStatus] = useState("Application Stage");
  const [note, setNote] = useState("");

  // Mock Student Data
  const student = {
    id: id, // 👈 Using the unwrapped 'id' here
    name: "Rohan Das",
    email: "rohan@gmail.com",
    phone: "+91 98765 43210",
    target_country: "USA 🇺🇸",
    intake: "Fall 2026",
    
    shortlisted_unis: [
      { name: "Arizona State University", rank: "#156", fees: "$35k" },
      { name: "Northeastern University", rank: "#44", fees: "$42k" },
    ],

    documents: [
      { name: "Passport", status: "uploaded", date: "Dec 20" },
      { name: "10th Marksheet", status: "uploaded", date: "Dec 21" },
      { name: "IELTS Score", status: "pending", date: "-" },
      { name: "SOP", status: "pending", date: "-" },
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/students" className="text-slate-400 hover:text-indigo-600 font-bold text-xl">←</Link>
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
             <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-100 transition">
               📞 Call
             </button>
             <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
               📧 Email
             </button>
          </div>
        </div>

        {/* TABS */}
        <div className="px-6 flex gap-6 mt-2">
          <button onClick={() => setActiveTab('overview')} className={`pb-3 text-sm font-bold border-b-2 transition ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}>Overview</button>
          <button onClick={() => setActiveTab('docs')} className={`pb-3 text-sm font-bold border-b-2 transition ${activeTab === 'docs' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}>Documents</button>
          <button onClick={() => setActiveTab('unis')} className={`pb-3 text-sm font-bold border-b-2 transition ${activeTab === 'unis' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}>Shortlist</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="md:col-span-2 space-y-6">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                 <h3 className="font-bold text-slate-800 mb-4">Current Stage</h3>
                 <div className="flex gap-2 mb-4 overflow-x-auto">
                    {['New Lead', 'Shortlisting', 'Application', 'Visa'].map((s) => (
                      <button key={s} onClick={() => setStatus(s)} className={`px-4 py-2 rounded-full text-xs font-bold border ${status === s ? 'bg-slate-900 text-white' : 'bg-white text-slate-500'}`}>{s}</button>
                    ))}
                 </div>
               </div>
             </div>
             <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                <h3 className="font-bold text-amber-900 mb-2">📝 Private Notes</h3>
                <textarea className="w-full h-40 bg-white border border-amber-200 rounded-lg p-3 text-sm" placeholder="Type notes here..." value={note} onChange={(e) => setNote(e.target.value)}></textarea>
             </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'docs' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
            {student.documents.map((doc, i) => (
              <div key={i} className="flex justify-between p-4 border-b last:border-0">
                <span className="font-bold text-slate-700">{doc.name}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${doc.status === 'uploaded' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{doc.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* UNIVERSITIES TAB */}
        {activeTab === 'unis' && (
          <div className="grid md:grid-cols-2 gap-4">
            {student.shortlisted_unis.map((uni, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-slate-800">{uni.name}</h3>
                 <p className="text-xs font-bold text-slate-400 mt-1">{uni.rank} • {uni.fees}</p>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}