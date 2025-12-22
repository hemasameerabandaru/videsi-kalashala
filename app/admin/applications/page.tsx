"use client";
import React, { useState } from 'react';

export default function AdminApplications() {
  // Extended Mock Data
  const [applications, setApplications] = useState([
    { id: 1, student: "Rohan Das", university: "Harvard University", country: "USA", course: "MBA", status: "Under Review", date: "Dec 20, 2024", offerLetter: "", rejectionLetter: "", i20Status: "Not Started" },
    { id: 2, student: "Sarah Khan", university: "University of Oxford", country: "UK", course: "History", status: "Pending Documents", date: "Dec 19, 2024", offerLetter: "", rejectionLetter: "", i20Status: "N/A" },
    { id: 3, student: "Amit Verma", university: "Technical Uni. Munich", country: "Germany", course: "Informatics", status: "Approved", date: "Dec 18, 2024", offerLetter: "offer_amit.pdf", rejectionLetter: "", i20Status: "N/A" },
    { id: 4, student: "Priya Sharma", university: "Stanford University", country: "USA", course: "Computer Science", status: "Rejected", date: "Dec 15, 2024", offerLetter: "", rejectionLetter: "reject_priya.pdf", i20Status: "N/A" },
    { id: 5, student: "Jason Roy", university: "NYU", country: "USA", course: "Finance", status: "Approved", date: "Dec 14, 2024", offerLetter: "offer_jason.pdf", rejectionLetter: "", i20Status: "Processing" },
  ]);

  // General Modal State
  const [showModal, setShowModal] = useState(false);
  const [currentAction, setCurrentAction] = useState<{ id: number, type: 'Approve' | 'Reject' } | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // I-20 Modal State
  const [showI20Modal, setShowI20Modal] = useState(false);
  const [selectedI20App, setSelectedI20App] = useState<any>(null);
  const [i20Files, setI20Files] = useState<File[]>([]); // 🟢 Changed to Array for Multiple Files

  // 1. Trigger Approve/Reject Modal
  const handleActionClick = (id: number, type: 'Approve' | 'Reject') => {
    setCurrentAction({ id, type });
    setUploadedFile(null);
    setShowModal(true);
  };

  // 2. Submit Decision
  const submitDecision = () => {
    if (!currentAction) return;
    if (!uploadedFile) {
      alert("Please upload the required letter first.");
      return;
    }

    const updatedApps = applications.map(app => {
      if (app.id === currentAction.id) {
        return {
          ...app,
          status: currentAction.type === 'Approve' ? 'Approved' : 'Rejected',
          offerLetter: currentAction.type === 'Approve' ? uploadedFile.name : "",
          rejectionLetter: currentAction.type === 'Reject' ? uploadedFile.name : "",
          i20Status: (currentAction.type === 'Approve' && app.country === 'USA') ? "Not Started" : "N/A"
        };
      }
      return app;
    });

    setApplications(updatedApps);
    setShowModal(false);
    alert(`Application ${currentAction.type}d successfully! File saved.`);
  };

  // 3. Open I-20 Wizard
  const openI20Wizard = (app: any) => {
    setSelectedI20App(app);
    setI20Files([]); // Reset file list
    setShowI20Modal(true);
  };

  // 4. Handle File Addition (Multiple)
  const handleI20FileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      // Prevent duplicates based on name
      if (!i20Files.some(f => f.name === newFile.name)) {
        setI20Files([...i20Files, newFile]);
      }
    }
  };

  // 5. Remove a File from List
  const removeI20File = (index: number) => {
    const newFiles = [...i20Files];
    newFiles.splice(index, 1);
    setI20Files(newFiles);
  };

  // 6. Send I-20 Packet
  const sendI20Packet = () => {
    if (!selectedI20App) return;
    
    const updatedApps = applications.map(app => 
      app.id === selectedI20App.id ? { ...app, i20Status: "Processing" } : app
    );
    setApplications(updatedApps);
    setShowI20Modal(false);
    
    const fileNames = i20Files.length > 0 ? i20Files.map(f => f.name).join(", ") : "No files attached";
    alert(`I-20 Packet sent to ${selectedI20App.student}! 📨\nFiles Sent: ${fileNames}`);
  };

  // 7. Handle Next Steps (Non-USA)
  const sendNextSteps = (id: number) => {
    alert("Next Steps email sent to student! 📧");
  };

  return (
    <main className="p-8 bg-slate-100 min-h-screen relative">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Review Applications 📂</h1>
        <p className="text-slate-500 mt-1">Manage approvals, rejections, and visa document workflows.</p>
      </header>

      {/* STATUS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-yellow-500">
          <p className="text-slate-500 text-xs font-bold uppercase">Pending Review</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{applications.filter(a => a.status === 'Under Review' || a.status === 'Pending Documents').length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
          <p className="text-slate-500 text-xs font-bold uppercase">Approved</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{applications.filter(a => a.status === 'Approved').length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-indigo-500">
          <p className="text-slate-500 text-xs font-bold uppercase">I-20 Processing</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{applications.filter(a => a.i20Status === 'Processing').length}</p>
        </div>
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-red-500">
          <p className="text-slate-500 text-xs font-bold uppercase">Rejected</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{applications.filter(a => a.status === 'Rejected').length}</p>
        </div>
      </div>

      {/* APPLICATIONS TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">University (Country)</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Documents</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50 transition group">
                <td className="px-6 py-4 font-bold text-slate-800">{app.student}</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-700">{app.university}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    {app.country === 'USA' && '🇺🇸'}
                    {app.country === 'UK' && '🇬🇧'}
                    {app.country === 'Germany' && '🇩🇪'}
                    {app.country} • {app.course}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    app.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                    app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs space-y-1">
                  {app.offerLetter && <span className="block text-emerald-600 font-bold">📄 Offer Letter</span>}
                  {app.rejectionLetter && <span className="block text-red-500 font-bold">📄 Rejection Letter</span>}
                  {app.i20Status === 'Processing' && <span className="block text-indigo-600 font-bold">🛂 I-20 Processing</span>}
                  {!app.offerLetter && !app.rejectionLetter && <span className="text-slate-400">-</span>}
                </td>
                
                <td className="px-6 py-4 text-right space-x-2 flex justify-end items-center">
                  
                  {/* PENDING: Approve or Reject */}
                  {(app.status === 'Under Review' || app.status === 'Pending Documents') && (
                    <>
                      <button onClick={() => handleActionClick(app.id, 'Approve')} className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-200 transition">✅ Approve</button>
                      <button onClick={() => handleActionClick(app.id, 'Reject')} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition">❌ Reject</button>
                    </>
                  )}

                  {/* APPROVED: Country Specific Logic */}
                  {app.status === 'Approved' && (
                    app.country === 'USA' ? (
                      <button 
                        onClick={() => openI20Wizard(app)}
                        disabled={app.i20Status === 'Processing'}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border flex items-center gap-2 ${
                          app.i20Status === 'Processing' 
                          ? 'bg-indigo-50 text-indigo-400 border-indigo-100 cursor-not-allowed' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent shadow-md'
                        }`}
                      >
                        {app.i20Status === 'Processing' ? <span>Processing...</span> : <span>Apply for I-20 🛂</span>}
                      </button>
                    ) : (
                      <button onClick={() => sendNextSteps(app.id)} className="bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-900 transition shadow-md">Send Next Steps 📧</button>
                    )
                  )}

                  {app.status === 'Rejected' && <span className="text-xs text-slate-400 italic">Closed</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL 1: APPROVE / REJECT --- */}
      {showModal && currentAction && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl animate-fade-in-up">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4 ${
              currentAction.type === 'Approve' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
            }`}>
              {currentAction.type === 'Approve' ? '🎉' : '⚠️'}
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {currentAction.type === 'Approve' ? 'Approve Application' : 'Reject Application'}
            </h2>
            <p className="text-slate-500 mb-6">
              To proceed, please upload the official {currentAction.type === 'Approve' ? 'Offer Letter' : 'Rejection Letter'}.
            </p>

            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50 text-center cursor-pointer hover:bg-slate-100 hover:border-indigo-300 transition relative">
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setUploadedFile(e.target.files ? e.target.files[0] : null)} />
              <span className="text-3xl block mb-2">📄</span>
              <p className="text-sm font-bold text-slate-700">{uploadedFile ? uploadedFile.name : "Click to Upload File"}</p>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition">Cancel</button>
              <button onClick={submitDecision} className={`flex-1 font-bold py-3 rounded-xl text-white shadow-lg transition ${currentAction.type === 'Approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: I-20 WIZARD (NEW! MULTIPLE FILES) --- */}
      {showI20Modal && selectedI20App && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl animate-fade-in-up">
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">🇺🇸 Initiate I-20 Process</h2>
                <p className="text-slate-500 text-sm">for {selectedI20App.student} at {selectedI20App.university}</p>
              </div>
              <button onClick={() => setShowI20Modal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {/* Checklist */}
            <div className="mb-6">
               <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide mb-3">1. Required Steps</h3>
               <div className="bg-slate-50 p-4 rounded-xl space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</div>
                    <span>Offer Letter Accepted</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs">2</div>
                    <span>Student must submit Financial Affidavit</span>
                  </div>
               </div>
            </div>

            {/* Attach Files (Multiple) */}
            <div className="mb-8">
               <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide mb-3">2. Attach Forms (Optional)</h3>
               <p className="text-xs text-slate-400 mb-3">Upload multiple forms (e.g., Financial Form, Sponsor Letter) for the student.</p>
               
               {/* Upload Box */}
               <div className="border-2 border-dashed border-indigo-100 rounded-xl p-4 bg-indigo-50/50 text-center cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition relative mb-4">
                  <input type="file" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleI20FileUpload} />
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-xl">📎</span>
                    <span className="font-bold text-indigo-600 text-sm">Click to Add Files</span>
                  </div>
               </div>

               {/* File List */}
               {i20Files.length > 0 && (
                 <div className="space-y-2">
                   {i20Files.map((file, index) => (
                     <div key={index} className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                       <div className="flex items-center gap-2 overflow-hidden">
                         <span className="text-indigo-500 text-sm">📄</span>
                         <span className="text-sm text-slate-700 truncate max-w-[200px]">{file.name}</span>
                       </div>
                       <button onClick={() => removeI20File(index)} className="text-slate-400 hover:text-red-500 font-bold px-2">✕</button>
                     </div>
                   ))}
                 </div>
               )}
            </div>

            {/* Footer Actions */}
            <button 
              onClick={sendI20Packet}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg flex items-center justify-center gap-2"
            >
              <span>Send Packet ({i20Files.length} Files)</span>
              <span>🚀</span>
            </button>

          </div>
        </div>
      )}

    </main>
  );
}