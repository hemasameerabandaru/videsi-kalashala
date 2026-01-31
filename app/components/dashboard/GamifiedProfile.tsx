"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function GamifiedProfile() {
  const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState(false);
  const [xp, setXp] = useState(20);

  const defaultFormData = {
    phone: '',
    targetCountry: 'USA',
    customCountry: '',
    intake: 'Fall 2026',
    preferredCourse: '',      
    budget: '',               
    tenthYear: '', tenthScore: '', tenthBoard: '', tenthBacklogs: '0',       
    twelfthYear: '', twelfthScore: '', twelfthBoardName: '', twelfthStream: '', twelfthBacklogs: '0',     
    bachelorsYear: '', bachelorsScore: '', bachelorsDegree: '', bachelorsBranch: '', bachelorsBacklogs: '0',   
    hasWorkExperience: 'No', workExpYears: '', workExpField: '',
    englishTestType: 'Yet to give', englishOverall: '', englishReading: '', englishWriting: '', englishListening: '', englishSpeaking: '',      
    greStatus: 'Yet to give', greScore: '',
  };

  const [formData, setFormData] = useState(defaultFormData);

  // 🔄 FIX: SMART SYNC (Database > Local Storage)
  useEffect(() => {
    const syncProfile = async () => {
        if (!session?.user?.id) return;

        // 1. User metadata from session
        const meta = (session.user as any).metadata as any;
        console.log("🔍 NextAuth Metadata Found:", meta);

        let finalData = { ...defaultFormData };

        // 2. Load LocalStorage First (Low Priority)
        const localSaved = localStorage.getItem('studentProfile');
        if (localSaved) {
            try {
                const parsed = JSON.parse(localSaved);
                finalData = { ...finalData, ...parsed };
            } catch (e) { console.error("Local storage error", e); }
        }

        // 3. Load NextAuth Metadata (HIGH PRIORITY - Overwrites LocalStorage)
        // This ensures the onboarding data actually shows up!
        if (meta?.onboardingComplete) {
            console.log("✅ Applying Onboarding Data...");
            
            // Helper to only overwrite if NextAuth has a real value
            const merge = (key: string, val: any) => {
                if (val && val !== '' && val !== 0) {
                    // @ts-ignore
                    finalData[key] = val; 
                }
            };

            // Map Fields
            merge('bachelorsYear', meta.academic?.gradYear);
            merge('bachelorsScore', meta.academic?.gpa);
            merge('bachelorsDegree', meta.academic?.degree);
            merge('bachelorsBranch', meta.academic?.major);
            
            merge('preferredCourse', meta.goals?.major);
            merge('targetCountry', meta.goals?.countries?.[0]);
            
            merge('budget', meta.budget?.amount);
            merge('workExpYears', meta.budget?.workExp);
            if (meta.budget?.workExp > 0) finalData.hasWorkExperience = 'Yes';

            if (meta.exams?.ielts) {
                finalData.englishTestType = 'IELTS';
                finalData.englishOverall = meta.exams.ielts;
            }
            if (meta.exams?.gre) {
                finalData.greStatus = 'Given';
                finalData.greScore = meta.exams.gre;
            }
        }

        // 4. Update State
        setFormData(finalData);
        calculateXP(finalData);
    };

    syncProfile();
  }, [session?.user?.id]);

  const calculateXP = (data: any) => {
    let newXp = 20;
    if (data.phone?.length >= 10) newXp += 5;
    if (data.preferredCourse) newXp += 5;
    if (data.tenthScore) newXp += 5;
    if (data.twelfthScore) newXp += 5;
    if (data.bachelorsScore) newXp += 10;
    if (data.englishTestType !== 'Yet to give' && data.englishOverall) newXp += 10;
    if (data.greStatus === 'Given' && data.greScore) newXp += 10;
    if (data.hasWorkExperience === 'Yes' && data.workExpYears) newXp += 10;
    setXp(Math.min(newXp, 100));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('studentProfile', JSON.stringify(formData));
    calculateXP(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!session) return <div className="p-10 text-center">Loading Profile...</div>;

  return (
    <div className="animate-fade-in max-w-6xl mx-auto pb-20">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Character Sheet 👤</h1>
          <p className="text-slate-500 font-medium">Complete your academic history to generate your roadmap.</p>
        </div>
        <div className="w-full md:w-64 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
           <div className="flex justify-between text-xs font-bold uppercase mb-2">
              <span className="text-slate-500">Profile Level</span>
              <span className="text-indigo-600">{xp}% Complete</span>
           </div>
           <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${xp}%` }}></div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center sticky top-8">
              <div className="w-32 h-32 mx-auto bg-indigo-50 rounded-full p-1 mb-4 relative">
                 {session?.user?.image && <img src={session.user.image} alt="Avatar" className="w-full h-full rounded-full object-cover border-4 border-white shadow-md" />}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{session?.user?.name || "Student"}</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-6">{session?.user?.email}</p>
           </div>
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
               <h3 className="text-lg font-bold text-slate-800 mb-6">📞 Contact Info</h3>
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                  <input type="tel" placeholder="98765 43210" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none" 
                     value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
               </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-500"></div>
               <h3 className="text-lg font-bold text-slate-800 mb-6">📚 Academic History</h3>
               
               <div className="space-y-8">
                  {/* 10th & 12th Manual */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">10th Grade / SSC</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <input type="number" placeholder="Year" className="input-field" value={formData.tenthYear} onChange={(e) => setFormData({...formData, tenthYear: e.target.value})} />
                       <input type="text" placeholder="%" className="input-field" value={formData.tenthScore} onChange={(e) => setFormData({...formData, tenthScore: e.target.value})} />
                       <input type="text" placeholder="Board" className="input-field" value={formData.tenthBoard} onChange={(e) => setFormData({...formData, tenthBoard: e.target.value})} />
                       <input type="number" placeholder="Backlogs" className="input-field" value={formData.tenthBacklogs} onChange={(e) => setFormData({...formData, tenthBacklogs: e.target.value})} />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">12th Grade</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                       <input type="number" placeholder="Year" className="input-field" value={formData.twelfthYear} onChange={(e) => setFormData({...formData, twelfthYear: e.target.value})} />
                       <input type="text" placeholder="%" className="input-field" value={formData.twelfthScore} onChange={(e) => setFormData({...formData, twelfthScore: e.target.value})} />
                       <input type="text" placeholder="Board" className="input-field" value={formData.twelfthBoardName} onChange={(e) => setFormData({...formData, twelfthBoardName: e.target.value})} />
                       <input type="text" placeholder="Stream" className="input-field" value={formData.twelfthStream} onChange={(e) => setFormData({...formData, twelfthStream: e.target.value})} />
                       <input type="number" placeholder="Backlogs" className="input-field" value={formData.twelfthBacklogs} onChange={(e) => setFormData({...formData, twelfthBacklogs: e.target.value})} />
                    </div>
                  </div>

                  {/* Bachelors (Auto-Filled) */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">Bachelor's Degree</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                       <div className="col-span-1"><label className="text-xs font-bold text-slate-500">Pass Year</label><input type="number" className="input-field" value={formData.bachelorsYear} onChange={(e) => setFormData({...formData, bachelorsYear: e.target.value})} /></div>
                       <div className="col-span-1"><label className="text-xs font-bold text-slate-500">CGPA / %</label><input type="text" className="input-field" value={formData.bachelorsScore} onChange={(e) => setFormData({...formData, bachelorsScore: e.target.value})} /></div>
                       <div className="col-span-1"><label className="text-xs font-bold text-slate-500">Degree</label><input type="text" className="input-field" value={formData.bachelorsDegree} onChange={(e) => setFormData({...formData, bachelorsDegree: e.target.value})} /></div>
                       <div className="col-span-1"><label className="text-xs font-bold text-slate-500">Branch</label><input type="text" className="input-field" value={formData.bachelorsBranch} onChange={(e) => setFormData({...formData, bachelorsBranch: e.target.value})} /></div>
                       <div className="col-span-1"><label className="text-xs font-bold text-slate-500">Backlogs</label><input type="number" className="input-field" value={formData.bachelorsBacklogs} onChange={(e) => setFormData({...formData, bachelorsBacklogs: e.target.value})} /></div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
               <h3 className="text-lg font-bold text-slate-800 mb-6">🎯 Preferences</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="label">Preferred Course</label><input type="text" className="input-field" value={formData.preferredCourse} onChange={(e) => setFormData({...formData, preferredCourse: e.target.value})} /></div>
                  <div><label className="label">Budget (Total)</label><input type="text" className="input-field" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} /></div>
                  <div><label className="label">Preferred Country</label><select className="input-field" value={formData.targetCountry} onChange={(e) => setFormData({...formData, targetCountry: e.target.value})}><option>USA 🇺🇸</option><option>UK 🇬🇧</option><option>Canada 🇨🇦</option><option>Germany 🇩🇪</option><option>Australia 🇦🇺</option></select></div>
                  <div><label className="label">Target Intake</label><select className="input-field" value={formData.intake} onChange={(e) => setFormData({...formData, intake: e.target.value})}><option>Fall 2026</option><option>Spring 2027</option></select></div>
               </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-xl shadow-slate-300">💾 Save Complete Profile</button>
            {isSaved && <div className="text-center text-green-600 font-bold mt-2">✅ Saved!</div>}
          </form>
        </div>
      </div>
      
      {/* Quick CSS for Inputs */}
      <style jsx>{`
        .input-field { width: 100%; padding: 0.75rem; border-radius: 0.75rem; border: 1px solid #e2e8f0; font-weight: 700; outline: none; }
        .input-field:focus { border-color: #6366f1; }
        .label { display: block; font-size: 0.875rem; font-weight: 700; color: #334155; margin-bottom: 0.5rem; }
      `}</style>
    </div>
  );
}