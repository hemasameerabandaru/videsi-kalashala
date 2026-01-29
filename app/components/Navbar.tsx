"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* 👇 LOGO SECTION - UPDATED FONT */}
        <Link href="/" className="flex items-center gap-2">
          {/* Added 'font-brand' class here to make it cursive */}
          <span className="text-3xl font-brand font-bold text-indigo-600">
            Videsi Kalashala
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#universities">Universities</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
        </div>

        {/* ACTION BUTTONS */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/sign-in" className="text-slate-600 font-bold hover:text-indigo-600 transition">
            Login
          </Link>
          <Link href="/sign-up" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200">
            Get Started
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden text-slate-900 text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl">
           <NavLink href="#features">Features</NavLink>
           <NavLink href="#universities">Universities</NavLink>
           <NavLink href="#pricing">Pricing</NavLink>
           <hr className="border-slate-100" />
           <Link href="/sign-in" className="text-center text-slate-600 font-bold py-2">Login</Link>
           <Link href="/sign-up" className="text-center bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold">Get Started</Link>
        </div>
      )}
    </nav>
  );
}

// Helper Component for Links
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-slate-500 font-medium hover:text-indigo-600 transition">
      {children}
    </Link>
  );
} 