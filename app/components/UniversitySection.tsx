"use client";
import React from 'react';

// Data for the cards (We will fetch this from a database later)
const universities = [
  {
    name: "Arizona State University",
    location: "Phoenix, USA",
    flag: "🇺🇸",
    acceptance: "High (88%)",
    tuition: "$32k / year",
    color: "bg-orange-50",
    textColor: "text-orange-600",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
  },
  {
    name: "University of East London",
    location: "London, UK",
    flag: "🇬🇧",
    acceptance: "Medium (60%)",
    tuition: "£14k / year",
    color: "bg-blue-50",
    textColor: "text-blue-600",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Trinity College Dublin",
    location: "Dublin, Ireland",
    flag: "🇮🇪",
    acceptance: "Competitive (33%)",
    tuition: "€20k / year",
    color: "bg-green-50",
    textColor: "text-green-600",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

export default function UniversitySection() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Trending Universities 🔥</h2>
          <p className="text-slate-500 mt-2">Where students are applying right now.</p>
        </div>
        <button className="text-indigo-600 font-semibold hover:underline hidden md:block">
          View all 1,200+ universities →
        </button>
      </div>

      {/* The Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {universities.map((uni, index) => (
          <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 transform hover:-translate-y-2">
            
            {/* Image Area */}
            <div className="h-48 overflow-hidden relative">
              <img 
                src={uni.image} 
                alt={uni.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                {uni.flag} {uni.location}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-1">{uni.name}</h3>
              
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className={`px-3 py-1 rounded-lg ${uni.color} ${uni.textColor} font-semibold`}>
                  🎯 {uni.acceptance}
                </div>
                <div className="text-slate-500">
                  💰 {uni.tuition}
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-6 bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}