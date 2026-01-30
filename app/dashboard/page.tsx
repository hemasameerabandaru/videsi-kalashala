"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs"; // 👈 Added useUser
import { generateAIResponse } from "@/app/actions"; // 👈 Added Server Action import

// Import Gamified Components
import GamifiedProfile from "../components/dashboard/GamifiedProfile";
import GamifiedAssessment from "../components/dashboard/GamifiedAssessment";
import GamifiedUniversities from "../components/dashboard/GamifiedUniversities";
import GamifiedApplications from "../components/dashboard/GamifiedApplications";
import GamifiedDocuments from "../components/dashboard/GamifiedDocuments";
import GamifiedCostCalculator from "../components/dashboard/GamifiedCostCalculator";
import GamifiedScholarships from "../components/dashboard/GamifiedScholarships";
import GamifiedVisaGuide from "../components/dashboard/GamifiedVisaGuide";
import GamifiedVisaMockAI from "../components/dashboard/GamifiedVisaMockAI";
import GamifiedMentors from "../components/dashboard/GamifiedMentors";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showGlobalAI, setShowGlobalAI] = useState(false);
  
  // 🟢 Get User Data for the AI
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* 🟢 SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full z-10 overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
           <Link href="/" className="cursor-pointer">
             <span className="text-3xl font-brand font-bold text-indigo-600 tracking-wide hover:text-indigo-700 transition-colors">
               Videsi Kalashala
             </span>
           </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">Main</p>
          <NavItem id="overview" label="Overview" icon="🏠" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="profile" label="Profile" icon="👤" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="roadmap" label="My Roadmap" icon="🗺️" activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Study Abroad</p>
          <NavItem id="assessment" label="Assessment" icon="📊" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="universities" label="Universities" icon="🏛️" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="applications" label="Applications" icon="📝" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="documents" label="Documents" icon="📂" activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Finance & Visa</p>
          <NavItem id="cost-calculator" label="Cost Calculator" icon="💰" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="scholarships" label="Scholarships" icon="🎓" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="visa-guide" label="Visa Guide" icon="🛂" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="visa-mock" label="Visa Mock AI" icon="🤖" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="mentors" label="Mentors" icon="👨‍🏫" activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>

        <div className="p-4 border-t border-slate-100">
           <SignOutButton redirectUrl="/"> 
             <button className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition font-medium text-sm mt-1">
                <span>🚪</span> Sign Out
             </button>
           </SignOutButton>
        </div>
      </aside>

      {/* 🟢 MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 p-8 transition-all relative">
        
        {/* 1. OVERVIEW */}
        {activeTab === "overview" && (
          <div className="animate-fade-in space-y-8 pb-20">
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back! 👋</h1>
                <p className="text-slate-500 font-medium">Here is your daily activity overview.</p>
              </div>
              <button 
                onClick={() => setActiveTab("universities")}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
              >
                + Find Universities
              </button>
            </header>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard title="Universities Shortlisted" value="12" icon="❤️" color="bg-white border border-slate-200 text-slate-900" />
              <StatsCard title="Applications Sent" value="5" icon="🚀" color="bg-white border border-slate-200 text-slate-900" />
              <StatsCard title="Pending Actions" value="3" icon="⏳" color="bg-white border border-slate-200 text-slate-900" />
            </div>

            {/* Start My Prep */}
            <div>
               <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span>📚</span> Start My Prep
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <PrepCard title="IELTS" icon="🇬🇧" color="bg-orange-50 border-orange-100" btnColor="bg-orange-500" progress={30} />
                  <PrepCard title="Duolingo" icon="🦉" color="bg-green-50 border-green-100" btnColor="bg-green-500" progress={10} />
                  <PrepCard title="GRE" icon="📐" color="bg-blue-50 border-blue-100" btnColor="bg-blue-500" progress={65} />
                  <PrepCard title="TOEFL" icon="🇺🇸" color="bg-purple-50 border-purple-100" btnColor="bg-purple-500" progress={0} />
               </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
               <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
               <table className="w-full text-left text-sm">
                  <thead className="text-xs text-slate-400 uppercase font-bold border-b border-slate-100">
                    <tr><th className="py-3">University</th><th className="py-3">Country</th><th className="py-3">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr><td className="py-4 font-bold">Arizona State University</td><td className="py-4 text-slate-500">USA</td><td className="py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Accepted</span></td></tr>
                    <tr><td className="py-4 font-bold">Technical Univ. Munich</td><td className="py-4 text-slate-500">Germany</td><td className="py-4"><span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span></td></tr>
                  </tbody>
               </table>
            </div>

            {/* 🤖 FLOATING AI BUTTON */}
            <button 
               onClick={() => setShowGlobalAI(true)}
               className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 hover:scale-110 transition-all z-40 flex items-center justify-center gap-2 animate-bounce-slow"
            >
               <span className="text-2xl">🤖</span>
               <span className="font-bold pr-2">Ask AI</span>
            </button>

          </div>
        )}

        {/* OTHER TABS */}
        {activeTab === "profile" && <GamifiedProfile />}
        {activeTab === "roadmap" && <div className="animate-fade-in max-w-4xl mx-auto"> <h2 className="text-3xl font-bold text-slate-900 mb-8">Study Abroad Roadmap</h2> <div className="relative border-l-4 border-indigo-100 ml-6 space-y-10"> <RoadmapLevel level="1" title="Research Universities" desc="Shortlist 10 universities based on profile." status="completed" /> <RoadmapLevel level="2" title="Prepare for GRE/IELTS" desc="Take mock tests and book exam slot." status="completed" /> <RoadmapLevel level="3" title="Prepare Documents" desc="Draft SOP and collect LORs." status="active" /> <RoadmapLevel level="4" title="Apply to Universities" desc="Submit applications before deadline." status="locked" /> <RoadmapLevel level="5" title="Visa Process" desc="Book F1 Visa slot." status="locked" /> </div> </div>}
        {activeTab === "assessment" && <GamifiedAssessment />}
        {activeTab === "universities" && <GamifiedUniversities />}
        {activeTab === "applications" && <GamifiedApplications />}
        {activeTab === "documents" && <GamifiedDocuments />}
        {activeTab === "cost-calculator" && <GamifiedCostCalculator />}
        {activeTab === "scholarships" && <GamifiedScholarships />}
        {activeTab === "visa-guide" && <GamifiedVisaGuide />}
        {activeTab === "visa-mock" && <GamifiedVisaMockAI />}
        {activeTab === "mentors" && <GamifiedMentors />}

        {/* 🤖 REAL GLOBAL STUDY ABROAD AI MODAL */}
        {/* We pass the 'user' prop so the AI knows who it is talking to! */}
         {showGlobalAI && <GlobalStudyAIModal 
    onClose={() => setShowGlobalAI(false)} 
    userProfile={{
        firstName: user?.firstName,
        publicMetadata: user?.publicMetadata
    }} 
/>}

      </main>
    </div>
  );
}

// --- 🧠 REALISTIC AI BRAIN (POWERED BY GEMINI) ---

function GlobalStudyAIModal({ onClose, userProfile }: any) {
   const userName = userProfile?.firstName || "Student";
   
   // Initial Welcome Message
   const [messages, setMessages] = useState([
     { 
       role: 'bot', 
       text: `Hi ${userName}! 👋 I'm powered by Google Gemini. I've read your profile.\n\nAsk me about universities for your GPA, visa steps, or SOP tips!` 
     }
   ]);
   const [input, setInput] = useState("");
   const [isTyping, setIsTyping] = useState(false);
   const scrollRef = useRef<any>(null);

   // Auto-scroll to bottom
   useEffect(() => { 
     if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; 
   }, [messages, isTyping]);

   const handleSend = async (text: string = input) => {
      if(!text.trim()) return;
      
      // 1. Add User Message to UI
      const userMsg = { role: 'user', text: text };
      const newHistory = [...messages, userMsg];
      setMessages(newHistory);
      setInput("");
      setIsTyping(true);

      // 2. Call the Real AI Brain (Server Action)
      // We pass the new history and the user profile so the AI has context
      const res = await generateAIResponse(newHistory, userProfile);

      setIsTyping(false);
      
      // 3. Display AI Response
      if (res.success) {
          const botResponse = res.message;
          // Typing effect
          setMessages(prev => [...prev, { role: 'bot', text: "" }]);
          let i = 0;
          const interval = setInterval(() => {
             setMessages(prev => {
                const historyCopy = [...prev];
                const lastMsg = historyCopy[historyCopy.length - 1];
                lastMsg.text = botResponse.substring(0, i + 1);
                return historyCopy;
             });
             i++;
             if (i === botResponse.length) clearInterval(interval);
          }, 10); // Speed of typing
      } else {
          setMessages(prev => [...prev, { role: 'bot', text: "⚠️ Error connecting to AI. Check your API Key." }]);
      }
   };

   return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
         <div className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-up border border-indigo-100">
            {/* Header */}
            <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full text-3xl">✨</div>
                  <div>
                     <h3 className="font-bold text-2xl">Gemini Counsellor</h3>
                     <p className="text-sm text-indigo-100 opacity-90">Context-Aware AI Guidance</p>
                  </div>
               </div>
               <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition text-xl">✕</button>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 p-8 bg-slate-50 overflow-y-auto space-y-6" ref={scrollRef}>
               {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[75%] p-6 rounded-2xl text-base whitespace-pre-line shadow-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
                        {m.text}
                     </div>
                  </div>
               ))}
               {isTyping && (
                  <div className="flex justify-start">
                     <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl rounded-bl-none shadow-sm flex gap-2 items-center">
                        <span className="text-xs text-slate-400 font-bold mr-2">Gemini is thinking</span>
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></span>
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
                     </div>
                  </div>
               )}
            </div>

            {/* Quick Chips */}
            <div className="px-6 pb-4 bg-slate-50 flex gap-3 overflow-x-auto no-scrollbar">
               {["Suggest Universities", "Analyze my Budget", "Write an SOP intro", "Visa Checklist"].map((chip) => (
                  <button key={chip} onClick={() => handleSend(chip)} className="bg-white border border-indigo-200 text-indigo-600 text-sm font-bold px-4 py-2.5 rounded-full whitespace-nowrap hover:bg-indigo-50 hover:shadow-md transition">
                     {chip}
                  </button>
               ))}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-slate-100 flex gap-4">
               <input 
                  type="text" 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-base outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-700 shadow-inner" 
                  placeholder="Ask for advice..." 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
               />
               <button 
                  onClick={() => handleSend()} 
                  disabled={!input.trim() || isTyping} 
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl hover:bg-indigo-700 transition disabled:opacity-50 shadow-lg active:scale-95 font-bold text-lg"
               >
                  Send ➤
               </button>
            </div>
         </div>
      </div>
   )
}

// 👇 HELPER COMPONENTS

function NavItem({ id, icon, label, activeTab, setActiveTab }: any) {
  const isActive = activeTab === id;
  return (
    <button 
      onClick={() => setActiveTab(id)} 
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition font-medium text-sm 
        ${isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
          : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
        }`}
    >
      <span className="text-xl">{icon}</span>
      {label}
    </button>
  );
}

function StatsCard({ title, value, icon, color }: any) {
  return (
    <div className={`${color} p-6 rounded-2xl shadow-sm`}>
       <div className="flex justify-between items-start">
          <div>
             <p className="text-slate-500 font-bold text-xs mb-1 uppercase">{title}</p>
             <h3 className="text-3xl font-extrabold text-slate-900">{value}</h3>
          </div>
          <div className="text-2xl">{icon}</div>
       </div>
    </div>
  );
}

function PrepCard({ title, icon, color, btnColor, progress }: any) {
   return (
      <div className={`${color} border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all`}>
         <div className="flex justify-between items-start mb-3">
            <h4 className="font-bold text-slate-800 text-lg">{title}</h4>
            <span className="text-2xl">{icon}</span>
         </div>
         
         <div className="w-full bg-white h-2 rounded-full mb-2 overflow-hidden border border-slate-100">
            <div className={`h-full ${btnColor}`} style={{ width: `${progress}%` }}></div>
         </div>
         <p className="text-xs text-slate-500 font-medium mb-4">{progress}% Completed</p>
         
         <button className={`w-full ${btnColor} text-white py-2 rounded-xl text-xs font-bold shadow-sm hover:opacity-90 transition`}>
            {progress === 0 ? "Start Learning" : "Continue Prep"}
         </button>
      </div>
   )
}

function RoadmapLevel({ level, title, desc, status }: any) {
   const isLocked = status === 'locked';
   const isCompleted = status === 'completed';
   return (
      <div className={`relative pl-8 ${isLocked ? 'opacity-50 grayscale' : 'opacity-100'}`}>
         <div className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 
            ${isCompleted ? 'bg-green-500 text-white' : isLocked ? 'bg-slate-300 text-slate-500' : 'bg-indigo-600 text-white'}`}>
            {isCompleted ? '✓' : level}
         </div>
         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <h4 className={`text-xl font-bold ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>{title}</h4>
            <p className="text-slate-500">{desc}</p>
         </div>
      </div>
   )
}