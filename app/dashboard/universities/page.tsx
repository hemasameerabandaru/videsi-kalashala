"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function UniversityFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");

  // 5 Verified, Working Pexels Images
  const universities = [
    { 
      id: 1, 
      name: "Harvard University", 
      country: "USA", 
      rank: "#1", 
      fees: "$55,000", 
      image: "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=800" 
    },
    { 
      id: 2, 
      name: "University of Oxford", 
      country: "UK", 
      rank: "#2", 
      fees: "£32,000", 
      image: "https://images.pexels.com/photos/1130683/pexels-photo-1130683.jpeg?auto=compress&cs=tinysrgb&w=800" 
    },
    { 
      id: 3, 
      name: "Stanford University", 
      country: "USA", 
      rank: "#3", 
      fees: "$60,000", 
      image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800" 
    },
    { 
      id: 4, 
      name: "University of Toronto", 
      country: "Canada", 
      rank: "#18", 
      fees: "CAD 45,000", 
      image: "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=800" 
    },
    { 
      id: 5, 
      name: "Technical University of Munich", 
      country: "Germany", 
      rank: "#50", 
      fees: "€0 (Public)", 
      image: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800" 
    },
  ];

  const filteredUniversities = universities.filter(uni => {
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
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
            <span>📊</span> Dashboard
          </Link>
          <Link href="/dashboard/universities" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
            <span>🎓</span> Universities
          </Link>
          <Link href="/dashboard/applications" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
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
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Find Your University 🎓</h1>
          <p className="text-slate-500">Search top ranking universities across the globe.</p>
        </header>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search by name (e.g. Harvard)..." 
            className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="px-4 py-3 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none bg-white"
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="All">All Countries</option>
            <option value="USA">USA 🇺🇸</option>
            <option value="UK">UK 🇬🇧</option>
            <option value="Canada">Canada 🇨🇦</option>
            <option value="Germany">Germany 🇩🇪</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((uni) => (
            <div key={uni.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition group">
              <div className="h-40 overflow-hidden relative">
                <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-lg">Rank {uni.rank}</span>
                  <span className="text-xs font-bold text-indigo-600">{uni.country}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{uni.name}</h3>
                <p className="text-slate-500 text-sm mb-4">Avg Fees: <span className="font-bold text-slate-700">{uni.fees}</span></p>
                
                <Link href={`/dashboard/universities/${uni.id}`} className="block text-center w-full bg-slate-900 text-white font-bold py-2 rounded-lg hover:bg-indigo-600 transition">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}