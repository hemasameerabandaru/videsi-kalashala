"use client";
import React, { useState } from 'react';

export default function ManageUniversities() {
  const [showModal, setShowModal] = useState(false);
  const [newUni, setNewUni] = useState({ name: "", country: "", fees: "" });

  // Mock Data
  const [universities, setUniversities] = useState([
    { id: 1, name: "Harvard University", country: "USA", fees: "$55,000", image: "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { id: 2, name: "University of Oxford", country: "UK", fees: "£32,000", image: "https://images.pexels.com/photos/1130683/pexels-photo-1130683.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { id: 3, name: "Stanford University", country: "USA", fees: "$60,000", image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { id: 4, name: "Technical Uni. Munich", country: "Germany", fees: "€0 (Public)", image: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=200" },
  ]);

  const handleDelete = (id: number) => {
    if(confirm("Are you sure you want to remove this university?")) {
      setUniversities(universities.filter(u => u.id !== id));
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const id = universities.length + 1;
    const image = "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=200"; 
    setUniversities([...universities, { id, ...newUni, image }]);
    setShowModal(false);
    setNewUni({ name: "", country: "", fees: "" });
  };

  return (
    <main className="p-8 bg-slate-100 min-h-screen relative">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manage Universities 🏛️</h1>
          <p className="text-slate-500 mt-1">Add, edit, or remove universities from the catalog.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-900 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-indigo-800 shadow-md transition"
        >
          + Add University
        </button>
      </header>

      {/* UNIVERSITIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((uni) => (
          <div key={uni.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="h-32 overflow-hidden relative">
              <img src={uni.image} alt={uni.name} className="w-full h-full object-cover"/>
              <div className="absolute top-2 right-2 flex gap-2">
                 <button className="bg-white/90 p-1.5 rounded-lg text-slate-700 hover:text-indigo-600 shadow-sm text-xs font-bold">✏️ Edit</button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-800 text-lg leading-tight">{uni.name}</h3>
              </div>
              <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                <span>📍 {uni.country}</span>
                <span className="font-bold text-slate-700">{uni.fees}</span>
              </div>
              
              <button 
                onClick={() => handleDelete(uni.id)}
                className="w-full border border-red-100 text-red-500 bg-red-50 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition"
              >
                Remove University
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD UNIVERSITY MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl animate-fade-in-up">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Add New University</h2>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">University Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Yale University"
                  value={newUni.name}
                  onChange={e => setNewUni({...newUni, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Country</label>
                <select 
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  value={newUni.country}
                  onChange={e => setNewUni({...newUni, country: e.target.value})}
                >
                  <option value="">Select Country</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tuition Fees</label>
                <input 
                  required
                  type="text" 
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. $45,000"
                  value={newUni.fees}
                  onChange={e => setNewUni({...newUni, fees: e.target.value})}
                />
              </div>

              <div className="flex gap-3 mt-8 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg"
                >
                  Add University
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}