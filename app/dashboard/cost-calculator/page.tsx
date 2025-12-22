"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function CostCalculator() {
  const [selectedCity, setSelectedCity] = useState("London, UK");

  // Database of Cities & Costs
  const cityData: Record<string, { rent: number; food: number; transport: number; wage: number; currency: string; rate: number }> = {
    "London, UK": { rent: 800, food: 300, transport: 150, wage: 11, currency: "£", rate: 105 },
    "Berlin, Germany": { rent: 600, food: 250, transport: 50, wage: 12, currency: "€", rate: 90 },
    "Toronto, Canada": { rent: 1200, food: 400, transport: 130, wage: 16, currency: "CAD", rate: 60 },
    "New York, USA": { rent: 1500, food: 500, transport: 130, wage: 15, currency: "$", rate: 83 },
    "Melbourne, Australia": { rent: 1000, food: 350, transport: 100, wage: 22, currency: "AUD", rate: 55 },
  };

  const city = cityData[selectedCity];

  // Calculation Logic (20 hours work week)
  const totalCost = city.rent + city.food + city.transport;
  const potentialEarning = city.wage * 20 * 4; // Hourly wage * 20 hours * 4 weeks
  const netCost = totalCost - potentialEarning;

  // Convert to INR for easier understanding
  const toINR = (amount: number) => (amount * city.rate).toLocaleString('en-IN');

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             <span>←</span> Back to Dashboard
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Expense Calculator 💰</h1>
          <p className="text-slate-500">Plan your monthly budget and check part-time earnings.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
          
          {/* LEFT: CONTROLS */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-sm font-bold text-slate-700 mb-2">Select Your Destination</label>
              <select 
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 font-bold outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                onChange={(e) => setSelectedCity(e.target.value)}
                value={selectedCity}
              >
                {Object.keys(cityData).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="opacity-80 font-bold mb-1">Estimated Net Cost / Month</p>
                <h2 className="text-5xl font-bold mb-2">{city.currency}{netCost > 0 ? netCost : 0}</h2>
                <p className="text-indigo-200 text-sm">approx. ₹{toINR(netCost > 0 ? netCost : 0)}</p>

                <div className="mt-6 pt-6 border-t border-indigo-700">
                  <p className="text-sm font-medium opacity-80 mb-2">Breakdown:</p>
                  <div className="flex justify-between items-center mb-1">
                    <span>Total Expenses</span>
                    <span className="font-bold text-red-300">- {city.currency}{totalCost}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Part-Time Earnings</span>
                    <span className="font-bold text-emerald-300">+ {city.currency}{potentialEarning}</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>

          {/* RIGHT: DETAILED BREAKDOWN */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Monthly Cost Breakdown</h3>

            <div className="space-y-6">
              
              {/* Rent */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl">🏠</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-slate-700">Accommodation</span>
                    <span className="font-bold text-slate-900">{city.currency}{city.rent}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-orange-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Shared apartment or student dorm</p>
                </div>
              </div>

              {/* Food */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">🍔</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-slate-700">Groceries & Food</span>
                    <span className="font-bold text-slate-900">{city.currency}{city.food}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>

              {/* Transport */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl">🚌</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-slate-700">Transport</span>
                    <span className="font-bold text-slate-900">{city.currency}{city.transport}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>

              {/* Earnings Info Box */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mt-8 flex gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-bold text-emerald-800">Part-Time Jobs</h4>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    Students in {selectedCity.split(',')[1]} are allowed to work 20 hours/week. 
                    You can earn approx <span className="font-bold underline">{city.currency}{potentialEarning}</span> to cover your living costs!
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}