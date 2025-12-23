"use client";
import React, { useState } from 'react';
import Link from 'next/link';

// 🟢 1. Define Types to fix TypeScript Errors
interface UploadedFile {
  name: string;
  date: string;
}

interface DocItem {
  id: string;
  name: string;
  subtitle?: string;
  files: UploadedFile[]; // Array to hold multiple files
  status: string;
  required: boolean;
}

interface DocGroup {
  title: string;
  docs: DocItem[];
}

export default function DocumentVault() {
  // 🟢 2. State with Correct Structure (Arrays for files)
  const [docGroups, setDocGroups] = useState<DocGroup[]>([
    {
      title: "1. Academic Transcripts 📚",
      docs: [
        { id: "10th", name: "10th Grade Marksheet", files: [], status: "Pending", required: true },
        { id: "12th", name: "12th Grade / Diploma", files: [], status: "Pending", required: true },
        { id: "sems", name: "All Semester Marksheets", files: [], status: "Pending", required: true, subtitle: "(Upload individual semesters if needed)" },
        { id: "pc", name: "Provisional Certificate (PC)", files: [], status: "Pending", required: true },
        { id: "cmm", name: "Consolidated Marks Memo (CMM)", files: [], status: "Pending", required: true },
        { id: "od", name: "Original Degree (OD)", files: [], status: "Pending", required: false },
        { id: "bonafide", name: "Bonafide Certificate", subtitle: "(If currently studying)", files: [], status: "Pending", required: false },
      ]
    },
    {
      title: "2. Standardized Tests 📝",
      docs: [
        { id: "eng", name: "English Proficiency Score", subtitle: "(IELTS / TOEFL / Duolingo)", files: [{ name: "Rohan_IELTS_v1.pdf", date: "Dec 20" }], status: "Uploaded", required: true },
        { id: "gre", name: "GRE Score Card", files: [], status: "Pending", required: false },
      ]
    },
    {
      title: "3. Application Documents 📄",
      docs: [
        { id: "sop", name: "Statement of Purpose (SOP)", files: [], status: "Pending", required: true },
        { id: "resume", name: "Updated Resume / CV", files: [], status: "Pending", required: true },
        { id: "lor1", name: "LOR 1", files: [], status: "Pending", required: true },
        { id: "lor2", name: "LOR 2", files: [], status: "Pending", required: true },
        { id: "lor3", name: "LOR 3", files: [], status: "Pending", required: false },
      ]
    },
    {
      title: "4. Identity & Experience 🆔",
      docs: [
        { id: "passport", name: "Passport (Front & Back)", files: [], status: "Pending", required: true },
        { id: "work", name: "Work Experience Documents", subtitle: "(Offer Letter, Payslips, Relieving Letter)", files: [], status: "Pending", required: false },
      ]
    }
  ]);

  // 🟢 3. Handle Adding a File
  const handleAddFile = (groupIdx: number, docIdx: number) => {
    const updatedGroups = [...docGroups];
    const doc = updatedGroups[groupIdx].docs[docIdx];
    
    // Simulate File Selection
    const fileName = window.prompt(`Enter file name for ${doc.name}:`, `My_${doc.id}_updated.pdf`);
    
    if (fileName) {
      const newFile = {
        name: fileName,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      };
      
      doc.files.push(newFile);
      doc.status = "Uploaded"; 
      setDocGroups(updatedGroups);
    }
  };

  // 🟢 4. Handle Removing a specific file
  const handleRemoveFile = (groupIdx: number, docIdx: number, fileIdx: number) => {
    if(window.confirm("Are you sure you want to delete this file?")) {
      const updatedGroups = [...docGroups];
      const doc = updatedGroups[groupIdx].docs[docIdx];
      
      // Remove file from array
      doc.files.splice(fileIdx, 1);
      
      // Reset status if no files left
      if (doc.files.length === 0) {
        doc.status = "Pending";
      }
      
      setDocGroups(updatedGroups);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             <span>←</span> Back to Dashboard
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Document Vault 🗂️</h1>
          <p className="text-slate-500 mt-1">Upload multiple documents or updated versions securely.</p>
        </header>

        {/* INSTRUCTION BANNER */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-8 flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
             <p className="text-yellow-800 font-bold text-sm">Naming Convention Required</p>
             <p className="text-yellow-700 text-xs mt-1">
               Please rename your files before uploading: <b>YourName_DocumentName.pdf</b> 
             </p>
          </div>
        </div>

        {/* DOCUMENT GROUPS */}
        <div className="space-y-8 pb-20">
          {docGroups.map((group, groupIdx) => (
            <section key={groupIdx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-700">{group.title}</h3>
                <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2 py-1 rounded">
                  {group.docs.filter(d => d.files.length > 0).length} / {group.docs.length} Active
                </span>
              </div>
              
              <div className="divide-y divide-slate-100">
                {group.docs.map((doc, docIdx) => (
                  <div key={doc.id} className="p-6 flex flex-col md:flex-row items-start justify-between gap-4 hover:bg-slate-50 transition">
                    
                    {/* Doc Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${
                           doc.files.length > 0 ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {doc.files.length > 0 ? '📂' : '☁️'}
                        </div>
                        <div>
                           <div className="flex items-center gap-2">
                             <h4 className="font-bold text-slate-800">{doc.name}</h4>
                             {doc.required && <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wide">Required</span>}
                           </div>
                           {doc.subtitle && <p className="text-xs text-slate-400">{doc.subtitle}</p>}
                        </div>
                      </div>

                      {/* File List (Shows Multiple Files) */}
                      {doc.files.length > 0 && (
                        <div className="ml-12 space-y-2 mt-2">
                          {doc.files.map((file, fileIdx) => (
                            <div key={fileIdx} className="flex items-center justify-between bg-white border border-slate-200 p-2 rounded-lg text-sm shadow-sm max-w-md">
                              <div className="flex items-center gap-2 overflow-hidden">
                                <span className="text-red-500 text-xs">PDF</span>
                                <span className="font-medium text-slate-700 truncate">{file.name}</span>
                                <span className="text-xs text-slate-400 ml-2">({file.date})</span>
                              </div>
                              <button 
                                onClick={() => handleRemoveFile(groupIdx, docIdx, fileIdx)}
                                className="text-slate-400 hover:text-red-500 px-2 text-lg"
                                title="Remove File"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0">
                       <button 
                         onClick={() => handleAddFile(groupIdx, docIdx)}
                         className="bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm flex items-center gap-2"
                       >
                         <span>+ Add File</span>
                       </button>
                    </div>

                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

      </main>
    </div>
  );
}