"use client";
import React from 'react';

export default function AdminDashboard() {
  return (
    <main className="p-8 bg-slate-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here is what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Revenue</p>
          <p className="text-3xl font-extrabold text-slate-800 mt-2">₹12.5L</p>
          <p className="text-emerald-500 text-xs font-bold mt-2">↑ 8% vs last month</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Students</p>
          <p className="text-3xl font-extrabold text-indigo-600 mt-2">1,240</p>
        </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending Tasks</p>
          <p className="text-3xl font-extrabold text-orange-500 mt-2">14</p>
        </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Visa Success</p>
          <p className="text-3xl font-extrabold text-[#00A86B] mt-2">98.2%</p>
        </div>
      </div>
    </main>
  );
}