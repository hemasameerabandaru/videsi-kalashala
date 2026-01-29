"use client";
import React, { useState, useRef, useEffect } from "react";

// --- 🧠 AI KNOWLEDGE BASE (NO ASTERISKS) ---
const VISA_KNOWLEDGE = {
  DS160: "📝 DS-160 Form:\n\n• This is the online non-immigrant visa application form.\n• You must complete it fully and truthfully.\n• Save your Application ID immediately!\n• Session times out quickly, so save often.",
  
  SEVIS: "💵 SEVIS Fee (I-901):\n\n• Mandatory fee for F-1 students ($350).\n• Must be paid BEFORE your visa interview.\n• Keep the receipt safely; you need it at the consulate.",
  
  INTERVIEW: "🗣️ Interview Tips:\n\n1. Be confident and honest.\n2. Prove strong ties to your home country (family, property, job offer).\n3. Know your university and course details thoroughly.\n4. Show you have sufficient funds without working illegally.",
  
  DOCUMENTS: "📂 Checklist for Interview:\n\n• Passport & I-20\n• DS-160 Confirmation Page\n• SEVIS Fee Receipt\n• Visa Appointment Letter\n• Financial Proof (Bank statements)\n• Academic Transcripts",
  
  UK_TIER4: "🇬🇧 UK Student Visa:\n\n• Requires CAS (Confirmation of Acceptance for Studies) from your uni.\n• You must pay the Immigration Health Surcharge (IHS).\n• Proof of funds must be held for 28 consecutive days.",
  
  GENERAL: "I am your Visa Consul Assistant! 🛂\n\nI can guide you on:\n• DS-160 Form\n• SEVIS Fee\n• Interview Questions\n• Required Documents\n\nWhat do you need help with?"
};

// --- MOCK DATA ---
const VISA_STEPS = {
  USA: [
    { id: 1, title: "Receive I-20", desc: "Get the document from your university.", status: "completed" },
    { id: 2, title: "Pay SEVIS Fee", desc: "Pay $350 I-901 fee online.", status: "active" },
    { id: 3, title: "Complete DS-160", desc: "Fill the online visa application form.", status: "locked" },
    { id: 4, title: "Book Slots", desc: "Schedule VAC (Biometrics) & Interview.", status: "locked" },
    { id: 5, title: "Attend Interview", desc: "Visit the US Consulate.", status: "locked" }
  ],
  UK: [
    { id: 1, title: "Receive CAS", desc: "Confirmation of Acceptance for Studies.", status: "completed" },
    { id: 2, title: "Prepare Funds", desc: "Hold funds for 28 days.", status: "active" },
    { id: 3, title: "TB Test", desc: "Get tested at an approved clinic.", status: "locked" },
    { id: 4, title: "Submit Application", desc: "Pay fee & IHS surcharge.", status: "locked" },
    { id: 5, title: "Biometrics", desc: "Visit VFS Global center.", status: "locked" }
  ],
  Canada: [
    { id: 1, title: "LOA Received", desc: "Letter of Acceptance from DLI.", status: "completed" },
    { id: 2, title: "GIC Account", desc: "Deposit $20,635 CAD living funds.", status: "active" },
    { id: 3, title: "Medical Exam", desc: "Upfront medical test.", status: "locked" },
    { id: 4, title: "Apply for Permit", desc: "Submit application on IRCC portal.", status: "locked" },
    { id: 5, title: "Biometrics", desc: "Submit fingerprints & photo.", status: "locked" }
  ]
};

export default function GamifiedVisaGuide() {
  const [country, setCountry] = useState("USA");
  const [showAI, setShowAI] = useState(false);

  const currentSteps = VISA_STEPS[country as keyof typeof VISA_STEPS];
  const activeStepIndex = currentSteps.findIndex(s => s.status === "active");
  const progress = Math.round(((activeStepIndex) / currentSteps.length) * 100);

  return (
    <div className="animate-fade-in max-w-7xl mx-auto pb-20 relative">
      
      {/* HEADER - Pastel Gradient */}
      <header className="mb-10 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-3xl p-8 shadow-sm border border-indigo-50">
         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
               <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-indigo-900">🛂 Visa Guide</h1>
               <p className="text-indigo-700 font-medium text-lg">Step-by-step roadmap to your study visa.</p>
            </div>
            
            {/* Country Pill */}
            <div className="bg-white/60 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-white flex gap-2">
               {["USA", "UK", "Canada"].map((c) => (
                  <button
                     key={c}
                     onClick={() => setCountry(c)}
                     className={`px-5 py-2 rounded-xl text-sm font-bold transition-all
                     ${country === c 
                        ? 'bg-indigo-200 text-indigo-900 shadow-sm' 
                        : 'bg-transparent text-slate-500 hover:bg-indigo-50'}`}
                  >
                     {c}
                  </button>
               ))}
            </div>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* LEFT: TIMELINE */}
         <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-indigo-50/50">
               <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
                  <span>🗺️</span> Application Roadmap
               </h3>
               
               <div className="space-y-8 relative pl-4">
                  {/* Vertical Line */}
                  <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-slate-100"></div>

                  {currentSteps.map((step, index) => (
                     <StepCard key={step.id} step={step} index={index + 1} />
                  ))}
               </div>
            </div>
         </div>

         {/* RIGHT: ACTION CENTER */}
         <div className="lg:col-span-1 space-y-6">
            
            {/* Progress Card */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-50 text-center">
               <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                     <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                     <path className="text-indigo-400 transition-all duration-1000 ease-out" strokeDasharray={`${progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                  <span className="absolute text-2xl font-extrabold text-indigo-900">{progress}%</span>
               </div>
               <h4 className="font-bold text-slate-700 mb-1">Visa Readiness</h4>
               <p className="text-xs text-slate-400">Complete tasks to level up!</p>
            </div>

            {/* AI Helper Banner */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-3xl p-6 text-center cursor-pointer hover:shadow-md transition-all group"
                 onClick={() => setShowAI(true)}>
               <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🤖</div>
               <h3 className="font-bold text-indigo-900 text-lg mb-1">Visa Consul AI</h3>
               <p className="text-indigo-600 text-sm mb-4">Practice interview questions or ask about forms.</p>
               <button className="bg-indigo-200 text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-300 transition shadow-sm w-full">
                  Start Chat 💬
               </button>
            </div>

         </div>
      </div>

      {/* AI CHAT OVERLAY */}
      {showAI && <VisaAIModal onClose={() => setShowAI(false)} />}

    </div>
  );
}

// --- SUB-COMPONENTS ---

function StepCard({ step, index }: any) {
   const isCompleted = step.status === "completed";
   const isActive = step.status === "active";
   const isLocked = step.status === "locked";

   return (
      <div className={`relative flex items-center gap-6 p-4 rounded-2xl transition-all duration-300
         ${isActive ? 'bg-indigo-50 border border-indigo-100 scale-105 shadow-md' : 'hover:bg-slate-50'}`}>
         
         {/* Number Bubble */}
         <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 z-10 border-4 border-white shadow-sm
            ${isCompleted ? 'bg-green-400 text-white' : isActive ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
            {isCompleted ? '✓' : index}
         </div>

         {/* Content */}
         <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
               <h4 className={`font-bold text-lg ${isActive ? 'text-indigo-900' : isLocked ? 'text-slate-400' : 'text-slate-800'}`}>
                  {step.title}
               </h4>
               {isActive && <span className="bg-indigo-200 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">DO NOW</span>}
            </div>
            <p className={`text-sm ${isActive ? 'text-indigo-700' : 'text-slate-500'}`}>{step.desc}</p>
         </div>

         {/* Action Button (only for active/completed) */}
         {!isLocked && (
            <button className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors
               ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-indigo-200 text-indigo-700 hover:bg-indigo-300'}`}>
               ➜
            </button>
         )}
      </div>
   )
}

// --- 🤖 VISA AI MODAL (Pastel Theme & Clean Text) ---
function VisaAIModal({ onClose }: any) {
   const [messages, setMessages] = useState([
      { role: 'bot', text: `Hello! 👋 I am your Visa Assistant.\n\nI can help you with:\n• DS-160 Form Guide 📝\n• SEVIS Fee Information 💵\n• Interview Preparation 🗣️\n\nWhat is your question?` }
   ]);
   const [input, setInput] = useState("");
   const [isTyping, setIsTyping] = useState(false);
   const scrollRef = useRef<any>(null);

   useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
   }, [messages]);

   const handleSend = async () => {
      if(!input.trim()) return;

      const userMsg = { role: 'user', text: input };
      setMessages(prev => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      // --- 🧠 AI LOGIC ---
      setTimeout(() => {
         let response = VISA_KNOWLEDGE.GENERAL;
         const lower = userMsg.text.toLowerCase();

         if (lower.includes("ds160") || lower.includes("ds-160") || lower.includes("form")) response = VISA_KNOWLEDGE.DS160;
         else if (lower.includes("sevis") || lower.includes("fee") || lower.includes("i901")) response = VISA_KNOWLEDGE.SEVIS;
         else if (lower.includes("interview") || lower.includes("question") || lower.includes("ask")) response = VISA_KNOWLEDGE.INTERVIEW;
         else if (lower.includes("document") || lower.includes("checklist") || lower.includes("carry")) response = VISA_KNOWLEDGE.DOCUMENTS;
         else if (lower.includes("uk") || lower.includes("cas") || lower.includes("ihs")) response = VISA_KNOWLEDGE.UK_TIER4;

         setMessages(prev => [...prev, { role: 'bot', text: response }]);
         setIsTyping(false);
      }, 1000);
   };

   return (
      <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
         <div className="bg-white w-full max-w-md h-[550px] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-up border border-indigo-100">
            {/* Header - Soft Pastel Gradient */}
            <div className="bg-gradient-to-r from-blue-300 to-indigo-300 p-5 text-white flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <div className="bg-white/30 p-2 rounded-full text-xl">🛂</div>
                  <div>
                     <h3 className="font-bold text-lg">Visa Assistant</h3>
                     <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></span>
                        <p className="text-[10px] font-medium">Online</p>
                     </div>
                  </div>
               </div>
               <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition">✕</button>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 p-5 bg-indigo-50/50 overflow-y-auto space-y-4" ref={scrollRef}>
               {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[85%] p-4 rounded-2xl text-sm whitespace-pre-line shadow-sm leading-relaxed
                        ${m.role === 'user' 
                           ? 'bg-indigo-300 text-indigo-900 font-medium rounded-br-none' 
                           : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
                        }`}>
                        {m.text}
                     </div>
                  </div>
               ))}
               {isTyping && (
                  <div className="flex justify-start">
                     <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5">
                        <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce delay-75"></span>
                        <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce delay-150"></span>
                     </div>
                  </div>
               )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
               <input 
                  type="text" 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all text-slate-700 placeholder:text-slate-400"
                  placeholder="Ask about DS-160..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               />
               <button 
                  onClick={handleSend}
                  disabled={!input.trim()} 
                  className="bg-indigo-300 text-indigo-900 p-3 rounded-xl hover:bg-indigo-400 transition disabled:opacity-50 shadow-sm active:scale-95"
               >
                  ➤
               </button>
            </div>
         </div>
      </div>
   )
}