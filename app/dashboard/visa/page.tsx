"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function VisaGuide() {
  
  const [country, setCountry] = useState("USA");

  // Visa Data for different countries
  const visaData: Record<string, any> = {
    USA: {
      title: "F-1 Student Visa 🇺🇸",
      cost: "$185 (Visa Fee) + $350 (SEVIS)",
      time: "2-4 Weeks",
      steps: [
        { id: 1, title: "Get I-20 Form", desc: "Receive the I-20 form from your university after accepting the offer." },
        { id: 2, title: "Pay SEVIS Fee", desc: "Pay the $350 SEVIS I-901 fee online at fmjfee.com." },
        { id: 3, title: "Fill DS-160", desc: "Complete the Online Nonimmigrant Visa Application (DS-160)." },
        { id: 4, title: "Book Appointment", desc: "Schedule your Biometrics and Consular Interview slots." },
        { id: 5, title: "Attend Interview", desc: "Visit the consulate with your documents. Answer questions confidently." }
      ],
      docs: ["Original I-20", "Passport", "DS-160 Confirmation", "SEVIS Receipt", "Financial Proof"]
    },
    UK: {
      title: "Student Route Visa 🇬🇧",
      cost: "£490 (Visa) + £776/year (IHS)",
      time: "3 Weeks",
      steps: [
        { id: 1, title: "Receive CAS", desc: "Get your Confirmation of Acceptance for Studies (CAS) number." },
        { id: 2, title: "TB Test", desc: "Get a Tuberculosis (TB) test certificate from an approved clinic." },
        { id: 3, title: "Fill Online App", desc: "Apply on the GOV.UK website and pay the visa fee." },
        { id: 4, title: "Pay IHS Surcharge", desc: "Pay the Immigration Health Surcharge to access the NHS." },
        { id: 5, title: "Biometrics", desc: "Visit VFS Global to submit fingerprints and photo." }
      ],
      docs: ["CAS Number", "Passport", "TB Certificate", "Financial Statements", "ATAS Certificate (if applicable)"]
    },
    Germany: {
      title: "German Student Visa 🇩🇪",
      cost: "€75",
      time: "4-6 Weeks",
      steps: [
        { id: 1, title: "Blocked Account", desc: "Open a Blocked Account (Sperrkonto) with €11,208." },
        { id: 2, title: "Health Insurance", desc: "Get public or private health insurance valid in Germany." },
        { id: 3, title: "Videx Form", desc: "Fill the Videx application form online." },
        { id: 4, title: "VFS Appointment", desc: "Book an appointment at VFS Global or the Embassy." },
        { id: 5, title: "Submit Files", desc: "Submit your file physically. No interview is usually required." }
      ],
      docs: ["Admission Letter", "Blocked Account Proof", "Health Insurance", "Passport", "Videx Form"]
    }
  };

  const currentVisa = visaData[country];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold transition">
             <span>←</span> Back to Dashboard
          </Link>
          <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-6">
            Visa Center
          </div>
          <Link href="/dashboard/visa" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
             🛂 Visa Guide
          </Link>
          <Link href="/dashboard/visa-mock" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             🎤 Mock Interview
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Visa Application Guide 🛂</h1>
          <p className="text-slate-500 mt-1">Step-by-step instructions for your study visa.</p>
        </header>

        {/* COUNTRY SELECTOR */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {Object.keys(visaData).map((c) => (
            <button
              key={c}
              onClick={() => setCountry(c)}
              className={`px-6 py-3 rounded-xl font-bold text-sm shadow-sm border transition flex items-center gap-2
                ${country === c 
                  ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}
              `}
            >
              {c === 'USA' ? '🇺🇸 USA' : c === 'UK' ? '🇬🇧 UK' : '🇩🇪 Germany'}
            </button>
          ))}
        </div>

        {/* VISA DETAILS CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up">
          
          <div className="bg-slate-900 text-white p-8">
             <div className="flex justify-between items-start">
               <div>
                 <h2 className="text-2xl font-bold">{currentVisa.title}</h2>
                 <p className="text-slate-400 mt-1">Process Duration: <span className="text-white font-bold">{currentVisa.time}</span></p>
               </div>
               <div className="text-right">
                 <p className="text-xs font-bold text-slate-400 uppercase">Est. Cost</p>
                 <p className="text-xl font-bold text-emerald-400">{currentVisa.cost}</p>
               </div>
             </div>
          </div>

          <div className="p-8 grid md:grid-cols-3 gap-10">
            
            {/* LEFT: STEPS */}
            <div className="md:col-span-2 space-y-8">
              <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2"> Application Steps</h3>
              <div className="space-y-6">
                {currentVisa.steps.map((step: any, index: number) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      {index !== currentVisa.steps.length - 1 && (
                        <div className="w-0.5 h-full bg-slate-100 mt-1"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{step.title}</h4>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: DOCUMENTS */}
            <div>
               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-6">
                 <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                   <span>📂</span> Required Docs
                 </h3>
                 <ul className="space-y-3">
                   {currentVisa.docs.map((doc: string, i: number) => (
                     <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                       <span className="text-indigo-500 font-bold">✓</span>
                       {doc}
                     </li>
                   ))}
                 </ul>
                 <button className="w-full mt-6 py-3 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 text-sm hover:bg-slate-100 transition">
                   Download Checklist ⬇
                 </button>
               </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}