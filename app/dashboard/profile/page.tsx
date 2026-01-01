"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function ProfilePage() {
  const { user } = useUser();
  const [isSaved, setIsSaved] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    phone: '',
    targetCountry: 'USA',
    targetDegree: 'Masters',
    intake: 'Fall 2026'
  });

  // Load saved data from localStorage (Simulating a database for now)
  useEffect(() => {
    const saved = localStorage.getItem('studentProfile');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length < 10) {
      alert("Please enter a valid mobile number.");
      return;
    }
    // Save to local storage (In real app, we send this to your database)
    localStorage.setItem('studentProfile', JSON.stringify(formData));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Hide success message after 3s
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             <span>←</span> Back to Dashboard
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">My Profile 👤</h1>
          <p className="text-slate-500 mt-1">Update your contact details so our counselors can reach you.</p>
        </header>

        <div className="max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* READ ONLY FIELDS FROM CLERK */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={user?.fullName || ""} 
                  disabled 
                  className="w-full bg-slate-100 border border-slate-200 text-slate-500 font-bold px-4 py-3 rounded-xl cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Email Address</label>
                <input 
                  type="text" 
                  value={user?.primaryEmailAddress?.emailAddress || ""} 
                  disabled 
                  className="w-full bg-slate-100 border border-slate-200 text-slate-500 font-bold px-4 py-3 rounded-xl cursor-not-allowed"
                />
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* MANDATORY PHONE NUMBER */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                 <span className="absolute left-4 top-3.5 text-slate-400 font-bold">+91</span>
                 <input 
                   type="tel" 
                   required
                   placeholder="98765 43210" 
                   className="w-full pl-14 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-600 transition"
                   value={formData.phone}
                   onChange={(e) => setFormData({...formData, phone: e.target.value})}
                 />
              </div>
              <p className="text-xs text-slate-400 mt-2">We need this to discuss your university options.</p>
            </div>

            {/* PREFERENCES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Target Country</label>
                <select 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-600 transition"
                  value={formData.targetCountry}
                  onChange={(e) => setFormData({...formData, targetCountry: e.target.value})}
                >
                  <option>USA 🇺🇸</option>
                  <option>UK 🇬🇧</option>
                  <option>Canada 🇨🇦</option>
                  <option>Germany 🇩🇪</option>
                  <option>Australia 🇦🇺</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Target Intake</label>
                <select 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-indigo-600 transition"
                  value={formData.intake}
                  onChange={(e) => setFormData({...formData, intake: e.target.value})}
                >
                  <option>Fall 2025</option>
                  <option>Spring 2026</option>
                  <option>Fall 2026</option>
                </select>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 flex items-center gap-4">
               <button 
                 type="submit" 
                 className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
               >
                 Save Profile
               </button>
               
               {isSaved && (
                 <span className="text-emerald-600 font-bold text-sm animate-fade-in flex items-center gap-1">
                   ✅ Saved Successfully!
                 </span>
               )}
            </div>

          </form>

        </div>
      </main>
    </div>
  );
}