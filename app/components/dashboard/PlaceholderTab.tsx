"use client";
import React from "react";

export default function PlaceholderTab({ title, icon }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 animate-fade-in">
      <div className="w-24 h-24 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm border border-indigo-100">
        {icon}
      </div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-3">{title}</h2>
      <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium text-lg leading-relaxed">
        This premium feature is part of the <span className="text-indigo-600 font-bold">Phase 2 Roadmap</span>. 
        <br/>Our AI engineers are building this right now! 🚀
      </p>
      <button 
        onClick={() => alert("Thanks for your interest! You've been added to the waitlist.")}
        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg active:scale-95"
      >
        🔔 Notify Me When Ready
      </button>
    </div>
  );
}