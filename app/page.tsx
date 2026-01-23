import { redirect } from "next/navigation"; // 👈 Essential for the redirect
import Link from "next/link";
import GlobeWrapper from "./components/GlobeWrapper";

// ----------------------------------------------------------------------
// 🟢 REALISTIC SETUP: CHOOSE YOUR AUTH PROVIDER
// Uncomment the import matching the library you installed.
// ----------------------------------------------------------------------

// 👉 OPTION A: If you are using CLERK (Recommended)
// import { auth } from "@clerk/nextjs/server";

// 👉 OPTION B: If you are using NEXTAUTH (Auth.js)
// import { getServerSession } from "next-auth"; 
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  
  // ------------------------------------------------------------------
  // 🔒 AUTH CHECK: REDIRECT TO DASHBOARD IF LOGGED IN
  // Uncomment the block below that matches your choice above.
  // ------------------------------------------------------------------

  // 👉 FOR CLERK:
  // const { userId } = auth();
  // if (userId) {
  //   redirect("/dashboard");
  // }

  // 👉 FOR NEXTAUTH:
  // const session = await getServerSession(authOptions);
  // if (session) {
  //   redirect("/dashboard");
  // }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-extrabold text-indigo-600 tracking-tighter cursor-pointer">
            Videsi Kalashala
          </div>
          
          <div className="hidden md:flex gap-8 font-medium text-sm text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition">Features</a>
            <a href="#universities" className="hover:text-indigo-600 transition">Universities</a>
            <a href="#pricing" className="hover:text-indigo-600 transition">Pricing</a>
          </div>

          <div className="flex gap-4">
            <Link href="/sign-in" className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition">
              Login
            </Link>
            <Link href="/sign-up" className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg shadow-indigo-500/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-visible">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Text Content */}
          <div className="space-y-8 animate-fade-in-up z-10 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
              AI-Powered Study Abroad
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
              Your Dream <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Abroad Degree
              </span> <br/>
              Starts Here.
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              One platform to research universities, apply to colleges, track visas, and prepare for interviews. Powered by AI, designed for Indian students.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-up" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-200 hover:scale-105 transform duration-200">
                Start Free Assessment 🚀
              </Link>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition flex items-center justify-center gap-2">
                <span>▶</span> Watch Demo
              </button>
            </div>

             {/* Trust Badges */}
             <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></div>
                 ))}
              </div>
              <p className="text-sm font-bold text-slate-500">
                Trusted by <span className="text-slate-900">1,000+ Students</span>
              </p>
            </div>
          </div>

          {/* RIGHT: 3D GLOBE */}
          {/* We ensure this container is flexible so the globe is never cut off */}
          <div className="relative h-[600px] w-full flex items-center justify-center z-0">
             <GlobeWrapper />
          </div>

        </div>
      </header>

      {/* FEATURE GRID */}
      <section className="py-20 bg-slate-50" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to fly ✈️</h2>
             <p className="text-slate-500">We replaced the expensive agents with smart technology.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "University Finder", icon: "🏛️", desc: "Search 500+ universities based on your GRE & IELTS score." },
              { title: "Visa Mock AI", icon: "🎤", desc: "Practice for your F1 Visa interview with our AI voice bot." },
              { title: "Document Vault", icon: "📂", desc: "Store your SOPs, LORs, and Marksheets securely in one place." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-3xl mb-6">{f.icon}</div>
                <h3 className="font-bold text-xl text-slate-800 mb-2">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-indigo-600 rounded-lg"></div>
             <span className="font-bold text-xl text-slate-900">Videsi Kalashala</span>
           </div>
           <p className="text-slate-500 text-sm">© 2026 Videsi Kalashala. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}