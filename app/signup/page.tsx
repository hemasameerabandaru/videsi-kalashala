"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // State to track the selected country
  const [selectedCountry, setSelectedCountry] = useState("🇺🇸 USA");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // 1. Get the data from the form
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    
    // Logic to get the right country (Dropdown vs "Other" text box)
    let finalCountry = selectedCountry;
    if (selectedCountry === "Other") {
      finalCountry = formData.get("customCountry") as string;
    }

    // 2. Save to Browser Memory (Local Storage)
    localStorage.setItem("studentName", fullName);
    localStorage.setItem("studentCountry", finalCountry);

    // 3. Simulate creating account
    setTimeout(() => {
      alert(`Account created for ${fullName}! Welcome to Videsi Kalashala. 🎓`);
      router.push('/dashboard'); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 font-sans">
      
      <div className="mb-8 text-center">
        <Link href="/" className="text-3xl font-extrabold text-indigo-600 tracking-tight">
          Videsi Kalashala
        </Link>
        <p className="text-slate-500 mt-2">Your gateway to global education 🌍</p>
      </div>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Create Student Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
            <input 
              name="fullName"
              type="text" 
              required 
              placeholder="Ex: Sameera Bandaru" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address <span className="text-red-500">*</span></label>
            <input 
              name="email"
              type="email" 
              required 
              placeholder="student@example.com" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Create Password <span className="text-red-500">*</span></label>
            <input 
              name="password"
              type="password" 
              required 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Contact Number <span className="text-red-500">*</span></label>
            <div className="flex">
              <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 font-bold">
                +91
              </span>
              <input 
                name="phone"
                type="tel" 
                required 
                placeholder="98765 43210" 
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit mobile number"
                className="w-full px-4 py-3 rounded-r-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
            </div>
          </div>

          {/* Target Country Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Interested Country</label>
            <select 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 outline-none cursor-pointer"
            >
              <option>🇺🇸 USA</option>
              <option>🇬🇧 UK</option>
              <option>🇨🇦 Canada</option>
              <option>🇦🇺 Australia</option>
              <option>🇩🇪 Germany</option>
              <option>🇫🇷 France</option>
              <option>🇮🇪 Ireland</option>
              <option>Other</option>
            </select>
          </div>

          {/* Conditional Input: Only shows if "Other" is selected */}
          {selectedCountry === "Other" && (
            <div className="animate-fade-in-down">
              <label className="block text-sm font-bold text-indigo-600 mb-2">Which country?</label>
              <input 
                name="customCountry"
                type="text" 
                required 
                placeholder="Ex: Italy, Japan, New Zealand..." 
                className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-600 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Profile..." : "Start Researching →"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-indigo-600 font-bold hover:underline">Log in</Link>
        </div>
      </div>
      
      <p className="mt-8 text-xs text-slate-400">
        © 2024 Videsi Kalashala. By signing up, you agree to our Terms.
      </p>
    </div>
  );
}