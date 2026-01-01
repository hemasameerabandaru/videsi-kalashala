"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminStudents() {
  
  // Mock Student Database
  const students = [
    { id: 1, name: "Rohan Das", email: "rohan@gmail.com", country: "USA 🇺🇸", intake: "Fall 2026", status: "Application Stage", avatar: "👨‍🎓" },
    { id: 2, name: "Priya Sharma", email: "priya.s@outlook.com", country: "UK 🇬🇧", intake: "Fall 2026", status: "Visa Process", avatar: "👩‍🎓" },
    { id: 3, name: "Amit Kumar", email: "amit.k@gmail.com", country: "Germany 🇩🇪", intake: "Summer 2026", status: "New Lead", avatar: "🧑‍💻" },
    { id: 4, name: "Sneha Reddy", email: "sneha.r@yahoo.com", country: "USA 🇺🇸", intake: "Fall 2027", status: "Shortlisting", avatar: "👩‍🏫" },
    { id: 5, name: "Vikram Singh", email: "vikram@gmail.com", country: "Canada 🇨🇦", intake: "Fall 2026", status: "Departure", avatar: "👲" },
  ];

  const [search, setSearch] = useState("");

  // Filter Logic
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      
      {/* ADMIN SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <div className="text-xl font-bold flex items-center gap-2">
            <span>🛡️</span> Admin Panel
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition">
             📊 Dashboard
          </Link>
          <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition">
             📅 Bookings
          </Link>
          <Link href="/admin/universities" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition">
             🏛️ Universities
          </Link>
          <Link href="/admin/students" className="flex items-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-xl font-bold transition">
             🎓 Students
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Student Manager 🎓</h1>
            <p className="text-slate-500 mt-1">View and manage all registered students.</p>
          </div>
          <div className="bg-white border border-slate-300 rounded-xl flex items-center px-4 py-2 w-64 shadow-sm">
             <span className="text-slate-400 mr-2">🔍</span>
             <input 
               type="text" 
               placeholder="Search students..." 
               className="bg-transparent outline-none text-sm font-bold text-slate-700 w-full"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
          </div>
        </header>

        {/* STUDENT LIST TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Target Country</th>
                <th className="px-6 py-4">Intake</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition group">
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">{s.avatar}</div>
                      <div>
                        <p className="font-bold text-slate-800">{s.name}</p>
                        <p className="text-xs text-slate-400 font-bold">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{s.country}</td>
                  
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{s.intake}</td>
                  
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border
                      ${s.status === 'Visa Process' ? 'bg-purple-100 text-purple-700 border-purple-200' : ''}
                      ${s.status === 'Application Stage' ? 'bg-blue-100 text-blue-700 border-blue-200' : ''}
                      ${s.status === 'New Lead' ? 'bg-slate-100 text-slate-600 border-slate-200' : ''}
                      ${s.status === 'Departure' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : ''}
                      ${s.status === 'Shortlisting' ? 'bg-orange-100 text-orange-700 border-orange-200' : ''}
                    `}>
                      {s.status}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    {/* Link to the Dynamic ID page we built earlier */}
                    <Link href={`/admin/students/${s.id}`} className="text-indigo-600 hover:text-indigo-800 font-bold text-sm bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition">
                      View Profile →
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
             <div className="p-10 text-center text-slate-400">
               No students found matching "{search}"
             </div>
          )}
        </div>

      </main>
    </div>
  );
}