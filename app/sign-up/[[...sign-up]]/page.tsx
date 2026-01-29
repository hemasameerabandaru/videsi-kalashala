"use client";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import { useState, useEffect } from "react";

// 1. Configure the font
const dancingScript = Dancing_Script({ 
  subsets: ["latin"], 
  weight: "700" 
});

// 2. Typing Effect Component (Optimized for Dark Background)
function TypewriterEffect() {
  const words = ["Global Education.", "Dream Universities.", "Future Success."];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt(String(Math.random() * 350))));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <div className="h-8 flex items-center justify-center">
      {/* Light text for dark background */}
      <span className="text-indigo-100 text-xl font-medium tracking-wide">
        Your Gateway to {`${words[index].substring(0, subIndex)}`}
        <span className={`ml-1 w-[2px] h-6 bg-indigo-200 inline-block ${blink ? 'opacity-100' : 'opacity-0'}`}></span>
      </span>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      
      {/* 🎨 LEFT SIDE: INDIGO BACKGROUND + WHITE TEXT */}
      <div className="hidden lg:flex w-1/2 relative bg-indigo-600 flex-col items-center justify-center p-12 overflow-hidden">
        
        {/* Rich Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-900 animate-gradient-xy"></div>
        
        {/* Deep Glowing Blobs for Depth */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-indigo-400/30 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
             }}>
        </div>

        {/* 💧 LIQUID GLASS CARD CONTAINER (Optimized for Dark Mode) */}
        <div className="relative z-10 text-center space-y-8 p-16
                        rounded-[3rem] 
                        bg-gradient-to-br from-white/10 via-white/5 to-transparent 
                        backdrop-blur-xl 
                        border border-white/20 
                        shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
                        hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:border-white/30 transition-all duration-500">
          
          {/* Greeting */}
          <p className="text-indigo-200 text-sm font-bold uppercase tracking-[0.3em]">Welcome to</p>
          
          {/* Logo - White Text */}
          <h1 className={`text-7xl text-white drop-shadow-lg ${dancingScript.className}`}>
            videsi kalashala
          </h1>

          {/* Typing Effect */}
          <TypewriterEffect />
          
        </div>
      </div>

      {/* 🔐 RIGHT SIDE: LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-slate-50 relative">
         
         {/* Mobile Logo */}
         <div className="lg:hidden mb-8 flex items-center gap-2 text-indigo-600">
            <span className="text-3xl">🎓</span>
            <span className={`text-3xl font-bold ${dancingScript.className}`}>
              Videsi Kalashala
            </span>
         </div>

         {/* Login Container */}
         <div className="w-full max-w-md">
            <div className="text-center mb-8">
               <h3 className="text-2xl font-bold text-slate-900">Sign In</h3>
               <p className="text-slate-500 mt-2">Access your study abroad dashboard.</p>
            </div>

            {/* CLERK COMPONENT */}
            <div className="flex justify-center">
               <SignIn 
                  appearance={{
                     elements: {
                        card: "shadow-none border border-slate-200 bg-white w-full rounded-2xl p-6",
                        headerTitle: "hidden", 
                        headerSubtitle: "hidden",
                        formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5",
                        formFieldInput: "rounded-xl border-slate-200 focus:ring-indigo-600 focus:border-indigo-600 bg-white py-3",
                        socialButtonsBlockButton: "rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 font-medium transition-all py-2.5",
                        footerActionLink: "text-indigo-600 hover:text-indigo-700 font-bold"
                     }
                  }}
               />
            </div>
         </div>

         {/* Back to Home Link */}
         <Link href="/" className="absolute top-8 right-8 text-sm font-bold text-slate-400 hover:text-indigo-600 transition flex items-center gap-1 group">
            Back to Home 
            <span className="group-hover:translate-x-1 transition-transform">➜</span>
         </Link>

      </div>
    </div>
  );
}