"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <--- New Import

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // <--- Controls navigation

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard'); // <--- Redirects to Dashboard!
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
        <div className="relative z-10 text-center px-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Join the Revolution 🚀</h2>
          <p className="text-indigo-100 text-lg">Create your profile, track your applications, and fly to your dream university.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-8">
          <h1 className="text-3xl font-bold mb-2 text-slate-800">Create Account</h1>
          <p className="text-slate-500 mb-8">Start your journey today.</p>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full p-3 border rounded-xl" required />
              <input type="text" placeholder="Last Name" className="w-full p-3 border rounded-xl" required />
            </div>
            <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-xl" required />
            <input type="tel" placeholder="Phone Number" className="w-full p-3 border rounded-xl" required />
            <select className="w-full p-3 border rounded-xl text-slate-600 bg-white" required>
              <option value="">Select Dream Country</option>
              <option value="usa">🇺🇸 USA</option>
              <option value="uk">🇬🇧 UK</option>
              <option value="canada">🇨🇦 Canada</option>
              <option value="germany">🇩🇪 Germany</option>
            </select>
            <input type="password" placeholder="Create Password" className="w-full p-3 border rounded-xl" required />

            <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white p-3 rounded-xl font-bold hover:bg-indigo-700 transition">
              {isLoading ? "Creating Account..." : "Sign Up Free"}
            </button>
          </form>

          <p className="text-center mt-6 text-slate-500">
            Already have an account? <Link href="/login" className="text-indigo-600 font-bold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}