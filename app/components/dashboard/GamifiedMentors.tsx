"use client";
import React, { useState } from "react";

// --- MOCK MENTORS DATABASE ---
const MENTORS_DB = [
  { id: 1, name: "Arjun Mehta", uni: "Stanford University", country: "USA", flag: "🇺🇸", role: "Masters in CS", expertise: ["SOP Review", "GRE Tips"], image: "👨‍💻", status: "Available" },
  { id: 2, name: "Sarah Jenkins", uni: "London Business School", country: "UK", flag: "🇬🇧", role: "MBA", expertise: ["Interview Prep", "Networking"], image: "👩‍💼", status: "Busy" },
  { id: 3, name: "Klaus Weber", uni: "TU Munich", country: "Germany", flag: "🇩🇪", role: "MSc Engineering", expertise: ["DAAD Scholarship", "Visa"], image: "👷", status: "Available" },
  { id: 4, name: "Priya Sharma", uni: "University of Toronto", country: "Canada", flag: "🇨🇦", role: "MSc Data Science", expertise: ["PR Process", "Resume"], image: "👩‍💻", status: "Available" },
  { id: 5, name: "Liam Smith", uni: "Univ. of Melbourne", country: "Australia", flag: "🇦🇺", role: "Master of IT", expertise: ["Part-time Jobs", "Settlement"], image: "👨‍🎓", status: "Available" },
  { id: 6, name: "Emily Chen", uni: "MIT", country: "USA", flag: "🇺🇸", role: "PhD Physics", expertise: ["Research Proposal", "Funding"], image: "👩‍🔬", status: "Busy" },
];

export default function GamifiedMentors() {
  const [filter, setFilter] = useState("All");
  const [selectedMentor, setSelectedMentor] = useState<any>(null);

  // Filter Logic
  const filteredList = filter === "All" ? MENTORS_DB : MENTORS_DB.filter(m => m.country === filter);

  return (
    <div className="animate-fade-in max-w-7xl mx-auto pb-20 relative">
      
      {/* HEADER - Pastel Gradient */}
      <header className="mb-10 bg-gradient-to-r from-teal-100 via-emerald-100 to-green-100 rounded-3xl p-8 shadow-sm border border-teal-50">
         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
               <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-teal-900">👨‍🏫 Find a Mentor</h1>
               <p className="text-teal-700 font-medium text-lg">Connect with alumni from your dream universities.</p>
            </div>
            
            {/* Stats Pill */}
            <div className="bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-white flex gap-8">
               <div className="text-center">
                  <p className="text-xs font-bold text-teal-500 uppercase">Mentors</p>
                  <p className="text-xl font-extrabold text-teal-800">50+</p>
               </div>
               <div className="text-center border-l border-teal-200 pl-8">
                  <p className="text-xs font-bold text-emerald-500 uppercase">Sessions</p>
                  <p className="text-xl font-extrabold text-emerald-800">1.2k</p>
               </div>
            </div>
         </div>
      </header>

      {/* FILTER TABS */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
         {["All", "USA", "UK", "Canada", "Germany", "Australia"].map((cat) => (
            <button 
               key={cat}
               onClick={() => setFilter(cat)}
               className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm
               ${filter === cat 
                  ? 'bg-teal-600 text-white shadow-teal-200 scale-105' 
                  : 'bg-white text-slate-500 border border-slate-100 hover:bg-teal-50 hover:text-teal-700'}`}
            >
               {cat}
            </button>
         ))}
      </div>

      {/* MENTORS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredList.map((mentor) => (
            <MentorCard 
               key={mentor.id} 
               data={mentor} 
               onBook={() => setSelectedMentor(mentor)} 
            />
         ))}
      </div>

      {/* BOOKING MODAL */}
      {selectedMentor && (
         <BookingModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
      )}

    </div>
  );
}

// --- SUB-COMPONENT: MENTOR CARD ---
function MentorCard({ data, onBook }: any) {
   const isAvailable = data.status === "Available";

   return (
      <div className="group bg-white p-6 rounded-3xl border border-slate-50 shadow-sm hover:shadow-xl hover:shadow-teal-100 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
         
         {/* Status Dot */}
         <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold border
            ${isAvailable ? 'bg-green-50 text-green-700 border-green-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
            {data.status}
         </div>

         {/* Profile Info */}
         <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
               {data.image}
            </div>
            <div>
               <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-teal-700 transition-colors">
                  {data.name}
               </h3>
               <p className="text-xs font-bold text-slate-400">{data.uni} {data.flag}</p>
               <p className="text-xs text-slate-500 mt-0.5">{data.role}</p>
            </div>
         </div>

         {/* Expertise Tags */}
         <div className="flex flex-wrap gap-2 mb-6">
            {data.expertise.map((tag: string) => (
               <span key={tag} className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-1 rounded-lg border border-teal-100">
                  {tag}
               </span>
            ))}
         </div>

         {/* Action Button */}
         <button 
            onClick={onBook}
            className="w-full mt-auto bg-teal-100 text-teal-800 py-3 rounded-xl text-sm font-bold hover:bg-teal-200 transition-all shadow-sm flex items-center justify-center gap-2"
         >
            <span>📅</span> Book Session
         </button>
      </div>
   )
}

// --- SUB-COMPONENT: BOOKING MODAL ---
function BookingModal({ mentor, onClose }: any) {
   const [booked, setBooked] = useState(false);

   const handleConfirm = () => {
      setBooked(true);
      setTimeout(onClose, 2000);
   };

   return (
      <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
         <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6 animate-scale-up border border-teal-50 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">✕</button>
            
            {!booked ? (
               <>
                  <div className="text-center mb-6">
                     <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-5xl mx-auto mb-3 shadow-inner">
                        {mentor.image}
                     </div>
                     <h3 className="font-bold text-xl text-slate-800">Book {mentor.name}</h3>
                     <p className="text-sm text-slate-500">1:1 Mentorship Session (30 min)</p>
                  </div>

                  <div className="space-y-3 mb-6">
                     <p className="text-xs font-bold text-slate-400 uppercase">Available Slots</p>
                     <div className="grid grid-cols-2 gap-2">
                        {["Today, 5 PM", "Tomorrow, 10 AM", "Sat, 2 PM", "Sun, 11 AM"].map((slot) => (
                           <button key={slot} className="border border-slate-200 rounded-lg py-2 text-sm text-slate-600 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition font-medium focus:bg-teal-100 focus:border-teal-300 focus:text-teal-900">
                              {slot}
                           </button>
                        ))}
                     </div>
                  </div>

                  <button 
                     onClick={handleConfirm}
                     className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition shadow-lg"
                  >
                     Confirm Booking
                  </button>
               </>
            ) : (
               <div className="text-center py-8">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="font-bold text-xl text-slate-800 mb-2">Session Booked!</h3>
                  <p className="text-slate-500 text-sm">You will receive a calendar invite shortly.</p>
               </div>
            )}
         </div>
      </div>
   )
}