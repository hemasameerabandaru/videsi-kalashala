"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      router.push('/'); // Redirects to Homepage
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR (Standard) */}
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
          <Link href="/dashboard/applications" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
            <span>📂</span> My Applications
          </Link>
        </nav>

        {/* User Card (Active State) */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded-xl cursor-pointer">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">JD</div>
            <div>
              <p className="text-sm font-bold text-indigo-900">John Doe</p>
              <p className="text-xs text-indigo-500">View Profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Profile ⚙️</h1>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden max-w-2xl">
          
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
            <div className="absolute -bottom-10 left-8">
              <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-2xl font-bold text-slate-500">
                  JD
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">John Doe</h2>
                <p className="text-slate-500">Student • Hyderabad, India</p>
              </div>
              <button className="text-indigo-600 font-bold text-sm hover:underline">Edit Photo</button>
            </div>

            {/* Form */}
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                  <input type="text" defaultValue="John" className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                  <input type="text" defaultValue="Doe" className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input type="email" defaultValue="john.doe@example.com" className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Dream Country</label>
                <select className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50">
                  <option>🇺🇸 USA</option>
                  <option>🇬🇧 UK</option>
                  <option>🇨🇦 Canada</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <button type="button" onClick={handleLogout} className="text-red-500 font-bold hover:text-red-600">
                  Log Out
                </button>
                <button type="button" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}