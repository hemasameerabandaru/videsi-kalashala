"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function CourseMatcher() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  // Store User Answers
  const [formData, setFormData] = useState({
    country: "USA",
    budget: "",
    interest: "",
    level: ""
  });

  // Simple "AI" Logic to suggest courses
  const getSuggestion = () => {
    if (formData.interest === "Coding & Tech") return { name: "M.Sc. Computer Science", uni: "University of Toronto", img: "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=800" };
    if (formData.interest === "Business & Money") return { name: "MBA in Finance", uni: "Harvard University", img: "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=800" };
    if (formData.interest === "Design & Art") return { name: "Master of Architecture", uni: "Technical University of Munich", img: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800" };
    return { name: "International Management", uni: "Stanford University", img: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800" };
  };

  const nextStep = () => setStep(step + 1);
  
  const handleInterestClick = (interest: string) => {
    setFormData({...formData, interest});
    if (interest === "Confused") {
      setStep(5); // Jump to Resume Upload
    } else {
      setTimeout(nextStep, 300);
    }
  };

  const finishQuiz = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4); // Show Result
    }, 2000); 
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setResumeUploaded(true);
      }, 1500); // Simulate upload delay
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR (Simplified for context) */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             <span>←</span> Back to Dashboard
          </Link>
        </nav>
      </aside>

      {/* MAIN GAME AREA */}
      <main className="flex-1 p-8 ml-0 md:ml-64 flex flex-col justify-center items-center">
        
        {/* PROGRESS BAR */}
        <div className="w-full max-w-2xl mb-8">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            <span>Start</span>
            <span>Preferences</span>
            <span>Interests</span>
            <span>Result</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500 ease-out"
              style={{ width: step === 5 ? '75%' : step === 1 ? '25%' : step === 2 ? '50%' : step === 3 ? '75%' : '100%' }}
            ></div>
          </div>
        </div>

        {/* CARD CONTAINER */}
        <div className="bg-white w-full max-w-2xl p-10 rounded-3xl shadow-xl border border-slate-100 min-h-[400px] flex flex-col justify-center text-center relative overflow-hidden">
          
          {/* STEP 1: COUNTRY & BUDGET */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <span className="text-4xl mb-4 block">🌍</span>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Let's set your coordinates!</h2>
              <p className="text-slate-500 mb-8">Where do you want to fly and how much fits your pocket?</p>

              <div className="space-y-6 text-left">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Target Destination</label>
                  <select 
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    value={formData.country}
                  >
                    <option>🇺🇸 USA</option>
                    <option>🇬🇧 UK</option>
                    <option>🇨🇦 Canada</option>
                    <option>🇦🇺 Australia</option>
                    <option>🇩🇪 Germany</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Total Budget (Tuition + Living)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Under 20L", "20L - 30L", "30L - 50L", "50L+"].map((b) => (
                      <button 
                        key={b}
                        onClick={() => setFormData({...formData, budget: b})}
                        className={`p-3 rounded-xl border-2 font-bold transition ${
                          formData.budget === b 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                          : 'border-slate-100 hover:border-indigo-200 text-slate-500'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={nextStep}
                disabled={!formData.budget}
                className="mt-8 bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step →
              </button>
            </div>
          )}

          {/* STEP 2: INTERESTS */}
          {step === 2 && (
            <div className="animate-fade-in-up">
               <span className="text-4xl mb-4 block">🧠</span>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">What excites you?</h2>
              <p className="text-slate-500 mb-8">Pick the area that makes you want to study!</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: "💻", label: "Coding & Tech" },
                  { icon: "📈", label: "Business & Money" },
                  { icon: "🎨", label: "Design & Art" },
                  { icon: "🧬", label: "Science & Bio" }
                ].map((item) => (
                  <button 
                    key={item.label}
                    onClick={() => handleInterestClick(item.label)}
                    className="p-6 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition group text-left"
                  >
                    <span className="text-3xl mb-2 block group-hover:scale-110 transition">{item.icon}</span>
                    <span className="font-bold text-slate-700 group-hover:text-indigo-700">{item.label}</span>
                  </button>
                ))}
                
                {/* 🟢 NEW CONFUSED OPTION */}
                <button 
                    onClick={() => handleInterestClick("Confused")}
                    className="col-span-1 md:col-span-2 p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:bg-orange-50 hover:border-orange-300 transition group flex items-center justify-center gap-3"
                  >
                    <span className="text-2xl">🤷</span>
                    <span className="font-bold text-slate-600 group-hover:text-orange-600">I'm confused about what to choose...</span>
                  </button>

              </div>
            </div>
          )}

          {/* STEP 3: LEVEL */}
          {step === 3 && (
            <div className="animate-fade-in-up">
               <span className="text-4xl mb-4 block">🎓</span>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Current Status?</h2>
              <p className="text-slate-500 mb-8">Help us find the right degree level.</p>

              <div className="space-y-4">
                {["High School Student (12th)", "Bachelor's Graduate", "Working Professional"].map((lvl) => (
                   <button 
                   key={lvl}
                   onClick={() => {
                       setFormData({...formData, level: lvl});
                       finishQuiz();
                   }}
                   className="w-full p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition font-bold text-slate-600 hover:text-indigo-700"
                 >
                   {lvl}
                 </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: RESUME UPLOAD (For Confused Students) */}
          {step === 5 && !loading && !resumeUploaded && (
            <div className="animate-fade-in-up">
              <span className="text-4xl mb-4 block">📄</span>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Let us help you decide!</h2>
              <p className="text-slate-500 mb-8">Upload your resume. Our experts will analyze your skills and suggest the best course to level up your career.</p>

              <div className="border-2 border-dashed border-indigo-200 rounded-3xl p-10 bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer relative">
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                />
                <div className="pointer-events-none">
                  <span className="text-4xl mb-2 block">☁️</span>
                  <p className="font-bold text-indigo-700">Click to Upload Resume</p>
                  <p className="text-xs text-indigo-400 mt-2">PDF, DOC, DOCX (Max 5MB)</p>
                </div>
              </div>
              
              <button onClick={() => setStep(2)} className="mt-6 text-slate-400 text-sm hover:underline">
                Go Back to Options
              </button>
            </div>
          )}

          {/* RESUME SUCCESS STATE */}
          {step === 5 && resumeUploaded && (
             <div className="animate-fade-in-up">
               <span className="text-6xl mb-4 block">✅</span>
               <h2 className="text-3xl font-bold text-slate-800 mb-2">Resume Received!</h2>
               <p className="text-slate-600 mb-6">Our experts are analyzing your profile right now.</p>
               <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-emerald-800 text-sm font-medium mb-8">
                 We will email you a personalized career roadmap within 24 hours. 🚀
               </div>
               <Link href="/dashboard" className="bg-slate-900 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-800 transition">
                  Back to Dashboard
               </Link>
             </div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
              <h3 className="text-xl font-bold text-indigo-600 animate-pulse">
                {step === 5 ? "Uploading Resume..." : "Analyzing your profile..."}
              </h3>
              <p className="text-slate-400">Please wait a moment 🚀</p>
            </div>
          )}

          {/* STEP 4: RESULT (Standard Flow) */}
          {!loading && step === 4 && (
            <div className="animate-fade-in-up text-left">
              <div className="text-center mb-6">
                <span className="text-5xl mb-2 block">🎉</span>
                <h2 className="text-3xl font-bold text-slate-800">We found a Match!</h2>
                <p className="text-slate-500">Based on your interest in <span className="font-bold text-indigo-600">{formData.interest}</span></p>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center shadow-sm">
                <img src={getSuggestion().img} className="w-24 h-24 rounded-2xl object-cover shadow-md" alt="Uni" />
                <div>
                  <div className="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">Top Recommendation</div>
                  <h3 className="text-2xl font-bold text-slate-900">{getSuggestion().name}</h3>
                  <p className="text-slate-600 font-medium">{getSuggestion().uni}</p>
                  <p className="text-slate-500 text-sm mt-1">{formData.country} • Budget: {formData.budget}</p>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Link href="/dashboard/universities" className="flex-1 bg-slate-900 text-white font-bold py-3 rounded-xl text-center hover:bg-slate-800 transition">
                  View Full Details
                </Link>
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-3 rounded-xl text-center hover:bg-slate-50 transition"
                >
                  Play Again 🔄
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}