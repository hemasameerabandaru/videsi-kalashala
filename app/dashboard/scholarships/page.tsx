"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ScholarshipFinder() {
  
  // Mock Scholarship Database
  const scholarships = [
    { id: 1, name: "Global Excellence Scholarship", amount: "$10,000", country: "USA 🇺🇸", type: "Merit-Based", deadline: "Mar 15, 2026", tags: ["High GPA", "All Majors"] },
    { id: 2, name: "British Council Women in STEM", amount: "Full Tuition", country: "UK 🇬🇧", type: "Women Only", deadline: "Feb 28, 2026", tags: ["STEM", "Fully Funded"] },
    { id: 3, name: "DAAD Master Studies", amount: "€850 / month", country: "Germany 🇩🇪", type: "Government", deadline: "Apr 01, 2026", tags: ["Living Stipend", "Public Unis"] },
    { id: 4, name: "Vice-Chancellor's International", amount: "AUD 40,000", country: "Australia 🇦🇺", type: "Merit-Based", deadline: "May 20, 2026", tags: ["Undergrad", "Postgrad"] },
    { id: 5, name: "Erasmus Mundus Joint Masters", amount: "€1,400 / month", country: "Europe 🇪🇺", type: "Fully Funded", deadline: "Jan 15, 2026", tags: ["Travel", "Insurance", "Tuition"] },
    { id: 6, name: "Fulbright Foreign Student", amount: "Full Ride", country: "USA 🇺🇸", type: "Government", deadline: "Oct 11, 2025", tags: ["Prestigious", "PhD", "Masters"] },
  ];

  const [filter, setFilter] = useState("All");

  // Filter Logic
  const filteredList = filter === "All" 
    ? scholarships 
    : scholarships.filter(s => s.type === filter || s.country.includes(filter));

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
            Finance
          </div>
          <Link href="/dashboard/cost-calculator" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             🧮 Cost Calculator
          </Link>
          <Link href="/dashboard/scholarships" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
             💰 Scholarships
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Find Scholarships 🎓</h1>
            <p className="text-slate-500 mt-1">Don't pay full tuition. Apply for funding opportunities.</p>
          </div>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition shadow-lg">
            Track My Applications
          </button>
        </header>

        {/* SEARCH & FILTER */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4">
           <div className="relative flex-1">
             <span className="absolute left-4 top-3 text-slate-400">🔍</span>
             <input 
               type="text" 
               placeholder="Search by name, country, or course..." 
               className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-600 transition"
             />
           </div>
           <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
             {["All", "USA 🇺🇸", "UK 🇬🇧", "Germany 🇩🇪", "Fully Funded", "Merit-Based"].map((tag) => (
               <button 
                 key={tag}
                 onClick={() => setFilter(tag)}
                 className={`px-4 py-2 rounded-lg font-bold text-xs whitespace-nowrap transition border
                   ${filter === tag 
                     ? 'bg-indigo-600 text-white border-indigo-600' 
                     : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}
                 `}
               >
                 {tag}
               </button>
             ))}
           </div>
        </div>

        {/* SCHOLARSHIP GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          
          {filteredList.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition group flex flex-col h-full">
              
              <div className="flex justify-between items-start mb-4">
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {item.country}
                </span>
                <span className="text-xs font-bold text-slate-400">Deadline: {item.deadline}</span>
              </div>

              <h3 className="font-bold text-lg text-slate-800 mb-2 leading-tight">{item.name}</h3>
              
              <div className="mb-6">
                 <p className="text-xs text-slate-500 font-bold uppercase mb-1">Grant Amount</p>
                 <p className="text-2xl font-extrabold text-emerald-600">{item.amount}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6 flex-1 content-start">
                {item.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full py-3 bg-white border-2 border-slate-100 text-slate-700 font-bold rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition">
                View Details
              </button>

            </div>
          ))}

          {filteredList.length === 0 && (
            <div className="col-span-3 text-center py-12">
               <p className="text-slate-400 font-bold">No scholarships found for this filter.</p>
               <button onClick={() => setFilter("All")} className="text-indigo-600 font-bold text-sm mt-2 hover:underline">Clear Filters</button>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}