"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ScholarshipFinder() {
  const [filter, setFilter] = useState("All");

  const scholarships = [
    {
      id: 1,
      name: "Fulbright-Nehru Master's Fellowship",
      country: "USA",
      amount: "Full Tuition + Stipend",
      deadline: "May 15, 2026",
      tags: ["Merit-based", "Leadership"],
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      id: 2,
      name: "Chevening Scholarship",
      country: "UK",
      amount: "Fully Funded (Flights + Stay)",
      deadline: "Nov 02, 2025",
      tags: ["Global Leaders", "1 Year Masters"],
      color: "bg-red-50 text-red-700 border-red-200"
    },
    {
      id: 3,
      name: "DAAD Scholarship",
      country: "Germany",
      amount: "€861 / month",
      deadline: "Oct 30, 2025",
      tags: ["Public Universities", "Research"],
      color: "bg-yellow-50 text-yellow-700 border-yellow-200"
    },
    {
      id: 4,
      name: "Tata Scholarship for Cornell",
      country: "USA",
      amount: "Need-based Support",
      deadline: "Jan 10, 2026",
      tags: ["Cornell University", "Indian Students"],
      color: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    {
      id: 5,
      name: "Great Scholarship India",
      country: "UK",
      amount: "£10,000",
      deadline: "Feb 28, 2026",
      tags: ["Postgraduate", "Specific Unis"],
      color: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      id: 6,
      name: "Australia Awards",
      country: "Australia",
      amount: "Full Tuition + Travel",
      deadline: "Apr 30, 2026",
      tags: ["Development", "Indo-Pacific"],
      color: "bg-emerald-50 text-emerald-700 border-emerald-200"
    }
  ];

  const filteredList = filter === "All" ? scholarships : scholarships.filter(s => s.country === filter);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             <span>←</span> Back to Dashboard
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Scholarship Finder 🏆</h1>
          <p className="text-slate-500">Find financial aid to support your global education.</p>
        </header>

        {/* FILTERS */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {["All", "USA", "UK", "Germany", "Australia"].map((c) => (
            <button 
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full font-bold whitespace-nowrap transition ${
                filter === c 
                ? "bg-slate-900 text-white shadow-lg" 
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {c === "All" ? "🌍 All Countries" : c}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition group relative overflow-hidden">
              
              <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-xl ${item.color}`}>
                {item.country}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mt-2 mb-2 group-hover:text-indigo-600 transition">{item.name}</h3>
              
              <div className="mb-4">
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wide">Award Value</p>
                <p className="font-bold text-slate-700">{item.amount}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map(tag => (
                  <span key={tag} className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-md font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <div className="text-xs">
                  <p className="text-slate-400">Deadline</p>
                  <p className="font-bold text-red-500">{item.deadline}</p>
                </div>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-600 transition">
                  Details
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredList.length === 0 && (
          <div className="text-center py-20 text-slate-400">
             <p>No scholarships found for {filter} yet.</p>
          </div>
        )}

      </main>
    </div>
  );
}