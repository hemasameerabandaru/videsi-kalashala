"use client";
import React, { useState } from 'react';
import Link from 'next/link'; // 👈 1. Make sure Link is imported

export default function ApplicationTracker() {
  
  // Mock Applications Data
  const [apps, setApps] = useState([
    { id: 1, uni: "Arizona State University", course: "MS in CS", country: "USA 🇺🇸", status: "applied", date: "Dec 12" },
    { id: 2, uni: "Northeastern University", course: "Data Science", country: "USA 🇺🇸", status: "offer", date: "Jan 05" },
    { id: 3, uni: "University of East London", course: "MBA", country: "UK 🇬🇧", status: "rejected", date: "Nov 20" },
    { id: 4, uni: "TU Munich", course: "Robotics", country: "Germany 🇩🇪", status: "in-progress", date: "Draft" },
  ]);

  // Status Colors Helper
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'offer': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'applied': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'offer': return '🎉 Offer Received';
      case 'rejected': return '❌ Rejected';
      case 'applied': return '✅ Applied';
      default: return '⏳ In Progress';
    }
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
            Track Progress
          </div>
          <Link href="/dashboard/applications" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
             🚀 My Applications
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">My Applications 🚀</h1>
            <p className="text-slate-500 mt-1">Track the status of your university applications.</p>
          </div>
          
          {/* 👇 FIXED: This button now lets you add a NEW application */}
          <Link href="/dashboard/universities" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition shadow-lg flex items-center gap-2">
            <span>+</span> New Application
          </Link>
        </header>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Apps</p>
            <p className="text-2xl font-extrabold text-slate-800">4</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Offers</p>
            <p className="text-2xl font-extrabold text-emerald-600">1</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Pending</p>
            <p className="text-2xl font-extrabold text-blue-600">1</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Drafts</p>
            <p className="text-2xl font-extrabold text-amber-500">1</p>
          </div>
        </div>

        {/* APPLICATION LIST */}
        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition group flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Left: Info */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl border border-slate-100">
                  🏛️
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{app.uni}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <span>{app.country}</span>
                    <span>•</span>
                    <span>{app.course}</span>
                  </div>
                </div>
              </div>

              {/* Middle: Timeline/Date */}
              <div className="text-center md:text-left">
                 <p className="text-xs font-bold text-slate-400 uppercase mb-1">Last Update</p>
                 <p className="font-bold text-slate-700">{app.date}</p>
              </div>

              {/* Right: Status & Action */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <span className={`px-4 py-2 rounded-lg text-xs font-bold border uppercase tracking-wide ${getStatusColor(app.status)}`}>
                  {getStatusLabel(app.status)}
                </span>
                
                {/* 👇 FIXED: Arrow is now a Link (Going to Uni Finder for now) */}
                <Link href="/dashboard/universities" className="text-slate-400 hover:text-indigo-600 font-bold px-2 text-xl">
                  →
                </Link>

              </div>

            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {apps.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="font-bold text-slate-800 text-lg">No Applications Yet</h3>
            <p className="text-slate-500 mb-6">Start applying to universities to track them here.</p>
            <Link href="/dashboard/universities" className="text-indigo-600 font-bold hover:underline">
              Go to University Finder →
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}