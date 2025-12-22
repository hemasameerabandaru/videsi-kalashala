"use client";
import React from 'react';
import Link from 'next/link';

export default function MyApplications() {
  const applications = [
    { 
      id: 1, 
      university: "Harvard University", 
      course: "MBA", 
      country: "USA 🇺🇸", 
      status: "Under Review", 
      progress: 50, 
      date: "Dec 12, 2024",
      image: "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    { 
      id: 2, 
      university: "Technical University of Munich", 
      course: "M.Sc. Informatics", 
      country: "Germany 🇩🇪", 
      status: "Offer Received", 
      progress: 100, 
      date: "Nov 28, 2024",
      image: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    { 
      id: 3, 
      university: "University of Toronto", 
      course: "Data Science", 
      country: "Canada 🇨🇦", 
      status: "Pending Documents", 
      progress: 25, 
      date: "Jan 05, 2025",
      image: "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=200"
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
          <Link href="/dashboard/applications" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
            <span>📂</span> My Applications
          </Link>
          {/* ADDED MENTORS LINK */}
          <Link href="/dashboard/mentors" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
            <span>💬</span> Mentors
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Track Applications 📂</h1>
            <p className="text-slate-500">Monitor the status of your university applications.</p>
          </div>
          <Link href="/dashboard/universities" className="bg-slate-900 text-white px-5 py-2 rounded-lg font-bold hover:bg-indigo-600 transition">
            + New Application
          </Link>
        </header>

        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="w-24 h-24 md:w-32 md:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                  <img src={app.image} alt={app.university} className="w-full h-full object-cover"/>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{app.university}</h3>
                      <p className="text-slate-500 text-sm">{app.course} • {app.country}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      app.status === 'Offer Received' ? 'bg-emerald-100 text-emerald-700' :
                      app.status === 'Under Review' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full transition-all duration-1000 ${
                          app.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                        }`} 
                        style={{ width: `${app.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}