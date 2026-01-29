"use client";
import React, { useState, useEffect } from 'react';

export default function GamifiedAssessment() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Scoring State
  const [totalScore, setTotalScore] = useState(0);
  const [academicScore, setAcademicScore] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [expScore, setExpScore] = useState(0);

  useEffect(() => {
    // 1. Fetch Data from Local Storage (Saved in Profile Page)
    const savedData = localStorage.getItem('studentProfile');
    if (savedData) {
      const p = JSON.parse(savedData);
      setProfile(p);
      calculateScore(p);
    } else {
      setLoading(false);
    }
  }, []);

  const calculateScore = (p: any) => {
    let academic = 0;
    let tests = 0;
    let experience = 0;

    // --- ACADEMIC LOGIC (40 Points Max) ---
    // 10th
    if (p.tenthScore) academic += 10;
    // 12th
    if (p.twelfthScore) academic += 10;
    // Bachelors (GPA is heavy weighted)
    if (p.bachelorsScore) {
       const score = parseFloat(p.bachelorsScore);
       if (score > 8.5 || score > 85) academic += 20; 
       else if (score > 7.0 || score > 70) academic += 15;
       else academic += 10;
    }
    // Backlog Penalty
    if (parseInt(p.bachelorsBacklogs) > 2) academic -= 5;

    // --- TEST LOGIC (40 Points Max) ---
    // GRE
    if (p.greStatus === 'Given' && p.greScore) {
       const gre = parseInt(p.greScore);
       if (gre >= 320) tests += 20;
       else if (gre >= 300) tests += 15;
       else tests += 10;
    } else {
        // Potential points if they plan to take it
        tests += 5; 
    }
    
    // English
    if (p.englishTestType !== 'Yet to give' && p.englishOverall) {
       const eng = parseFloat(p.englishOverall);
       if (eng >= 7.5 || eng >= 100) tests += 20;
       else if (eng >= 6.5 || eng >= 80) tests += 15;
       else tests += 10;
    } else {
        tests += 5;
    }

    // --- EXPERIENCE LOGIC (20 Points Max) ---
    if (p.hasWorkExperience === 'Yes') {
       const years = parseFloat(p.workExpYears);
       if (years >= 2) experience += 20;
       else if (years >= 1) experience += 15;
       else experience += 10;
    } else {
        experience += 5; // Base score for fresher
    }

    // Cap scores
    academic = Math.min(academic, 40);
    tests = Math.min(tests, 40);
    experience = Math.min(experience, 20);

    setAcademicScore(academic);
    setTestScore(tests);
    setExpScore(experience);
    setTotalScore(academic + tests + experience);
    setLoading(false);
  };

  if (loading) return <div className="p-10 text-center animate-pulse">Calculating Admission Probability...</div>;

  if (!profile) return (
     <div className="text-center p-10 bg-white rounded-3xl border border-slate-200">
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-2xl font-bold text-slate-700">Profile Not Found</h2>
        <p className="text-slate-500 mb-4">Please complete your Profile (Character Sheet) first to see your assessment!</p>
     </div>
  );

  return (
    <div className="animate-fade-in max-w-6xl mx-auto pb-20">
      
      <header className="mb-8">
         <h1 className="text-3xl font-extrabold text-slate-900 mb-2">⚡ Profile Assessment</h1>
         <p className="text-slate-500 font-medium">AI-driven analysis of your admission probability.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* 🟢 LEFT COL: THE POWER GAUGE */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
               
               <h3 className="text-lg font-bold text-slate-800 mb-6">Admission Probability</h3>
               
               {/* CIRCULAR GAUGE */}
               <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                     <path
                        className="text-slate-100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                     />
                     <path
                        className={`${totalScore > 75 ? 'text-green-500' : totalScore > 50 ? 'text-amber-500' : 'text-red-500'} transition-all duration-1000 ease-out`}
                        strokeDasharray={`${totalScore}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                     />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center">
                     <span className="text-4xl font-extrabold text-slate-800">{totalScore}%</span>
                  </div>
               </div>

               <p className="text-slate-600 font-medium mb-4">
                  {totalScore > 80 ? "Your profile is Strong! Top 50 Universities are reachable." : 
                   totalScore > 60 ? "Good profile! You are a solid contender for Top 100 Universities." : 
                   "You need more XP. Focus on GRE or Work Experience to improve chances."}
               </p>

               <div className="bg-slate-50 rounded-xl p-3 text-xs font-bold text-slate-500">
                  Target: {profile.targetCountry} ({profile.intake})
               </div>
            </div>

            {/* TIER PREDICTION CARD */}
            <div className="bg-indigo-900 p-6 rounded-3xl shadow-lg text-white">
               <h3 className="text-sm font-bold opacity-80 mb-4 uppercase tracking-wider">Unlockable Tiers</h3>
               <div className="space-y-4">
                  <TierRow tier="Dream (Top 30)" chance={totalScore > 85 ? "High" : totalScore > 70 ? "Medium" : "Low"} color={totalScore > 85 ? "text-green-400" : "text-slate-400"} />
                  <TierRow tier="Target (Top 100)" chance={totalScore > 65 ? "High" : totalScore > 50 ? "Medium" : "Low"} color={totalScore > 65 ? "text-green-400" : "text-slate-400"} />
                  <TierRow tier="Safe (Top 200)" chance="High" color="text-green-400" />
               </div>
            </div>
         </div>

         {/* 🟢 RIGHT COL: STATS BREAKDOWN */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* STATS BARS */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
               <h3 className="text-lg font-bold text-slate-800 mb-6">📊 Profile Strength Breakdown</h3>
               <div className="space-y-6">
                  <StatBar label="Academics (GPA, 10th, 12th)" score={academicScore} max={40} color="bg-blue-500" />
                  <StatBar label="Test Scores (GRE & English)" score={testScore} max={40} color="bg-purple-500" />
                  <StatBar label="Work Experience & Projects" score={expScore} max={20} color="bg-orange-500" />
               </div>
            </div>

            {/* BUFFS & DEBUFFS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Strengths */}
               <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
                  <h3 className="text-green-800 font-bold mb-4 flex items-center gap-2">
                     <span>🔥</span> Strengths (Buffs)
                  </h3>
                  <ul className="space-y-3">
                     {profile.bachelorsBacklogs === '0' && <li className="text-sm text-green-700 font-medium flex gap-2"><span>✅</span> Zero Backlogs</li>}
                     {parseInt(profile.greScore) >= 310 && <li className="text-sm text-green-700 font-medium flex gap-2"><span>✅</span> Strong GRE Score</li>}
                     {profile.hasWorkExperience === 'Yes' && <li className="text-sm text-green-700 font-medium flex gap-2"><span>✅</span> Industry Experience</li>}
                     {profile.bachelorsScore && parseFloat(profile.bachelorsScore) > 8 && <li className="text-sm text-green-700 font-medium flex gap-2"><span>✅</span> High GPA</li>}
                  </ul>
               </div>

               {/* Weaknesses */}
               <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
                  <h3 className="text-red-800 font-bold mb-4 flex items-center gap-2">
                     <span>⚠️</span> Gaps (Debuffs)
                  </h3>
                  <ul className="space-y-3">
                     {parseInt(profile.bachelorsBacklogs) > 0 && <li className="text-sm text-red-700 font-medium flex gap-2"><span>🔻</span> History of Backlogs</li>}
                     {profile.greStatus === 'Yet to give' && <li className="text-sm text-red-700 font-medium flex gap-2"><span>🔻</span> GRE Not Taken</li>}
                     {profile.englishTestType === 'Yet to give' && <li className="text-sm text-red-700 font-medium flex gap-2"><span>🔻</span> English Test Pending</li>}
                     {profile.hasWorkExperience === 'No' && <li className="text-sm text-red-700 font-medium flex gap-2"><span>🔻</span> Fresher Profile</li>}
                  </ul>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}

// Sub-components for this file
function StatBar({ label, score, max, color }: any) {
   const percentage = (score / max) * 100;
   return (
      <div>
         <div className="flex justify-between text-sm font-bold mb-2">
            <span className="text-slate-700">{label}</span>
            <span className="text-slate-400">{score} / {max}</span>
         </div>
         <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div className={`${color} h-full rounded-full transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
         </div>
      </div>
   )
}

function TierRow({ tier, chance, color }: any) {
   return (
      <div className="flex justify-between items-center border-b border-indigo-800/50 pb-2 last:border-0 last:pb-0">
         <span className="font-bold">{tier}</span>
         <span className={`font-bold ${color}`}>{chance} Chance</span>
      </div>
   )
}