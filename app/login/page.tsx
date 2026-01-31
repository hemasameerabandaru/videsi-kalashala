"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn("credentials", { email, password, redirect: true, callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans text-slate-900">
      
      {/* 🟣 LEFT SIDE: Vibrant Purple Gradient with Effects */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#6B5DF9] via-[#5B4DF5] to-[#3D2FE0] relative items-center justify-center overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse animation-delay-4000"></div>
        
        {/* Content */}
        <div className="text-center relative z-10">
          {/* ✨ DANCING SCRIPT FONT APPLIED HERE */}
          <h1 className="text-8xl text-white font-[family-name:var(--font-brand)] tracking-wide mb-2 drop-shadow-2xl lowercase filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
            videsi kalashala
          </h1>
          <p className="text-white text-lg opacity-90 font-light tracking-wide">Study Abroad, Simplified</p>
        </div>
      </div>

      {/* ⚪ RIGHT SIDE: Clean White Background */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
        
        {/* LOGIN CARD */}
        <div className="w-full max-w-md bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 shadow-xl">
            
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Welcome Back</h2>
                <p className="text-slate-400 text-sm">Access your personalized study dashboard</p>
            </div>

            {/* Google Button */}
            <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 active:bg-slate-100 py-3.5 rounded-2xl font-semibold transition-all mb-8 shadow-sm"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <image href="https://www.svgrepo.com/show/475656/google-color.svg" width="24" height="24" />
                </svg>
                <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative flex py-4 items-center mb-8">
                <div className="flex-grow border-t border-slate-300"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase font-bold tracking-wider">OR LOGIN WITH EMAIL</span>
                <div className="flex-grow border-t border-slate-300"></div>
            </div>

            <form className="space-y-5" onSubmit={handleEmailLogin}>
                
                {/* Email - Gray Background */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Email Address</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8B80F9] focus:border-transparent transition-all font-medium"
                        required
                    />
                </div>

                {/* Password - Gray Background */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8B80F9] focus:border-transparent transition-all font-medium"
                        required
                    />
                </div>
                
                {/* Sign In Button - Periwinkle Purple */}
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#8B80F9] hover:bg-[#7970E8] active:bg-[#6860D8] disabled:opacity-70 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all mt-8 duration-200"
                >
                    {isLoading ? "Signing In..." : "Sign In"}
                </button>
            </form>

            <p className="text-center text-slate-400 mt-10 text-sm font-medium">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#8B80F9] font-bold hover:text-[#7a6df6] transition-colors">
                    Sign Up
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}