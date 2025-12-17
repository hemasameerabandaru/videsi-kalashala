"use client";
import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {/* Dashboard Link (Active State) */}
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-semibold transition">
            <span>📊</span> Dashboard
          </Link>
          
          {/* Universities Link */}
          <Link href="/dashboard/universities" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
            <span>🎓</span> Universities
          </Link>
          
          {/* My Applications Link */}
          <Link href="/dashboard/applications" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
            <span>📂</span> My Applications
          </Link>
        </nav>

        {/* USER CARD (Updated: Now Clickable!) */}
        <div className="p-4 border-t border-slate-100">
          <Link href="/dashboard/profile" className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-xl transition cursor-pointer group">
            <div className="w-10 h-10 bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition rounded-full flex items-center justify-center text-indigo-600 font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition">John Doe</p>
              <p className="text-xs text-slate-500">View Profile</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Welcome back! 👋</h2>
            <p className="text-slate-500">Here is the status of your study abroad journey.</p>
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 transition">
            + New Application
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Total Applications</p>
            <p className="text-3xl font-bold text-indigo-600 mt-2">4</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Offers Received</p>
            <p className="text-3xl font-bold text-emerald-500 mt-2">1</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Pending Review</p>
            <p className="text-3xl font-bold text-orange-500 mt-2">3</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Recent Applications</h3>
          </div>
          <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">🇺🇸</div>
              <div>
                <h4 className="font-bold text-slate-800">Arizona State University</h4>
                <p className="text-sm text-slate-500">MS in Computer Science</p>
              </div>
            </div>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">In Review</span>
          </div>
        </div>
      </main>
    </div>
  );
}