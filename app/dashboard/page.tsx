"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  // 1. Create a state to hold the name (Default is "Student")
  const [name, setName] = useState("Student");

  // 2. When the page loads, grab the name from memory
  useEffect(() => {
    // We check if we are in the browser to avoid server errors
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem("studentName");
      if (savedName) {
        setName(savedName);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-semibold transition">
            <span>📊</span> Dashboard
          </Link>
          <Link href="/dashboard/universities" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
            <span>🎓</span> Universities
          </Link>
          <Link href="/dashboard/applications" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
            <span>📂</span> My Applications
          </Link>
          <Link href="/dashboard/mentors" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
            <span>💬</span> Mentors
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link href="/dashboard/profile" className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-xl transition cursor-pointer group">
            {/* Dynamic Initials (First letter of name) */}
            <div className="w-10 h-10 bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition rounded-full flex items-center justify-center text-indigo-600 font-bold uppercase">
              {name.charAt(0)}
            </div>
            <div>
              {/* Dynamic Name in Sidebar */}
              <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition">{name}</p>
              <p className="text-xs text-slate-500">View Profile</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="flex justify-between items-center mb-8">
          <div>
            {/* Dynamic Name in Header */}
            <h2 className="text-2xl font-bold text-slate-800">Welcome back, {name}! 👋</h2>
            <p className="text-slate-500">Here is the status of your study abroad journey.</p>
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 transition">
            + New Application
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Total Applications</p>
            <p className="text-3xl font-bold text-indigo-600 mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Shortlisted</p>
            <p className="text-3xl font-bold text-emerald-500 mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Profile Score</p>
            <p className="text-3xl font-bold text-orange-500 mt-2">20%</p>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-8 text-center border border-indigo-100">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">Your journey has just started! 🚀</h3>
          <p className="text-indigo-600 mb-6">Head over to the Universities page to shortlist your first college.</p>
          <Link href="/dashboard/universities" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
            Find Universities
          </Link>
        </div>
      </main>
    </div>
  );
}