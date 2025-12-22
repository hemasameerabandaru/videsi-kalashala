"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function UniversityDetails() {
  const params = useParams();
  const id = Number(params.id);

  // 🟢 FIXED: Matching Pexels Images (Same as Finder Page)
  const universities = [
    { 
      id: 1, 
      name: "Harvard University", 
      country: "USA", 
      location: "Cambridge, Massachusetts",
      rank: "#1", 
      fees: "$55,000 / year",
      desc: "Harvard is the oldest institution of higher learning in the United States and among the most prestigious in the world.",
      // Matching Pexels Image
      image: "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1200",
      courses: ["MBA", "Computer Science", "Law", "Medicine"]
    },
    { 
      id: 2, 
      name: "University of Oxford", 
      country: "UK", 
      location: "Oxford, England",
      rank: "#2", 
      fees: "£32,000 / year",
      desc: "Oxford is a world-leading centre of learning, teaching and research and the oldest university in the English-speaking world.",
      // Matching Pexels Image
      image: "https://images.pexels.com/photos/1130683/pexels-photo-1130683.jpeg?auto=compress&cs=tinysrgb&w=1200",
      courses: ["History", "Philosophy", "Economics", "Engineering"]
    },
    { 
      id: 3, 
      name: "Stanford University", 
      country: "USA", 
      location: "Stanford, California", 
      rank: "#3", 
      fees: "$60,000", 
      // Matching Pexels Image
      image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1200",
      desc: "Known for its entrepreneurial spirit and strong ties to Silicon Valley.", 
      courses: ["Computer Science", "Business", "Engineering"] 
    },
    { 
      id: 4, 
      name: "University of Toronto", 
      country: "Canada", 
      location: "Toronto, Ontario", 
      rank: "#18", 
      fees: "CAD 45,000", 
      // Matching Pexels Image
      image: "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=1200",
      desc: "Canada's top university with a strong focus on research and innovation.", 
      courses: ["Life Sciences", "Humanities", "Social Sciences"] 
    },
    { 
      id: 5, 
      name: "Technical University of Munich", 
      country: "Germany", 
      location: "Munich, Germany", 
      rank: "#50", 
      fees: "€0 (Public)", 
      // Matching Pexels Image
      image: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1200",
      desc: "One of Europe's leading technical universities.", 
      courses: ["Mechanical Engineering", "Informatics", "Physics"] 
    },
  ];

  // Find the specific university clicked
  const university = universities.find(u => u.id === id);

  if (!university) {
    return <div className="p-10 text-center text-red-500">University not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* HEADER IMAGE */}
      <div className="h-64 md:h-80 w-full relative">
        <img src={university.image} alt={university.name} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white max-w-7xl mx-auto w-full">
          <Link href="/dashboard/universities" className="text-sm font-bold opacity-80 hover:underline mb-2 inline-block">← Back to Search</Link>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-bold">{university.name}</h1>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-bold border border-white/30">
              Rank {university.rank}
            </span>
          </div>
          <p className="text-lg opacity-90 mt-2">📍 {university.location} • 🏳️ {university.country}</p>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT: INFO */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">About the University</h2>
            <p className="text-slate-600 leading-relaxed text-lg">{university.desc}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Top Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {university.courses?.map((course) => (
                <div key={course} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-2xl">📚</span>
                  <span className="font-bold text-slate-700">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: ACTION CARD */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 sticky top-10">
            <p className="text-slate-500 text-sm font-bold uppercase mb-1">Annual Tuition Fee</p>
            <p className="text-3xl font-bold text-indigo-600 mb-6">{university.fees}</p>

            <button 
              onClick={() => alert(`Application started for ${university.name}!`)}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-indigo-200 shadow-lg mb-3"
            >
              Start Application 🚀
            </button>
            <button className="w-full bg-white text-slate-700 border border-slate-200 font-bold py-4 rounded-xl hover:bg-slate-50 transition">
              Shortlist for Later ❤️
            </button>

            <div className="mt-6 pt-6 border-t border-slate-100 text-sm text-slate-500 space-y-3">
              <div className="flex justify-between">
                <span>Application Fee:</span>
                <span className="font-bold text-slate-800">$100</span>
              </div>
              <div className="flex justify-between">
                <span>Intake:</span>
                <span className="font-bold text-slate-800">Fall 2026</span>
              </div>
              <div className="flex justify-between">
                <span>Eligibility:</span>
                <span className="font-bold text-slate-800">GPA 3.5+</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}