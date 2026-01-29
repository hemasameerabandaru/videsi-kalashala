"use client";
import React, { useState, useRef, useEffect } from "react";

// --- 🧠 AI KNOWLEDGE BASE (CLEAN TEXT - NO ASTERISKS) ---
const SCHOLARSHIP_KNOWLEDGE = {
  ESSAY: "✍️ Essay Writing Guide:\n\n1. Hook: Start with a personal story that defines you.\n2. Impact: Clearly define the positive change you will bring to your community.\n3. Specifics: Mention specific professors or courses you admire at the target university.\n4. Clarity: Use simple, strong verbs. Avoid complex jargon.",
  
  FULBRIGHT: "🇺🇸 Fulbright (USA):\n\n• Coverage: Full tuition, airfare, health insurance, and monthly stipend.\n• Eligibility: High academic achievement and leadership potential.\n• Requirement: You must return to your home country for 2 years after completion.\n• Deadline: Typically in August/September/October depending on your region.",
  
  CHEVENING: "🇬🇧 Chevening (UK):\n\n• Coverage: Fully funded one-year master's degree in the UK.\n• Experience: Requires at least 2 years (2,800 hours) of work experience.\n• Leadership: You must prove you are a future leader or influencer in your field.",
  
  DAAD: "🇩🇪 DAAD (Germany):\n\n• Coverage: Monthly stipend (approx 934 Euros), insurance, and travel allowance.\n• Focus: Strong focus on research and development-related courses.\n• Experience: Some programs require 2 years of professional experience.",
  
  AAS: "🇦🇺 Australia Awards:\n\n• Coverage: Full tuition, return air travel, and establishment allowance.\n• Goal: Contributing to the development of your home country.\n• Note: Very competitive and focuses on specific priority sectors like health or engineering.",

  EIFFEL: "🇫🇷 Eiffel Excellence (France):\n\n• Coverage: Monthly allowance of 1,181 Euros plus flight tickets (Tuition is usually covered by the state).\n• Target: Future decision-makers in private and public sectors.\n• Age Limit: Candidates must be 25 years old or younger for Master's level.",

  GKS: "🇰🇷 GKS (South Korea):\n\n• Coverage: Airfare, settlement allowance, monthly stipend, and full tuition.\n• Bonus: Includes 1-year intensive Korean language training.\n• GPA: Requires a GPA above 80% to be eligible.",
  
  GENERAL: "I am your Scholarship Expert! 🏆\n\nI can tell you about:\n• Essay Writing Tips\n• Fulbright (USA)\n• Chevening (UK)\n• DAAD (Germany)\n• Australia Awards\n• GKS (Korea)\n• Eiffel (France)\n\nWhat do you want to know?"
};

// --- MOCK DATABASE ---
const SCHOLARSHIPS_DB = [
  { id: 1, name: "Fulbright Foreign Student", country: "USA", flag: "🇺🇸", amount: "Fully Funded", deadline: "Oct 2026", type: "Merit", match: 95, tags: ["Prestige", "Leadership"] },
  { id: 2, name: "Chevening Scholarship", country: "UK", flag: "🇬🇧", amount: "Full Ride", deadline: "Nov 2026", type: "Leadership", match: 88, tags: ["Networking", "Global"] },
  { id: 3, name: "DAAD HELMUT-SCHMIDT", country: "Germany", flag: "🇩🇪", amount: "€934/month", deadline: "Jul 2026", type: "Public Policy", match: 92, tags: ["Stipend", "Insurance"] },
  { id: 4, name: "Vanier Canada Graduate", country: "Canada", flag: "🇨🇦", amount: "$50k/year", deadline: "Nov 2026", type: "PhD", match: 65, tags: ["Research", "High Value"] },
  { id: 5, name: "Australia Awards", country: "Australia", flag: "🇦🇺", amount: "Full Tuition", deadline: "Apr 2026", type: "Development", match: 75, tags: ["Living Cost", "Travel"] },
  { id: 6, name: "Erasmus Mundus", country: "Europe", flag: "🇪🇺", amount: "Fully Funded", deadline: "Jan 2027", type: "Exchange", match: 80, tags: ["Travel", "Multi-country"] },
];

export default function GamifiedScholarships() {
  const [filter, setFilter] = useState("All");
  const [showAI, setShowAI] = useState(false);

  // Filter Logic
  const filteredList = filter === "All" ? SCHOLARSHIPS_DB : SCHOLARSHIPS_DB.filter(s => s.country === filter || s.type === filter);

  return (
    <div className="animate-fade-in max-w-7xl mx-auto pb-20 relative">
      
      {/* HEADER - Pastel Gradient */}
      <header className="mb-10 bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 rounded-3xl p-8 shadow-sm border border-purple-50">
         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
               <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-purple-900">🎓 Scholarship Finder</h1>
               <p className="text-purple-700 font-medium text-lg">AI-curated opportunities matching your profile.</p>
            </div>
            
            {/* Stats Pill */}
            <div className="bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-white flex gap-8">
               <div className="text-center">
                  <p className="text-xs font-bold text-purple-400 uppercase">Available</p>
                  <p className="text-xl font-extrabold text-purple-800">150+</p>
               </div>
               <div className="text-center border-l border-purple-200 pl-8">
                  <p className="text-xs font-bold text-pink-400 uppercase">Total Value</p>
                  <p className="text-xl font-extrabold text-pink-800">$5M+</p>
               </div>
            </div>
         </div>
      </header>

      {/* CONTROLS */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
         {/* Filter Tabs */}
         <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar flex-1">
            {["All", "USA", "UK", "Germany", "Merit"].map((cat) => (
               <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm
                  ${filter === cat 
                     ? 'bg-purple-600 text-white shadow-purple-200 scale-105' 
                     : 'bg-white text-slate-500 border border-slate-100 hover:bg-purple-50 hover:text-purple-700'}`}
               >
                  {cat}
               </button>
            ))}
         </div>

         {/* AI Button */}
         <button 
            onClick={() => setShowAI(true)}
            className="bg-white border border-purple-200 text-purple-700 px-6 py-2.5 rounded-xl font-bold shadow-sm hover:shadow-md hover:bg-purple-50 transition flex items-center gap-2 whitespace-nowrap"
         >
            <span>🤖</span> Ask AI Coach
         </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredList.map((item) => (
            <ScholarshipCard key={item.id} data={item} />
         ))}
      </div>

      {/* AI CHAT OVERLAY */}
      {showAI && <ScholarshipAIModal onClose={() => setShowAI(false)} />}

    </div>
  );
}

// --- SUB-COMPONENT: SCHOLARSHIP CARD ---
function ScholarshipCard({ data }: any) {
   return (
      <div className="group bg-white p-6 rounded-3xl border border-slate-50 shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
         
         {/* Match Badge */}
         <div className="absolute top-4 right-4 bg-green-50 text-green-700 text-xs font-extrabold px-3 py-1 rounded-full border border-green-100 flex items-center gap-1">
            <span>✨</span> {data.match}% Match
         </div>

         {/* Header */}
         <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">
               {data.flag}
            </div>
            <div className="flex-1 pr-16">
               <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1 group-hover:text-purple-600 transition-colors">
                  {data.name}
               </h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{data.country} • {data.type}</p>
            </div>
         </div>

         {/* Tags */}
         <div className="flex flex-wrap gap-2 mb-6">
            {data.tags.map((tag: string) => (
               <span key={tag} className="bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-1 rounded-lg">
                  #{tag}
               </span>
            ))}
         </div>

         {/* Info Grid */}
         <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
            <div>
               <p className="text-[10px] text-slate-400 font-bold uppercase">Benefit</p>
               <p className="text-sm font-bold text-slate-700">{data.amount}</p>
            </div>
            <div>
               <p className="text-[10px] text-slate-400 font-bold uppercase">Deadline</p>
               <p className="text-sm font-bold text-red-500">{data.deadline}</p>
            </div>
         </div>

         {/* Action - PASTEL PURPLE */}
         <button className="w-full mt-auto bg-purple-200 text-purple-900 py-3 rounded-xl text-sm font-bold hover:bg-purple-300 transition-all shadow-sm flex items-center justify-center gap-2 group-hover:translate-y-0 translate-y-1">
            View Details <span>→</span>
         </button>
      </div>
   )
}

// --- 🤖 SMART SCHOLARSHIP AI (Pastel Theme & Clean Text) ---
function ScholarshipAIModal({ onClose }: any) {
   const [messages, setMessages] = useState([
      { role: 'bot', text: `Hi! 👋 I am your Scholarship Coach.\n\nI can help you with:\n• Essay writing tips ✍️\n• Finding fully funded scholarships 💰\n• Eligibility for specific countries 🌍\n\nWhat are you looking for?` }
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
         let response = SCHOLARSHIP_KNOWLEDGE.GENERAL;
         const lower = userMsg.text.toLowerCase();

         if (lower.includes("essay") || lower.includes("write") || lower.includes("sop")) response = SCHOLARSHIP_KNOWLEDGE.ESSAY;
         else if (lower.includes("usa") || lower.includes("fulbright") || lower.includes("america")) response = SCHOLARSHIP_KNOWLEDGE.FULBRIGHT;
         else if (lower.includes("uk") || lower.includes("chevening") || lower.includes("britain")) response = SCHOLARSHIP_KNOWLEDGE.CHEVENING;
         else if (lower.includes("germany") || lower.includes("daad")) response = SCHOLARSHIP_KNOWLEDGE.DAAD;
         else if (lower.includes("australia") || lower.includes("award")) response = SCHOLARSHIP_KNOWLEDGE.AAS;
         else if (lower.includes("france") || lower.includes("eiffel") || lower.includes("paris")) response = SCHOLARSHIP_KNOWLEDGE.EIFFEL;
         else if (lower.includes("korea") || lower.includes("gks") || lower.includes("seoul")) response = SCHOLARSHIP_KNOWLEDGE.GKS;
         else if (lower.includes("fund") || lower.includes("money") || lower.includes("cost")) response = "Most scholarships listed here are Fully Funded! 🌟\n\nThis usually means they cover:\n1. Full Tuition Fees\n2. Monthly Living Stipend\n3. Return Airfare\n4. Health Insurance";

         setMessages(prev => [...prev, { role: 'bot', text: response }]);
         setIsTyping(false);
      }, 1000);
   };

   return (
      <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
         <div className="bg-white w-full max-w-md h-[550px] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-up border border-purple-100">
            {/* Header - Soft Pastel Gradient */}
            <div className="bg-gradient-to-r from-purple-300 to-pink-300 p-5 text-white flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <div className="bg-white/30 p-2 rounded-full text-xl">🎓</div>
                  <div>
                     <h3 className="font-bold text-lg">Scholarship Coach</h3>
                     <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></span>
                        <p className="text-[10px] font-medium">Online</p>
                     </div>
                  </div>
               </div>
               <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition">✕</button>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 p-5 bg-purple-50/50 overflow-y-auto space-y-4" ref={scrollRef}>
               {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[85%] p-4 rounded-2xl text-sm whitespace-pre-line shadow-sm leading-relaxed
                        ${m.role === 'user' 
                           ? 'bg-purple-300 text-purple-900 font-medium rounded-br-none' 
                           : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
                        }`}>
                        {m.text}
                     </div>
                  </div>
               ))}
               {isTyping && (
                  <div className="flex justify-start">
                     <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5">
                        <span className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce delay-75"></span>
                        <span className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce delay-150"></span>
                     </div>
                  </div>
               )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
               <input 
                  type="text" 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:bg-white transition-all text-slate-700 placeholder:text-slate-400"
                  placeholder="Ask about essays..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               />
               <button 
                  onClick={handleSend}
                  disabled={!input.trim()} 
                  className="bg-purple-300 text-purple-900 p-3 rounded-xl hover:bg-purple-400 transition disabled:opacity-50 shadow-sm active:scale-95"
               >
                  ➤
               </button>
            </div>
         </div>
      </div>
   )
}