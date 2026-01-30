"use client";
import { SignUp } from "@clerk/nextjs"; // 👈 IMPORTANT: Import SignUp, not SignIn
import Link from "next/link";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ 
  subsets: ["latin"], 
  weight: "700" 
});

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      
      {/* LEFT SIDE: CREATIVE BACKGROUND */}
      <div className="hidden lg:flex w-1/2 relative bg-indigo-600 flex-col items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-900"></div>
        <div className="relative z-10 text-center space-y-8 p-16 rounded-[3rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <h1 className={`text-6xl text-white drop-shadow-lg ${dancingScript.className}`}>
            Join the Journey
          </h1>
          <p className="text-indigo-100 text-lg">
            Create your profile and let our AI build your personalized study abroad roadmap.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: SIGN UP FORM */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-slate-50 relative">
         
         <div className="w-full max-w-md">
            <div className="text-center mb-6">
               <h3 className="text-2xl font-bold text-slate-900">Create Account</h3>
               <p className="text-slate-500 mt-2">Start your global education journey today.</p>
            </div>

            <div className="flex justify-center">
               {/* 👇 THIS MUST BE <SignUp />, NOT <SignIn /> */}
               <SignUp 
                  appearance={{
                     elements: {
                        card: "shadow-none border border-slate-200 bg-white w-full rounded-2xl p-6",
                        headerTitle: "hidden", 
                        headerSubtitle: "hidden",
                        formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case py-3 rounded-xl",
                        formFieldInput: "rounded-xl border-slate-200 focus:ring-indigo-600 focus:border-indigo-600 bg-white py-3",
                        socialButtonsBlockButton: "rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 font-medium py-2.5",
                        footerActionLink: "text-indigo-600 hover:text-indigo-700 font-bold"
                     }
                  }}
               />
            </div>
         </div>

         <Link href="/" className="absolute top-8 right-8 text-sm font-bold text-slate-400 hover:text-indigo-600 transition">
            Back to Home ➜
         </Link>

      </div>
    </div>
  );
}