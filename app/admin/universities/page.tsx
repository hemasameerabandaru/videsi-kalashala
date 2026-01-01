"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminUniversities() {
  
  const [unis, setUnis] = useState([
    { id: 1, name: "Arizona State University", country: "USA", rank: "#156", fees: "$35,000", logo: "🅰️" },
    { id: 2, name: "University of East London", country: "UK", rank: "#800", fees: "£14,500", logo: "🦁" },
    { id: 3, name: "TU Munich", country: "Germany", rank: "#50", fees: "€0", logo: "🥨" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUni, setNewUni] = useState({ name: "", country: "", rank: "", fees: "" });

  const handleAddUni = (e: React.FormEvent) => {
    e.preventDefault();
    setUnis([...unis, { id: Date.now(), ...newUni, logo: "🏛️" }]);
    setIsModalOpen(false);
    setNewUni({ name: "", country: "", rank: "", fees: "" });
  };

  const handleDelete = (id: number) => {
    if (confirm("Remove university?")) setUnis(unis.filter(u => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-full">
        <div className="p-6 text-xl font-bold">🛡️ Admin Panel</div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin/dashboard" className="block px-4 py-3 text-slate-400 hover:text-white rounded-xl font-medium">📊 Dashboard</Link>
          <Link href="/admin/bookings" className="block px-4 py-3 text-slate-400 hover:text-white rounded-xl font-medium">📅 Bookings</Link>
          <Link href="/admin/universities" className="block px-4 py-3 bg-indigo-600 text-white rounded-xl font-bold">🏛️ Universities</Link>
          <Link href="/admin/students" className="block px-4 py-3 text-slate-400 hover:text-white rounded-xl font-medium">🎓 Students</Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">University Manager 🏛️</h1>
          <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700">+ Add University</button>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Fees</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {unis.map((uni) => (
                <tr key={uni.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-800">{uni.name}</td>
                  <td className="px-6 py-4 text-sm font-medium">{uni.country}</td>
                  <td className="px-6 py-4 text-sm font-bold text-indigo-600">{uni.rank}</td>
                  <td className="px-6 py-4 text-sm font-medium">{uni.fees}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(uni.id)} className="text-red-400 hover:text-red-600 font-bold text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between">
                <h3 className="font-bold">Add University</h3>
                <button onClick={() => setIsModalOpen(false)}>×</button>
              </div>
              <form onSubmit={handleAddUni} className="p-6 space-y-4">
                <input type="text" placeholder="Name" required className="w-full p-3 border rounded-xl" value={newUni.name} onChange={e => setNewUni({...newUni, name: e.target.value})} />
                <input type="text" placeholder="Country" required className="w-full p-3 border rounded-xl" value={newUni.country} onChange={e => setNewUni({...newUni, country: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Rank" required className="w-full p-3 border rounded-xl" value={newUni.rank} onChange={e => setNewUni({...newUni, rank: e.target.value})} />
                  <input type="text" placeholder="Fees" required className="w-full p-3 border rounded-xl" value={newUni.fees} onChange={e => setNewUni({...newUni, fees: e.target.value})} />
                </div>
                <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">Save</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}