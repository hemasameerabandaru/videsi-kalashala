"use client";
import React from 'react';
import Link from 'next/link';

export default function MentorsPage() {
  const mentors = [
    { id: 1, name: "Dr. Anjali Rao", role: "USA Expert", university: "Harvard Alumni", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80", available: "Today" },
    { id: 2, name: "Rajesh Kumar", role: "UK & Ireland", university: "LSE Graduate", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80", available: "Tomorrow" },
    { id: 3, name: "Sarah Jenkins", role: "Canada Specialist", university: "Univ. of Toronto", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80", available: "Today" },
    { id: 4, name: "Michael Chen", role: "Germany/EU", university: "TU Munich", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80", available: "Next Week" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR (Standard) */}
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
          <Link href="/dashboard/applications" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
            <span>📂</span> My Applications
          </Link>
          {/* Active Link for Mentors */}
          <div className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-semibold">
            <span>💬</span> Mentors
          </div>
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <Link href="/dashboard/profile" className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-xl transition cursor-pointer group">
            <div className="w-10 h-10 bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition rounded-full flex items-center justify-center text-indigo-600 font-bold">JD</div>
            <div>
              <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition">John Doe</p>
              <p className="text-xs text-slate-500">View Profile</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Talk to an Expert 💬</h1>
            <p className="text-slate-500">Book a 1-on-1 session with our top study abroad consultants.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-lg transition">
              <div className="h-48 rounded-xl overflow-hidden mb-4 relative">
                <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-lg text-xs font-bold text-emerald-600 shadow-sm">
                  Available {mentor.available}
                </div>
              </div>
              <h3 className="font-bold text-lg text-slate-800">{mentor.name}</h3>
              <p className="text-indigo-600 font-medium text-sm mb-1">{mentor.role}</p>
              <p className="text-slate-500 text-xs mb-4">🎓 {mentor.university}</p>
              
              <button className="w-full bg-slate-900 text-white py-2 rounded-xl font-bold hover:bg-indigo-600 transition">
                Book Call
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}