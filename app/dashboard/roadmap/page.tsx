"use client";
import React from 'react';
import Link from 'next/link';

export default function ApplicationRoadmap() {
  // Mock Status of the Student
  const currentStep = 3; // 1 = Profile, 2 = Shortlist, 3 = Applications...

  const steps = [
    {
      id: 1,
      title: "Profile Building 📝",
      desc: "Complete your profile, add academic history, and upload initial documents.",
      date: "Completed on Dec 10",
      status: "completed"
    },
    {
      id: 2,
      title: "University Shortlisting 🏛️",
      desc: "Counselor suggests universities based on your profile and budget.",
      date: "Completed on Dec 15",
      status: "completed"
    },
    {
      id: 3,
      title: "Application Submission 📤",
      desc: "Sending applications to Arizona State, UEL, and TUM.",
      date: "In Progress (Due: Dec 28)",
      status: "active"
    },
    {
      id: 4,
      title: "Offer Letters (I-20 / CAS) 📩",
      desc: "Wait for universities to accept your application and send offer letters.",
      date: "Est. Jan 15",
      status: "locked"
    },
    {
      id: 5,
      title: "Loan & Finances 💰",
      desc: "Arrange financial documents and apply for education loans if needed.",
      date: "Est. Feb 01",
      status: "locked"
    },
    {
      id: 6,
      title: "Visa Filing & Mock Interview 🛂",
      desc: "Submit DS-160, book slot, and practice with our Mock Interview tool.",
      date: "Est. Mar 10",
      status: "locked"
    },
    {
      id: 7,
      title: "Departure & Forex ✈️",
      desc: "Book flights, get Forex card, and attend Pre-Departure orientation.",
      date: "Est. Aug 01",
      status: "locked"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             <span>←</span> Back to Dashboard
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Your Journey 🗺️</h1>
            <p className="text-slate-500 mt-1">Track your progress from application to landing abroad.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl border border-slate-200 shadow-sm text-center">
             <p className="text-xs font-bold text-slate-400 uppercase">Overall Progress</p>
             <p className="text-2xl font-extrabold text-indigo-600">35%</p>
          </div>
        </header>

        {/* TIMELINE CONTAINER */}
        <div className="max-w-3xl mx-auto relative pb-20">
          
          {/* Vertical Line */}
          <div className="absolute left-8 top-4 bottom-4 w-1 bg-slate-200 rounded-full"></div>

          {steps.map((step, index) => (
            <div key={step.id} className={`relative pl-24 pb-12 group ${step.status === 'locked' ? 'opacity-60 grayscale' : ''}`}>
              
              {/* TIMELINE ICON */}
              <div className={`absolute left-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl border-4 z-10 transition-all duration-500 ${
                 step.status === 'completed' ? 'bg-emerald-100 text-emerald-600 border-emerald-50' :
                 step.status === 'active' ? 'bg-white text-indigo-600 border-indigo-600 shadow-xl scale-110' :
                 'bg-slate-100 text-slate-400 border-white'
              }`}>
                {step.status === 'completed' ? '✓' : step.id}
              </div>

              {/* CARD */}
              <div className={`bg-white p-6 rounded-2xl border transition-all duration-300 ${
                 step.status === 'active' ? 'border-indigo-600 shadow-lg ring-4 ring-indigo-50' : 
                 'border-slate-200 hover:border-indigo-200 hover:shadow-md'
              }`}>
                 <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-xl font-bold ${step.status === 'active' ? 'text-indigo-700' : 'text-slate-800'}`}>
                      {step.title}
                    </h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${
                       step.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                       step.status === 'active' ? 'bg-indigo-100 text-indigo-700 animate-pulse' :
                       'bg-slate-100 text-slate-500'
                    }`}>
                      {step.status === 'active' ? 'In Progress' : step.status}
                    </span>
                 </div>
                 
                 <p className="text-slate-500 leading-relaxed mb-4">{step.desc}</p>
                 
                 <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                    <span>📅</span>
                    <span>{step.date}</span>
                 </div>

                 {/* Action Button for Active Step */}
                 {step.status === 'active' && (
                    <div className="mt-6 pt-4 border-t border-slate-100">
                       <Link href="/dashboard/applications" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-md">
                         View Applications →
                       </Link>
                    </div>
                 )}
              </div>

            </div>
          ))}

        </div>

      </main>
    </div>
  );
}