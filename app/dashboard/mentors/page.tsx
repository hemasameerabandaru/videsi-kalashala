"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function MentorBooking() {
  
  // Mock Mentors Database
  const mentors = [
    { id: 1, name: "Dr. Anjali Verma", role: "Senior Counselor", uni: "Ex-Stanford Admissions", image: "👩‍🏫", expertise: "Profile Evaluation", rate: "Free" },
    { id: 2, name: "Rohan Mehta", role: "Alumni Mentor", uni: "Arizona State Univ.", image: "👨‍💻", expertise: "Computer Science SOP", rate: "$20" },
    { id: 3, name: "Sarah Jenkins", role: "Visa Expert", uni: "Former Visa Officer", image: "👮‍♀️", expertise: "Mock Interviews", rate: "$50" },
    { id: 4, name: "Amit Patel", role: "Student Mentor", uni: "TU Munich (Germany)", image: "🍺", expertise: "Public Universities", rate: "Free" },
  ];

  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [bookingStatus, setBookingStatus] = useState("idle"); // idle, booking, success

  const handleBook = (mentor: any) => {
    setSelectedMentor(mentor);
    setBookingStatus("idle");
  };

  const confirmBooking = () => {
    setBookingStatus("booking");
    // Simulate API Call
    setTimeout(() => {
      setBookingStatus("success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold transition">
             <span>←</span> Back to Dashboard
          </Link>
          <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-6">
            Connect
          </div>
          <Link href="/dashboard/mentors" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
             👨‍🏫 Find a Mentor
          </Link>
          <Link href="/dashboard/visa-mock" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             🎤 Mock Interview
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64 relative">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Book a Session 📅</h1>
          <p className="text-slate-500 mt-1">Talk to experts and alumni to clear your doubts.</p>
        </header>

        {/* MENTOR GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-4 border-2 border-white shadow-sm">
                {mentor.image}
              </div>
              <h3 className="font-bold text-lg text-slate-800">{mentor.name}</h3>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1">{mentor.role}</p>
              <p className="text-sm text-slate-500 mb-4">{mentor.uni}</p>
              
              <div className="w-full bg-slate-50 rounded-lg p-2 mb-6">
                <p className="text-xs text-slate-400 uppercase font-bold">Expertise</p>
                <p className="text-sm font-bold text-slate-700">{mentor.expertise}</p>
              </div>

              <button 
                onClick={() => handleBook(mentor)}
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition"
              >
                Book Session ({mentor.rate})
              </button>
            </div>
          ))}
        </div>

        {/* BOOKING MODAL (Overlay) */}
        {selectedMentor && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
              
              {/* Modal Header */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Confirm Booking</h3>
                <button onClick={() => setSelectedMentor(null)} className="text-slate-400 hover:text-red-500 font-bold text-xl">×</button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                
                {bookingStatus === 'success' ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
                    <h3 className="font-bold text-xl text-slate-800">Booking Confirmed!</h3>
                    <p className="text-slate-500 mt-2 text-sm">You have a session with <span className="font-bold">{selectedMentor.name}</span>.</p>
                    <p className="text-xs text-slate-400 mt-6">Check your email for the Zoom link.</p>
                    <button onClick={() => setSelectedMentor(null)} className="mt-6 w-full bg-slate-900 text-white py-3 rounded-xl font-bold">Done</button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-2xl">{selectedMentor.image}</div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg">{selectedMentor.name}</p>
                        <p className="text-sm text-slate-500">{selectedMentor.uni}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Select Date</label>
                        <input type="date" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-600" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Select Time</label>
                        <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-600">
                          <option>10:00 AM</option>
                          <option>02:00 PM</option>
                          <option>04:30 PM</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      onClick={confirmBooking}
                      disabled={bookingStatus === 'booking'}
                      className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-70 disabled:cursor-wait"
                    >
                      {bookingStatus === 'booking' ? 'Confirming...' : 'Confirm Booking 🚀'}
                    </button>
                  </>
                )}
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}