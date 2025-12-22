"use client";
import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <span className="text-3xl">🎓</span>
             <span className="text-xl font-extrabold text-slate-900 tracking-tight">Videsi Kalashala</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition">Features</a>
            <a href="#process" className="hover:text-indigo-600 transition">How it Works</a>
            <a href="#testimonials" className="hover:text-indigo-600 transition">Success Stories</a>
          </div>
          <div className="flex items-center gap-4">
             {/* LOGIN DROPDOWN / BUTTONS */}
             <Link href="/dashboard" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition">
               Student Login
             </Link>
             <Link href="/admin/dashboard" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-xl">
               Staff Login 🔐
             </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="animate-fade-in-up">
            <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs uppercase tracking-wide mb-6 border border-indigo-100">
              🚀 #1 Study Abroad Consultancy
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              Your Dream University <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">is Waiting.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              From shortlisting universities to visa approval, we automate your entire study abroad journey. Zero stress, 100% transparency.
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30">
                Start My Journey ✈️
              </Link>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition">
                Book Consultation
              </button>
            </div>
            <div className="mt-10 flex items-center gap-4 text-sm font-bold text-slate-500">
              <div className="flex -space-x-3">
                <img src="https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=100" className="w-10 h-10 rounded-full border-2 border-white" alt="Student" />
                <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" className="w-10 h-10 rounded-full border-2 border-white" alt="Student" />
                <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100" className="w-10 h-10 rounded-full border-2 border-white" alt="Student" />
              </div>
              <p>Trusted by 1,200+ students</p>
            </div>
          </div>

          <div className="relative">
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-50 -z-10"></div>
             <img 
               src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800" 
               alt="Student with Books" 
               className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition duration-500 border-8 border-white"
             />
             
             {/* Floating Badge */}
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">✅</div>
               <div>
                 <p className="text-xs font-bold text-slate-400 uppercase">Visa Success</p>
                 <p className="text-xl font-extrabold text-slate-900">98.2%</p>
               </div>
             </div>
          </div>

        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to fly 🛫</h2>
            <p className="text-slate-500">We don't just fill forms. We build your profile, train you for interviews, and get you funded.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">🧠</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Course Matcher</h3>
              <p className="text-slate-500 leading-relaxed">
                Confused? Our AI analyzes your grades and budget to suggest the perfect universities for you.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition group">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">🎤</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Mock Visa Interviews</h3>
              <p className="text-slate-500 leading-relaxed">
                Practice 1-on-1 with experts. Get graded on confidence and clarity before the real embassy interview.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition group">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">💰</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Loan Assistance</h3>
              <p className="text-slate-500 leading-relaxed">
                We help you calculate expenses and connect you with trusted loan providers for easy funding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATS STRIP */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-extrabold text-indigo-400 mb-2">1,200+</p>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">Students Placed</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-indigo-400 mb-2">₹50 Cr+</p>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">Scholarships Won</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-indigo-400 mb-2">15+</p>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">Countries</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-indigo-400 mb-2">100%</p>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">Support</p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div>
             <span className="text-xl font-extrabold text-slate-900">Videsi Kalashala</span>
             <p className="text-slate-500 text-sm mt-2">© 2025 All Rights Reserved.</p>
           </div>
           <div className="flex gap-6">
             <a href="#" className="text-slate-500 hover:text-indigo-600">Instagram</a>
             <a href="#" className="text-slate-500 hover:text-indigo-600">LinkedIn</a>
             <a href="#" className="text-slate-500 hover:text-indigo-600">Twitter</a>
           </div>
        </div>
      </footer>

    </div>
  );
}