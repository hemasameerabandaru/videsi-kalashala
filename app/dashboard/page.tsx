"use client";
import React, { useState } from "react";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs"; // 👈 IMPORT CLERK SIGN OUT

// Import Gamified Components
import GamifiedProfile from "../components/dashboard/GamifiedProfile";
import GamifiedAssessment from "../components/dashboard/GamifiedAssessment";
import GamifiedUniversities from "../components/dashboard/GamifiedUniversities";
import GamifiedApplications from "../components/dashboard/GamifiedApplications";
import GamifiedDocuments from "../components/dashboard/GamifiedDocuments";
import GamifiedCostCalculator from "../components/dashboard/GamifiedCostCalculator";
import GamifiedScholarships from "../components/dashboard/GamifiedScholarships";
import GamifiedVisaGuide from "../components/dashboard/GamifiedVisaGuide";
import GamifiedVisaMockAI from "../components/dashboard/GamifiedVisaMockAI";
import GamifiedMentors from "../components/dashboard/GamifiedMentors";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* 🟢 SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full z-10 overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
           {/* LOGO LINKS TO HOME */}
           <Link href="/" className="cursor-pointer">
             <span className="text-3xl font-brand font-bold text-indigo-600 tracking-wide hover:text-indigo-700 transition-colors">
               Videsi Kalashala
             </span>
           </Link>
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
          <NavItem id="visa-guide" label="Visa Guide" icon="🛂" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="visa-mock" label="Visa Mock AI" icon="🤖" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem id="mentors" label="Mentors" icon="👨‍🏫" activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>

        <div className="p-4 border-t border-slate-100">
           {/* 👇 REAL SIGN OUT BUTTON */}
           <SignOutButton redirectUrl="/"> 
             <button className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition font-medium text-sm mt-1">
                <span>🚪</span> Sign Out
             </button>
           </SignOutButton>
        </div>
      </aside>

      {/* 🟢 MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 p-8 transition-all">
        
        {/* 1. OVERVIEW */}
        {activeTab === "overview" && (
          <div className="animate-fade-in space-y-8">
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back! 👋</h1>
                <p className="text-slate-500 font-medium">Here is your daily activity overview.</p>
              </div>
              <button 
                onClick={() => setActiveTab("universities")}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
              >
                + Find Universities
              </button>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard title="Universities Shortlisted" value="12" icon="❤️" color="bg-white border border-slate-200 text-slate-900" />
              <StatsCard title="Applications Sent" value="5" icon="🚀" color="bg-white border border-slate-200 text-slate-900" />
              <StatsCard title="Pending Actions" value="3" icon="⏳" color="bg-white border border-slate-200 text-slate-900" />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
               <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
               <table className="w-full text-left text-sm">
                  <thead className="text-xs text-slate-400 uppercase font-bold border-b border-slate-100">
                    <tr><th className="py-3">University</th><th className="py-3">Country</th><th className="py-3">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr><td className="py-4 font-bold">Arizona State University</td><td className="py-4 text-slate-500">USA</td><td className="py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Accepted</span></td></tr>
                    <tr><td className="py-4 font-bold">Technical Univ. Munich</td><td className="py-4 text-slate-500">Germany</td><td className="py-4"><span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span></td></tr>
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {/* 2. PROFILE */}
        {activeTab === "profile" && <GamifiedProfile />}

        {/* 3. MY ROADMAP */}
        {activeTab === "roadmap" && (
           <div className="animate-fade-in max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Study Abroad Roadmap</h2>
              <div className="relative border-l-4 border-indigo-100 ml-6 space-y-10">
                 <RoadmapLevel level="1" title="Research Universities" desc="Shortlist 10 universities based on profile." status="completed" />
                 <RoadmapLevel level="2" title="Prepare for GRE/IELTS" desc="Take mock tests and book exam slot." status="completed" />
                 <RoadmapLevel level="3" title="Prepare Documents" desc="Draft SOP and collect LORs." status="active" />
                 <RoadmapLevel level="4" title="Apply to Universities" desc="Submit applications before deadline." status="locked" />
                 <RoadmapLevel level="5" title="Visa Process" desc="Book F1 Visa slot." status="locked" />
              </div>
           </div>
        )}

        {/* 4. ASSESSMENT */}
        {activeTab === "assessment" && <GamifiedAssessment />}

        {/* 5. UNIVERSITIES */}
        {activeTab === "universities" && <GamifiedUniversities />}

        {/* 6. APPLICATIONS */}
        {activeTab === "applications" && <GamifiedApplications />}

        {/* 7. DOCUMENTS */}
        {activeTab === "documents" && <GamifiedDocuments />}

        {/* 8. COST CALCULATOR */}
        {activeTab === "cost-calculator" && <GamifiedCostCalculator />}
        
        {/* 9. SCHOLARSHIPS */}
        {activeTab === "scholarships" && <GamifiedScholarships />}

        {/* 10. VISA GUIDE */}
        {activeTab === "visa-guide" && <GamifiedVisaGuide />}

        {/* 11. VISA MOCK AI */}
        {activeTab === "visa-mock" && <GamifiedVisaMockAI />}

        {/* 12. MENTORS */}
        {activeTab === "mentors" && <GamifiedMentors />}

      </main>
    </div>
  );
}

// 👇 HELPER COMPONENTS

function NavItem({ id, icon, label, activeTab, setActiveTab }: any) {
  const isActive = activeTab === id;
  return (
    <button 
      onClick={() => setActiveTab(id)} 
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition font-medium text-sm 
        ${isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
          : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
        }`}
    >
      <span className="text-xl">{icon}</span>
      {label}
    </button>
  );
}

function StatsCard({ title, value, icon, color }: any) {
  return (
    <div className={`${color} p-6 rounded-2xl shadow-sm`}>
       <div className="flex justify-between items-start">
          <div>
             <p className="text-slate-500 font-bold text-xs mb-1 uppercase">{title}</p>
             <h3 className="text-3xl font-extrabold text-slate-900">{value}</h3>
          </div>
          <div className="text-2xl">{icon}</div>
       </div>
    </div>
  );
}

function RoadmapLevel({ level, title, desc, status }: any) {
   const isLocked = status === 'locked';
   const isCompleted = status === 'completed';
   return (
      <div className={`relative pl-8 ${isLocked ? 'opacity-50 grayscale' : 'opacity-100'}`}>
         <div className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 
            ${isCompleted ? 'bg-green-500 text-white' : isLocked ? 'bg-slate-300 text-slate-500' : 'bg-indigo-600 text-white'}`}>
            {isCompleted ? '✓' : level}
         </div>
         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <h4 className={`text-xl font-bold ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>{title}</h4>
            <p className="text-slate-500">{desc}</p>
         </div>
      </div>
   )
}