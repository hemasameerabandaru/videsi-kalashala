"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ProfileAssessment() {
  
  // State for Inputs
  const [cgpa, setCgpa] = useState("");
  const [gre, setGre] = useState("");
  const [ielts, setIelts] = useState("");
  const [experience, setExperience] = useState("");
  const [backlogs, setBacklogs] = useState("0");

  const [result, setResult] = useState<null | string>(null);

  // Mock "AI" Calculation
  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setResult("analyzing");
    
    // Simulate a delay for "AI Analysis"
    setTimeout(() => {
      const gpaScore = parseFloat(cgpa);
      const greScore = parseInt(gre) || 0;

      if (gpaScore > 8.5 && greScore > 315) {
        setResult("tier1"); // Ivy League / Top Tier
      } else if (gpaScore > 7.5 && greScore > 300) {
        setResult("tier2"); // Good Public Universities
      } else {
        setResult("tier3"); // Safe Options
      }
    }, 1500);
  };

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
            Analysis
          </div>
          <Link href="/dashboard/assessment" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
             📊 Profile Assessment
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Profile Assessment 📊</h1>
          <p className="text-slate-500 mt-1">Check your eligibility for top universities instantly.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* LEFT: INPUT FORM */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
             <h2 className="font-bold text-lg text-slate-800 mb-6">Enter Your Academic Details</h2>
             
             <form onSubmit={handleEvaluate} className="space-y-6">
               
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Undergrad CGPA (out of 10)</label>
                   <input 
                     type="number" step="0.01" max="10" required placeholder="e.g. 8.5"
                     className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-indigo-600 outline-none"
                     value={cgpa} onChange={e => setCgpa(e.target.value)}
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Backlogs History</label>
                   <select 
                     className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-indigo-600 outline-none"
                     value={backlogs} onChange={e => setBacklogs(e.target.value)}
                   >
                     <option value="0">0 (Clean Record)</option>
                     <option value="1-3">1 - 3</option>
                     <option value="4+">4 or more</option>
                   </select>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">GRE Score (Optional)</label>
                   <input 
                     type="number" max="340" placeholder="e.g. 320"
                     className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-indigo-600 outline-none"
                     value={gre} onChange={e => setGre(e.target.value)}
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">IELTS / TOEFL</label>
                   <input 
                     type="number" step="0.5" max="9" required placeholder="e.g. 7.5"
                     className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-indigo-600 outline-none"
                     value={ielts} onChange={e => setIelts(e.target.value)}
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Work Experience (Years)</label>
                 <input 
                   type="number" step="0.5" placeholder="e.g. 2.5"
                   className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-indigo-600 outline-none"
                   value={experience} onChange={e => setExperience(e.target.value)}
                 />
               </div>

               <button 
                 type="submit" 
                 disabled={result === 'analyzing'}
                 className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition shadow-lg disabled:opacity-70 disabled:cursor-wait"
               >
                 {result === 'analyzing' ? 'Analyzing Profile...' : 'Evaluate My Profile 🚀'}
               </button>

             </form>
          </div>

          {/* RIGHT: RESULTS AREA */}
          <div className="space-y-6">
            
            {/* 1. INITIAL STATE */}
            {!result && (
              <div className="h-full bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-2xl flex flex-col items-center justify-center text-center p-8">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="font-bold text-indigo-900 text-xl">AI Assistant Waiting</h3>
                <p className="text-indigo-600/70 mt-2 max-w-xs">Fill in your academic details on the left, and I will predict your university admission chances.</p>
              </div>
            )}

            {/* 2. LOADING STATE */}
            {result === 'analyzing' && (
              <div className="h-full bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                <h3 className="font-bold text-slate-800 text-xl animate-pulse">Scanning Universities...</h3>
                <p className="text-slate-400 mt-2">Checking GPAs against 500+ databases.</p>
              </div>
            )}

            {/* 3. TIER 1 RESULT (High) */}
            {result === 'tier1' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg animate-fade-in-up">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl">🌟</div>
                  <div>
                    <h3 className="font-bold text-emerald-800 text-2xl">Excellent Profile!</h3>
                    <p className="text-slate-500 font-medium">You are a top candidate.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Ambitious (Dream)</p>
                    <p className="font-bold text-slate-800">Columbia, Cornell, CMU</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="text-xs font-bold text-emerald-600 uppercase mb-1">Target (Good Chance)</p>
                    <p className="font-bold text-emerald-900">Northeastern, ASU, USC</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-xs font-bold text-blue-600 uppercase mb-1">Safe (Guaranteed)</p>
                    <p className="font-bold text-blue-900">UT Dallas, RIT, UIC</p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. TIER 2 RESULT (Medium) */}
            {result === 'tier2' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg animate-fade-in-up">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-3xl">👍</div>
                  <div>
                    <h3 className="font-bold text-indigo-900 text-2xl">Strong Profile</h3>
                    <p className="text-slate-500 font-medium">You have great options available.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Target (Good Chance)</p>
                    <p className="font-bold text-slate-800">CSU Long Beach, NJIT, SUNY Buffalo</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Recommended</p>
                    <p className="font-bold text-indigo-900">Improve GRE by +5 points to unlock Top 50.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. TIER 3 RESULT (Low) */}
            {result === 'tier3' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg animate-fade-in-up">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl">📈</div>
                  <div>
                    <h3 className="font-bold text-orange-900 text-2xl">Growth Potential</h3>
                    <p className="text-slate-500 font-medium">Focus on SOP and Experience.</p>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 mb-4">
                  <p className="text-xs font-bold text-orange-700 uppercase mb-1">Strategy</p>
                  <p className="text-sm font-bold text-orange-900">Your GPA is slightly low. We recommend applying to universities that waive GRE or focus on holistic review.</p>
                </div>
                
                {/* 👇 FIXED: This is now a LINK to /dashboard/mentors */}
                <Link href="/dashboard/mentors" className="block w-full text-center py-3 bg-white border border-slate-200 font-bold text-slate-600 rounded-xl hover:bg-slate-50 transition">
                   Talk to a Counselor for Help →
                </Link>

              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}