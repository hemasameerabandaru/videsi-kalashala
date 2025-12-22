"use client";
import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const countries = [
    { name: "USA", flag: "🇺🇸", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80" },
    { name: "UK", flag: "🇬🇧", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80" },
    { name: "Canada", flag: "🇨🇦", image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80" },
    { name: "Australia", flag: "🇦🇺", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80" },
    { name: "Germany", flag: "🇩🇪", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80" },
    { name: "France", flag: "🇫🇷", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80" },
    
    // 🟢 FIXED: High-Stability Pexels Link for Ireland
    { name: "Ireland", flag: "🇮🇪", image: "https://images.pexels.com/photos/1036371/pexels-photo-1036371.jpeg?auto=compress&cs=tinysrgb&w=800" },
    
    { name: "Italy", flag: "🇮🇹", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80" },
    { name: "New Zealand", flag: "🇳🇿", image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80" },
    
    // 🟢 FIXED: High-Stability Pexels Link for Netherlands
    { name: "Netherlands", flag: "🇳🇱", image: "https://images.pexels.com/photos/208698/pexels-photo-208698.jpeg?auto=compress&cs=tinysrgb&w=800" },
    
    { name: "Sweden", flag: "🇸🇪", image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80" },
    { name: "Finland", flag: "🇫🇮", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80" },
    { name: "Switzerland", flag: "🇨🇭", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80" },
    { name: "South Korea", flag: "🇰🇷", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80" },
    { name: "Japan", flag: "🇯🇵", image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-indigo-600 tracking-tight">
            Videsi Kalashala
          </div>
          <div className="hidden md:flex gap-8 font-medium text-slate-600">
            <a href="#destinations" className="hover:text-indigo-600 transition">Destinations</a>
            <a href="#services" className="hover:text-indigo-600 transition">Services</a>
            <a href="#testimonials" className="hover:text-indigo-600 transition">Stories</a>
          </div>
          <div className="flex gap-4">
            <Link href="/admin" className="hidden md:block text-sm font-bold text-slate-400 hover:text-slate-600 py-3">
              Staff Login
            </Link>
            {/* UPDATED: Points to Login Page now */}
            <Link href="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-indigo-600 transition shadow-lg hover:shadow-indigo-500/30">
              Student Login
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
              🌍 Research Your Future
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-slate-900">
              Explore the World's <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Best Universities
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              Compare courses, scholarships, and visa rules across 15+ countries. Create your free profile to start your research today.
            </p>
            <div className="flex gap-4">
              <Link href="/signup" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-200">
                Start Researching
              </Link>
              <button className="px-8 py-4 rounded-xl font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition">
                Talk to Expert
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80" 
              alt="Students" 
              className="rounded-3xl shadow-2xl relative z-10 rotate-2 hover:rotate-0 transition duration-500 border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* DESTINATIONS GRID */}
      <section id="destinations" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Where do you want to study? ✈️</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We process applications for all major study destinations. Select a country to start your journey.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group border border-slate-100">
                <div className="h-40 overflow-hidden relative">
                  <img src={country.image} alt={country.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xl shadow-sm">
                    {country.flag}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{country.name}</h3>
                  <Link href="/signup" className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-1">
                    View Universities <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to apply?</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Sign up today to tell us your preferences (Email, Phone, Country) and we will assign a dedicated mentor to you.
            </p>
            <Link href="/signup" className="bg-white text-slate-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition inline-block">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-slate-500 py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-bold text-slate-900 text-lg mb-2">Videsi Kalashala</p>
          <p className="text-sm">Empowering students to research and achieve their global dreams.</p>
          <div className="mt-8 text-xs text-slate-400">
            © 2024 Videsi Kalashala. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}