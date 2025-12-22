"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function RoadmapPage() {
  // Simulate current user progress (e.g., they are currently on Step 3)
  const [currentStep, setCurrentStep] = useState(3);

  const steps = [
    {
      id: 1,
      title: "Research & Discovery",
      desc: "Explore countries, universities, and courses.",
      status: "completed",
      icon: "🌍"
    },
    {
      id: 2,
      title: "Standardized Tests",
      desc: "Prepare for and take GRE, GMAT, IELTS, or TOEFL.",
      status: "completed",
      icon: "📝"
    },
    {
      id: 3,
      title: "Document Preparation",
      desc: "Draft your SOP, collect LORs, and build your resume.",
      status: "active",
      icon: "📄",
      checklist: [
        "Draft Statement of Purpose (SOP)",
        "Request 3 Letters of Recommendation",
        "Update CV/Resume",
        "Get Transcripts from College"
      ]
    },
    {
      id: 4,
      title: "University Applications",
      desc: "Submit applications to your shortlisted universities.",
      status: "locked",
      icon: "🚀"
    },
    {
      id: 5,
      title: "Finances & Visa",
      desc: "Secure education loan, pay deposit, and book visa slot.",
      status: "locked",
      icon: "💰"
    },
    {
      id: 6,
      title: "Pre-Departure",
      desc: "Book flights, pack bags, and find accommodation.",
      status: "locked",
      icon: "✈️"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             <span>📊</span> Dashboard
          </Link>
           <Link href="/dashboard/roadmap" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
             <span>🗺️</span> Roadmap
          </Link>
          <Link href="/dashboard/universities" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             <span>🎓</span> Universities
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Your Journey Roadmap 🗺️</h1>
          <p className="text-slate-500">Follow these steps to reach your dream university.</p>
        </header>

        <div className="max-w-3xl mx-auto">
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-200 rounded-full"></div>

            {steps.map((step, index) => (
              <div key={step.id} className="relative flex gap-6 mb-12">
                
                {/* ICON BUBBLE */}
                <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 shrink-0 transition-all duration-500 ${
                  step.status === 'completed' ? 'bg-emerald-100 border-emerald-500 text-emerald-600' :
                  step.status === 'active' ? 'bg-white border-indigo-600 text-indigo-600 shadow-xl scale-110' :
                  'bg-slate-100 border-slate-300 text-slate-400 grayscale'
                }`}>
                  {step.status === 'completed' ? '✅' : step.icon}
                </div>

                {/* CONTENT CARD */}
                <div className={`flex-1 p-6 rounded-2xl border transition-all duration-300 ${
                  step.status === 'active' 
                    ? 'bg-white border-indigo-200 shadow-lg ring-1 ring-indigo-50' 
                    : step.status === 'completed'
                    ? 'bg-emerald-50/50 border-emerald-100 opacity-80'
                    : 'bg-white border-slate-100 opacity-60'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-bold ${
                      step.status === 'active' ? 'text-indigo-900' : 'text-slate-700'
                    }`}>
                      {index + 1}. {step.title}
                    </h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${
                       step.status === 'completed' ? 'bg-emerald-200 text-emerald-800' :
                       step.status === 'active' ? 'bg-indigo-100 text-indigo-700' :
                       'bg-slate-200 text-slate-500'
                    }`}>
                      {step.status === 'active' ? 'In Progress' : step.status}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-4">{step.desc}</p>

                  {/* SHOW CHECKLIST ONLY FOR ACTIVE STEP */}
                  {step.status === 'active' && step.checklist && (
                    <div className="bg-indigo-50 rounded-xl p-4 mt-2">
                      <p className="text-xs font-bold text-indigo-400 uppercase mb-3">Current Tasks:</p>
                      <div className="space-y-3">
                        {step.checklist.map((item, i) => (
                          <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-5 h-5 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"/>
                            <span className="text-slate-700 font-medium group-hover:text-indigo-700 transition">{item}</span>
                          </label>
                        ))}
                      </div>
                      <button className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm transition">
                        Mark Phase as Complete →
                      </button>
                    </div>
                  )}

                </div>
              </div>
            ))}

          </div>

        </div>
      </main>
    </div>
  );
}