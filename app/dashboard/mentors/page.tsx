"use client";
import React from 'react';
import Link from 'next/link';

export default function MentorsPage() {
  const mentors = [
    {
      id: 1,
      name: "Dr. Anjali Sharma",
      role: "Senior US Counsellor",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      specialty: "Ivy League Admissions",
      experience: "12+ Years",
      available: true
    },
    {
      id: 2,
      name: "Rajeev Kumar",
      role: "UK & Europe Expert",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
      specialty: "Visa & Scholarships",
      experience: "8+ Years",
      available: true
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      role: "Essay & SOP Coach",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      specialty: "Creative Writing",
      experience: "5+ Years",
      available: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
            <span>📊</span> Dashboard
          </Link>
          <Link href="/dashboard/universities" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
            <span>🎓</span> Universities
          </Link>
          <Link href="/dashboard/mentors" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
            <span>💬</span> Mentors
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Expert Mentors 💬</h1>
          <p className="text-slate-500">Book a 1:1 session with our top study abroad consultants.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition text-center group">
              
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-slate-50 mb-4 group-hover:border-indigo-100 transition">
                <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover"/>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800">{mentor.name}</h3>
              <p className="text-indigo-600 font-medium text-sm mb-4">{mentor.role}</p>
              
              <div className="flex justify-center gap-2 mb-6">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">{mentor.specialty}</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">{mentor.experience}</span>
              </div>

              {mentor.available ? (
                <button 
                  onClick={() => alert(`Booking session with ${mentor.name}...`)}
                  className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-indigo-600 transition shadow-lg"
                >
                  Book Session
                </button>
              ) : (
                <button disabled className="w-full bg-slate-100 text-slate-400 font-bold py-3 rounded-xl cursor-not-allowed">
                  Fully Booked
                </button>
              )}
            </div>
          ))}
        </div>
        
      </main>
    </div>
  );
}