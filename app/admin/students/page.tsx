"use client";
import React, { useState } from 'react';

export default function ManageStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Modal & Logic State
  const [showModal, setShowModal] = useState(false);
  const [highSchoolType, setHighSchoolType] = useState<"12th" | "Diploma">("12th");
  const [hasMasters, setHasMasters] = useState(false);
  
  // Form Data State
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
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
    // Tests & Prefs
    englishTest: "Yet to give", 
    englishReading: "", englishWriting: "", englishListening: "", englishSpeaking: "",
    greStatus: "Yet to give", greScore: "",
    workExp: "No",
    prefCountry: "", prefCourse: "", budget: ""
  });

  // Mock Data
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", country: "USA", status: "Active", joined: "Dec 20, 2025", apps: 4 },
    { id: 2, name: "Sarah Smith", email: "sarah@test.com", country: "UK", status: "New Lead", joined: "Dec 19, 2025", apps: 1 },
    { id: 3, name: "Rahul Verma", email: "rahul@demo.com", country: "Canada", status: "Visa Approved", joined: "Dec 18, 2025", apps: 3 },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent = {
      id: students.length + 1,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      country: formData.prefCountry,
      status: "New Lead",
      joined: new Date().toLocaleDateString(),
      apps: 0
    };
    setStudents([newStudent, ...students]);
    setShowModal(false);
    alert("Details Saved! We will share the shortlist soon. 📋");
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="p-8 bg-slate-100 min-h-screen relative">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Student Management</h1>
          <p className="text-slate-500 mt-1">Overview of all registered students and their profiles.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#00A86B] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-[#008f5b] transition"
        >
          + Add New Student
        </button>
      </header>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Students</p>
          <p className="text-3xl font-extrabold text-slate-800 mt-2">{students.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Applications</p>
          <p className="text-3xl font-extrabold text-indigo-600 mt-2">856</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Visas Approved</p>
          <p className="text-3xl font-extrabold text-[#00A86B] mt-2">124</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending Review</p>
          <p className="text-3xl font-extrabold text-orange-500 mt-2">42</p>
        </div>
      </div>

      {/* STUDENTS TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-5 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-3">Student Name</div>
          <div className="col-span-2">Target Country</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-2 text-center">Apps</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredStudents.map((student) => (
            <div key={student.id} className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-slate-50 transition">
              <div className="col-span-3">
                <p className="font-bold text-slate-800 text-lg">{student.name}</p>
                <p className="text-slate-400 text-sm">{student.email}</p>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                 <span className="font-medium text-slate-600 text-lg">{student.country}</span>
                 <span className="text-slate-400 text-xs uppercase">{student.country ? student.country.substring(0,2) : '--'}</span>
              </div>
              <div className="col-span-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  student.status === 'Visa Approved' ? 'bg-emerald-100 text-emerald-700' :
                  student.status === 'Active' ? 'bg-indigo-100 text-indigo-700' :
                  student.status === 'New Lead' ? 'bg-slate-100 text-slate-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {student.status}
                </span>
              </div>
              <div className="col-span-2 text-center font-bold text-slate-700 text-lg">
                {student.apps}
              </div>
              <div className="col-span-2 text-right">
                <button className="text-indigo-600 font-bold hover:text-indigo-800 transition">Manage</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- ADD STUDENT MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl p-8 shadow-2xl animate-fade-in-up my-10">
            
            <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Add New Student Profile 🎓</h2>
                <p className="text-slate-500 text-sm">Please follow the sequence to build the profile.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* 1. Personal Info */}
              <div>
                <h3 className="font-bold text-indigo-900 text-sm uppercase tracking-wide mb-4">1. Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required name="firstName" placeholder="First Name" onChange={handleInputChange} className="p-3 border rounded-lg" />
                  <input required name="lastName" placeholder="Last Name" onChange={handleInputChange} className="p-3 border rounded-lg" />
                  <input required name="email" type="email" placeholder="Email Address" onChange={handleInputChange} className="p-3 border rounded-lg" />
                  <input required name="phone" placeholder="Phone Number" onChange={handleInputChange} className="p-3 border rounded-lg" />
                </div>
              </div>

              {/* 2. Academic History - SEQUENTIAL LOGIC */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-indigo-900 text-sm uppercase tracking-wide mb-4">2. Academic History</h3>
                
                {/* 10th (Always Visible) */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-slate-500 uppercase">10th Grade</label>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-1">
                    <input name="tenthYear" placeholder="Year of Passing" onChange={handleInputChange} className="p-2 border rounded" />
                    <input name="tenthScore" placeholder="Percentage / CGPA" onChange={handleInputChange} className="p-2 border rounded" />
                    <input name="tenthBoard" placeholder="Board (e.g. CBSE)" onChange={handleInputChange} className="p-2 border rounded" />
                    <input name="tenthBacklogs" placeholder="Backlogs (if any)" onChange={handleInputChange} className="p-2 border rounded" />
                  </div>
                </div>

                {/* LOGIC: 12th vs Diploma */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Did you complete 12th or Diploma?</label>
                  <div className="flex gap-4 mb-3">
                    <button 
                      type="button" 
                      onClick={() => setHighSchoolType("12th")}
                      className={`px-4 py-2 rounded-lg text-sm font-bold border transition ${highSchoolType === "12th" ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600"}`}
                    >
                      12th Grade
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setHighSchoolType("Diploma")}
                      className={`px-4 py-2 rounded-lg text-sm font-bold border transition ${highSchoolType === "Diploma" ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600"}`}
                    >
                      Diploma
                    </button>
                  </div>

                  {highSchoolType === "12th" ? (
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 animate-fade-in-up">
                      <input name="twelfthYear" placeholder="12th Year" onChange={handleInputChange} className="p-2 border rounded" />
                      <input name="twelfthScore" placeholder="12th Score" onChange={handleInputChange} className="p-2 border rounded" />
                      <input name="twelfthBoard" placeholder="Board" onChange={handleInputChange} className="p-2 border rounded" />
                      {/* 🟢 NEW STREAM INPUT */}
                      <input name="twelfthStream" placeholder="Stream (e.g. MPC)" onChange={handleInputChange} className="p-2 border rounded bg-slate-50 border-slate-200" />
                      <input name="twelfthBacklogs" placeholder="Backlogs" onChange={handleInputChange} className="p-2 border rounded" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 animate-fade-in-up">
                      <input name="diplomaYear" placeholder="Diploma Year of Passing" onChange={handleInputChange} className="p-2 border rounded bg-yellow-50/50 border-yellow-200" />
                      <input name="diplomaScore" placeholder="Diploma Percentage" onChange={handleInputChange} className="p-2 border rounded bg-yellow-50/50 border-yellow-200" />
                      <input name="diplomaStream" placeholder="Stream (e.g. Civil)" onChange={handleInputChange} className="p-2 border rounded bg-yellow-50/50 border-yellow-200" />
                      <input name="diplomaBacklogs" placeholder="Diploma Backlogs" onChange={handleInputChange} className="p-2 border rounded bg-yellow-50/50 border-yellow-200" />
                    </div>
                  )}
                </div>

                {/* Bachelors (Always Visible after 12th/Diploma) */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-slate-500 uppercase">Bachelor's Degree</label>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-1">
                    <input name="bachelorsYear" placeholder="Year of Passing" onChange={handleInputChange} className="p-2 border rounded" />
                    <input name="bachelorsScore" placeholder="CGPA / Percentage" onChange={handleInputChange} className="p-2 border rounded" />
                    <input name="bachelorsStream" placeholder="Stream (e.g. Mech, CSE)" onChange={handleInputChange} className="p-2 border rounded" />
                    <input name="bachelorsBacklogs" placeholder="Total Backlogs" onChange={handleInputChange} className="p-2 border rounded" />
                  </div>
                </div>

                {/* LOGIC: Masters Toggle */}
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <p className="text-sm font-bold text-slate-700 mb-2">Have you completed a Master's degree?</p>
                  <div className="flex gap-4 mb-3">
                    <button 
                      type="button" 
                      onClick={() => setHasMasters(true)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold border transition ${hasMasters ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600"}`}
                    >
                      Yes
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setHasMasters(false)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold border transition ${!hasMasters ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600"}`}
                    >
                      No
                    </button>
                  </div>

                  {hasMasters && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3 animate-fade-in-up">
                      <input name="mastersYear" placeholder="Masters Year" onChange={handleInputChange} className="p-2 border rounded border-indigo-200 bg-indigo-50/50" />
                      <input name="mastersScore" placeholder="CGPA / Percentage" onChange={handleInputChange} className="p-2 border rounded border-indigo-200 bg-indigo-50/50" />
                      <input name="mastersStream" placeholder="Specialization (e.g. MBA)" onChange={handleInputChange} className="p-2 border rounded border-indigo-200 bg-indigo-50/50" />
                      <input name="mastersBacklogs" placeholder="Backlogs" onChange={handleInputChange} className="p-2 border rounded border-indigo-200 bg-indigo-50/50" />
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Test Scores & Preferences (Needed for Shortlisting) */}
              <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h3 className="font-bold text-indigo-900 text-sm uppercase tracking-wide mb-4">3. Test Scores & Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* English Test */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">English Proficiency</label>
                    <select name="englishTest" onChange={handleInputChange} className="w-full p-2 border rounded mb-2 bg-white">
                      <option value="Yet to give">Yet to give</option>
                      <option value="IELTS">IELTS</option>
                      <option value="TOEFL">TOEFL</option>
                      <option value="Duolingo">Duolingo</option>
                    </select>
                    {formData.englishTest !== 'Yet to give' && (
                       <div className="grid grid-cols-4 gap-2 animate-fade-in-up">
                         <input name="englishReading" placeholder="R" className="p-2 border rounded text-center" />
                         <input name="englishWriting" placeholder="W" className="p-2 border rounded text-center" />
                         <input name="englishListening" placeholder="L" className="p-2 border rounded text-center" />
                         <input name="englishSpeaking" placeholder="S" className="p-2 border rounded text-center" />
                       </div>
                    )}
                  </div>

                  {/* Preferences */}
                  <div className="space-y-2">
                    <input name="prefCountry" placeholder="Preferred Country" onChange={handleInputChange} className="w-full p-2 border rounded" />
                    <input name="prefCourse" placeholder="Preferred Course" onChange={handleInputChange} className="w-full p-2 border rounded" />
                    <input name="budget" placeholder="Budget (e.g. 25L)" onChange={handleInputChange} className="w-full p-2 border rounded" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg transition">Save Details & Share Shortlist 📋</button>
              </div>

            </form>
          </div>
        </div>
      )}

    </main>
  );
}