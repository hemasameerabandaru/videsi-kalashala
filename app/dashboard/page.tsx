"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
// 🔴 REMOVED: import { SignOutButton, useUser } from "@clerk/nextjs";
// 🟢 ADDED: NextAuth Hooks
import { useSession, signOut } from "next-auth/react"; 
import { generateAIResponse } from "@/app/actions";
import { Upload, AlertCircle, X, ArrowRight, PlayCircle, BookOpen, Mic, Volume2, StopCircle } from "lucide-react";

// --- IMPORT YOUR GAMIFIED COMPONENTS ---
import GamifiedProfile from "../components/dashboard/GamifiedProfile";
import GamifiedUniversities from "../components/dashboard/GamifiedUniversities"; 
import GamifiedApplications from "../components/dashboard/GamifiedApplications";
import GamifiedDocuments from "../components/dashboard/GamifiedDocuments";
import GamifiedCostCalculator from "../components/dashboard/GamifiedCostCalculator";
import GamifiedRoadmap from "../components/dashboard/GamifiedRoadmap";
import GamifiedAssessment from "../components/dashboard/GamifiedAssessment";
import GamifiedScholarships from "../components/dashboard/GamifiedScholarships";
import GamifiedVisaGuide from "../components/dashboard/GamifiedVisaGuide";
import GamifiedVisaMockAI from "../components/dashboard/GamifiedVisaMockAI";
import GamifiedMentors from "../components/dashboard/GamifiedMentors";
import PlaceholderTab from "../components/dashboard/PlaceholderTab"; // Fallback if file missing

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showGlobalAI, setShowGlobalAI] = useState(false);
  
  // 🟢 Interaction States
  const [uniView, setUniView] = useState("explore");
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [selectedPrep, setSelectedPrep] = useState<string | null>(null);
  
  // 🟢 NEXTAUTH SESSION (Replaces Clerk useUser)
  const { data: session } = useSession();
  const user = session?.user; // The user object from Google (name, email, image)
  const userName = user?.name?.split(" ")[0] || "Student"; // Get first name

  // 🟢 NAVIGATION HANDLER
  const handleStatClick = (type: string) => {
    if (type === "shortlist") {
        setUniView("shortlisted");
        setActiveTab("universities");
    } else if (type === "applications") {
        setActiveTab("applications");
    } else if (type === "pending") {
        setShowPendingModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* 🟢 SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full z-10 overflow-y-auto">
        <div className="p-8 border-b border-slate-100 flex items-center gap-2">
           <Link href="/" className="cursor-pointer">
             <span className="text-3xl font-brand font-extrabold text-indigo-600 tracking-wide hover:text-indigo-700 transition-colors">
               Videsi Kalashala
             </span>
           </Link>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 mt-1">Main</p>
          <NavItem id="overview" label="Overview" icon="🏠" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="profile" label="Profile" icon="👤" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="roadmap" label="My Roadmap" icon="🗺️" activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 mt-8">Study Abroad</p>
          <NavItem id="assessment" label="Assessment" icon="📊" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="universities" label="Universities" icon="🏛️" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="applications" label="Applications" icon="📝" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="documents" label="Documents" icon="📂" activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 mt-8">Finance & Visa</p>
          <NavItem id="cost-calculator" label="Cost Calculator" icon="💰" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="scholarships" label="Scholarships" icon="🎓" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="visa-guide" label="Visa Guide" icon="🛂" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="visa-mock" label="Visa Mock AI" icon="🤖" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="mentors" label="Mentors" icon="👨‍🏫" activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>

        <div className="p-6 border-t border-slate-100">
           {/* 🟢 WORKING SIGN OUT BUTTON */}
           <button 
             onClick={() => signOut({ callbackUrl: "/" })}
             className="flex items-center gap-3 w-full p-4 text-red-600 hover:bg-red-50 rounded-xl transition font-bold text-base mt-1"
           >
              <span>🚪</span> Sign Out
           </button>
        </div>
      </aside>

      {/* 🟢 MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-72 p-10 transition-all relative">
        
        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="animate-fade-in space-y-10 pb-24">
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Welcome back, {userName}! 👋</h1>
                <p className="text-slate-500 font-medium text-lg">Here is your daily activity overview.</p>
              </div>
              <button onClick={() => setActiveTab("universities")} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl hover:-translate-y-1">
                + Find Universities
              </button>
            </header>
            
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatsCard title="Universities Shortlisted" value="12" icon="❤️" color="bg-white border border-slate-200 text-slate-900 cursor-pointer hover:border-indigo-400 hover:shadow-lg transition hover:-translate-y-1" onClick={() => handleStatClick('shortlist')} />
              <StatsCard title="Applications Sent" value="5" icon="🚀" color="bg-white border border-slate-200 text-slate-900 cursor-pointer hover:border-indigo-400 hover:shadow-lg transition hover:-translate-y-1" onClick={() => handleStatClick('applications')} />
              <StatsCard title="Pending Actions" value="3" icon="⏳" color="bg-white border border-slate-200 text-slate-900 cursor-pointer hover:border-indigo-400 hover:shadow-lg transition hover:-translate-y-1" onClick={() => handleStatClick('pending')} />
            </div>

            {/* PREP SECTION */}
            <div>
               <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-3"><span>📚</span> Start My Prep</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <PrepCard title="IELTS" icon="🇬🇧" color="bg-orange-50 border-orange-100" btnColor="bg-orange-500" progress={30} onClick={() => setSelectedPrep("IELTS")} />
                  <PrepCard title="Duolingo" icon="🦉" color="bg-green-50 border-green-100" btnColor="bg-green-500" progress={10} onClick={() => setSelectedPrep("Duolingo")} />
                  <PrepCard title="GRE" icon="📐" color="bg-blue-50 border-blue-100" btnColor="bg-blue-500" progress={65} onClick={() => setSelectedPrep("GRE")} />
                  <PrepCard title="TOEFL" icon="🇺🇸" color="bg-purple-50 border-purple-100" btnColor="bg-purple-500" progress={0} onClick={() => setSelectedPrep("TOEFL")} />
               </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
               <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h3>
               <table className="w-full text-left text-base">
                  <thead className="text-sm text-slate-400 uppercase font-bold border-b border-slate-100">
                    <tr><th className="py-4">University</th><th className="py-4">Country</th><th className="py-4">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr><td className="py-5 font-bold text-lg">Arizona State University</td><td className="py-5 text-slate-500">USA</td><td className="py-5"><span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold">Accepted</span></td></tr>
                    <tr><td className="py-5 font-bold text-lg">Technical Univ. Munich</td><td className="py-5 text-slate-500">Germany</td><td className="py-5"><span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-bold">Pending</span></td></tr>
                  </tbody>
               </table>
            </div>

            {/* AI BUTTON */}
            <button onClick={() => setShowGlobalAI(true)} className="fixed bottom-10 right-10 bg-indigo-600 text-white p-5 rounded-full shadow-2xl hover:bg-indigo-700 hover:scale-110 transition-all z-40 flex items-center justify-center gap-3 animate-bounce-slow">
               <span className="text-3xl">🤖</span><span className="font-extrabold text-lg pr-2">Ask AI</span>
            </button>
          </div>
        )}

        {/* 🟢 RENDER SELECTED TAB */}
        {activeTab === "universities" && <GamifiedUniversities initialView={uniView} />}
        {activeTab === "profile" && <GamifiedProfile />}
        {activeTab === "roadmap" && <GamifiedRoadmap />}
        {activeTab === "assessment" && <GamifiedAssessment />}
        {activeTab === "applications" && <GamifiedApplications />}
        {activeTab === "documents" && <GamifiedDocuments />}
        {activeTab === "cost-calculator" && <GamifiedCostCalculator />}
        {activeTab === "scholarships" && <GamifiedScholarships />}
        {activeTab === "visa-guide" && <GamifiedVisaGuide />}
        {activeTab === "visa-mock" && <GamifiedVisaMockAI />}
        {activeTab === "mentors" && <GamifiedMentors />}

        {/* 🟢 MODALS */}
        {showGlobalAI && <GlobalStudyAIModal onClose={() => setShowGlobalAI(false)} userProfile={user} />}
        {showPendingModal && <PendingActionsModal onClose={() => setShowPendingModal(false)} />}
        {selectedPrep && <PrepContentModal exam={selectedPrep} onClose={() => setSelectedPrep(null)} />}

      </main>
    </div>
  );
}

// -----------------------------------------------------------
// 🎤 SEAMLESS VOICE AI COMPONENT (FEMALE VOICE)
// -----------------------------------------------------------
function GlobalStudyAIModal({ onClose, userProfile }: any) {
   const userName = userProfile?.name || "Student";
   const [messages, setMessages] = useState([{ role: 'bot', text: `Hi ${userName}! 👋 I'm Videsi AI. You can speak to me! Ask about universities, visas, or practice an interview.` }]);
   const [input, setInput] = useState("");
   const [isTyping, setIsTyping] = useState(false);
   const [isListening, setIsListening] = useState(false);
   const [isSpeaking, setIsSpeaking] = useState(false);
   const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
   
   const scrollRef = useRef<any>(null);
   const recognitionRef = useRef<any>(null);

   // Auto-scroll
   useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isTyping]);

   // Load Voices when component mounts
   useEffect(() => {
      const loadVoices = () => {
         const voices = window.speechSynthesis.getVoices();
         setAvailableVoices(voices);
      };
      
      // Load immediately if available
      loadVoices();
      
      // Chrome loads voices asynchronously, so we must listen for the event
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
         window.speechSynthesis.onvoiceschanged = loadVoices;
      }
   }, []);

   // Initialize Speech Recognition
   useEffect(() => {
      if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
         const recognition = new (window as any).webkitSpeechRecognition();
         recognition.continuous = false;
         recognition.interimResults = false;
         recognition.lang = 'en-US';

         recognition.onstart = () => setIsListening(true);
         recognition.onend = () => setIsListening(false);
         recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            handleSend(transcript); // Auto-send when speaking stops
         };
         recognitionRef.current = recognition;
      }
   }, []);

   // 🗣️ FEMALE VOICE SELECTOR logic
   const speakText = (text: string) => {
      if ('speechSynthesis' in window) {
         window.speechSynthesis.cancel(); // Stop any previous speech
         
         const utterance = new SpeechSynthesisUtterance(text);
         
         // 🎯 FIND A FEMALE VOICE
         // Prioritize voices known to be female
         const femaleVoice = availableVoices.find(v => 
            v.name.includes("Google US English") || // Often female on Chrome
            v.name.includes("Zira") || // Windows Female
            v.name.includes("Samantha") || // Mac Female
            v.name.toLowerCase().includes("female") // Generic check
         );

         // Apply voice if found, otherwise default
         if (femaleVoice) {
            utterance.voice = femaleVoice;
         }
         
         utterance.lang = 'en-US';
         utterance.rate = 1.0; // Normal speed
         utterance.pitch = 1.0; // Natural pitch
         
         utterance.onstart = () => setIsSpeaking(true);
         utterance.onend = () => setIsSpeaking(false);
         
         window.speechSynthesis.speak(utterance);
      }
   };

   const stopSpeaking = () => {
      if ('speechSynthesis' in window) {
         window.speechSynthesis.cancel();
         setIsSpeaking(false);
      }
   };

   const startListening = () => {
      stopSpeaking(); // Stop AI if it's talking so it listens clearly
      if (recognitionRef.current) {
         recognitionRef.current.start();
      } else {
         alert("Voice input not supported in this browser. Please try Chrome.");
      }
   };

   const handleSend = async (text: string = input) => {
      if(!text.trim()) return;
      
      const userMsg = { role: 'user', text: text };
      const newHistory = [...messages, userMsg];
      setMessages(newHistory);
      setInput("");
      setIsTyping(true);

      // Call Backend (Real AI)
      const res = await generateAIResponse(newHistory, userProfile);

      setIsTyping(false);
      
      if (res.success) {
          const botResponse = res.message;
          
          // 1. Speak Immediately (Parallel)
          speakText(botResponse);

          // 2. Stream Text Visually
          setMessages(prev => [...prev, { role: 'bot', text: "" }]);
          let i = 0;
          const interval = setInterval(() => {
             setMessages(prev => {
                const historyCopy = [...prev];
                const lastMsg = historyCopy[historyCopy.length - 1];
                if (lastMsg) lastMsg.text = botResponse.substring(0, i + 1);
                return historyCopy;
             });
             i++;
             if (i === botResponse.length) clearInterval(interval);
          }, 15); 
      } else {
          setMessages(prev => [...prev, { role: 'bot', text: "⚠️ Error connecting to AI. Please check your API Key." }]);
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
                     <h3 className="font-bold text-2xl">Gemini Voice Counsellor</h3>
                     <p className="text-sm text-indigo-100 opacity-90">Powered by Gemini 1.5 Flash</p>
                  </div>
               </div>
               <button onClick={() => { stopSpeaking(); onClose(); }} className="hover:bg-white/20 p-2 rounded-full transition text-xl">✕</button>
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
               
               {/* Typing / Listening Indicators */}
               {isTyping && (
                  <div className="flex justify-start">
                     <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl rounded-bl-none shadow-sm flex gap-2 items-center">
                        <span className="text-xs text-slate-400 font-bold mr-2">Thinking...</span>
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></span>
                     </div>
                  </div>
               )}
               {isListening && (
                  <div className="flex justify-end">
                     <div className="bg-red-50 border border-red-200 px-6 py-4 rounded-2xl rounded-br-none shadow-sm flex gap-2 items-center text-red-600 font-bold animate-pulse">
                        <Mic size={18} /> Listening... Speak now
                     </div>
                  </div>
               )}
            </div>

            {/* Quick Chips */}
            <div className="px-6 pb-4 bg-slate-50 flex gap-3 overflow-x-auto no-scrollbar">
               {["Suggest Universities", "Analyze my Budget", "Mock Interview", "Visa Checklist"].map((chip) => (
                  <button key={chip} onClick={() => handleSend(chip)} className="bg-white border border-indigo-200 text-indigo-600 text-sm font-bold px-4 py-2.5 rounded-full whitespace-nowrap hover:bg-indigo-50 hover:shadow-md transition">
                     {chip}
                  </button>
               ))}
            </div>

            {/* Input Area with Voice Controls */}
            <div className="p-6 bg-white border-t border-slate-100 flex gap-4 items-center">
               
               {/* 🎤 VOICE BUTTON */}
               <button 
                  onClick={isSpeaking ? stopSpeaking : startListening}
                  className={`p-4 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center
                     ${isListening ? 'bg-red-500 text-white animate-pulse' : 
                       isSpeaking ? 'bg-amber-500 text-white' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'}`}
               >
                  {isListening ? <Mic size={24} /> : isSpeaking ? <StopCircle size={24} /> : <Mic size={24} />}
               </button>

               <input 
                  type="text" 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-base outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-700 shadow-inner" 
                  placeholder="Type or use microphone..." 
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

// -----------------------------------------------------------
// HELPER COMPONENTS & MODALS (Keep existing ones)
// -----------------------------------------------------------

function PrepContentModal({ exam, onClose }: any) {
  const content: any = {
    "IELTS": {
       title: "IELTS Prep - Academic",
       lessons: [
          { title: "Listening: Map Labelling", dur: "15 min", type: "Video" },
          { title: "Reading: True/False/Not Given", dur: "20 min", type: "Article" },
          { title: "Writing Task 2: Essay Structures", dur: "30 min", type: "Video" },
          { title: "Speaking: Mock Interview Part 2", dur: "10 min", type: "Audio" }
       ]
    },
    "GRE": {
       title: "GRE General Test",
       lessons: [
          { title: "Quant: Geometry Formulas", dur: "45 min", type: "Video" },
          { title: "Verbal: Top 100 Words", dur: "15 min", type: "Flashcards" },
          { title: "Analytical Writing: Issue Task", dur: "30 min", type: "Article" }
       ]
    },
    "Duolingo": { title: "Duolingo English Test", lessons: [{ title: "Adaptive Test Tips", dur: "10 min", type: "Video" }, { title: "Describe the Photo", dur: "15 min", type: "Practice" }] },
    "TOEFL": { title: "TOEFL iBT", lessons: [{ title: "Integrated Speaking", dur: "20 min", type: "Audio" }, { title: "Reading Comprehension", dur: "25 min", type: "Quiz" }] }
  };

  const data = content[exam] || content["IELTS"];

  return (
     <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scale-up">
           <div className="bg-indigo-600 p-8 text-white flex justify-between items-center">
              <div>
                 <h2 className="text-3xl font-extrabold">{data.title}</h2>
                 <p className="text-indigo-200 mt-1">Your personalized study plan</p>
              </div>
              <button onClick={onClose} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"><X size={24} /></button>
           </div>
           
           <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto">
              {data.lessons.map((lesson: any, i: number) => (
                 <div key={i} className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                       {lesson.type === 'Video' ? <PlayCircle size={24} /> : lesson.type === 'Audio' ? <Mic size={24} /> : <BookOpen size={24} />}
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-lg text-slate-800">{lesson.title}</h4>
                       <p className="text-sm text-slate-500 font-medium">{lesson.type} • {lesson.dur}</p>
                    </div>
                    <button className="bg-white text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg text-sm font-bold group-hover:bg-indigo-600 group-hover:text-white transition">Start</button>
                 </div>
              ))}
           </div>
           
           <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
              <button onClick={() => alert("Redirecting to full course library...")} className="text-indigo-600 font-extrabold hover:underline">View Full Course Library &rarr;</button>
           </div>
        </div>
     </div>
  )
}

function PendingActionsModal({ onClose }: any) {
  const [uploading, setUploading] = useState<number | null>(null);
  const actions = [
     { id: 1, uni: "Arizona State University", task: "SOP Pending", type: "upload", desc: "Statement of Purpose not received.", urgent: true },
     { id: 2, uni: "Northeastern University", task: "Application Fee Unpaid", type: "pay", desc: "Application submitted, pending fee verification.", urgent: false },
     { id: 3, uni: "TU Munich", task: "Verify Transcripts", type: "verify", desc: "Please confirm your final grades.", urgent: false }
  ];
  const handleAction = (id: number, type: string) => {
     setUploading(id);
     setTimeout(() => { alert(type === 'upload' ? "File uploaded!" : "Action completed!"); setUploading(null); }, 1500);
  };
  return (
     <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-scale-up">
           <div className="bg-orange-50 p-6 border-b border-orange-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div className="bg-orange-100 p-3 rounded-full text-orange-600"><AlertCircle size={28} /></div>
                 <div>
                    <h3 className="font-extrabold text-xl text-slate-800">Action Required</h3>
                    <p className="text-sm text-orange-600 font-bold uppercase tracking-wider">3 Pending Tasks</p>
                 </div>
              </div>
              <button onClick={onClose} className="hover:bg-orange-100 p-2 rounded-full transition text-slate-400"><X size={24}/></button>
           </div>
           <div className="p-6 space-y-4">
              {actions.map((item) => (
                 <div key={item.id} className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all group bg-white">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-lg text-slate-800">{item.uni}</h4>
                       {item.urgent && <span className="bg-red-50 text-red-600 text-xs font-extrabold px-3 py-1 rounded-md uppercase">Urgent</span>}
                    </div>
                    <p className="text-base text-slate-500 mb-5">{item.desc}</p>
                    {item.type === 'upload' ? (
                       <button onClick={() => handleAction(item.id, 'upload')} disabled={uploading === item.id} className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
                          {uploading === item.id ? "Uploading..." : <><Upload size={18}/> Upload SOP Directly</>}
                       </button>
                    ) : (
                       <button onClick={() => handleAction(item.id, 'verify')} disabled={uploading === item.id} className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200">
                          {uploading === item.id ? "Verifying..." : <><ArrowRight size={18}/> Verify & Proceed</>}
                       </button>
                    )}
                 </div>
              ))}
           </div>
        </div>
     </div>
  )
}

function NavItem({ id, icon, label, activeTab, setActiveTab }: any) {
  const isActive = activeTab === id;
  return ( <button onClick={() => setActiveTab(id)} className={`flex items-center gap-4 w-full p-4 rounded-2xl transition font-bold text-base ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}> <span className="text-2xl">{icon}</span> {label} </button> );
}

function StatsCard({ title, value, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className={`${color} p-8 rounded-3xl shadow-sm active:scale-95 flex flex-col justify-between h-40`}>
       <div className="flex justify-between items-start">
          <p className="text-slate-600 font-bold text-sm mb-1 uppercase tracking-wider">{title}</p>
          <div className="text-3xl">{icon}</div>
       </div>
       <h3 className="text-5xl font-extrabold text-slate-900">{value}</h3>
    </div>
  );
}

function PrepCard({ title, icon, color, btnColor, progress, onClick }: any) {
   return (
      <div onClick={onClick} className={`${color} border p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group`}>
         <div className="flex justify-between items-start mb-4">
            <h4 className="font-extrabold text-slate-800 text-xl">{title}</h4>
            <span className="text-3xl grayscale group-hover:grayscale-0 transition duration-300">{icon}</span>
         </div>
         <div className="w-full bg-white h-3 rounded-full mb-3 overflow-hidden border border-slate-100">
            <div className={`h-full ${btnColor}`} style={{ width: `${progress}%` }}></div>
         </div>
         <p className="text-sm text-slate-600 font-bold mb-6">{progress}% Completed</p>
         <button className={`w-full ${btnColor} text-white py-3 rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition`}>
            {progress === 0 ? "Start Learning" : "Continue Prep"}
         </button>
      </div>
   )
}