import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      
      {/* 🎨 LEFT SIDE: BRANDING & WELCOME (50%) */}
      <div className="hidden lg:flex w-1/2 relative bg-indigo-600 flex-col justify-between p-12 text-white overflow-hidden">
        
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-700 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
        
        {/* Decorative Blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        {/* Top: Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="text-3xl">🎓</span>
          <h1 className="text-2xl font-bold tracking-tight">Videsi Kalashala</h1>
        </div>

        {/* Middle: Hero Text */}
        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Welcome to <br/> Videsi Kalashala
          </h2>
          <p className="text-indigo-100 text-lg leading-relaxed mb-8">
            Your personal AI-powered guide to studying abroad. Log in to access your dashboard, track applications, and meet mentors.
          </p>
          
          {/* Social Proof Pill */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 w-fit">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-indigo-600"></div>
                ))}
             </div>
             <div className="text-sm font-medium">
                <span className="font-bold">1,000+</span> Students Joined
             </div>
          </div>
        </div>

        {/* Bottom: Footer Info */}
        <div className="relative z-10 text-sm text-indigo-200 font-medium flex justify-between items-center">
           <p>© 2024 Videsi Kalashala</p>
           <p>Crafted for Aspirants</p>
        </div>
      </div>

      {/* 🔐 RIGHT SIDE: LOGIN FORM (50%) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-slate-50 relative">
         
         {/* Mobile Logo (Visible only on small screens) */}
         <div className="lg:hidden mb-8 flex items-center gap-2 text-indigo-600">
            <span className="text-3xl">🎓</span>
            <span className="text-xl font-bold">Videsi Kalashala</span>
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
                        card: "shadow-none border-none bg-transparent w-full",
                        headerTitle: "hidden", 
                        headerSubtitle: "hidden",
                        formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case py-3 rounded-xl",
                        formFieldInput: "rounded-xl border-slate-200 focus:ring-indigo-600 focus:border-indigo-600 bg-white",
                        socialButtonsBlockButton: "rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600",
                        footerActionLink: "text-indigo-600 hover:text-indigo-700 font-bold"
                     }
                  }}
               />
            </div>
         </div>

         {/* Back to Home Link */}
         <Link href="/" className="absolute top-8 right-8 text-sm font-bold text-slate-400 hover:text-indigo-600 transition flex items-center gap-1">
            Back to Home ➜
         </Link>

      </div>
    </div>
  );
}