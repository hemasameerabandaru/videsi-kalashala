"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function VisaMockBooking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ country: "", university: "", course: "" });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Mock Slots
  const slots = ["10:00 AM", "02:00 PM", "05:30 PM", "08:00 PM"];

  const handleNext = () => {
    if (step === 1 && (!formData.country || !formData.university || !formData.course)) {
      alert("Please fill in all details first.");
      return;
    }
    setStep(step + 1);
  };

  const handleBook = () => {
    setStep(3); // Success Screen
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto h-[calc(100vh-180px)]">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             <span>←</span> Back to Dashboard
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64 flex justify-center items-center min-h-[90vh]">
        
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-200 w-full max-w-2xl relative overflow-hidden">
          
          {/* PROGRESS BAR */}
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500" 
              style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
            ></div>
          </div>

          {/* STEP 1: DETAILS */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block">Step 1 of 3</span>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Target Details 🎯</h1>
              <p className="text-slate-500 mb-8">Tell us where you are going so we can simulate the right interview.</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Target Country</label>
                  <select 
                    className="w-full p-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  >
                    <option value="">Select Country</option>
                    <option value="USA">🇺🇸 USA (F-1 Visa)</option>
                    <option value="UK">🇬🇧 UK (Tier 4)</option>
                    <option value="Canada">🇨🇦 Canada (Study Permit)</option>
                    <option value="Germany">🇩🇪 Germany (Student Visa)</option>
                    <option value="Australia">🇦🇺 Australia (Subclass 500)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">University Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Arizona State University" 
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                    value={formData.university}
                    onChange={(e) => setFormData({...formData, university: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Course / Major</label>
                  <input 
                    type="text" 
                    placeholder="e.g. MS in Computer Science" 
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                  />
                </div>

                <button 
                  onClick={handleNext}
                  className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl text-lg hover:bg-indigo-700 transition shadow-lg mt-4"
                >
                  Next: Choose Time →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: BOOKING */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <button onClick={() => setStep(1)} className="text-slate-400 text-sm hover:text-indigo-600 mb-4 font-bold">← Back</button>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Pick a Slot 📅</h1>
              <p className="text-slate-500 mb-8">Select a time for your 1-on-1 mock interview.</p>

              <div className="space-y-6">
                
                {/* Date Selection */}
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-3">Select Date</label>
                   <div className="flex gap-3">
                     {["Today", "Tomorrow", "Wed, 26 Dec"].map((d) => (
                       <button 
                         key={d} 
                         onClick={() => setSelectedDate(d)}
                         className={`px-5 py-3 rounded-xl border font-bold transition ${
                            selectedDate === d ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400'
                         }`}
                       >
                         {d}
                       </button>
                     ))}
                   </div>
                </div>

                {/* Time Selection */}
                <div className={`transition-all duration-300 ${selectedDate ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                   <label className="block text-sm font-bold text-slate-700 mb-3">Select Time</label>
                   <div className="grid grid-cols-2 gap-3">
                     {slots.map((s) => (
                       <button 
                         key={s} 
                         onClick={() => setSelectedSlot(s)}
                         className={`px-5 py-3 rounded-xl border font-bold transition ${
                            selectedSlot === s ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400'
                         }`}
                       >
                         {s}
                       </button>
                     ))}
                   </div>
                </div>

                <button 
                  onClick={handleBook}
                  disabled={!selectedSlot}
                  className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl text-lg hover:bg-emerald-700 transition shadow-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Booking ($20)
                </button>
                <p className="text-center text-xs text-slate-400 mt-2">Premium 30-min session with Feedback Report.</p>

              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <div className="text-center animate-fade-in-up py-10">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
                🎤
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">You're Booked!</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Your mock interview for <b>{formData.country}</b> is confirmed for <b>{selectedDate} at {selectedSlot}</b>.
                <br/>
                Please have your <b>{formData.university}</b> offer letter ready.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-8 text-left max-w-sm mx-auto">
                <p className="text-yellow-800 font-bold text-sm mb-1">💡 Pro Tip:</p>
                <p className="text-yellow-700 text-xs">Prepare an answer for: "Why did you choose this specific course?" It is the most common question!</p>
              </div>

              <Link href="/dashboard" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition">
                Return to Dashboard
              </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}