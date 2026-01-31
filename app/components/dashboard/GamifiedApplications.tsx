"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { unlockUniversity } from "@/app/actions"; // 👈 Import Unlock Action
import { CheckCircle, Circle, FileText, Upload, Calendar, Lock, ChevronDown, Trash2 } from "lucide-react";

// --- 🧠 AI KNOWLEDGE BASE (THE BRAIN) ---
const I20_KNOWLEDGE = {
  WHAT_IS: `📑 What is the I-20?\n\n- Full Name: Certificate of Eligibility for Nonimmigrant Student Status.\n- Purpose:Proof that you are admitted and financially capable of studying in the US.\n- Requirement: Mandatory for paying the SEVIS fee and applying for the F-1 student visa.`,
  WHO_ISSUES: `🏫 Who Issues It?\n\nThe Designated School Official (DSO) at your university’s International Student Office. They review your admission and financial proof before generating the form.`,
  CONTENT: `📝 What's inside the I-20?\n\n- Student Details: Name, DOB, Citizenship, SEVIS ID.\n- Program:Degree level, Major, Start/End dates.\n- Financials: Estimated tuition/living costs & your proof of funding.\n- Dependents: Info if spouse/children are accompanying you.`,
  STEPS: `🚀 Steps to Apply for I-20:\n\n1. Accept Admission: Confirm offer & pay deposit.\n2. Fill Request Form: In the university portal (Passport info, Address, Program details).\n3. Submit Financial Proof: Bank statements, Affidavits, Loan letters.\n4. Passport Copy: Clear scan of biographical page.\n5. Upload Documents: Submit via portal or email.\n6. Review: DSO verifies everything.\n7. Receive I-20: Get the PDF via email or hard copy via courier.`,
  FINANCIALS: `💰 Financial Documents Required:\n\nYou must prove funding for at least one academic year.\n- Bank Statements: Recent (3-6 months), liquid funds.\n- Affidavit: If parents/relatives are sponsoring you.\n- Scholarship Letter: If awarded by the uni.\n- Loan Letter: If you have an approved education loan.`,
  MISTAKES: `⚠️ Common Mistakes to Avoid:\n\n- Submitting outdated bank statements (>6 months old).\n- Passport name not matching admission records.\n- Forgetting dependent details (if family is traveling).\n- Not checking the Program Start Date carefully (crucial for visa interview!).`,
  AFTER: `✅ After Receiving the I-20:\n\n1. Sign it: Sign the "Student Attestation" on Page 1.\n2. Keep it safe: Save digital & printed copies.\n3. Next Steps: Pay SEVIS Fee -> Book Visa Interview -> Travel to US!`
};

// Helper to get Uni Name by ID
const getUniName = (id: number) => {
  const db: any = {
    101: "MIT", 102: "Stanford", 103: "Harvard", 111: "Arizona State", 
    112: "Northeastern", 401: "TU Munich", 501: "Univ. Melbourne"
  };
  return db[id] || "University";
};

// --- MOCK DATA ---
const BASE_APP_DATA = {
  status: "In Progress", 
  fee: "$100", 
  submitted: "Not Submitted", 
  i20_status: "Pending" 
};

export default function GamifiedApplications() {
  const { data: session } = useSession();
  const [view, setView] = useState("list"); 
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [processingId, setProcessingId] = useState<number | null>(null); // For loading state

  // 1. SYNC LOCKED UNIVERSITIES
  useEffect(() => {
    if (session?.user) {
      const meta = (session.user as any).metadata as any;
      let ids: number[] = [];

      if (meta?.lockedIds && Array.isArray(meta.lockedIds)) {
         ids = meta.lockedIds;
      } else if (meta?.lockedUniversityId) {
         ids = [meta.lockedUniversityId];
      }

      const apps = ids.map(id => ({
         id: id,
         uni: getUniName(id),
         flag: "🏛️", 
         country: "Global", 
         course: "Your Target Major", 
         ...BASE_APP_DATA
      }));

      setApplications(apps);
    }
  }, [session?.user]);

  // --- ACTIONS ---
  const handleOpenI20 = (app: any) => {
    setSelectedApp(app);
    setView("i20");
  };

  const handleBack = () => {
    setView("list");
    setSelectedApp(null);
    setShowChat(false);
  };

  // 🟢 NEW: WITHDRAW APPLICATION LOGIC
  const handleWithdraw = async (appId: number, uniName: string) => {
    if (confirm(`Are you sure you want to withdraw your application for ${uniName}? This will remove it from your tracker.`)) {
        setProcessingId(appId);
        
        // 1. Call Server Action
        await unlockUniversity(appId);
        
        // 2. Optimistic Update (Remove from UI immediately)
        setApplications(prev => prev.filter(app => app.id !== appId));
        
        setProcessingId(null);
    }
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto pb-20 relative">
      
      {/* MAIN CONTENT */}
      {view === "list" ? (
        <>
          <header className="mb-8 flex justify-between items-end">
             <div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">📝 Application Tracker</h1>
                <p className="text-slate-500 font-medium">Manage your submissions for your <span className="text-indigo-600 font-bold">{applications.length} Locked Universities</span>.</p>
             </div>
             <div className="bg-purple-50 px-4 py-2 rounded-xl text-purple-700 font-bold text-sm border border-purple-100">
                Total Tracked: {applications.length}
             </div>
          </header>

          {/* EMPTY STATE */}
          {applications.length === 0 ? (
             <div className="bg-orange-50 border-l-4 border-orange-500 p-8 rounded-r-2xl mb-8 flex items-start gap-5">
                <div className="bg-orange-100 p-3 rounded-full text-orange-600"><Lock size={24} /></div>
                <div>
                   <h3 className="font-extrabold text-orange-900 text-xl mb-1">No Active Applications</h3>
                   <p className="text-orange-800 mb-4 text-base">
                      You haven't committed to any university yet. Go to the <strong>Universities</strong> tab, pick your targets, and click "Lock Decision" to start tracking applications.
                   </p>
                   <a href="#" onClick={() => (document.querySelector('[id="universities"]') as HTMLElement)?.click()} className="inline-block bg-orange-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-orange-700 transition">
                      Go to Universities &rarr;
                   </a>
                </div>
             </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applications.map((app) => (
                   <ApplicationCard 
                      key={app.id} 
                      app={app} 
                      onOpenI20={() => handleOpenI20(app)} 
                      onWithdraw={() => handleWithdraw(app.id, app.uni)} // 👈 Pass withdraw handler
                      isProcessing={processingId === app.id}
                   />
                ))}
             </div>
          )}
        </>
      ) : (
        <I20Dashboard 
           app={selectedApp} 
           onBack={handleBack} 
           onOpenChat={() => setShowChat(true)} 
        />
      )}

      {/* AI CHAT */}
      {showChat && (
         <AIChatWindow 
           onClose={() => setShowChat(false)} 
           universityName={selectedApp?.uni} 
         />
      )}

    </div>
  );
}

// --- SUB-COMPONENTS ---

function ApplicationCard({ app, onOpenI20, onWithdraw, isProcessing }: any) {
   return (
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 group relative">
         
         <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl border border-slate-100">
                  {app.flag}
               </div>
               <div>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-purple-600 transition-colors">{app.uni}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{app.country}</p>
               </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase border bg-blue-50 text-blue-600 border-blue-100">
               {app.status}
            </span>
         </div>

         <div className="grid grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
               <p className="text-[10px] text-slate-400 font-bold uppercase">Course</p>
               <p className="text-sm font-bold text-slate-700 truncate">{app.course}</p>
            </div>
            <div>
               <p className="text-[10px] text-slate-400 font-bold uppercase">App Fee</p>
               <p className="text-sm font-bold text-slate-700">{app.fee}</p>
            </div>
         </div>

         {/* ACTION BUTTONS */}
         <div className="flex gap-3">
             <button 
                onClick={onOpenI20}
                className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all flex items-center justify-center gap-2"
             >
                📄 Manage Documents
             </button>
             
             {/* 🔴 WITHDRAW BUTTON */}
             <button 
                onClick={onWithdraw}
                disabled={isProcessing}
                className="w-12 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all"
                title="Withdraw Application"
             >
                {isProcessing ? "..." : <Trash2 size={18} />}
             </button>
         </div>
      </div>
   )
}

// ... (Keep AIChatWindow, I20Dashboard, StepItem, UploadBox, DownloadRow exactly as they were in previous versions)
// Copied below for completeness so you can copy-paste the whole file.

function AIChatWindow({ onClose, universityName }: any) {
   const [messages, setMessages] = useState([
      { role: 'bot', text: `Hello! 👋 I am your I-20 Expert for ${universityName}.\n\nI can explain what an I-20 is, the steps to apply, or required documents. Ask me anything!` }
   ]);
   const [input, setInput] = useState("");
   const [isTyping, setIsTyping] = useState(false);
   const scrollRef = useRef<any>(null);

   useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
   }, [messages]);

   const generateSmartResponse = (text: string) => {
      const lower = text.toLowerCase();
      const has = (keywords: string[]) => keywords.some(k => lower.includes(k));

      if (has(['hi', 'hello', 'hey', 'gud', 'morning', 'evning', 'bro', 'sir', 'mam'])) return "Hello! 👋 Ready to secure your I-20? Ask me about 'Financials', 'Process', or 'Mistakes to avoid'.";
      if (has(['thank', 'thx', 'thanks', 'gr8', 'great', 'cool', 'ok'])) return "You are very welcome! 🌟 Good luck with your visa journey. Any other questions?";
      if (has(['what is', 'definition', 'purpose', 'meaning', 'full form'])) return I20_KNOWLEDGE.WHAT_IS;
      if (has(['who', 'issue', 'give', 'dso', 'office'])) return I20_KNOWLEDGE.WHO_ISSUES;
      if (has(['inside', 'content', 'detail', 'info', 'contain'])) return I20_KNOWLEDGE.CONTENT;
      if (has(['step', 'process', 'how to', 'procedure', 'guide', 'start'])) return I20_KNOWLEDGE.STEPS;
      if (has(['money', 'fund', 'bank', 'finance', 'cost', 'fee', 'lakh', 'dollar', 'amount', 'rich', 'balance', 'sponsor', 'affidavit'])) return I20_KNOWLEDGE.FINANCIALS;
      if (has(['mistake', 'wrong', 'error', 'fail', 'reject', 'avoid', 'careful'])) return I20_KNOWLEDGE.MISTAKES;
      if (has(['after', 'receive', 'got', 'next', 'sign', 'print'])) return I20_KNOWLEDGE.AFTER;
      if (has(['passport', 'scan', 'valid'])) return "For the passport, you need a clear scan of the **biographical page**. It must be valid for at least **6 months** beyond your intended stay.";
      return "I am still learning! 🧠\n\nI think you asked about: \"" + text + "\".\n\nTry asking specifically:\n👉 \"What is an I-20?\"\n👉 \"What are the steps?\"\n👉 \"Common mistakes?\"";
   };

   const handleSend = async () => {
      if(!input.trim()) return;
      const userMsg = { role: 'user', text: input };
      setMessages(prev => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);
      setTimeout(() => {
         const responseText = generateSmartResponse(userMsg.text);
         setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
         setIsTyping(false);
      }, 1000);
   };

   return (
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-purple-100 flex flex-col overflow-hidden z-50 animate-slide-up">
         <div className="bg-purple-600 p-4 flex justify-between items-center text-white shadow-md">
            <div className="flex items-center gap-3">
               <div className="bg-white/20 p-2 rounded-full text-xl">🤖</div>
               <div>
                  <h3 className="font-bold text-sm">Visa Assistant AI</h3>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span><p className="text-[10px] opacity-90 font-medium">Online & Ready to Help</p></div>
               </div>
            </div>
            <button onClick={onClose} className="hover:bg-purple-700 p-1.5 rounded-lg transition text-white/80 hover:text-white">✕</button>
         </div>
         <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-4" ref={scrollRef}>
            {messages.map((m, i) => (
               <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm whitespace-pre-line shadow-sm leading-relaxed ${m.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'}`}>{m.text}</div>
               </div>
            ))}
            {isTyping && <div className="flex justify-start"><div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5 items-center"><span className="text-xs text-slate-400 font-bold mr-1">AI is typing</span><span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span></div></div>}
         </div>
         <div className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
            <input type="text" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400" placeholder="Ask about I-20 steps, fees..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
            <button onClick={handleSend} disabled={!input.trim()} className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition disabled:opacity-50 shadow-md hover:shadow-lg active:scale-95">➤</button>
         </div>
      </div>
   )
}

function I20Dashboard({ app, onBack, onOpenChat }: any) {
   return (
      <div className="animate-fade-in">
         <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold hover:text-purple-600 transition mb-6"><span>←</span> Back to Applications</button>
         <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-purple-600 p-8 text-white"><div className="flex justify-between items-center"><div><h2 className="text-2xl font-bold mb-1">Application & I-20 Center</h2><p className="opacity-80">for {app.uni}</p></div><div className="text-4xl">✈️</div></div></div>
            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-8">
                  <div><h3 className="text-lg font-bold text-slate-900 mb-4">🚀 Application Checklist</h3><div className="space-y-4"><StepItem num="1" title="Submit Application" desc="Complete form on university portal." status="done" /><StepItem num="2" title="Pay Application Fee" desc="Upload receipt for proof." status="active" /><StepItem num="3" title="Upload SOP & LORs" desc="Ensure all documents are submitted." status="pending" /><StepItem num="4" title="Wait for Decision" desc="Admission results usually take 4-6 weeks." status="pending" /></div></div>
                  <div><h3 className="text-lg font-bold text-slate-900 mb-4">📤 Upload Documents</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><UploadBox label="Statement of Purpose" /><UploadBox label="Letter of Rec (1)" /><UploadBox label="Letter of Rec (2)" /><UploadBox label="Transcripts" /></div></div>
               </div>
               <div className="lg:col-span-1">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200"><h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">⬇️ Resources</h3><div className="space-y-3"><DownloadRow title="SOP Guidelines" type="PDF" /><DownloadRow title="LOR Template for Profs" type="DOCX" /><DownloadRow title="Fee Waiver Request" type="PDF" /></div></div>
                  <div className="mt-6 bg-purple-50 p-6 rounded-2xl border border-purple-100 text-center"><div className="text-3xl mb-2">🤖</div><h4 className="font-bold text-purple-900 mb-1">Need Help?</h4><p className="text-xs text-purple-700 mb-4">Ask our AI Advisor about documents or I-20 process.</p><button onClick={onOpenChat} className="w-full bg-white text-purple-600 py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-purple-100 transition border border-purple-200 flex items-center justify-center gap-2"><span>💬</span> Chat with AI</button></div>
               </div>
            </div>
         </div>
      </div>
   )
}

function StepItem({ num, title, desc, status }: any) {
   const isDone = status === "done"; const isActive = status === "active";
   return ( <div className={`flex gap-4 ${status === 'pending' ? 'opacity-50' : 'opacity-100'}`}><div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${isDone ? 'bg-green-500 text-white' : isActive ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{isDone ? '✓' : num}</div><div><h4 className={`font-bold ${isActive ? 'text-purple-700' : 'text-slate-800'}`}>{title}</h4><p className="text-sm text-slate-500">{desc}</p></div></div> )
}
function UploadBox({ label }: any) {
   return ( <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-purple-400 hover:bg-purple-50 transition cursor-pointer group"><div className="text-2xl mb-2 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition">☁️</div><p className="text-xs font-bold text-slate-500 group-hover:text-purple-700">{label}</p></div> )
}
function DownloadRow({ title, type }: any) {
   return ( <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 hover:border-purple-300 transition cursor-pointer"><div className="flex items-center gap-3"><span className="bg-slate-100 text-[10px] font-bold px-1.5 py-0.5 rounded text-slate-500">{type}</span><span className="text-xs font-bold text-slate-700">{title}</span></div><span className="text-slate-400 text-xs">⬇</span></div> )
}