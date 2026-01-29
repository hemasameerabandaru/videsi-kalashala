"use client";
import React, { useState } from "react";

// --- ROADMAP DATA ---
const ROADMAP_STEPS = [
  { 
    id: 1, 
    title: "Profile Analysis", 
    desc: "Complete your profile to get AI recommendations.", 
    xp: 100,
    status: "completed", 
    icon: "👤" 
  },
  { 
    id: 2, 
    title: "University Shortlisting", 
    desc: "Use AI Finder to shortlist 8-12 universities.", 
    xp: 200,
    status: "completed", 
    icon: "🏛️" 
  },
  { 
    id: 3, 
    title: "Standardized Tests", 
    desc: "Take GRE/IELTS and upload scorecards.", 
    xp: 300,
    status: "active", // CURRENT MISSION
    icon: "📝" 
  },
  { 
    id: 4, 
    title: "Document Preparation", 
    desc: "Draft SOP, LORs, and Resume.", 
    xp: 250,
    status: "locked", 
    icon: "📄" 
  },
  { 
    id: 5, 
    title: "Application Submission", 
    desc: "Apply to universities before deadlines.", 
    xp: 500,
    status: "locked", 
    icon: "🚀" 
  },
  { 
    id: 6, 
    title: "Visa Process", 
    desc: "Book slot and prepare for interview.", 
    xp: 1000,
    status: "locked", 
    icon: "🛂" 
  }
];

export default function GamifiedRoadmap() {
  const [showAI, setShowAI] = useState(false);
  
  // Calculate Progress
  const totalSteps = ROADMAP_STEPS.length;
  const completedSteps = ROADMAP_STEPS.filter(s => s.status === "completed").length;
  const progress = Math.round((completedSteps / totalSteps) * 100);
  const totalXP = ROADMAP_STEPS.filter(s => s.status === "completed").reduce((acc, curr) => acc + curr.xp, 0);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto pb-20 relative">
      
      {/* HEADER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         {/* Level Card */}
         <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-purple-200 flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">
               🏆
            </div>
            <div>
               <p className="text-purple-100 text-xs font-bold uppercase tracking-wider">Current Level</p>
               <h3 className="text-2xl font-extrabold">Aspirant Lvl 3</h3>
               <p className="text-xs text-purple-200 mt-1">{totalXP} XP Earned</p>
            </div>
         </div>

         {/* Progress Card */}
         <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-center">
            <div className="flex justify-between items-end mb-2">
               <div>
                  <h3 className="text-lg font-bold text-slate-800">Journey Progress</h3>
                  <p className="text-sm text-slate-500">You are doing great! Keep going.</p>
               </div>
               <span className="text-2xl font-extrabold text-purple-600">{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
               <div className="bg-purple-600 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
            </div>
         </div>
      </div>

      {/* ROADMAP TIMELINE */}
      <div className="relative pl-8 md:pl-0">
         {/* Vertical Line (Hidden on mobile, center on desktop) */}
         <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-200 via-indigo-100 to-transparent -translate-x-1/2 md:block hidden"></div>
         <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 md:hidden block"></div>

         <div className="space-y-12">
            {ROADMAP_STEPS.map((step, index) => (
               <TimelineItem 
                  key={step.id} 
                  step={step} 
                  isLeft={index % 2 === 0} 
                  onAskAI={() => setShowAI(true)}
               />
            ))}
         </div>
      </div>

      {/* AI HELPER BUTTON (Floating) */}
      <button 
         onClick={() => setShowAI(true)}
         className="fixed bottom-8 right-8 bg-purple-600 text-white px-6 py-4 rounded-full shadow-2xl shadow-purple-400 hover:scale-105 hover:bg-purple-700 transition-all font-bold flex items-center gap-2 z-40 animate-bounce-slow"
      >
         <span>🤖</span> Ask Roadmap AI
      </button>

      {/* AI MODAL */}
      {showAI && <RoadmapAIModal onClose={() => setShowAI(false)} />}

    </div>
  );
}

// --- SUB-COMPONENT: TIMELINE ITEM ---
function TimelineItem({ step, isLeft, onAskAI }: any) {
   const isCompleted = step.status === "completed";
   const isActive = step.status === "active";
   const isLocked = step.status === "locked";

   return (
      <div className={`flex flex-col md:flex-row items-center justify-between w-full ${isLeft ? 'md:flex-row-reverse' : ''} relative group`}>
         
         {/* CONTENT CARD */}
         <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${!isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
            <div className={`p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden
               ${isActive 
                  ? 'bg-white border-purple-500 shadow-xl shadow-purple-100 scale-105 ring-4 ring-purple-50' 
                  : isCompleted 
                     ? 'bg-white border-green-200 shadow-sm opacity-80 hover:opacity-100' 
                     : 'bg-slate-50 border-slate-200 opacity-60 grayscale'
               }`}>
               
               {/* Status Badge */}
               <div className="flex justify-between items-start mb-3">
                  <span className={`text-4xl ${isLocked ? 'opacity-50' : ''}`}>{step.icon}</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                     ${isActive ? 'bg-purple-100 text-purple-700 animate-pulse' : 
                       isCompleted ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                     {isActive ? "Current Mission" : step.status}
                  </span>
               </div>

               <h3 className={`text-xl font-bold mb-1 ${isActive ? 'text-purple-900' : 'text-slate-800'}`}>
                  {step.title}
               </h3>
               <p className="text-sm text-slate-500 mb-4">{step.desc}</p>

               {/* XP & Action */}
               <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-3">
                  <span className={`text-xs font-bold ${isActive ? 'text-purple-600' : 'text-slate-400'}`}>
                     +{step.xp} XP
                  </span>
                  
                  {isActive && (
                     <button 
                        onClick={onAskAI}
                        className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-purple-700 transition"
                     >
                        Get Help ⚡
                     </button>
                  )}
               </div>

               {/* Active Glow Effect */}
               {isActive && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>}
            </div>
         </div>

         {/* CENTER CONNECTOR DOT */}
         <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-md z-10 flex items-center justify-center transition-all duration-500
            ${isActive ? 'bg-purple-600 scale-125 ring-4 ring-purple-100' : isCompleted ? 'bg-green-500' : 'bg-slate-300'}">
            {isCompleted ? <span className="text-white text-xs font-bold">✓</span> : null}
         </div>

         {/* EMPTY SPACE FOR LAYOUT BALANCE */}
         <div className="w-full md:w-[45%] hidden md:block"></div>
      </div>
   )
}

// --- SUB-COMPONENT: AI MODAL ---
function RoadmapAIModal({ onClose }: any) {
   return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
         <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scale-up">
            <div className="bg-purple-600 p-6 text-white flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <span className="text-3xl">🤖</span>
                  <div>
                     <h3 className="font-bold text-lg">Roadmap Strategist</h3>
                     <p className="text-xs text-purple-200">Expert guidance for your next step.</p>
                  </div>
               </div>
               <button onClick={onClose} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">✕</button>
            </div>
            
            <div className="p-6 space-y-4">
               <div className="bg-purple-50 p-4 rounded-xl text-sm text-purple-900 leading-relaxed">
                  <strong>Current Mission: Standardized Tests 📝</strong>
                  <br/><br/>
                  To clear this level, you need to book your GRE/IELTS slot. 
                  <br/>
                  I recommend taking a mock test first to gauge your baseline score. Would you like a study plan?
               </div>

               <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-purple-200 text-sm text-slate-700 transition font-medium">
                     📅 Create a 1-month study plan
                  </button>
                  <button className="w-full text-left p-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-purple-200 text-sm text-slate-700 transition font-medium">
                     📚 Best resources for GRE prep?
                  </button>
                  <button className="w-full text-left p-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-purple-200 text-sm text-slate-700 transition font-medium">
                     🤔 Should I take TOEFL or IELTS?
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}