"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function CostCalculator() {
  
  // State for Calculator Inputs
  const [currency, setCurrency] = useState("USD"); // USD, EUR, GBP, AUD
  const [tuition, setTuition] = useState(30000);
  const [accommodation, setAccommodation] = useState(12000);
  const [food, setFood] = useState(5000);
  const [transport, setTransport] = useState(1500);
  const [misc, setMisc] = useState(2000);

  // Currency Symbols map
  const symbols: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", AUD: "A$", CAD: "C$"
  };

  const total = tuition + accommodation + food + transport + misc;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold transition">
             <span>←</span> Back to Dashboard
          </Link>
          <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-6">
            Planning Tools
          </div>
          <Link href="/dashboard/cost-calculator" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
             🧮 Cost Calculator
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Expense Estimator 💰</h1>
          <p className="text-slate-500 mt-1">Calculate your total budget for studying abroad.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: INPUTS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Currency Selector */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <label className="block text-sm font-bold text-slate-500 uppercase mb-3">Select Currency</label>
              <div className="flex gap-3">
                {["USD", "EUR", "GBP", "AUD", "CAD"].map((c) => (
                  <button 
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm border transition
                      ${currency === c ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}
                    `}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders & Inputs */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-8">
              
              {/* Tuition */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-slate-700">🎓 Annual Tuition Fee</label>
                  <span className="font-bold text-indigo-600">{symbols[currency]}{tuition.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="0" max="100000" step="500" 
                  value={tuition} onChange={(e) => setTuition(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Accommodation */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-slate-700">🏠 Accommodation / Rent</label>
                  <span className="font-bold text-indigo-600">{symbols[currency]}{accommodation.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="0" max="30000" step="100" 
                  value={accommodation} onChange={(e) => setAccommodation(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Food */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-slate-700">🍔 Food & Groceries</label>
                  <span className="font-bold text-indigo-600">{symbols[currency]}{food.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="0" max="15000" step="100" 
                  value={food} onChange={(e) => setFood(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Misc */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-slate-700">🚌 Transport & Misc</label>
                  <span className="font-bold text-indigo-600">{symbols[currency]}{(transport + misc).toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="0" max="10000" step="100" 
                  value={transport} onChange={(e) => setTransport(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

            </div>
          </div>

          {/* RIGHT: TOTAL SUMMARY */}
          <div className="lg:col-span-1">
             <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl sticky top-6">
                <h3 className="text-slate-400 font-bold uppercase text-xs tracking-wider mb-2">Total Estimated Cost</h3>
                <div className="text-4xl font-extrabold mb-1">
                  {symbols[currency]}{total.toLocaleString()}
                  <span className="text-lg text-slate-400 font-medium"> / year</span>
                </div>
                <p className="text-slate-400 text-sm mb-8">This includes tuition and living expenses.</p>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                    <span className="text-slate-300">Tuition</span>
                    <span className="font-bold">{symbols[currency]}{tuition.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                    <span className="text-slate-300">Living</span>
                    <span className="font-bold">{symbols[currency]}{(accommodation + food).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                    <span className="text-slate-300">Others</span>
                    <span className="font-bold">{symbols[currency]}{(transport + misc).toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-indigo-600 rounded-xl font-bold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-900/50">
                   Download Estimate 📥
                </button>
                <p className="text-xs text-center text-slate-500 mt-4">
                  *Costs are estimates based on average student spending.
                </p>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}