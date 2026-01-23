"use client";
import React, { useState } from "react";

export default function Dashboard() {
  // STATE: Tracks active tab
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* 🟢 SIDEBAR (Matches your Folder Structure) */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full z-10 overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
           <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
           <span className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">Main</p>
          <NavItem id="overview" label="Overview" icon="🏠" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="profile" label="Profile" icon="👤" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="roadmap" label="My Roadmap" icon="🗺️" activeTab={activeTab} setActiveTab={setActiveTab} />

          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Study Abroad</p>
          <NavItem id="assessment" label="Assessment" icon="📊" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="universities" label="Universities" icon="🏛️" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="applications" label="Applications" icon="📝" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="documents" label="Documents" icon="📂" activeTab={activeTab} setActiveTab={setActiveTab} />

          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Finance & Visa</p>
          <NavItem id="cost-calculator" label="Cost Calculator" icon="💰" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="scholarships" label="Scholarships" icon="🎓" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="visa" label="Visa Guide" icon="🛂" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="visa-mock" label="Visa Mock AI" icon="🤖" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="mentors" label="Mentors" icon="👨‍🏫" activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>

        <div className="p-4 border-t border-slate-100">
           <button className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition font-medium text-sm mt-1">
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* 🟢 MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 p-8 transition-all">
        
        {/* 1. OVERVIEW */}
        {activeTab === "overview" && (
          <div className="animate-fade-in">
            <header className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back! 👋</h1>
                <p className="text-slate-500 font-medium">Here is your daily activity overview.</p>
              </div>
              <button onClick={() => setActiveTab('universities')} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition flex items-center gap-2">
                <span>+</span> Find Universities
              </button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <StatCard title="Universities Shortlisted" value="12" icon="🎓" color="bg-blue-50 text-blue-600" />
              <StatCard title="Applications Sent" value="5" icon="✈️" color="bg-indigo-50 text-indigo-600" />
              <StatCard title="Pending Actions" value="3" icon="⏳" color="bg-amber-50 text-amber-600" />
            </div>
            
             {/* Recent Apps Preview */}
             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-6 border-b border-slate-50 font-bold text-slate-800">Recent Activity</div>
                 <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase font-bold text-xs">
                        <tr>
                          <th className="px-6 py-4">University</th>
                          <th className="px-6 py-4">Country</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <AppRow name="Arizona State University" country="USA" status="Accepted" />
                        <AppRow name="Technical Univ. Munich" country="Germany" status="Pending" />
                      </tbody>
                   </table>
                 </div>
               </div>
          </div>
        )}

        {/* 2. PROFILE */}
        {activeTab === "profile" && (
          <div className="animate-fade-in max-w-4xl">
             <h2 className="text-3xl font-bold text-slate-900 mb-6">👤 My Profile</h2>
             <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                   <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-4xl">🎓</div>
                   <div>
                      <h3 className="text-xl font-bold">Hema Sameera</h3>
                      <p className="text-slate-500">Computer Science Aspirant</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Pro Member</span>
                   </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                   <InfoBox label="Target Country" value="United States 🇺🇸" />
                   <InfoBox label="Target Intake" value="Fall 2026" />
                   <InfoBox label="GRE Score" value="320 (Target)" />
                   <InfoBox label="IELTS Score" value="7.5 (Target)" />
                </div>
             </div>
          </div>
        )}

        {/* 3. ROADMAP */}
        {activeTab === "roadmap" && (
           <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">🗺️ Study Abroad Roadmap</h2>
              <div className="space-y-4">
                 <RoadmapItem status="done" title="Research Universities" desc="Shortlist 10 universities based on profile." />
                 <RoadmapItem status="done" title="Prepare for GRE/IELTS" desc="Take mock tests and book exam slot." />
                 <RoadmapItem status="active" title="Prepare Documents" desc="Draft SOP and collect LORs." />
                 <RoadmapItem status="locked" title="Apply to Universities" desc="Submit applications before deadline." />
                 <RoadmapItem status="locked" title="Visa Process" desc="Book F1 Visa slot." />
              </div>
           </div>
        )}

        {/* 4. ASSESSMENT */}
        {activeTab === "assessment" && (
           <div className="animate-fade-in max-w-5xl mx-auto">
               <h2 className="text-3xl font-bold text-slate-900 mb-6">📊 Profile Assessment</h2>
               <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center text-6xl mx-auto mb-6">📈</div>
                  <h3 className="text-2xl font-bold mb-4">Your Profile Strength: 85%</h3>
                  <p className="text-slate-500 max-w-lg mx-auto mb-8">Based on your academic history and test scores, you have a high chance of admission in Top 50 US universities.</p>
                  <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition">View Detailed Report</button>
               </div>
           </div>
        )}

        {/* 5. UNIVERSITIES (Finder Restored) */}
        {activeTab === "universities" && (
           <div className="animate-fade-in max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">🏛️ University Finder</h2>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center py-20">
                 <div className="text-6xl mb-4">🤖</div>
                 <h3 className="text-xl font-bold mb-2">AI Matching Engine</h3>
                 <p className="text-slate-500 mb-6">Enter your GRE/IELTS score to find your perfect match.</p>
                 <div className="flex justify-center items-center gap-2">
                   <input type="text" placeholder="Enter score (e.g. 320)" className="border border-slate-300 rounded-lg px-4 py-3 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                   <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition">Search</button>
                 </div>
              </div>
           </div>
        )}

        {/* 6. APPLICATIONS (Table Restored & Fixed) */}
        {activeTab === "applications" && (
           <div className="animate-fade-in max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">📝 Your Applications</h2>
               <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                 <div className="overflow-x-auto">
                   {/* 🔴 FIXED: Using proper table structure */}
                   <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase font-bold text-xs">
                        <tr>
                          <th className="px-6 py-4">University</th>
                          <th className="px-6 py-4">Country</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <AppRow name="Arizona State University" country="USA" status="Accepted" />
                        <AppRow name="Technical Univ. Munich" country="Germany" status="Pending" />
                        <AppRow name="University of Toronto" country="Canada" status="Reviewing" />
                        <AppRow name="Monash University" country="Australia" status="Submitted" />
                      </tbody>
                   </table>
                 </div>
               </div>
           </div>
        )}

         {/* 7. DOCUMENTS (Vault Restored) */}
         {activeTab === "documents" && (
           <div className="animate-fade-in max-w-5xl mx-auto">
              <header className="flex justify-between items-center mb-8">
                 <h2 className="text-3xl font-bold text-slate-900">📂 Document Vault</h2>
                 <button className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-indigo-100 transition">Download All</button>
              </header>
              <div className="border-2 border-dashed border-indigo-200 rounded-2xl p-10 text-center bg-indigo-50/50 mb-8 hover:border-indigo-400 cursor-pointer transition">
                 <div className="text-4xl mb-2">☁️</div>
                 <h3 className="font-bold text-slate-800">Drag & Drop files here</h3>
                 <p className="text-sm text-slate-500">Supported files: PDF, DOCX, JPG</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
                 <DocRow title="Resume / CV" filename="Resume_Final.pdf" status="Verified" />
                 <DocRow title="Statement of Purpose" filename="SOP_Draft_v4.docx" status="Verified" />
                 <DocRow title="Letter of Recommendation" filename="LOR_Prof_Smith.pdf" status="Pending" />
                 <DocRow title="Passport" filename="-" status="Missing" />
              </div>
           </div>
        )}

        {/* 8. COST CALCULATOR */}
        {activeTab === "cost-calculator" && (
           <PlaceholderPage title="💰 Cost Calculator" desc="Estimate tuition, housing, and food expenses for your target city." />
        )}

        {/* 9. SCHOLARSHIPS */}
        {activeTab === "scholarships" && (
           <PlaceholderPage title="🎓 Scholarships" desc="Find financial aid, grants, and scholarships suited for your profile." />
        )}

        {/* 10. VISA */}
        {activeTab === "visa" && (
           <PlaceholderPage title="🛂 Visa Guide" desc="Step-by-step F1/J1 visa application process and checklist." />
        )}

        {/* 11. VISA MOCK */}
        {activeTab === "visa-mock" && (
           <PlaceholderPage title="🤖 Visa Mock AI" desc="Practice your visa interview with our AI voice bot." />
        )}

        {/* 12. MENTORS */}
        {activeTab === "mentors" && (
           <PlaceholderPage title="👨‍🏫 Find a Mentor" desc="Connect with seniors and alumni in your dream university." />
        )}

      </main>
    </div>
  );
}

// 👇 COMPONENTS (Reusable)

function NavItem({ id, icon, label, activeTab, setActiveTab }: any) {
  const isActive = activeTab === id;
  return (
    <button onClick={() => setActiveTab(id)} className={`flex items-center gap-3 w-full p-3 rounded-xl transition font-medium text-sm ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50'}`}>
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${color}`}>{icon}</div>
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
      </div>
    </div>
  );
}

function AppRow({ name, country, status }: any) {
  let statusColor = "bg-slate-100 text-slate-600";
  if (status === "Accepted") statusColor = "bg-green-100 text-green-700";
  if (status === "Pending") statusColor = "bg-amber-100 text-amber-700";
  if (status === "Reviewing") statusColor = "bg-blue-100 text-blue-700";
  if (status === "Submitted") statusColor = "bg-indigo-100 text-indigo-700";

  return (
    <tr className="hover:bg-slate-50 transition">
      <td className="px-6 py-4 font-bold text-slate-800">{name}</td>
      <td className="px-6 py-4 text-slate-500">{country}</td>
      <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>{status}</span></td>
    </tr>
  );
}

function DocRow({ title, filename, status }: any) {
   let badge = status === "Verified" ? "bg-green-100 text-green-700" : status === "Missing" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700";
   return (
      <div className="p-4 flex items-center justify-between hover:bg-slate-50">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">📄</div>
            <div><h4 className="font-bold text-slate-800 text-sm">{title}</h4><p className="text-xs text-slate-500">{filename}</p></div>
         </div>
         <span className={`px-3 py-1 rounded-full text-xs font-bold ${badge}`}>{status}</span>
      </div>
   )
}

function InfoBox({ label, value }: any) {
  return (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
      <p className="text-slate-500 text-xs uppercase font-bold mb-1">{label}</p>
      <p className="text-lg font-bold text-slate-900">{value}</p>
    </div>
  )
}

function RoadmapItem({ status, title, desc }: any) {
  const icon = status === 'done' ? '✅' : status === 'active' ? '🔵' : '🔒';
  const style = status === 'done' ? 'opacity-50' : status === 'active' ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50';
  return (
    <div className={`p-4 rounded-xl border border-slate-200 flex items-center gap-4 ${style}`}>
      <span className="text-2xl">{icon}</span>
      <div>
        <h4 className="font-bold text-slate-800">{title}</h4>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  )
}

function PlaceholderPage({ title, desc }: any) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-fade-in">
      <div className="text-6xl mb-4 bg-slate-100 p-6 rounded-full">🚧</div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
      <p className="text-slate-500 max-w-md">{desc}</p>
      <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition">Get Started</button>
    </div>
  )
}