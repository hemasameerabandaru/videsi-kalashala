"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "Student",
    email: "student@example.com", // Placeholder (since we didn't save email to localstorage yet)
    country: "Not Selected",
    phone: "+91 98765 43210",
    joined: "December 2024"
  });

  // Load data from Browser Memory
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem("studentName");
      const savedCountry = localStorage.getItem("studentCountry");

      setUser(prev => ({
        ...prev,
        name: savedName || "Student",
        country: savedCountry || "Not Selected"
      }));
    }
  }, []);

  // Logout Function
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear(); // Wipe memory
      router.push('/'); // Go back to Landing Page
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
            <span>📊</span> Dashboard
          </Link>
          <Link href="/dashboard/universities" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
            <span>🎓</span> Universities
          </Link>
          <Link href="/dashboard/applications" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
            <span>📂</span> My Applications
          </Link>
          <Link href="/dashboard/mentors" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition">
            <span>💬</span> Mentors
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">My Profile 👤</h1>
          <p className="text-slate-500">Manage your account settings and preferences.</p>
        </header>

        <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                 <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-3xl font-bold text-slate-400 uppercase">
                    {user.name.charAt(0)}
                 </div>
              </div>
              <button className="bg-white border border-slate-300 text-slate-700 font-bold px-4 py-2 rounded-lg hover:bg-slate-50 transition text-sm">
                Edit Profile
              </button>
            </div>

            <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-slate-500 mb-6">Study Abroad Aspirant • {user.country}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email Address</label>
                <p className="font-medium text-slate-700">{user.email}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Phone Number</label>
                <p className="font-medium text-slate-700">{user.phone}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Target Country</label>
                <p className="font-medium text-slate-700">{user.country}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Member Since</label>
                <p className="font-medium text-slate-700">{user.joined}</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
               <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition"
               >
                 <span>🚪</span> Sign Out
               </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}