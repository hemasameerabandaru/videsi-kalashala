"use client";
import React from 'react';
import Link from 'next/link';

export default function ApplicationsPage() {
  const applications = [
    { id: 1, university: "Arizona State University", course: "MS in Computer Science", status: "In Review", date: "Oct 12, 2024", progress: 40, color: "bg-yellow-500" },
    { id: 2, university: "University of East London", course: "MBA Global Business", status: "Offer Received 🎉", date: "Sep 28, 2024", progress: 100, color: "bg-emerald-500" },
    { id: 3, university: "Trinity College Dublin", course: "MSc Data Science", status: "Submitted", date: "Nov 01, 2024", progress: 20, color: "bg-blue-500" }
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
          <div className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-semibold">
            <span>📂</span> My Applications
          </div>
          {/* NEW MENTORS LINK */}
          <Link href="/dashboard/mentors" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
            <span>💬</span> Mentors
          </Link>
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
        <h1 className="text-3xl font-bold text-slate-800 mb-2">My Applications 📂</h1>
        <p className="text-slate-500 mb-8">Track the status of your university applications in real-time.</p>

        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800">{app.university}</h3>
                <p className="text-slate-500">{app.course}</p>
                <p className="text-xs text-slate-400 mt-1">Applied on: {app.date}</p>
              </div>
              <div className="flex-1 w-full md:w-auto">
                <div className="flex justify-between text-sm font-bold mb-2 text-slate-600">
                  <span>Status: {app.status}</span>
                  <span>{app.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className={`h-full rounded-full ${app.color}`} style={{ width: `${app.progress}%` }}></div>
                </div>
              </div>
              <button className="px-6 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}