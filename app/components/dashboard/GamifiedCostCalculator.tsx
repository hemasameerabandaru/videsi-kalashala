"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react"; // 👈 Added NextAuth Hook

// --- 🧠 AI KNOWLEDGE BASE (COSTS) ---
const COST_KNOWLEDGE = {
  USA: "🇺🇸 USA Costs:\n- Tuition: $30,000 - $60,000 / year\n- Rent: $800 - $2,500 / month (depends on city)\n- Groceries: $300 - $500 / month\n- Note: Health insurance is expensive ($2k/year)!",
  UK: "🇬🇧 UK Costs:\n- Tuition: £15,000 - £35,000 / year\n- Rent: £600 - £1,500 / month (London is pricey!)\n- Groceries: £200 - £300 / month\n- Note: NHS Surcharge is around £470/year.",
  GERMANY: "🇩🇪 Germany Costs:\n- Tuition: FREE (Public Unis) or €3,000+ (Private)\n- Rent: €400 - €900 / month (WG rooms are cheaper)\n- Living: €934 / month (Blocked Account Requirement).\n- Note: Semester contribution is ~€250.",
  CANADA: "🇨🇦 Canada Costs:\n- Tuition: CAD 20,000 - 45,000 / year\n- Rent: CAD 800 - 2,000 / month\n- Groceries: CAD 400 - 600 / month\n- Note: GIC amount required is CAD 20,635.",
  AUSTRALIA: "🇦🇺 Australia Costs:\n- Tuition: AUD 30,000 - 50,000 / year\n- Rent: AUD 1,000 - 2,500 / month\n- Living: ~AUD 24,500 / year (Visa requirement).\n- Note: High hourly wage for part-time work!",
  GENERAL: "I can help you estimate costs! 🌍\n\nAsk me:\n👉 \"Cost of living in Canada?\"\n👉 \"Is Germany expensive?\"\n👉 \"Rent in USA vs UK?\""
};

// --- CURRENCY DATA ---
const CURRENCIES = {
  USD: { symbol: "$", rate: 1, name: "US Dollar" },
  EUR: { symbol: "€", rate: 0.92, name: "Euro" },
  GBP: { symbol: "£", rate: 0.79, name: "British Pound" },
  CAD: { symbol: "C$", rate: 1.35, name: "Canadian Dollar" },
  AUD: { symbol: "A$", rate: 1.52, name: "Australian Dollar" },
};

export default function GamifiedCostCalculator() {
  const { data: session } = useSession(); // 👈 Get User Data
  const [currency, setCurrency] = useState("USD");
  const [tuition, setTuition] = useState(30000);
  const [rent, setRent] = useState(1200);
  const [food, setFood] = useState(400);
  const [misc, setMisc] = useState(200);
  const [showAI, setShowAI] = useState(false);
  const [userBudget, setUserBudget] = useState(0);

  // 🟢 EFFECT: Fetch Profile Budget
  useEffect(() => {
    if (session?.user) {
        const meta = (session.user as any).metadata as any;
        const savedBudget = parseInt(meta?.budget?.amount || "0");
        if (savedBudget > 0) setUserBudget(savedBudget);
    }
  }, [session?.user]);

  // Derived Values
  const currentSymbol = CURRENCIES[currency as keyof typeof CURRENCIES].symbol;
  const yearlyRent = rent * 12;
  const yearlyLiving = (food + misc) * 12;
  const totalCost = tuition + yearlyRent + yearlyLiving;
  const isOverBudget = userBudget > 0 && totalCost > userBudget;

  // Chart Data (Using specific pure pastel hex codes)
  const pTuition = (tuition / totalCost) * 100;
  const pRent = (yearlyRent / totalCost) * 100;
  
  // Pure Pastel Hex Codes for Chart
  const pastelBlue = "#93C5FD";   // blue-300
  const pastelPurple = "#C4B5FD"; // purple-300
  const pastelPink = "#F9A8D4";   // pink-300

  return (
    <div className="animate-fade-in max-w-6xl mx-auto pb-20 relative">
      
      {/* HEADER - Soft Pastel Gradient */}
      <header className="mb-10 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-3xl p-8 text-slate-800 shadow-sm border border-purple-50">
         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
               <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-purple-900">💰 Cost Estimator</h1>
               <p className="text-purple-700 font-medium text-lg">Plan your budget with our smart calculator.</p>
            </div>
            
            {/* Currency Pill - Pastel Buttons */}
            <div className="bg-white/70 backdrop-blur-md p-2 rounded-2xl shadow-sm flex gap-2 border border-white">
               {Object.keys(CURRENCIES).map((c) => (
                  <button
                     key={c}
                     onClick={() => setCurrency(c)}
                     className={`px-4 py-2 rounded-xl text-sm font-bold transition-all
                     ${currency === c 
                        ? 'bg-purple-200 text-purple-900 shadow-sm' 
                        : 'bg-transparent text-slate-500 hover:bg-purple-50'}`}
                  >
                     {c}
                  </button>
               ))}
            </div>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* LEFT: CONTROLS */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* Sliders Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-purple-50/50">
               <h3 className="text-lg font-bold text-slate-700 mb-8 flex items-center gap-2">
                  <span>🎚️</span> Adjust Expenses
               </h3>
               
               <div className="space-y-8">
                  <SliderControl 
                     label="Annual Tuition Fee" 
                     value={tuition} 
                     setValue={setTuition} 
                     min={0} max={100000} step={1000} 
                     symbol={currentSymbol}
                     textColor="text-blue-400"
                     trackColor="bg-blue-100"
                     thumbColor="accent-blue-300"
                  />
                  <SliderControl 
                     label="Monthly Rent" 
                     value={rent} 
                     setValue={setRent} 
                     min={0} max={5000} step={50} 
                     symbol={currentSymbol}
                     textColor="text-purple-400"
                     trackColor="bg-purple-100"
                     thumbColor="accent-purple-300"
                  />
                  <SliderControl 
                     label="Monthly Food & Groceries" 
                     value={food} 
                     setValue={setFood} 
                     min={0} max={2000} step={50} 
                     symbol={currentSymbol}
                     textColor="text-pink-400"
                     trackColor="bg-pink-100"
                     thumbColor="accent-pink-300"
                  />
                  <SliderControl 
                     label="Monthly Misc (Transport, Fun)" 
                     value={misc} 
                     setValue={setMisc} 
                     min={0} max={1000} step={50} 
                     symbol={currentSymbol}
                     textColor="text-orange-400"
                     trackColor="bg-orange-100"
                     thumbColor="accent-orange-300"
                  />
               </div>
            </div>

            {/* AI Helper Banner */}
            <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left cursor-pointer hover:shadow-md transition-all"
               onClick={() => setShowAI(true)}>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">🤖</div>
                  <div>
                     <h3 className="font-bold text-indigo-900 text-lg">Confused about living costs?</h3>
                     <p className="text-indigo-600 text-sm">Chat with our AI for city-specific data.</p>
                  </div>
               </div>
               <button className="bg-indigo-200 text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-300 transition shadow-sm whitespace-nowrap">
                  Chat Now 💬
               </button>
            </div>
         </div>

         {/* RIGHT: SUMMARY (Light & Airy) */}
         <div className="lg:col-span-1 space-y-6">
            
            {/* Total Card */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-pink-50 border border-slate-50 flex flex-col items-center text-center relative overflow-hidden">
               {/* Decorative Background Blobs */}
               <div className="absolute top-0 right-0 w-40 h-40 bg-pink-100 rounded-full blur-3xl -z-10 opacity-60"></div>
               <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl -z-10 opacity-60"></div>

               <h3 className="text-slate-400 text-xs font-extrabold uppercase tracking-widest mb-3">Estimated Annual Total</h3>
               <div className="text-5xl font-extrabold text-slate-800 mb-2 tracking-tight">
                  {currentSymbol}{totalCost.toLocaleString()}
               </div>
               <p className="text-slate-500 text-xs font-bold bg-slate-100/80 px-4 py-1.5 rounded-full">1 Year Estimate</p>

               {/* 🟢 NEW: BUDGET HEALTH INDICATOR */}
               {userBudget > 0 && (
                  <div className={`mt-4 px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2
                     ${isOverBudget 
                        ? 'bg-red-50 border-red-100 text-red-600' 
                        : 'bg-green-50 border-green-100 text-green-600'}`}>
                     <span>{isOverBudget ? '⚠️' : '✅'}</span>
                     {isOverBudget 
                        ? `Over budget by ${currentSymbol}${(totalCost - userBudget).toLocaleString()}` 
                        : "Within your budget!"}
                  </div>
               )}

               {/* Pastel Donut Chart */}
               <div className="mt-8 relative w-64 h-64 rounded-full flex items-center justify-center bg-slate-50 shadow-inner p-4"
                  style={{
                     background: `conic-gradient(
                        ${pastelBlue} 0% ${pTuition}%, 
                        ${pastelPurple} ${pTuition}% ${pTuition + pRent}%, 
                        ${pastelPink} ${pTuition + pRent}% 100%
                     )`
                  }}
               >
                  <div className="w-48 h-48 bg-white rounded-full flex flex-col items-center justify-center z-10 shadow-sm">
                     <span className="text-4xl">💸</span>
                  </div>
               </div>

               {/* Legend */}
               <div className="mt-8 w-full space-y-3 bg-slate-50/80 p-5 rounded-2xl backdrop-blur-sm border border-slate-100">
                  <LegendItem color="bg-blue-300" label="Tuition" value={tuition} symbol={currentSymbol} />
                  <LegendItem color="bg-purple-300" label="Housing (Yearly)" value={yearlyRent} symbol={currentSymbol} />
                  <LegendItem color="bg-pink-300" label="Living (Yearly)" value={yearlyLiving} symbol={currentSymbol} />
               </div>
            </div>

         </div>
      </div>

      {/* AI CHAT OVERLAY */}
      {showAI && <FinancialAIModal onClose={() => setShowAI(false)} />}

    </div>
  );
}

// --- SUB-COMPONENTS (UNCHANGED) ---

function SliderControl({ label, value, setValue, min, max, step, symbol, textColor, trackColor, thumbColor }: any) {
   return (
      <div>
         <div className="flex justify-between mb-3">
            <label className="font-bold text-slate-600 text-sm">{label}</label>
            <span className={`font-extrabold text-lg ${textColor}`}>{symbol}{value.toLocaleString()}</span>
         </div>
         <input 
            type="range" 
            min={min} max={max} step={step} 
            value={value} 
            onChange={(e) => setValue(parseInt(e.target.value))}
            className={`w-full h-4 ${trackColor} rounded-lg appearance-none cursor-pointer ${thumbColor}`}
            style={{ accentColor: thumbColor.replace('accent-', '') }}
         />
      </div>
   )
}

function LegendItem({ color, label, value, symbol }: any) {
   return (
      <div className="flex justify-between items-center text-sm">
         <div className="flex items-center gap-3">
            <span className={`w-4 h-4 rounded-full shadow-sm ${color} border-2 border-white ring-1 ring-slate-100`}></span>
            <span className="text-slate-600 font-bold">{label}</span>
         </div>
         <span className="font-bold text-slate-800">{symbol}{value.toLocaleString()}</span>
      </div>
   )
}

function FinancialAIModal({ onClose }: any) {
   const [messages, setMessages] = useState([
      { role: 'bot', text: `Hi! 👋 I am your Cost of Living Advisor.\n\nI have data for 🇺🇸 USA, 🇬🇧 UK, 🇩🇪 Germany, 🇨🇦 Canada, and 🇦🇺 Australia.\n\nAsk me things like:\n"How much is rent in Germany?"\n"Tuition fees in Canada?"` }
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

      setTimeout(() => {
         let response = COST_KNOWLEDGE.GENERAL;
         const lower = userMsg.text.toLowerCase();

         if (lower.includes("usa") || lower.includes("america") || lower.includes("us")) response = COST_KNOWLEDGE.USA;
         else if (lower.includes("uk") || lower.includes("london") || lower.includes("britain")) response = COST_KNOWLEDGE.UK;
         else if (lower.includes("germany") || lower.includes("berlin") || lower.includes("munich")) response = COST_KNOWLEDGE.GERMANY;
         else if (lower.includes("canada") || lower.includes("toronto") || lower.includes("vancouver")) response = COST_KNOWLEDGE.CANADA;
         else if (lower.includes("australia") || lower.includes("sydney") || lower.includes("melbourne")) response = COST_KNOWLEDGE.AUSTRALIA;
         else if (lower.includes("rent") || lower.includes("housing")) response = "Rent varies by country! 🏠\n\n- 🇺🇸 US: $800-2500\n- 🇩🇪 DE: €400-900\n- 🇨🇦 CA: CAD 800-2000\n\nWhich country are you interested in?";
         else if (lower.includes("tuition") || lower.includes("fee")) response = "Tuition is the biggest cost! 🎓\n\n- 🇩🇪 Germany is often FREE!\n- 🇺🇸 USA is highest ($30k+).\n- 🇨🇦 Canada is moderate ($20k+).\n\nAsk about a specific country for details.";

         setMessages(prev => [...prev, { role: 'bot', text: response }]);
         setIsTyping(false);
      }, 1000);
   };

   return (
      <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
         <div className="bg-white w-full max-w-md h-[550px] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-up border border-indigo-50">
            <div className="bg-gradient-to-r from-indigo-300 to-purple-300 p-5 text-white flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <div className="bg-white/30 p-2 rounded-full text-xl">💸</div>
                  <div>
                     <h3 className="font-bold text-lg">Budget Buddy</h3>
                     <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></span>
                        <p className="text-[10px] font-medium">Online</p>
                     </div>
                  </div>
               </div>
               <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition">✕</button>
            </div>
            
            <div className="flex-1 p-5 bg-slate-50 overflow-y-auto space-y-4" ref={scrollRef}>
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

            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
               <input 
                  type="text" 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all text-slate-700 placeholder:text-slate-400"
                  placeholder="Ask about costs..."
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