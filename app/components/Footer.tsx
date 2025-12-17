"use client";
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Column 1: Brand */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Videsi Kalashala</h3>
          <p className="opacity-70">
            The world's first real-time overseas education consultancy. 
          </p>
          <div className="flex space-x-4 pt-2">
            {/* Social Icons (Text for now) */}
            <span className="cursor-pointer hover:text-white">Instagram</span>
            <span className="cursor-pointer hover:text-white">LinkedIn</span>
            <span className="cursor-pointer hover:text-white">Twitter</span>
          </div>
        </div>

        {/* Column 2: Links */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-indigo-400">Universities</a></li>
            <li><a href="#" className="hover:text-indigo-400">Consultants</a></li>
            <li><a href="#" className="hover:text-indigo-400">Scholarships</a></li>
          </ul>
        </div>

        {/* Column 3: Legal */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
            <li><a href="#" className="hover:text-indigo-400">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Contact</h4>
          <ul className="space-y-2">
            <li>support@videsikalashala.com</li>
            <li>+91 98765 43210</li>
            <li>Hyderabad, India</li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-800 mt-12 pt-8 text-center opacity-50">
        © 2025 Videsi Kalashala. All rights reserved.
      </div>
    </footer>
  );
}