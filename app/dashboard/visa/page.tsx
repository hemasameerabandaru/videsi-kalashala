"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function VisaHub() {
  const [selectedCountry, setSelectedCountry] = useState("UK");

  // Extended Data Structure to include Processing Options
  const visaData: Record<string, { 
    title: string; 
    steps: string[]; 
    docs: string[]; 
    tips: string;
    processing?: { type: string; time: string; cost: string; desc: string }[] 
  }> = {
    "UK": {
      title: "Student Visa (Tier 4) 🇬🇧",
      steps: [
        "Receive CAS (Confirmation of Acceptance) from Uni.",
        "Apply online on the UK Gov website.",
        "Pay the Healthcare Surcharge (IHS).",
        "Book appointment at VFS Global for biometrics.",
        "Mail your passport and documents."
      ],
      docs: ["CAS Number", "TB Test Results", "Financial Proof (28-day rule)", "Valid Passport"],
      tips: "Ensure your funds have been in the bank for at least 28 consecutive days before applying.",
      // 🟢 NEW PROCESSING OPTIONS FOR UK
      processing: [
        { 
          type: "Standard Service", 
          time: "15 Working Days (3 Weeks)", 
          cost: "Included in Visa Fee (£490)", 
          desc: "The default option. Best if you apply early (3 months before course)." 
        },
        { 
          type: "Priority Service", 
          time: "5 Working Days", 
          cost: "+ £500 Extra", 
          desc: "Great for tight deadlines. Your application is placed at the front of the queue." 
        },
        { 
          type: "Super Priority Service", 
          time: "Next Working Day ⚡", 
          cost: "+ £1,000 Extra", 
          desc: "The fastest option. You usually get a decision by the end of the next day." 
        }
      ]
    },
    "USA": {
      title: "F-1 Student Visa 🇺🇸",
      steps: [
        "Receive Form I-20 from your university.",
        "Pay the SEVIS I-901 Fee ($350).",
        "Complete the DS-160 Online Application.",
        "Book two appointments: Biometrics & Interview.",
        "Attend the Visa Interview at the US Embassy."
      ],
      docs: ["Original I-20 Form", "DS-160 Confirmation Page", "SEVIS Fee Receipt", "Financial Proof (Bank Statements)"],
      tips: "Be honest during the interview. Proving you intend to return to your home country after studies is crucial."
    },
    "Canada": {
      title: "Study Permit 🇨🇦",
      steps: [
        "Get Letter of Acceptance (LOA) from DLI.",
        "Create a GCKey account on the IRCC website.",
        "Upload documents and pay fees ($150).",
        "Give Biometrics at a collection centre.",
        "Wait for Passport Request (PPR)."
      ],
      docs: ["Letter of Acceptance", "GIC Certificate ($10,000)", "Medical Exam Receipt", "SOP for Visa"],
      tips: "The Statement of Purpose (SOP) for the visa is different from the university SOP. Focus on why Canada."
    },
    "Germany": {
      title: "National Visa (D-Type) 🇩🇪",
      steps: [
        "Open a Blocked Account (Sperrkonto).",
        "Get Admission Letter from German Uni.",
        "Book appointment at the German Consulate.",
        "Submit application in person.",
        "Receive Passport with Visa Stamp."
      ],
      docs: ["Admission Letter", "Blocked Account Confirmation", "Health Insurance", "Videx Form"],
      tips: "Blocked accounts (Expatrio/Coracle) are mandatory. Do this at least 1 month before your appointment."
    }
  };

  const data = visaData[selectedCountry];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto h-[calc(100vh-180px)]">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
            <span>📊</span> Dashboard
          </Link>
          
          <div className="text-xs font-bold text-slate-400 uppercase px-4 mt-4 mb-2">Planning</div>
          <Link href="/dashboard/roadmap" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition"><span>🗺️</span> Roadmap</Link>
          <Link href="/dashboard/cost-calculator" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-green-50 hover:text-green-600 rounded-xl font-medium transition"><span>💰</span> Expense Calc</Link>
          <Link href="/dashboard/scholarships" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-yellow-50 hover:text-yellow-600 rounded-xl font-medium transition"><span>🏆</span> Scholarships</Link>

          <div className="text-xs font-bold text-slate-400 uppercase px-4 mt-4 mb-2">Action</div>
          <Link href="/dashboard/universities" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition"><span>🎓</span> Universities</Link>
          <Link href="/dashboard/applications" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition"><span>📂</span> My Applications</Link>
          <Link href="/dashboard/documents" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-medium transition"><span>🗂️</span> Documents</Link>
          <Link href="/dashboard/visa" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-purple-50 hover:text-purple-600 rounded-xl font-medium transition"><span>🛂</span> Visa Info</Link>
          <Link href="/dashboard/mentors" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition"><span>💬</span> Mentors</Link>
          
          <div className="mt-4 px-4">
             <Link href="/dashboard/assessment" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl font-bold transition"><span>🧩</span> Course Matcher</Link>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Visa & Immigration 🛂</h1>
          <p className="text-slate-500">Step-by-step guides for your student visa application.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: COUNTRY SELECTION */}
          <div className="lg:w-1/4 space-y-3">
            {Object.keys(visaData).map(country => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`w-full text-left p-4 rounded-xl font-bold transition flex justify-between items-center ${
                  selectedCountry === country 
                  ? "bg-indigo-600 text-white shadow-lg" 
                  : "bg-white text-slate-600 hover:bg-indigo-50"
                }`}
              >
                {country}
                {selectedCountry === country && <span>👉</span>}
              </button>
            ))}
            
            <div className="mt-8 bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h4 className="text-indigo-900 font-bold mb-2">Need an Expert?</h4>
              <p className="text-sm text-indigo-700 mb-4">Visa rejections are painful. Let our counsellors review your file.</p>
              <Link href="/dashboard/mentors" className="block w-full text-center bg-indigo-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
                Book Visa Consultation
              </Link>
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="lg:w-3/4 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-slate-800">{data.title}</h2>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Open for Intake</span>
              </div>

              {/* Steps */}
              <div className="mb-8">
                <h3 className="font-bold text-slate-400 uppercase text-xs tracking-wider mb-4">Application Process</h3>
                <div className="space-y-4">
                  {data.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-slate-700 font-medium pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 🟢 NEW: PROCESSING SPEEDS (Only shows if data exists, e.g., for UK) */}
              {data.processing && (
                <div className="mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">⚡ Processing Speed & Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.processing.map((proc, i) => (
                      <div key={i} className={`p-4 rounded-xl border ${proc.type.includes('Super') ? 'bg-indigo-900 text-white border-indigo-900' : 'bg-white border-slate-200'}`}>
                        <div className="font-bold text-sm mb-1">{proc.type}</div>
                        <div className={`text-xl font-bold mb-1 ${proc.type.includes('Super') ? 'text-white' : 'text-indigo-600'}`}>{proc.time}</div>
                        <div className={`text-xs font-bold mb-2 ${proc.type.includes('Super') ? 'text-indigo-200' : 'text-slate-500'}`}>{proc.cost}</div>
                        <p className={`text-xs leading-relaxed ${proc.type.includes('Super') ? 'text-indigo-100' : 'text-slate-400'}`}>{proc.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Documents */}
                <div className="bg-slate-50 p-6 rounded-2xl">
                   <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                     📁 Required Documents
                   </h3>
                   <ul className="space-y-2">
                     {data.docs.map((doc, i) => (
                       <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                         {doc}
                       </li>
                     ))}
                   </ul>
                </div>

                {/* Tips */}
                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                   <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                     💡 Insider Tip
                   </h3>
                   <p className="text-sm text-yellow-700 leading-relaxed italic">
                     "{data.tips}"
                   </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}