"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StudentProfile() {
  // Logic Toggles
  const [highSchoolType, setHighSchoolType] = useState<"12th" | "Diploma">("12th");
  const [hasMasters, setHasMasters] = useState(false);
  const [isEditing, setIsEditing] = useState(true); // Start in edit mode

  // Form Data
  const [formData, setFormData] = useState({
    firstName: "Student", lastName: "Name", email: "student@example.com", phone: "",
    // 10th
    tenthYear: "", tenthScore: "", tenthBoard: "", tenthBacklogs: "0",
    // 12th (Added 'twelfthStream')
    twelfthYear: "", twelfthScore: "", twelfthBoard: "", twelfthStream: "", twelfthBacklogs: "0",
    // Diploma
    diplomaYear: "", diplomaScore: "", diplomaStream: "", diplomaBacklogs: "0",
    // Bachelors
    bachelorsYear: "", bachelorsScore: "", bachelorsStream: "", bachelorsBacklogs: "0",
    // Masters
    mastersYear: "", mastersScore: "", mastersStream: "", mastersBacklogs: "0",
    // Tests
    englishTest: "Yet to give", englishReading: "", englishWriting: "", englishListening: "", englishSpeaking: "",
    greStatus: "Yet to give", greScore: "",
    workExp: "No",
    // Preferences
    prefCountry: "", prefCourse: "", budget: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to DB here
    alert("Profile Updated Successfully! 💾");
    if(typeof window !== 'undefined') {
        localStorage.setItem("studentName", formData.firstName);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             <span>←</span> Back to Dashboard
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">My Profile 👤</h1>
            <p className="text-slate-500 mt-1">Keep this updated to get the best university recommendations.</p>
          </div>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`px-6 py-3 rounded-xl font-bold transition shadow-md ${
                isEditing ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white text-indigo-600 border border-indigo-100"
            }`}
          >
            {isEditing ? "Save Changes 💾" : "Edit Profile ✏️"}
          </button>
        </header>

        <div className={`max-w-4xl mx-auto space-y-8 ${isEditing ? "" : "opacity-80 pointer-events-none grayscale-[0.5]"}`}>

          {/* 1. Personal Info */}
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-indigo-900 text-sm uppercase tracking-wide mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">1</span>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">First Name</label>
                 <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-3 border rounded-xl font-medium" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Last Name</label>
                 <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-3 border rounded-xl font-medium" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                 <input name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 border rounded-xl font-medium" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
                 <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 border rounded-xl font-medium" />
              </div>
            </div>
          </section>

          {/* 2. Academic History */}
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-indigo-900 text-sm uppercase tracking-wide mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">2</span>
              Academic History
            </h3>

            {/* 10th */}
            <div className="mb-8 border-b border-slate-100 pb-8">
              <h4 className="font-bold text-slate-700 mb-4">10th Grade</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input name="tenthYear" placeholder="Year" onChange={handleInputChange} className="p-3 border rounded-xl" />
                <input name="tenthScore" placeholder="Score (%)" onChange={handleInputChange} className="p-3 border rounded-xl" />
                <input name="tenthBoard" placeholder="Board" onChange={handleInputChange} className="p-3 border rounded-xl" />
                <input name="tenthBacklogs" placeholder="Backlogs" onChange={handleInputChange} className="p-3 border rounded-xl" />
              </div>
            </div>

            {/* 12th / Diploma Toggle */}
            <div className="mb-8 border-b border-slate-100 pb-8">
              <div className="flex gap-4 mb-4">
                <button onClick={() => setHighSchoolType("12th")} className={`px-4 py-2 rounded-lg text-sm font-bold border transition ${highSchoolType === "12th" ? "bg-slate-800 text-white" : "bg-white text-slate-600"}`}>12th Grade</button>
                <button onClick={() => setHighSchoolType("Diploma")} className={`px-4 py-2 rounded-lg text-sm font-bold border transition ${highSchoolType === "Diploma" ? "bg-slate-800 text-white" : "bg-white text-slate-600"}`}>Diploma</button>
              </div>

              {highSchoolType === "12th" ? (
                // 🟢 12th Grade Logic (Now with Stream)
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 animate-fade-in-up">
                  <input name="twelfthYear" placeholder="12th Year" onChange={handleInputChange} className="p-3 border rounded-xl" />
                  <input name="twelfthScore" placeholder="Score (%)" onChange={handleInputChange} className="p-3 border rounded-xl" />
                  <input name="twelfthBoard" placeholder="Board" onChange={handleInputChange} className="p-3 border rounded-xl" />
                  {/* New Stream Input */}
                  <input name="twelfthStream" placeholder="Stream (e.g. MPC)" onChange={handleInputChange} className="p-3 border rounded-xl bg-slate-50 border-slate-200" />
                  <input name="twelfthBacklogs" placeholder="Backlogs" onChange={handleInputChange} className="p-3 border rounded-xl" />
                </div>
              ) : (
                // Diploma Logic
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in-up">
                  <input name="diplomaYear" placeholder="Diploma Year" onChange={handleInputChange} className="p-3 border rounded-xl bg-yellow-50" />
                  <input name="diplomaScore" placeholder="Score (%)" onChange={handleInputChange} className="p-3 border rounded-xl bg-yellow-50" />
                  <input name="diplomaStream" placeholder="Stream" onChange={handleInputChange} className="p-3 border rounded-xl bg-yellow-50" />
                  <input name="diplomaBacklogs" placeholder="Backlogs" onChange={handleInputChange} className="p-3 border rounded-xl bg-yellow-50" />
                </div>
              )}
            </div>

            {/* Bachelors */}
            <div className="mb-4">
               <h4 className="font-bold text-slate-700 mb-4">Bachelor's Degree</h4>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input name="bachelorsYear" placeholder="Year" onChange={handleInputChange} className="p-3 border rounded-xl" />
                  <input name="bachelorsScore" placeholder="CGPA / %" onChange={handleInputChange} className="p-3 border rounded-xl" />
                  <input name="bachelorsStream" placeholder="Stream" onChange={handleInputChange} className="p-3 border rounded-xl" />
                  <input name="bachelorsBacklogs" placeholder="Backlogs" onChange={handleInputChange} className="p-3 border rounded-xl" />
               </div>
            </div>

            {/* Masters Toggle */}
            <div className="mt-6 pt-4 border-t border-slate-100">
               <label className="flex items-center gap-2 cursor-pointer mb-4">
                 <input type="checkbox" checked={hasMasters} onChange={(e) => setHasMasters(e.target.checked)} className="w-5 h-5 rounded text-indigo-600" />
                 <span className="font-bold text-slate-700">I have completed a Master's degree</span>
               </label>

               {hasMasters && (
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in-up bg-indigo-50 p-4 rounded-xl">
                    <input name="mastersYear" placeholder="Masters Year" onChange={handleInputChange} className="p-3 border rounded-xl bg-white" />
                    <input name="mastersScore" placeholder="Score" onChange={handleInputChange} className="p-3 border rounded-xl bg-white" />
                    <input name="mastersStream" placeholder="Specialization" onChange={handleInputChange} className="p-3 border rounded-xl bg-white" />
                    <input name="mastersBacklogs" placeholder="Backlogs" onChange={handleInputChange} className="p-3 border rounded-xl bg-white" />
                 </div>
               )}
            </div>
          </section>

          {/* 3. Test Scores */}
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-indigo-900 text-sm uppercase tracking-wide mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">3</span>
              Test Scores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">English Proficiency</label>
                 <select name="englishTest" onChange={handleInputChange} className="w-full p-3 border rounded-xl mb-3 bg-white">
                    <option value="Yet to give">Yet to give</option>
                    <option value="IELTS">IELTS</option>
                    <option value="TOEFL">TOEFL</option>
                    <option value="Duolingo">Duolingo</option>
                 </select>
                 {formData.englishTest !== 'Yet to give' && (
                    <div className="grid grid-cols-4 gap-2 animate-fade-in-up">
                      <input name="englishReading" placeholder="R" className="p-3 border rounded-xl text-center" />
                      <input name="englishWriting" placeholder="W" className="p-3 border rounded-xl text-center" />
                      <input name="englishListening" placeholder="L" className="p-3 border rounded-xl text-center" />
                      <input name="englishSpeaking" placeholder="S" className="p-3 border rounded-xl text-center" />
                    </div>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">GRE Status</label>
                 <div className="flex gap-3">
                    <select name="greStatus" onChange={handleInputChange} className="w-1/2 p-3 border rounded-xl bg-white">
                      <option value="Yet to give">Yet to give</option>
                      <option value="Given">Given</option>
                    </select>
                    {formData.greStatus === 'Given' && (
                      <input name="greScore" placeholder="Score (e.g. 320)" onChange={handleInputChange} className="w-1/2 p-3 border rounded-xl" />
                    )}
                 </div>
               </div>

            </div>
          </section>

        </div>

      </main>
    </div>
  );
}