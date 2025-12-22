"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function MentorBooking() {
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Mock Mentors
  const mentors = [
    {
      id: 1,
      name: "Anjali Mehta",
      role: "Senior Counselor (USA Expert)",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: "4.9 ⭐",
      reviews: "120+ Students placed",
      tags: ["Visa Interview", "SOP Review"]
    },
    {
      id: 2,
      name: "David Smith",
      role: "Alumni Mentor (Oxford)",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: "5.0 ⭐",
      reviews: "Ex-British Council",
      tags: ["UK Applications", "Scholarships"]
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      role: "Career Coach",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: "4.8 ⭐",
      reviews: "STEM Focus",
      tags: ["Profile Building", "Resume Edit"]
    }
  ];

  // Mock Slots
  const slots = ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];

  const handleBook = () => {
    setBookingConfirmed(true);
    // In real app, save to database here
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
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        {!bookingConfirmed ? (
          <>
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800">Book a Mentorship Session 💬</h1>
              <p className="text-slate-500">Stuck? Talk to an expert who has been there.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LEFT: MENTOR LIST */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-2">1. Choose a Mentor</h3>
                {mentors.map((mentor) => (
                  <div 
                    key={mentor.id}
                    onClick={() => { setSelectedMentor(mentor.id); setSelectedDate(null); setSelectedSlot(null); }}
                    className={`flex gap-4 p-4 rounded-2xl border-2 transition cursor-pointer hover:shadow-md ${
                      selectedMentor === mentor.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white hover:border-indigo-200'
                    }`}
                  >
                    <img src={mentor.image} className="w-16 h-16 rounded-full object-cover" alt={mentor.name} />
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{mentor.name}</h3>
                      <p className="text-slate-500 text-sm mb-2">{mentor.role}</p>
                      <div className="flex gap-2 text-xs">
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold">{mentor.rating}</span>
                        <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded">{mentor.reviews}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT: DATE & TIME PICKER */}
              <div className={`bg-white p-6 rounded-2xl border border-slate-200 h-fit transition-all ${selectedMentor ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                 <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4">2. Pick a Time</h3>
                 
                 {/* Simple Date Buttons */}
                 <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                   {["Today", "Tomorrow", "Fri, 24 Dec"].map((date) => (
                     <button 
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition ${
                          selectedDate === date ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                     >
                       {date}
                     </button>
                   ))}
                 </div>

                 {/* Slots Grid */}
                 <div className="grid grid-cols-2 gap-2 mb-8">
                   {slots.map((slot) => (
                     <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        disabled={!selectedDate}
                        className={`py-2 rounded-lg text-sm font-bold transition ${
                          selectedSlot === slot 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300'
                        }`}
                     >
                       {slot}
                     </button>
                   ))}
                 </div>

                 <button 
                   onClick={handleBook}
                   disabled={!selectedSlot}
                   className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   Confirm Booking ($0)
                 </button>
                 <p className="text-center text-xs text-slate-400 mt-3">Free 15-min discovery call</p>

              </div>

            </div>
          </>
        ) : (
          // SUCCESS STATE
          <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">
              ✅
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Booking Confirmed!</h2>
            <p className="text-slate-500 mb-8 max-w-md">
              You are scheduled to meet <b>{mentors.find(m => m.id === selectedMentor)?.name}</b> on <b>{selectedDate} at {selectedSlot}</b>.
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition">
                Go to Dashboard
              </Link>
              <button onClick={() => setBookingConfirmed(false)} className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
                Book Another
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}