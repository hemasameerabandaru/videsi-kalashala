"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate checking password (Fake delay)
    setTimeout(() => {
      alert("Welcome back! 👋");
      router.push('/dashboard'); 
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 font-sans">
      
      <div className="mb-8 text-center">
        <Link href="/" className="text-3xl font-extrabold text-indigo-600 tracking-tight">
          Videsi Kalashala
        </Link>
      </div>

      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Welcome Back</h2>
        <p className="text-slate-500 text-center mb-8 text-sm">Please sign in to continue your research.</p>

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Email Address */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="student@example.com" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-slate-700">Password</label>
              <a href="#" className="text-xs text-indigo-600 font-bold hover:underline">Forgot?</a>
            </div>
            <input 
              type="password" 
              required 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-600 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Log In"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          New to Videsi Kalashala? <Link href="/signup" className="text-indigo-600 font-bold hover:underline">Create Account</Link>
        </div>
      </div>
      
      <p className="mt-8 text-xs text-slate-400">
        © 2024 Videsi Kalashala. All rights reserved.
      </p>
    </div>
  );
}