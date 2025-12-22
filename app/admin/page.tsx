"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  // Fake Database of Students
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", target: "USA 🇺🇸", status: "Active", applications: 4 },
    { id: 2, name: "Sarah Smith", email: "sarah@test.com", target: "UK 🇬🇧", status: "New Lead", applications: 1 },
    { id: 3, name: "Rahul Verma", email: "rahul@demo.com", target: "Canada 🇨🇦", status: "Visa Approved", applications: 3 },
  ]);

  const handleStatusChange = (id: number) => {
    alert(`Status updated for student #${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      
      {/* ADMIN SIDEBAR (Dark Theme) */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight text-indigo-400">Videsi Admin 🛡️</h2>
          <p className="text-xs text-slate-400 mt-1">Counselor Portal</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-indigo-600 rounded-xl font-medium cursor-pointer">
            <span>👥</span> All Students
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl font-medium cursor-pointer transition">
            <span>📝</span> Applications
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl font-medium cursor-pointer transition">
            <span>💰</span> Payments
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-3 text-slate-400 hover:text-white transition">
            <span>⬅️</span> Back to Home
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Student Management</h1>
            <p className="text-slate-500">Overview of all registered students and their progress.</p>
          </div>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-emerald-700 transition">
            + Add New Student
          </button>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-xs font-bold uppercase">Total Students</p>
            <p className="text-2xl font-bold text-slate-800">1,240</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-xs font-bold uppercase">Active Applications</p>
            <p className="text-2xl font-bold text-indigo-600">856</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-xs font-bold uppercase">Visas Approved</p>
            <p className="text-2xl font-bold text-emerald-600">124</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-xs font-bold uppercase">Pending Review</p>
            <p className="text-2xl font-bold text-orange-500">42</p>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                <th className="p-4">Student Name</th>
                <th className="p-4">Target Country</th>
                <th className="p-4">Status</th>
                <th className="p-4">Apps</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{student.name}</div>
                    <div className="text-xs text-slate-400">{student.email}</div>
                  </td>
                  <td className="p-4 text-slate-600">{student.target}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      student.status === 'Active' ? 'bg-indigo-100 text-indigo-700' :
                      student.status === 'Visa Approved' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 font-bold">{student.applications}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleStatusChange(student.id)}
                      className="text-indigo-600 hover:text-indigo-800 font-bold text-sm"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}