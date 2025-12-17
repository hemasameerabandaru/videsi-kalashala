"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Fake Data (Fixed Toronto Image)
const universities = [
  { id: 1, name: "Stanford University", country: "USA", fee: "$60k", rank: "#2", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Oxford University", country: "UK", fee: "£40k", rank: "#5", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "University of Toronto", country: "Canada", fee: "CAD 50k", rank: "#18", image: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?auto=format&fit=crop&w=800&q=80" }, 
  { id: 4, name: "Technical Univ. Munich", country: "Germany", fee: "€0", rank: "#50", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Harvard University", country: "USA", fee: "$65k", rank: "#1", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "University of Melbourne", country: "Australia", fee: "AUD 45k", rank: "#33", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80" },
];

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter(); 

  const handleApply = (uniName: string) => {
    alert(`Application started for ${uniName}! 🚀`);
    router.push('/dashboard/applications');
  };

  const filteredUnis = universities.filter(uni => 
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    uni.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
            <span>📊</span> Dashboard
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-semibold">
            <span>🎓</span> Universities
          </div>
          <Link href="/dashboard/applications" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
            <span>📂</span> My Applications
          </Link>
        </nav>

        {/* USER CARD (Fixed Link) */}
        <div className="p-4 border-t border-slate-100">
          <Link href="/dashboard/profile" className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-xl transition cursor-pointer group">
            <div className="w-10 h-10 bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition rounded-full flex items-center justify-center text-indigo-600 font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition">John Doe</p>
              <p className="text-xs text-slate-500">View Profile</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Find Your Future 🌏</h1>
            <p className="text-slate-500">Search over 1,500+ top ranked universities.</p>
          </div>
          <input 
            type="text" 
            placeholder="Search by name or country..." 
            className="px-6 py-3 rounded-full border border-slate-300 w-full md:w-96 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUnis.map((uni) => (
            <div key={uni.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition overflow-hidden group">
              <div className="h-40 overflow-hidden relative">
                <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  Rank {uni.rank}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1">{uni.name}</h3>
                <p className="text-slate-500 text-sm mb-4">📍 {uni.country}</p>
                <div className="flex justify-between items-center text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-lg mb-4">
                  <span>💰 Tuition:</span>
                  <span className="text-slate-900 font-bold">{uni.fee}</span>
                </div>
                <button 
                  onClick={() => handleApply(uni.name)}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}