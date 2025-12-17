"use client";
import React, { useState } from 'react';

export default function HeroSection() {
  // This is where the "Real-Time" magic starts. 
  // We use "useState" to handle the GPA input live.
  const [gpa, setGpa] = useState("");
  const [chance, setChance] = useState("neutral"); // neutral, good, bad

  const handleGpaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setGpa(val);
    
    // Simple "Fake" AI logic for now (we will make this real later)
    if (parseFloat(val) > 8.0) setChance("good");
    else if (parseFloat(val) < 6.0 && val !== "") setChance("bad");
    else setChance("neutral");
  };

  return (
    <div className="flex flex-col justify-center items-center text-center mt-12 px-4 pb-20">
      <div className="max-w-4xl space-y-8">
        
        {/* Live Ticker */}
        <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 text-sm font-medium text-emerald-700">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Live: 14 Students got Visa approvals today</span>
        </div>

        {/* Dynamic Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
          Your Dream University <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            Is Closer Than You Think.
          </span>
        </h1>

        {/* The "Real-Time" Probability Input */}
        <div className={`transition-all duration-500 p-6 rounded-2xl border-2 ${
            chance === 'good' ? 'bg-green-50 border-green-200' : 
            chance === 'bad' ? 'bg-red-50 border-red-200' : 'bg-white border-indigo-50'
          } max-w-lg mx-auto shadow-lg`}>
            
            <label className="block text-left text-sm font-semibold text-slate-500 mb-2">
              Check Your Odds Instantly (Enter GPA):
            </label>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="e.g. 8.5" 
                value={gpa}
                onChange={handleGpaChange}
                className="flex-1 p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
                Analyze
              </button>
            </div>
            
            {/* Live Feedback Message */}
            {chance === 'good' && <p className="text-green-600 text-sm mt-2 font-bold">🎉 Excellent Profile! High chance of scholarship.</p>}
            {chance === 'bad' && <p className="text-red-500 text-sm mt-2 font-bold">⚠️ Competitive. We need to boost your SOP.</p>}
        </div>

      </div>
    </div>
  );
}