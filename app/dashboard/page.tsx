"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [name, setName] = useState("Student");

  useEffect(() => {
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
        
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto h-[calc(100vh-180px)]">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
            <span>📊</span> Dashboard
          </Link>
          
          <div className="text-xs font-bold text-slate-400 uppercase px-4 mt-4 mb-2">Planning</div>
          
          <Link href="/dashboard/roadmap" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition">
             <span>🗺️</span> Roadmap
          </Link>
          <Link href="/dashboard/cost-calculator" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-green-50 hover:text-green-600 rounded-xl font-medium transition">
            <span>💰</span> Expense Calc
          </Link>
          <Link href="/dashboard/scholarships" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-yellow-50 hover:text-yellow-600 rounded-xl font-medium transition">
            <span>🏆</span> Scholarships
          </Link>

          <div className="text-xs font-bold text-slate-400 uppercase px-4 mt-4 mb-2">Action</div>

          <Link href="/dashboard/universities" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
            <span>🎓</span> Universities
          </Link>
          <Link href="/dashboard/applications" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
            <span>📂</span> My Applications
          </Link>
          <Link href="/dashboard/documents" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl font-medium transition">
            <span>🗂️</span> Documents
          </Link>

           {/* 🟢 NEW VISA LINK */}
          <Link href="/dashboard/visa" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-purple-50 hover:text-purple-600 rounded-xl font-medium transition">
            <span>🛂</span> Visa Info
          </Link>

          <Link href="/dashboard/mentors" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
            <span>💬</span> Mentors
          </Link>
          
          <div className="mt-4 px-4">
             <Link href="/dashboard/assessment" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl font-bold transition">
                <span>🧩</span> Course Matcher
             </Link>
          </div>
        </nav>

        {/* PROFILE FOOTER */}
        <div className="p-4 border-t border-slate-100">
          <Link href="/dashboard/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition group">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold uppercase group-hover:bg-indigo-600 group-hover:text-white transition">
              {name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition">{name}</p>
              <p className="text-xs text-slate-500">View Profile</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Welcome back, {name}! 👋</h2>
            <p className="text-slate-500">Here is the status of your study abroad journey.</p>
          </div>
          <Link href="/dashboard/universities" className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 transition">
            + New Application
          </Link>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Total Applications</p>
            <p className="text-3xl font-bold text-indigo-600 mt-2">3</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Offers Received</p>
            <p className="text-3xl font-bold text-emerald-500 mt-2">1</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Profile Score</p>
            <p className="text-3xl font-bold text-orange-500 mt-2">85%</p>
          </div>
        </div>

        {/* CTA BOX */}
        <div className="bg-indigo-50 rounded-2xl p-8 text-center border border-indigo-100 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">Not sure what to study? 🤔</h3>
            <p className="text-indigo-600 mb-6">Play our Course Matcher game to find your perfect fit!</p>
            <Link href="/dashboard/assessment" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg">
              Play Now 🧩
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}