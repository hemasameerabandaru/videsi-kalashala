"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function UniversityFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");

  // Mock Database of Universities
  const universities = [
    {
      id: 1,
      name: "Arizona State University",
      location: "Tempe, USA 🇺🇸",
      country: "USA",
      rank: "#179 QS",
      fees: "$34,000 / year",
      deadline: "Jan 15, 2026",
      logo: "🅰️",
      tags: ["Public", "High Acceptance"],
      popular: true
    },
    {
      id: 2,
      name: "University of East London",
      location: "London, UK 🇬🇧",
      country: "UK",
      rank: "#800+ QS",
      fees: "£16,000 / year",
      deadline: "Rolling",
      logo: "🦁",
      tags: ["No GRE", "Quick Offer"],
      popular: false
    },
    {
      id: 3,
      name: "Technical University of Munich",
      location: "Munich, Germany 🇩🇪",
      country: "Germany",
      rank: "#37 QS",
      fees: "€0 (Public)",
      deadline: "May 31, 2026",
      logo: "🧬",
      tags: ["No Tuition", "German Required"],
      popular: true
    },
    {
      id: 4,
      name: "University of Toronto",
      location: "Toronto, Canada 🇨🇦",
      country: "Canada",
      rank: "#21 QS",
      fees: "CAD 45,000 / year",
      deadline: "Feb 01, 2026",
      logo: "🍁",
      tags: ["Top Tier", "Research"],
      popular: true
    },
    {
      id: 5,
      name: "Deakin University",
      location: "Melbourne, Australia 🇦🇺",
      country: "Australia",
      rank: "#233 QS",
      fees: "AUD 38,000 / year",
      deadline: "Mar 01, 2026",
      logo: "🦘",
      tags: ["Scholarships", "3yr Stay Back"],
      popular: false
    }
  ];

  // Filter Logic
  const filteredUnis = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === "All" || uni.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             <span>←</span> Back to Dashboard
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Find Your University 🏛️</h1>
            <p className="text-slate-500 mt-1">Browse top universities and shortlist your favorites.</p>
          </div>
          <button className="bg-slate-900 text-white px-5 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg">
            View My Shortlist (0)
          </button>
        </header>

        {/* FILTERS */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
             <span className="absolute left-4 top-3.5 text-slate-400">🔍</span>
             <input 
               type="text" 
               placeholder="Search by name (e.g. Arizona)..." 
               className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-100 transition"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            {["All", "USA", "UK", "Canada", "Germany", "Australia"].map(country => (
              <button 
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-5 py-3 rounded-xl font-bold whitespace-nowrap transition ${
                   selectedCountry === country ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {country === "USA" ? "🇺🇸 USA" : country === "UK" ? "🇬🇧 UK" : country === "All" ? "🌍 All" : country}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnis.map(uni => (
             <div key={uni.id} className="bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition group duration-300 flex flex-col">
                
                {/* Card Header */}
                <div className="p-6 border-b border-slate-100">
                   <div className="flex justify-between items-start mb-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                        {uni.logo}
                      </div>
                      {uni.popular && <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">Popular</span>}
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition">{uni.name}</h3>
                   <p className="text-slate-500 text-sm">{uni.location}</p>
                </div>

                {/* Card Stats */}
                <div className="p-6 space-y-3 flex-1">
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-400 font-medium">QS Rank</span>
                      <span className="font-bold text-slate-800">{uni.rank}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-400 font-medium">Tuition</span>
                      <span className="font-bold text-slate-800">{uni.fees}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-400 font-medium">Deadline</span>
                      <span className="font-bold text-red-500">{uni.deadline}</span>
                   </div>
                   
                   {/* Tags */}
                   <div className="flex gap-2 mt-4 pt-4 border-t border-slate-50 flex-wrap">
                      {uni.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                   </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-slate-50 rounded-b-2xl grid grid-cols-2 gap-3">
                   <button className="bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl text-sm hover:bg-slate-100 transition">
                     Details
                   </button>
                   <button className="bg-indigo-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-indigo-700 transition shadow-md">
                     + Apply Now
                   </button>
                </div>

             </div>
          ))}
        </div>

      </main>
    </div>
  );
}