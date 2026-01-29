"use client";
import React, { useState, useEffect, useRef } from "react";

// --- 🧠 AI INTERVIEWER SCRIPTS ---
const INTERVIEW_SCRIPTS = {
  USA: [
    "Good morning. Please pass me your Passport and I-20. Why do you want to study in the USA?",
    "That's interesting. Why did you choose this specific university?",
    "Who is sponsoring your education and what is their annual income?",
    "What are your specific plans after you graduate?",
    "Do you have any relatives currently staying in the USA?"
  ],
  UK: [
    "Good afternoon. Why have you chosen the UK for your higher education?",
    "Can you tell me about the specific modules in your course?",
    "Why did you choose this university over others in the UK?",
    "How will you fund your tuition and living expenses?",
    "What is your career goal after completing this course?"
  ],
  Canada: [
    "Hello. Why did you choose Canada instead of studying in your home country?",
    "What is your intended program of study and why?",
    "How have you arranged your finances for the first year?",
    "Do you have any study gaps? If so, please explain them.",
    "Will you return to your home country after your studies?"
  ],
  Australia: [
    "Good day. Why did you choose Australia for your Masters?",
    "Why this particular course and university?",
    "How does this course relate to your previous studies or work experience?",
    "What are your career plans back in your home country?",
    "Are you aware of the visa conditions for international students?"
  ]
};

export default function GamifiedVisaMockAI() {
  const [step, setStep] = useState("setup"); // 'setup' | 'interview' | 'result'
  const [config, setConfig] = useState({ country: "USA", uni: "", course: "" });
  const [messages, setMessages] = useState<any[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<any>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  // Start Interview Logic
  const startInterview = () => {
    if (!config.uni || !config.course) return;
    setStep("interview");
    setMessages([]);
    setCurrentQIndex(0);
    
    // Initial AI Greeting
    setIsTyping(true);
    setTimeout(() => {
      const firstQ = INTERVIEW_SCRIPTS[config.country as keyof typeof INTERVIEW_SCRIPTS][0];
      setMessages([{ role: 'bot', text: firstQ }]);
      setIsTyping(false);
    }, 1500);
  };

  // Handle User Response
  const handleSend = () => {
    if (!input.trim()) return;

    // Add User Message
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // AI Response Logic
    setTimeout(() => {
      const script = INTERVIEW_SCRIPTS[config.country as keyof typeof INTERVIEW_SCRIPTS];
      const nextIndex = currentQIndex + 1;

      if (nextIndex < script.length) {
        // Next Question
        setMessages(prev => [...prev, { role: 'bot', text: script[nextIndex] }]);
        setCurrentQIndex(nextIndex);
      } else {
        // End of Interview
        setMessages(prev => [...prev, { role: 'bot', text: "Thank you. That concludes our interview. I have generated your feedback report." }]);
        setTimeout(() => setStep("result"), 2500);
      }
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto pb-20 relative">
      
      {/* HEADER */}
      <header className="mb-8 text-center">
         <div className="inline-block bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide mb-3">
            AI Interview Simulator
         </div>
         <h1 className="text-3xl font-extrabold text-slate-800">Visa & Credibility Mock AI</h1>
         <p className="text-slate-500 mt-2 text-lg">Practice with our AI Officer to boost your confidence.</p>
      </header>

      {/* --- STEP 1: SETUP --- */}
      {step === "setup" && (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-xl shadow-purple-100 border border-purple-50">
           <div className="space-y-6">
              
              {/* Country Selection */}
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-3">Target Country</label>
                 <div className="flex gap-2">
                    {["USA", "UK", "Canada", "Australia"].map(c => (
                       <button 
                          key={c}
                          onClick={() => setConfig({ ...config, country: c })}
                          className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border
                          ${config.country === c 
                             ? 'bg-purple-100 text-purple-800 border-purple-200 ring-2 ring-purple-100' 
                             : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'}`}
                       >
                          {c}
                       </button>
                    ))}
                 </div>
              </div>

              {/* University Input */}
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">University Name</label>
                 <input 
                    type="text" 
                    placeholder="e.g. Arizona State University"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all text-slate-700 font-medium"
                    value={config.uni}
                    onChange={(e) => setConfig({ ...config, uni: e.target.value })}
                 />
              </div>

              {/* Course Input */}
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Course Name</label>
                 <input 
                    type="text" 
                    placeholder="e.g. MS in Computer Science"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all text-slate-700 font-medium"
                    value={config.course}
                    onChange={(e) => setConfig({ ...config, course: e.target.value })}
                 />
              </div>

              <button 
                 onClick={startInterview}
                 disabled={!config.uni || !config.course}
                 className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                 <span>🎙️</span> Start Mock Interview
              </button>
           </div>
        </div>
      )}

      {/* --- STEP 2: INTERVIEW --- */}
      {step === "interview" && (
         <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col h-[600px] animate-scale-up">
            {/* Live Header */}
            <div className="bg-purple-50 p-4 flex justify-between items-center border-b border-purple-100">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-purple-100">👮‍♂️</div>
                  <div>
                     <h3 className="font-bold text-slate-800 text-sm">Visa Officer ({config.country})</h3>
                     <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        <p className="text-[10px] text-purple-600 font-bold uppercase tracking-wide">Live Session</p>
                     </div>
                  </div>
               </div>
               <button onClick={() => setStep("setup")} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-500 hover:text-red-500 hover:bg-red-50 transition">
                  End Call
               </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50" ref={scrollRef}>
               {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                        ${m.role === 'user' 
                           ? 'bg-purple-600 text-white rounded-br-none' 
                           : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'}`}>
                        {m.text}
                     </div>
                  </div>
               ))}
               
               {isTyping && (
                  <div className="flex justify-start">
                     <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 flex gap-1.5 items-center">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                     </div>
                  </div>
               )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
               <div className="flex gap-2">
                  <input 
                     type="text" 
                     className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-purple-200 transition-all placeholder:text-slate-400"
                     placeholder="Type your answer here..."
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                     autoFocus
                  />
                  <button 
                     onClick={handleSend}
                     disabled={!input.trim()}
                     className="bg-purple-600 text-white p-3.5 rounded-xl hover:bg-purple-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     ➤
                  </button>
               </div>
            </div>
         </div>
      )}

      {/* --- STEP 3: RESULT --- */}
      {step === "result" && (
         <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl text-center border border-green-50 animate-fade-in">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-sm">
               🎉
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Interview Completed!</h2>
            <p className="text-slate-500 mb-8 font-medium">You successfully answered all questions for {config.uni}.</p>
            
            <div className="bg-slate-50 p-6 rounded-2xl text-left mb-8 space-y-5 border border-slate-100">
               <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <h3 className="font-bold text-slate-800">AI Feedback Report</h3>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">PASS</span>
               </div>
               
               <FeedbackRow label="Confidence Score" score="85/100" color="text-green-600" />
               <FeedbackRow label="Clarity of Answers" score="Medium" color="text-amber-600" />
               <FeedbackRow label="Visa Intent" score="Strong" color="text-green-600" />
               
               <div className="bg-white p-3 rounded-xl border border-slate-200 mt-2">
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                     <strong className="text-purple-600">💡 Pro Tip:</strong> Your answer about financing was good, but try to be more specific about your sponsor's assets next time. Mention the exact amount in the bank account.
                  </p>
               </div>
            </div>

            <button 
               onClick={() => setStep("setup")}
               className="w-full bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-purple-600 transition shadow-lg flex items-center justify-center gap-2"
            >
               <span>↺</span> Take Another Mock
            </button>
         </div>
      )}

    </div>
  );
}

function FeedbackRow({ label, score, color }: any) {
   return (
      <div className="flex justify-between items-center text-sm">
         <span className="text-slate-500 font-bold">{label}</span>
         <span className={`font-extrabold ${color}`}>{score}</span>
      </div>
   )
}