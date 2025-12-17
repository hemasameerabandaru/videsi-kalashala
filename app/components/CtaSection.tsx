"use client";
import React from 'react';

export default function CtaSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto bg-indigo-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
        
        {/* Background Circles for decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>

        <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
          Ready to fly? ✈️
        </h2>
        <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">
          Join 5,000+ students who got into their dream university using Videsi Kalashala.
        </p>

        <button className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition transform hover:scale-105 shadow-lg relative z-10">
          Start My Free Profile
        </button>
      </div>
    </section>
  );
}