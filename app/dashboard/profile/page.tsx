"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState(false);
  const [xp, setXp] = useState(20); // Start with 20% XP

  // Form State
  const [formData, setFormData] = useState({
    phone: '',
    targetCountry: 'USA',
    targetDegree: 'Masters',
    intake: 'Fall 2026',
    currentStatus: 'Student', 
    greGmatType: 'None',      
    greGmatScore: '',         
    englishTestType: 'IELTS', 
    englishScore: '',         
  });

  // Load Saved Data & Calculate XP
  useEffect(() => {
    const saved = localStorage.getItem('studentProfile');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed);
      calculateXP(parsed);
    }
  }, []);

  // Gamification Logic: Calculate XP
  const calculateXP = (data: any) => {
    let newXp = 20; // Base XP
    if (data.phone && data.phone.length >= 10) newXp += 20;
    if (data.englishScore && data.englishScore.length > 0) newXp += 20;
    if (data.greGmatScore && data.greGmatScore.length > 0) newXp += 20;
    if (data.currentStatus) newXp += 20;
    setXp(Math.min(newXp, 100)); // Cap at 100%
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length < 10) {
      alert("⚠️ Mission Failed: Please enter a valid mobile number.");
      return;
    }
    
    // Save to LocalStorage & Update XP
    localStorage.setItem('studentProfile', JSON.stringify(formData));
    calculateXP(formData);
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* 🟢 SIDEBAR (Standalone Version) */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
           {/* New Logo Font */}
           <span className="text-3xl font-brand font-bold text-indigo-600 tracking-wide">
             Videsi Kalashala
           </span>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold transition group">
             <span className="group-hover:-translate-x-1 transition-transform">🔙</span> Back to Dashboard
          </Link>
          <div className="px-4 py-2 mt-4">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Quest</div>
             <div className="bg-indigo-50 text-indigo-700 text-sm font-bold px-3 py-2 rounded-lg border border-indigo-100">
                Complete Profile
             </div>
          </div>
        </nav>
      </aside>

      {/* 🟢 MAIN CONTENT */}
      <main className="flex-1 p-8 md:ml-64 transition-all">
        
        {/* HEADER & XP BAR */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Character Sheet 👤</h1>
            <p className="text-slate-500 font-medium">Update your stats to unlock university recommendations.</p>
          </div>
          
          <div className="w-full md:w-64 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex justify-between text-xs font-bold uppercase mb-2">
                <span className="text-slate-500">Profile Level</span>
                <span className="text-indigo-600">{xp}% Complete</span>
             </div>
             <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(79,70,229,0.5)]" 
                  style={{ width: `${xp}%` }}
                ></div>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 🟢 LEFT: AVATAR CARD */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center sticky top-8">
                <div className="w-32 h-32 mx-auto bg-indigo-50 rounded-full p-1 mb-4 relative group">
                   <img 
                     src={session?.user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                     alt="Avatar" 
                     className="w-full h-full rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition"
                   />
                   <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white animate-pulse"></div>
                </div>
                
                <h2 className="text-xl font-bold text-slate-900">{session?.user?.name || "Player One"}</h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-6">
                  {session?.user?.email}
                </p>
                
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Class</div>
                   <div className="font-bold text-indigo-600 bg-indigo-100/50 inline-block px-4 py-1.5 rounded-lg border border-indigo-100">
                      {formData.currentStatus || "Novice"}
                   </div>
                </div>
             </div>
          </div>

          {/* 🟢 RIGHT: GAMIFIED FORM */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* CARD 1: CONTACT */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition">
                 <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                 <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    📞 Contact Crystals <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded ml-2 border border-red-100">REQUIRED</span>
                 </h3>
                 
                 <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                      <div className="relative">
                         <span className="absolute left-4 top-3.5 text-slate-400 font-bold">+91</span>
                         <input 
                           type="tel" 
                           required
                           placeholder="98765 43210" 
                           className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500 transition"
                           value={formData.phone}
                           onChange={(e) => setFormData({...formData, phone: e.target.value})}
                         />
                      </div>
                    </div>
                    
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Current Status</label>
                       <select 
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500 transition"
                         value={formData.currentStatus}
                         onChange={(e) => setFormData({...formData, currentStatus: e.target.value})}
                       >
                         <option>Student</option>
                         <option>Working Professional</option>
                         <option>Recent Graduate</option>
                         <option>Dropout / Other</option>
                       </select>
                    </div>
                 </div>
              </div>

              {/* CARD 2: TARGETS */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition">
                 <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
                 <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    🎯 Mission Targets
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Target Country</label>
                       <select 
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition"
                         value={formData.targetCountry}
                         onChange={(e) => setFormData({...formData, targetCountry: e.target.value})}
                       >
                         <option>USA 🇺🇸</option>
                         <option>UK 🇬🇧</option>
                         <option>Canada 🇨🇦</option>
                         <option>Germany 🇩🇪</option>
                         <option>Australia 🇦🇺</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Target Intake</label>
                       <select 
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition"
                         value={formData.intake}
                         onChange={(e) => setFormData({...formData, intake: e.target.value})}
                       >
                         <option>Fall 2025</option>
                         <option>Spring 2026</option>
                         <option>Fall 2026</option>
                         <option>Spring 2027</option>
                       </select>
                    </div>
                 </div>
              </div>

              {/* CARD 3: SCORES */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-purple-300 transition">
                 <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500"></div>
                 <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    🧠 Ability Scores
                 </h3>
                 
                 {/* English Proficiency */}
                 <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 mb-2">English Proficiency</label>
                    <div className="flex gap-4">
                       <select 
                         className="w-1/3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-purple-500"
                         value={formData.englishTestType}
                         onChange={(e) => setFormData({...formData, englishTestType: e.target.value})}
                       >
                         <option>IELTS</option>
                         <option>TOEFL</option>
                         <option>PTE</option>
                         <option>Duolingo</option>
                         <option value="None">Not Taken</option>
                       </select>
                       <input 
                         type="text" 
                         placeholder="Score (e.g. 7.5)" 
                         disabled={formData.englishTestType === 'None'}
                         className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                         value={formData.englishScore}
                         onChange={(e) => setFormData({...formData, englishScore: e.target.value})}
                       />
                    </div>
                 </div>

                 {/* GRE / GMAT */}
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Aptitude Test (Optional)</label>
                    <div className="flex gap-4">
                       <select 
                         className="w-1/3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-purple-500"
                         value={formData.greGmatType}
                         onChange={(e) => setFormData({...formData, greGmatType: e.target.value})}
                       >
                         <option value="None">None</option>
                         <option>GRE</option>
                         <option>GMAT</option>
                       </select>
                       <input 
                         type="text" 
                         placeholder="Score (e.g. 320)" 
                         disabled={formData.greGmatType === 'None'}
                         className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                         value={formData.greGmatScore}
                         onChange={(e) => setFormData({...formData, greGmatScore: e.target.value})}
                       />
                    </div>
                 </div>
              </div>

              {/* SAVE BUTTON */}
              <div className="sticky bottom-6 z-10 pt-4">
                 <button 
                   type="submit" 
                   className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all shadow-xl shadow-slate-300 flex items-center justify-center gap-3 group"
                 >
                   <span>💾</span> Save Character Stats
                   <span className="hidden group-hover:inline-block animate-bounce">⚡</span>
                 </button>
                 {isSaved && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-lg animate-fade-in-up flex items-center gap-2">
                       <span>✅</span> XP Gained! Stats Saved!
                    </div>
                 )}
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}