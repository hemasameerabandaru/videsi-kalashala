"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function GamifiedProfile() {
  const { user } = useUser();
  const [isSaved, setIsSaved] = useState(false);
  const [xp, setXp] = useState(20);

  // Default state
  const defaultFormData = {
    // Contact
    phone: '',
    
    // Preferences
    targetCountry: 'USA',
    customCountry: '',
    intake: 'Fall 2026',
    preferredCourse: '',      
    budget: '',               

    // Academic History - 10th
    tenthYear: '',            
    tenthScore: '',           
    tenthBoard: '',           
    tenthBacklogs: '0',       

    // Academic History - 12th
    twelfthYear: '',          
    twelfthScore: '',         
    twelfthBoardName: '',     
    twelfthStream: '',        
    twelfthBacklogs: '0',     

    // Academic History - Bachelors
    bachelorsYear: '',        
    bachelorsScore: '',       
    bachelorsDegree: '',      
    bachelorsBranch: '',      
    bachelorsBacklogs: '0',   

    // Work Experience
    hasWorkExperience: 'No',
    workExpYears: '',
    workExpField: '',

    // Exams
    englishTestType: 'Yet to give', 
    englishOverall: '',
    englishReading: '',       
    englishWriting: '',       
    englishListening: '',     
    englishSpeaking: '',      

    greStatus: 'Yet to give', 
    greScore: '',
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    const saved = localStorage.getItem('studentProfile');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData({ ...defaultFormData, ...parsed });
      calculateXP(parsed);
    }
  }, []);

  const calculateXP = (data: any) => {
    let newXp = 20;
    // Basic Info
    if (data.phone?.length >= 10) newXp += 5;
    if (data.preferredCourse) newXp += 5;
    
    // Academics
    if (data.tenthScore) newXp += 5;
    if (data.twelfthScore) newXp += 5;
    if (data.bachelorsScore) newXp += 10;

    // Exams
    if (data.englishTestType !== 'Yet to give' && data.englishOverall) newXp += 10;
    if (data.greStatus === 'Given' && data.greScore) newXp += 10;

    // Work Exp
    if (data.hasWorkExperience === 'Yes' && data.workExpYears) newXp += 10;
    else if (data.hasWorkExperience === 'No') newXp += 5; 

    setXp(Math.min(newXp, 100));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('studentProfile', JSON.stringify(formData));
    calculateXP(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

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
        {/* LEFT COLUMN - Avatar */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center sticky top-8">
              <div className="w-32 h-32 mx-auto bg-indigo-50 rounded-full p-1 mb-4 relative">
                 <img src={user?.imageUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt="Avatar" className="w-full h-full rounded-full object-cover border-4 border-white shadow-md" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{user?.fullName || "Student"}</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-6">{user?.primaryEmailAddress?.emailAddress}</p>
           </div>
        </div>

        {/* RIGHT COLUMN - Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* 1. CONTACT INFO (MOVED TO TOP) */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
               <h3 className="text-lg font-bold text-slate-800 mb-6">📞 Contact Info</h3>
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                  <input type="tel" placeholder="98765 43210" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none" 
                     value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
               </div>
            </div>

            {/* 2. ACADEMIC HISTORY */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-500"></div>
               <h3 className="text-lg font-bold text-slate-800 mb-6">📚 Academic History</h3>
               
               <div className="space-y-8">
                  {/* 10th Grade */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">10th Grade / SSC</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <div>
                          <label className="text-xs font-bold text-slate-500">Year</label>
                          <input type="number" placeholder="2018" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.tenthYear} onChange={(e) => setFormData({...formData, tenthYear: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500">Percentage</label>
                          <input type="text" placeholder="e.g. 9.8" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.tenthScore} onChange={(e) => setFormData({...formData, tenthScore: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500">Board/Spec.</label>
                          <input type="text" placeholder="CBSE/State" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.tenthBoard} onChange={(e) => setFormData({...formData, tenthBoard: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500">Backlogs</label>
                          <input type="number" placeholder="0" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.tenthBacklogs} onChange={(e) => setFormData({...formData, tenthBacklogs: e.target.value})} />
                       </div>
                    </div>
                  </div>

                  {/* 12th Grade */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">12th Grade / Intermediate</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                       <div>
                          <label className="text-xs font-bold text-slate-500">Year</label>
                          <input type="number" placeholder="2020" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.twelfthYear} onChange={(e) => setFormData({...formData, twelfthYear: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500">Percentage</label>
                          <input type="text" placeholder="e.g. 95%" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.twelfthScore} onChange={(e) => setFormData({...formData, twelfthScore: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500">Board</label>
                          <input type="text" placeholder="CBSE/State" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.twelfthBoardName} onChange={(e) => setFormData({...formData, twelfthBoardName: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500">Stream</label>
                          <input type="text" placeholder="MPC/BiPC" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.twelfthStream} onChange={(e) => setFormData({...formData, twelfthStream: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500">Backlogs</label>
                          <input type="number" placeholder="0" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.twelfthBacklogs} onChange={(e) => setFormData({...formData, twelfthBacklogs: e.target.value})} />
                       </div>
                    </div>
                  </div>

                  {/* Bachelors */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">Bachelor's Degree</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                       <div>
                          <label className="text-xs font-bold text-slate-500">Pass Year</label>
                          <input type="number" placeholder="2024" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.bachelorsYear} onChange={(e) => setFormData({...formData, bachelorsYear: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500">CGPA / %</label>
                          <input type="text" placeholder="e.g. 8.5" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.bachelorsScore} onChange={(e) => setFormData({...formData, bachelorsScore: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500">Degree</label>
                          <input type="text" placeholder="B.Tech/B.Sc" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.bachelorsDegree} onChange={(e) => setFormData({...formData, bachelorsDegree: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500">Branch</label>
                          <input type="text" placeholder="Comp Sci" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.bachelorsBranch} onChange={(e) => setFormData({...formData, bachelorsBranch: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500">Backlogs</label>
                          <input type="number" placeholder="0" className="w-full p-2 rounded-lg border border-slate-200 text-sm font-bold outline-none focus:border-teal-500"
                            value={formData.bachelorsBacklogs} onChange={(e) => setFormData({...formData, bachelorsBacklogs: e.target.value})} />
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* 3. EXAM SCORES */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500"></div>
               <h3 className="text-lg font-bold text-slate-800 mb-6">🧠 Test Scores</h3>
               
               {/* English Proficiency */}
               <div className="mb-6 border-b border-slate-100 pb-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2">English Proficiency</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none mb-4"
                     value={formData.englishTestType} onChange={(e) => setFormData({...formData, englishTestType: e.target.value})}>
                     <option>Yet to give</option>
                     <option>IELTS</option>
                     <option>TOEFL</option>
                     <option>Duolingo</option>
                  </select>

                  {/* Show Detailed Scores */}
                  {formData.englishTestType !== 'Yet to give' && (
                     <div className="grid grid-cols-2 md:grid-cols-5 gap-3 animate-fade-in">
                        <div className="col-span-2 md:col-span-1">
                           <label className="text-[10px] font-bold uppercase text-slate-400">Overall</label>
                           <input type="text" placeholder="Total" className="w-full p-2 border border-slate-200 rounded-lg font-bold"
                              value={formData.englishOverall} onChange={(e) => setFormData({...formData, englishOverall: e.target.value})} />
                        </div>
                        <div>
                           <label className="text-[10px] font-bold uppercase text-slate-400">Reading</label>
                           <input type="text" placeholder="R" className="w-full p-2 border border-slate-200 rounded-lg"
                              value={formData.englishReading} onChange={(e) => setFormData({...formData, englishReading: e.target.value})} />
                        </div>
                        <div>
                           <label className="text-[10px] font-bold uppercase text-slate-400">Writing</label>
                           <input type="text" placeholder="W" className="w-full p-2 border border-slate-200 rounded-lg"
                              value={formData.englishWriting} onChange={(e) => setFormData({...formData, englishWriting: e.target.value})} />
                        </div>
                        <div>
                           <label className="text-[10px] font-bold uppercase text-slate-400">Listening</label>
                           <input type="text" placeholder="L" className="w-full p-2 border border-slate-200 rounded-lg"
                              value={formData.englishListening} onChange={(e) => setFormData({...formData, englishListening: e.target.value})} />
                        </div>
                        <div>
                           <label className="text-[10px] font-bold uppercase text-slate-400">Speaking</label>
                           <input type="text" placeholder="S" className="w-full p-2 border border-slate-200 rounded-lg"
                              value={formData.englishSpeaking} onChange={(e) => setFormData({...formData, englishSpeaking: e.target.value})} />
                        </div>
                     </div>
                  )}
               </div>

               {/* GRE / GMAT */}
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">GRE / GMAT Status</label>
                  <div className="flex gap-4">
                     <select className="w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                       value={formData.greStatus} onChange={(e) => setFormData({...formData, greStatus: e.target.value})}>
                       <option>Yet to give</option>
                       <option>Given</option>
                     </select>
                     {formData.greStatus === 'Given' && (
                        <input type="text" placeholder="Enter Score (e.g. 320)" className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none animate-fade-in"
                          value={formData.greScore} onChange={(e) => setFormData({...formData, greScore: e.target.value})} />
                     )}
                  </div>
               </div>
            </div>

            {/* 4. WORK EXPERIENCE */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500"></div>
               <h3 className="text-lg font-bold text-slate-800 mb-6">💼 Work Experience</h3>
               
               <div className="space-y-4">
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                     value={formData.hasWorkExperience} onChange={(e) => setFormData({...formData, hasWorkExperience: e.target.value})}>
                     <option>No</option>
                     <option>Yes</option>
                  </select>

                  {formData.hasWorkExperience === 'Yes' && (
                     <div className="grid grid-cols-2 gap-4 animate-fade-in">
                        <input type="number" placeholder="Years (e.g. 2)" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                           value={formData.workExpYears} onChange={(e) => setFormData({...formData, workExpYears: e.target.value})} />
                        <input type="text" placeholder="Field (e.g. IT)" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                           value={formData.workExpField} onChange={(e) => setFormData({...formData, workExpField: e.target.value})} />
                     </div>
                  )}
               </div>
            </div>

            {/* 5. PREFERENCES */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
               <h3 className="text-lg font-bold text-slate-800 mb-6">🎯 Preferences</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Course</label>
                     <input type="text" placeholder="e.g. MS in CS" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                        value={formData.preferredCourse} onChange={(e) => setFormData({...formData, preferredCourse: e.target.value})} />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Budget (Total)</label>
                     <input type="text" placeholder="e.g. 30 Lakhs" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                        value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Country</label>
                     <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none mb-2"
                       value={formData.targetCountry} onChange={(e) => setFormData({...formData, targetCountry: e.target.value})}>
                       <option>USA 🇺🇸</option><option>UK 🇬🇧</option><option>Canada 🇨🇦</option><option>Germany 🇩🇪</option><option>Australia 🇦🇺</option><option value="Others">Others 🌍</option>
                     </select>
                     {formData.targetCountry === 'Others' && (
                       <input type="text" placeholder="Enter Country Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                         value={formData.customCountry} onChange={(e) => setFormData({...formData, customCountry: e.target.value})} />
                     )}
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Target Intake</label>
                     <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                       value={formData.intake} onChange={(e) => setFormData({...formData, intake: e.target.value})}>
                       <option>Fall 2026</option><option>Spring 2027</option><option>Fall 2027</option><option>Spring 2028</option>
                     </select>
                  </div>
               </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-xl shadow-slate-300">
               💾 Save Complete Profile
            </button>
            {isSaved && <div className="text-center text-green-600 font-bold mt-2">✅ Saved!</div>}
          </form>
        </div>
      </div>
    </div>
  );
}