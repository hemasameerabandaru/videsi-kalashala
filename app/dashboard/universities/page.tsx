"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function UniversityFinder() {
  
  // Mock Database of Universities
  const allUniversities = [
    { id: 1, name: "Arizona State University", country: "USA 🇺🇸", rank: "#156", fees: "$35,000", logo: "🅰️" },
    { id: 2, name: "University of East London", country: "UK 🇬🇧", rank: "#800", fees: "£14,500", logo: "🦁" },
    { id: 3, name: "Technische Universität Munich", country: "Germany 🇩🇪", rank: "#50", fees: "€0 (Public)", logo: "🥨" },
    { id: 4, name: "Northeastern University", country: "USA 🇺🇸", rank: "#44", fees: "$42,000", logo: "🦅" },
    { id: 5, name: "Deakin University", country: "Australia 🇦🇺", rank: "#266", fees: "AUD 38,000", logo: "🦘" },
    { id: 6, name: "University of Toronto", country: "Canada 🇨🇦", rank: "#21", fees: "CAD 45,000", logo: "🍁" },
  ];

  const [search, setSearch] = useState("");
  const [shortlist, setShortlist] = useState<number[]>([]);

  // Filter Logic
  const filteredUnis = allUniversities.filter(uni => 
    uni.name.toLowerCase().includes(search.toLowerCase()) || 
    uni.country.toLowerCase().includes(search.toLowerCase())
  );

  const toggleShortlist = (id: number) => {
    if (shortlist.includes(id)) {
      setShortlist(shortlist.filter(item => item !== id)); // Remove
    } else {
      setShortlist([...shortlist, id]); // Add
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
            Explore
          </div>
          <Link href="/dashboard/universities" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
             🎓 University Finder
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">University Finder 🏛️</h1>
            <p className="text-slate-500 mt-1">Search and shortlist your dream universities.</p>
          </div>
          
          {/* Shortlist Counter */}
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <span className="text-xl">❤️</span>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Shortlisted</p>
              <p className="text-lg font-extrabold text-indigo-600">{shortlist.length}</p>
            </div>
          </div>
        </header>

        {/* SEARCH BAR */}
        <div className="relative mb-8">
          <span className="absolute left-4 top-3.5 text-slate-400 text-lg">🔍</span>
          <input 
            type="text" 
            placeholder="Search by name or country (e.g., 'Germany' or 'Northeastern')" 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* UNIVERSITY GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filteredUnis.map(uni => (
            <div key={uni.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition group">
              
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl border border-slate-100">
                  {uni.logo}
                </div>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">
                  Rank {uni.rank}
                </span>
              </div>

              <h3 className="font-bold text-lg text-slate-800 mb-1">{uni.name}</h3>
              <p className="text-sm font-medium text-slate-500 mb-4">{uni.country}</p>

              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                  {uni.fees} / year
                </span>
              </div>

              <button 
                onClick={() => toggleShortlist(uni.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2
                  ${shortlist.includes(uni.id) 
                    ? 'bg-red-50 text-red-600 border border-red-200' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'}
                `}
              >
                {shortlist.includes(uni.id) ? '❤️ Shortlisted' : '+ Add to Shortlist'}
              </button>

            </div>
          ))}

          {filteredUnis.length === 0 && (
             <div className="col-span-3 text-center py-12">
               <p className="text-slate-400 font-bold">No universities found matching "{search}"</p>
             </div>
          )}
        </div>

      </main>
    </div>
  );
}