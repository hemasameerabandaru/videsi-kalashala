"use client";
import React from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function StudentDashboard() {
  const { user } = useUser();

  // This list matches your folder structure exactly! 📂
  const tools = [
    { 
      name: "My Profile", 
      link: "/dashboard/profile", 
      icon: "👤", 
      desc: "Manage personal details",
      color: "bg-purple-50 text-purple-600 border-purple-100"
    },
    { 
      name: "Documents", 
      link: "/dashboard/documents", 
      icon: "📂", 
      desc: "Upload passport & marks",
      color: "bg-indigo-50 text-indigo-600 border-indigo-100"
    },
    { 
      name: "University Finder", 
      link: "/dashboard/universities", 
      icon: "🏛️", 
      desc: "Shortlist dream colleges",
      color: "bg-orange-50 text-orange-600 border-orange-100"
    },
    { 
      name: "My Applications", 
      link: "/dashboard/applications", 
      icon: "🚀", 
      desc: "Track status updates",
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    { 
      name: "Cost Calculator", 
      link: "/dashboard/cost-calculator", 
      icon: "🧮", 
      desc: "Estimate total expenses",
      color: "bg-green-50 text-green-600 border-green-100"
    },
    { 
      name: "Scholarships", 
      link: "/dashboard/scholarships", 
      icon: "💰", 
      desc: "Find financial aid",
      color: "bg-yellow-50 text-yellow-600 border-yellow-100"
    },
    { 
      name: "Profile Assessment", 
      link: "/dashboard/assessment", 
      icon: "📊", 
      desc: "Check your eligibility",
      color: "bg-pink-50 text-pink-600 border-pink-100"
    },
    { 
      name: "My Roadmap", 
      link: "/dashboard/roadmap", 
      icon: "📍", 
      desc: "Step-by-step guide",
      color: "bg-teal-50 text-teal-600 border-teal-100"
    },
    { 
      name: "Mentors", 
      link: "/dashboard/mentors", 
      icon: "👨‍🏫", 
      desc: "Talk to alumni",
      color: "bg-cyan-50 text-cyan-600 border-cyan-100"
    },
    { 
      name: "Visa Guide", 
      link: "/dashboard/visa", 
      icon: "🛂", 
      desc: "Process & Checklist",
      color: "bg-red-50 text-red-600 border-red-100"
    },
    { 
      name: "Visa Mock Interview", 
      link: "/dashboard/visa-mock", 
      icon: "🎤", 
      desc: "Practice with AI",
      color: "bg-slate-100 text-slate-700 border-slate-200"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl text-indigo-600 tracking-tight hover:opacity-80 transition">
          Videsi Kalashala
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-slate-400 uppercase">Student</p>
            <p className="text-sm font-bold text-slate-800">{user?.fullName}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
            {user?.firstName?.charAt(0) || "S"}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* WELCOME HEADER */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-slate-500 mt-2">
            You have access to <span className="font-bold text-indigo-600">11 Premium Tools</span> to help you study abroad.
          </p>
        </div>

        {/* 🚀 THE BIG GRID OF FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {tools.map((tool, index) => (
            <Link href={tool.link} key={index} className="group">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition h-full flex flex-col">
                
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border ${tool.color}`}>
                    {tool.icon}
                  </div>
                  <span className="text-slate-300 group-hover:text-indigo-600 transition text-xl">↗</span>
                </div>

                <h3 className="font-bold text-slate-800 text-lg mb-1">{tool.name}</h3>
                <p className="text-sm text-slate-500">{tool.desc}</p>
                
              </div>
            </Link>
          ))}

        </div>

      </main>
    </div>
  );
}