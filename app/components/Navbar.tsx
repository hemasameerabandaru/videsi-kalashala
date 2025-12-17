"use client";
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
      {/* Logo - Clicks back to Home */}
      <div className="text-2xl font-extrabold text-indigo-600 tracking-tight cursor-pointer">
        <Link href="/">Videsi Kalashala</Link>
      </div>
      
      {/* Menu Links */}
      <div className="hidden md:flex space-x-8 items-center font-medium text-slate-600">
        <a href="#" className="hover:text-indigo-600 transition">Universities</a>
        <a href="#" className="hover:text-indigo-600 transition">Consultants</a>
        <a href="#" className="hover:text-indigo-600 transition">Success Stories</a>
        
        {/* THIS IS THE NEW PART: The Login Link */}
        <Link href="/login">
          <button className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-6 py-2.5 rounded-full font-semibold transition">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}