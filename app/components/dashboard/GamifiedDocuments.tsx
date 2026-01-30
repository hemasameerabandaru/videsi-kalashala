"use client";
import React, { useState, useRef } from "react";
import { RefreshCw, FileText, CheckCircle, Upload, Trash2, Eye } from "lucide-react"; // Added Icons

// --- DOCUMENT CONFIGURATION ---
const REQUIRED_DOCS = [
  // ACADEMIC
  { id: 1, name: "10th Marksheet", type: "Academic", format: "YourName_10th.pdf", status: "missing", aiScore: 0 },
  { id: 2, name: "12th Marksheet", type: "Academic", format: "YourName_12th.pdf", status: "missing", aiScore: 0 },
  { id: 3, name: "All Sem Marksheets", type: "Academic", format: "YourName_AllSem.pdf", status: "missing", aiScore: 0 },
  { id: 4, name: "Provisional Certificate", type: "Academic", format: "YourName_PC.pdf", status: "missing", aiScore: 0 },
  { id: 5, name: "Consolidated Marks", type: "Academic", format: "YourName_Cmm.pdf", status: "missing", aiScore: 0 },
  { id: 6, name: "Original Degree (OD)", type: "Academic", format: "YourName_OD.pdf", status: "missing", aiScore: 0 },
  { id: 7, name: "Bonafide Certificate", type: "Academic", format: "YourName_Bonafide.pdf", status: "missing", note: "If currently studying", aiScore: 0 },
  
  // EXAMS
  { id: 8, name: "English Proficiency", type: "Exams", format: "YourName_English.pdf", status: "uploaded", aiScore: 92 }, // Pre-filled example
  { id: 9, name: "GRE Scorecard", type: "Exams", format: "YourName_GRE.pdf", status: "missing", aiScore: 0 },

  // PROFESSIONAL / SOP / LOR
  { id: 10, name: "Resume / CV", type: "Profile", format: "YourName_RESUME.pdf", status: "verified", aiScore: 95 },
  { id: 11, name: "Statement of Purpose", type: "Profile", format: "YourName_SOP.pdf", status: "uploaded", aiScore: 88 },
  { id: 12, name: "Letters of Rec (LORs)", type: "Profile", format: "YourName_LORs.pdf", status: "missing", note: "Combine 3 LORs in one PDF", aiScore: 0 },
  { id: 13, name: "Work Experience Docs", type: "Profile", format: "YourName_WorkExp.pdf", status: "missing", note: "Offer letter, Payslips, Relieving letter", aiScore: 0 },

  // IDENTITY
  { id: 14, name: "Passport", type: "Identity", format: "YourName_Passport.pdf", status: "verified", aiScore: 100 },

  // COUNTRY SPECIFIC
  { id: 15, name: "Medium of Instruction", type: "Country", format: "YourName_MOI.pdf", status: "missing", tag: "UK Only", aiScore: 0 },
  { id: 16, name: "IT Returns (ITR)", type: "Country", format: "YourName_ITR.pdf", status: "missing", tag: "Australia Only", aiScore: 0 },
];

export default function GamifiedDocuments() {
  const [docs, setDocs] = useState(REQUIRED_DOCS);
  const [filter, setFilter] = useState("All");
  
  // Track which document is requesting an upload
  const [activeDocId, setActiveDocId] = useState<number | null>(null);
  
  // Hidden File Input Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stats Logic
  const total = docs.length;
  const completed = docs.filter(d => d.status === "verified" || d.status === "uploaded").length;
  const progress = Math.round((completed / total) * 100);

  // 1. TRIGGER: Click on "Upload" button (Card or Big Box)
  const handleInitiateUpload = (id: number | null) => {
    setActiveDocId(id); // Set the ID (null means 'Big New File', number means specific doc)
    fileInputRef.current?.click(); // Open System Dialog
  };

  // 2. ACTION: Handle the file user picked
  const handleFileSelect = (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (activeDocId !== null) {
      // CASE A: Uploading for a specific requirement (Card)
      simulateUploadProcess(activeDocId);
    } else {
      // CASE B: Uploading a new generic file (Big Box)
      const newDoc = {
        id: Date.now(),
        name: file.name,
        type: "Others",
        format: "uploaded_file.pdf",
        status: "uploaded",
        tag: "Custom Upload",
        aiScore: 85 // Default score for custom uploads
      };
      setDocs([newDoc, ...docs]);
    }
    
    // Reset input so same file can be selected again if needed
    event.target.value = '';
  };

  // 3. ANIMATION: Simulate the network upload + AI Scan 🧠
  const simulateUploadProcess = (id: number) => {
    // Start Loading
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status: "uploading" } : d));
    
    // Finish Loading + AI Scoring
    setTimeout(() => {
       const randomScore = Math.floor(Math.random() * (99 - 85 + 1)) + 85; // Random score 85-99
       setDocs(prev => prev.map(d => d.id === id ? { ...d, status: "uploaded", aiScore: randomScore } : d));
       setActiveDocId(null);
    }, 2000); // 2 seconds delay
  };

  const handleDelete = (id: number) => {
     if(confirm("Are you sure you want to delete this document?")) {
        setDocs(prev => prev.map(d => d.id === id ? { ...d, status: "missing", aiScore: 0 } : d));
     }
  };

  // Filter Logic
  const filteredDocs = filter === "All" ? docs : docs.filter(d => d.type === filter || (filter === "All" && d.type === "Others"));
  const categories = ["All", "Academic", "Exams", "Profile", "Identity", "Country"];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto pb-20">
      
      {/* HIDDEN FILE INPUT - Controls all uploads */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileSelect} 
      />

      {/* VIBRANT HEADER */}
      <header className="mb-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-purple-200">
         <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
               <h1 className="text-4xl font-extrabold mb-2 tracking-tight">📂 Document Vault</h1>
               <p className="text-purple-100 font-medium text-lg opacity-90">
                  Securely upload documents. Our <span className="font-bold text-white underline decoration-wavy">AI Checker</span> verifies them instantly.
               </p>
            </div>
            
            {/* Circular Progress */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
               <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                     <path className="text-white/20" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                     <path className="text-white transition-all duration-1000 ease-out" strokeDasharray={`${progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                  <span className="absolute text-sm font-bold">{progress}%</span>
               </div>
               <div>
                  <p className="text-xs font-bold uppercase opacity-70">Completion</p>
                  <p className="text-lg font-bold">{completed}/{total} Ready</p>
               </div>
            </div>
         </div>
      </header>

      {/* FILTER TABS */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar px-1">
         {categories.map(cat => (
            <button 
               key={cat}
               onClick={() => setFilter(cat)}
               className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm
               ${filter === cat 
                  ? 'bg-slate-900 text-white shadow-lg scale-105' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
            >
               {cat}
            </button>
         ))}
      </div>

      {/* DOCUMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* DRAG & DROP CARD (Triggers Upload for 'null' ID) */}
         <div 
            onClick={() => handleInitiateUpload(null)}
            className="bg-white border-2 border-dashed border-purple-300 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:bg-purple-50 transition-colors cursor-pointer group h-full min-h-[220px]"
         >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform text-purple-600">
               ☁️
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Upload New File</h3>
            <p className="text-sm text-slate-500">Click to browse or drag & drop</p>
         </div>

         {/* DOC CARDS (Triggers Upload for Specific ID) */}
         {filteredDocs.map((doc) => (
            <DocumentCard 
               key={doc.id} 
               doc={doc} 
               onUpload={() => handleInitiateUpload(doc.id)} 
               onDelete={() => handleDelete(doc.id)}
            />
         ))}
      </div>

    </div>
  );
}

// --- SUB-COMPONENT: DOCUMENT CARD ---
function DocumentCard({ doc, onUpload, onDelete }: any) {
   const isMissing = doc.status === "missing";
   const isUploading = doc.status === "uploading";
   const isVerified = doc.status === "verified";
   const isUploaded = doc.status === "uploaded"; 

   return (
      <div className={`group bg-white p-6 rounded-3xl border shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full relative overflow-hidden
         ${isUploaded || isVerified ? 'border-green-100' : 'border-slate-100'}
      `}>
         
         {/* Top Bar Status */}
         <div className={`absolute top-0 left-0 w-full h-1.5 
            ${isVerified ? 'bg-green-500' : isUploaded ? 'bg-blue-500' : 'bg-slate-200 group-hover:bg-purple-500'} transition-colors`}>
         </div>

         <div>
            <div className="flex justify-between items-start mb-4">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm
                  ${isVerified ? 'bg-green-50 text-green-600' : isUploaded ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                  {isVerified ? <CheckCircle size={20} /> : isUploaded ? <FileText size={20} /> : <Upload size={20} />}
               </div>
               {doc.tag && (
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-extrabold uppercase tracking-wide px-2 py-1 rounded-lg">
                     {doc.tag}
                  </span>
               )}
            </div>

            <h4 className="font-bold text-slate-800 text-base mb-2 group-hover:text-purple-700 transition-colors">{doc.name}</h4>
            
            <div className="flex items-center gap-2 mb-4">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Format:</span>
               <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono border border-slate-200">{doc.format}</code>
            </div>
            
            {doc.note && <p className="text-xs text-slate-400 italic mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100">{doc.note}</p>}
            
            {/* 🧠 AI SCORE BADGE (Only if Uploaded) */}
            {(isUploaded || isVerified) && doc.aiScore > 0 && (
               <div className="mb-4 bg-indigo-50 border border-indigo-100 p-2 rounded-lg flex items-center gap-2 animate-fade-in">
                  <div className="text-lg">✨</div>
                  <div>
                     <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider">AI Quality Score</p>
                     <p className="text-sm font-extrabold text-indigo-700">{doc.aiScore}/100</p>
                  </div>
               </div>
            )}
         </div>

         <div className="mt-auto pt-4 border-t border-slate-50">
            {isMissing ? (
               // ✨ PASTEL BUTTON + CLICK EVENT ✨
               <button 
                  onClick={onUpload} 
                  className="w-full bg-indigo-200 text-indigo-900 py-3 rounded-xl text-sm font-bold hover:bg-indigo-300 transition-all shadow-sm flex items-center justify-center gap-2"
               >
                  <span>⬆</span> Upload File
               </button>
            ) : isUploading ? (
               <div className="w-full bg-slate-50 text-slate-500 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border border-slate-100">
                  <RefreshCw size={16} className="animate-spin" />
                  Analyzing...
               </div>
            ) : (
               <div className="flex gap-2">
                  <button className="flex-1 bg-white border border-slate-200 text-slate-600 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-50 transition flex items-center justify-center gap-2">
                     <Eye size={14} /> View
                  </button>
                  <button onClick={onDelete} className="bg-red-50 text-red-500 px-3 rounded-xl hover:bg-red-100 transition flex items-center justify-center">
                     <Trash2 size={16} />
                  </button>
               </div>
            )}
         </div>

      </div>
   )
}