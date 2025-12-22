"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function DocumentVault() {
  // Mock Data for Documents
  const [docs, setDocs] = useState([
    { id: 1, name: "Passport (Front & Back)", status: "Uploaded", date: "Dec 10, 2024", icon: "🛂" },
    { id: 2, name: "CV / Resume", status: "Uploaded", date: "Dec 12, 2024", icon: "📄" },
    { id: 3, name: "Statement of Purpose (SOP)", status: "Pending", date: "-", icon: "✍️" },
    { id: 4, name: "Letter of Recommendation 1", status: "Pending", date: "-", icon: "🤝" },
    { id: 5, name: "Letter of Recommendation 2", status: "Pending", date: "-", icon: "🤝" },
    { id: 6, name: "Academic Transcripts", status: "Pending", date: "-", icon: "🎓" },
  ]);

  const handleUpload = (id: number) => {
    // Simulate upload
    const updatedDocs = docs.map(d => 
      d.id === id ? { ...d, status: "Uploaded", date: "Just now" } : d
    );
    setDocs(updatedDocs);
    alert("File uploaded successfully! (Simulated)");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             <span>←</span> Back to Dashboard
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Document Vault 🗂️</h1>
            <p className="text-slate-500">Manage your application documents in one secure place.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 shadow-sm">
            Progress: {docs.filter(d => d.status === "Uploaded").length} / {docs.length} Ready
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: UPLOAD LIST */}
          <div className="lg:col-span-2 space-y-4">
            {docs.map((doc) => (
              <div key={doc.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-indigo-300 transition">
                
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    doc.status === "Uploaded" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                  }`}>
                    {doc.status === "Uploaded" ? "✅" : doc.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{doc.name}</h3>
                    <p className={`text-xs font-bold ${
                       doc.status === "Uploaded" ? "text-emerald-600" : "text-orange-500"
                    }`}>
                      {doc.status} • {doc.date}
                    </p>
                  </div>
                </div>

                {doc.status === "Pending" ? (
                  <button 
                    onClick={() => handleUpload(doc.id)}
                    className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-600 hover:text-white transition"
                  >
                    Upload ⬆️
                  </button>
                ) : (
                  <button className="text-slate-400 px-4 py-2 text-sm font-bold hover:text-red-500 transition">
                    Delete 🗑️
                  </button>
                )}

              </div>
            ))}
          </div>

          {/* RIGHT: RESOURCES & TEMPLATES */}
          <div className="space-y-6">
            
            {/* Quick Tips Box */}
            <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-lg mb-2">💡 Quick Tips</h3>
              <ul className="text-sm text-indigo-200 space-y-2 list-disc pl-4">
                <li>Always upload PDFs, not Word docs.</li>
                <li>Ensure scans are clear and readable.</li>
                <li>Name files clearly: <i>Name_SOP.pdf</i></li>
              </ul>
            </div>

            {/* Downloads Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">Need Help? Download Templates</h3>
              <div className="space-y-3">
                
                <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-300 transition text-left group">
                  <span className="bg-red-100 text-red-600 p-2 rounded-lg text-xl">📝</span>
                  <div>
                    <p className="font-bold text-slate-700 text-sm group-hover:text-indigo-600">Sample SOP (Computer Science)</p>
                    <p className="text-xs text-slate-400">PDF • 2.4 MB</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-300 transition text-left group">
                  <span className="bg-blue-100 text-blue-600 p-2 rounded-lg text-xl">📄</span>
                  <div>
                    <p className="font-bold text-slate-700 text-sm group-hover:text-indigo-600">Professional Resume Template</p>
                    <p className="text-xs text-slate-400">DOCX • 1.1 MB</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-300 transition text-left group">
                  <span className="bg-yellow-100 text-yellow-600 p-2 rounded-lg text-xl">✉️</span>
                  <div>
                    <p className="font-bold text-slate-700 text-sm group-hover:text-indigo-600">LOR Email Draft for Professors</p>
                    <p className="text-xs text-slate-400">TXT • 15 KB</p>
                  </div>
                </button>

              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}