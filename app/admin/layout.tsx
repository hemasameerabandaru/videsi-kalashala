"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Helper to check active link
  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* 🔵 MASTER SIDEBAR - FIXED FOR ALL PAGES */}
      <aside className="w-64 bg-[#0B1120] text-white hidden md:flex flex-col fixed h-full z-20">
        <div className="p-6">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-white mb-1">
            <span>Videsi Admin</span>
            <span className="text-blue-400">🛡️</span>
          </div>
          <p className="text-xs text-slate-400">Counselor Portal</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-3 mt-4 overflow-y-auto">
          {/* Dashboard */}
          <Link 
            href="/admin/dashboard" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
              isActive('/admin/dashboard') ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>📊</span> Dashboard
          </Link>

          {/* Students */}
          <Link 
            href="/admin/students" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
              isActive('/admin/students') ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>👥</span> All Students
          </Link>

          {/* Applications */}
          <Link 
            href="/admin/applications" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
              isActive('/admin/applications') ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>📄</span> Applications
          </Link>

          {/* 🟢 Visa Training */}
          <Link 
            href="/admin/visa-training" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
              isActive('/admin/visa-training') ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
             <span>🎤</span> Visa Training
          </Link>

          {/* 🟢 Bookings */}
          <Link 
            href="/admin/bookings" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
              isActive('/admin/bookings') ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
             <span>📅</span> Bookings
          </Link>

          {/* Universities */}
          <Link 
            href="/admin/universities" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
              isActive('/admin/universities') ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
             <span>🏛️</span> Universities
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-800/50">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition">
            <span className="bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center text-xs">🔙</span>
            <span className="font-medium text-sm">Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* DYNAMIC CONTENT AREA */}
      <div className="flex-1 ml-0 md:ml-64">
        {children}
      </div>
    </div>
  );
}