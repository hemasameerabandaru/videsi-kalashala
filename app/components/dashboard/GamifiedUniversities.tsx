"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { lockUniversity, unlockUniversity } from "@/app/actions"; 
import { Lock, Unlock, CheckCircle, Heart, X, Trash2 } from "lucide-react"; 

// --- EXPANDED DATABASE (75+ Universities) ---
const UNIVERSITY_DB = [
  // --- USA (15) ---
  { id: 101, name: "Massachusetts Inst. Tech (MIT)", country: "USA", flag: "🇺🇸", intake: "Fall 2026", deadline: "Dec 15, 2025", cost: 55000, difficulty: 98, scholarships: "Need-blind" },
  { id: 102, name: "Stanford University", country: "USA", flag: "🇺🇸", intake: "Fall 2026", deadline: "Dec 01, 2025", cost: 56000, difficulty: 96, scholarships: "Limited" },
  { id: 103, name: "Harvard University", country: "USA", flag: "🇺🇸", intake: "Fall 2026", deadline: "Jan 01, 2026", cost: 54000, difficulty: 97, scholarships: "Need-based" },
  { id: 104, name: "Caltech", country: "USA", flag: "🇺🇸", intake: "Fall 2026", deadline: "Dec 15, 2025", cost: 58000, difficulty: 95, scholarships: "Merit" },
  { id: 105, name: "Uni. of Chicago", country: "USA", flag: "🇺🇸", intake: "Fall 2026", deadline: "Jan 02, 2026", cost: 60000, difficulty: 92, scholarships: "Available" },
  { id: 106, name: "Princeton University", country: "USA", flag: "🇺🇸", intake: "Fall 2026", deadline: "Jan 01, 2026", cost: 53000, difficulty: 94, scholarships: "Generous" },
  { id: 107, name: "Cornell University", country: "USA", flag: "🇺🇸", intake: "Fall 2026", deadline: "Jan 02, 2026", cost: 62000, difficulty: 90, scholarships: "Limited" },
  { id: 108, name: "Yale University", country: "USA", flag: "🇺🇸", intake: "Fall 2026", deadline: "Jan 02, 2026", cost: 59000, difficulty: 93, scholarships: "Need-based" },
  { id: 109, name: "Columbia University", country: "USA", flag: "🇺🇸", intake: "Fall 2026", deadline: "Dec 15, 2025", cost: 65000, difficulty: 91, scholarships: "Competitive" },
  { id: 110, name: "UPenn", country: "USA", flag: "🇺🇸", intake: "Fall 2026", deadline: "Jan 05, 2026", cost: 63000, difficulty: 89, scholarships: "Available" },
  { id: 111, name: "Arizona State Univ.", country: "USA", flag: "🇺🇸", intake: "Spring 2027", deadline: "Nov 01, 2026", cost: 35000, difficulty: 60, scholarships: "Good ($10k)" },
  { id: 112, name: "Northeastern Univ.", country: "USA", flag: "🇺🇸", intake: "Fall 2026", deadline: "Jan 15, 2026", cost: 45000, difficulty: 75, scholarships: "Merit" },
  { id: 113, name: "Carnegie Mellon (CMU)", country: "USA", flag: "🇺🇸", intake: "Fall 2026", deadline: "Dec 10, 2025", cost: 58000, difficulty: 88, scholarships: "Limited" },
  { id: 114, name: "San Jose State Univ", country: "USA", flag: "🇺🇸", intake: "Spring 2027", deadline: "Aug 01, 2026", cost: 25000, difficulty: 55, scholarships: "None" },
  { id: 115, name: "Texas A&M", country: "USA", flag: "🇺🇸", intake: "Fall 2026", deadline: "Dec 01, 2025", cost: 38000, difficulty: 65, scholarships: "Available" },

  // --- UK (15) ---
  { id: 201, name: "University of Oxford", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Oct 15, 2025", cost: 45000, difficulty: 95, scholarships: "Rhodes" },
  { id: 202, name: "Cambridge University", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Oct 15, 2025", cost: 46000, difficulty: 96, scholarships: "Gates" },
  { id: 203, name: "Imperial College London", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Jan 15, 2026", cost: 48000, difficulty: 90, scholarships: "Available" },
  { id: 204, name: "UCL", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Jan 25, 2026", cost: 40000, difficulty: 85, scholarships: "Global Excellence" },
  { id: 205, name: "LSE", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Jan 15, 2026", cost: 35000, difficulty: 88, scholarships: "Limited" },
  { id: 206, name: "Univ. of Edinburgh", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Jan 15, 2026", cost: 32000, difficulty: 78, scholarships: "Good" },
  { id: 207, name: "King's College London", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Feb 01, 2026", cost: 38000, difficulty: 80, scholarships: "Merit" },
  { id: 208, name: "Univ. of Manchester", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Jan 15, 2026", cost: 34000, difficulty: 75, scholarships: "Available" },
  { id: 209, name: "Univ. of Bristol", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Jan 31, 2026", cost: 30000, difficulty: 72, scholarships: "Think Big" },
  { id: 210, name: "Univ. of Warwick", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Jan 20, 2026", cost: 33000, difficulty: 74, scholarships: "Chancellor's" },
  { id: 211, name: "Univ. of Glasgow", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Dec 15, 2025", cost: 28000, difficulty: 70, scholarships: "Merit" },
  { id: 212, name: "Durham University", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Jan 15, 2026", cost: 29000, difficulty: 76, scholarships: "Available" },
  { id: 213, name: "Univ. of Birmingham", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Mar 01, 2026", cost: 27000, difficulty: 68, scholarships: "Achievement" },
  { id: 214, name: "Univ. of Leeds", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Mar 31, 2026", cost: 26000, difficulty: 65, scholarships: "Good" },
  { id: 215, name: "Univ. of Southampton", country: "UK", flag: "🇬🇧", intake: "Fall 2026", deadline: "Jan 31, 2026", cost: 25000, difficulty: 64, scholarships: "Available" },

  // --- CANADA (15) ---
  { id: 301, name: "Univ. of Toronto", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Jan 10, 2026", cost: 40000, difficulty: 85, scholarships: "Entrance" },
  { id: 302, name: "McGill University", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Jan 15, 2026", cost: 35000, difficulty: 84, scholarships: "Merit" },
  { id: 303, name: "UBC", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Jan 15, 2026", cost: 38000, difficulty: 82, scholarships: "Available" },
  { id: 304, name: "Univ. of Alberta", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Mar 01, 2026", cost: 28000, difficulty: 75, scholarships: "Good" },
  { id: 305, name: "Univ. of Waterloo", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Feb 01, 2026", cost: 32000, difficulty: 80, scholarships: "Limited" },
  { id: 306, name: "Western University", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Mar 01, 2026", cost: 30000, difficulty: 72, scholarships: "Available" },
  { id: 307, name: "Univ. of Montreal", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Feb 01, 2026", cost: 22000, difficulty: 74, scholarships: "Exemption" },
  { id: 308, name: "McMaster Univ.", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Apr 01, 2026", cost: 31000, difficulty: 76, scholarships: "Entrance" },
  { id: 309, name: "Univ. of Ottawa", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Apr 01, 2026", cost: 25000, difficulty: 70, scholarships: "Differential" },
  { id: 310, name: "Univ. of Calgary", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Mar 01, 2026", cost: 24000, difficulty: 68, scholarships: "Available" },
  { id: 311, name: "Queen's University", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Feb 15, 2026", cost: 33000, difficulty: 73, scholarships: "Merit" },
  { id: 312, name: "Dalhousie Univ.", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Apr 01, 2026", cost: 26000, difficulty: 65, scholarships: "Available" },
  { id: 313, name: "Simon Fraser Univ.", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Jan 31, 2026", cost: 29000, difficulty: 71, scholarships: "Entrance" },
  { id: 314, name: "Univ. of Victoria", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Feb 28, 2026", cost: 23000, difficulty: 66, scholarships: "Good" },
  { id: 315, name: "York University", country: "Canada", flag: "🇨🇦", intake: "Fall 2026", deadline: "Mar 15, 2026", cost: 27000, difficulty: 62, scholarships: "Global" },

  // --- GERMANY (15) ---
  { id: 401, name: "Tech Univ. Munich (TUM)", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "May 31, 2026", cost: 0, difficulty: 88, scholarships: "DAAD" },
  { id: 402, name: "LMU Munich", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "Jul 15, 2026", cost: 0, difficulty: 85, scholarships: "Deutschland" },
  { id: 403, name: "Heidelberg Univ.", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "Jul 15, 2026", cost: 3000, difficulty: 82, scholarships: "Available" },
  { id: 404, name: "Humboldt Univ. Berlin", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "Jul 15, 2026", cost: 0, difficulty: 80, scholarships: "Available" },
  { id: 405, name: "KIT Karlsruhe", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "Jun 15, 2026", cost: 3000, difficulty: 78, scholarships: "Available" },
  { id: 406, name: "RWTH Aachen", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "Mar 01, 2026", cost: 0, difficulty: 84, scholarships: "DAAD" },
  { id: 407, name: "TU Berlin", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "May 15, 2026", cost: 0, difficulty: 79, scholarships: "Merit" },
  { id: 408, name: "Univ. of Stuttgart", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "Jul 15, 2026", cost: 3000, difficulty: 75, scholarships: "Available" },
  { id: 409, name: "Univ. of Freiburg", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "Jul 15, 2026", cost: 3000, difficulty: 76, scholarships: "Available" },
  { id: 410, name: "TU Dresden", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "Jul 15, 2026", cost: 0, difficulty: 72, scholarships: "Available" },
  { id: 411, name: "Univ. of Tubingen", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "Jul 15, 2026", cost: 3000, difficulty: 74, scholarships: "Available" },
  { id: 412, name: "Univ. of Goettingen", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "Jun 15, 2026", cost: 0, difficulty: 73, scholarships: "Available" },
  { id: 413, name: "Univ. of Bonn", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "Jul 15, 2026", cost: 0, difficulty: 77, scholarships: "Available" },
  { id: 414, name: "Univ. of Hamburg", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "Jul 15, 2026", cost: 0, difficulty: 75, scholarships: "Available" },
  { id: 415, name: "TU Darmstadt", country: "Germany", flag: "🇩🇪", intake: "Winter 2026", deadline: "Jul 15, 2026", cost: 0, difficulty: 74, scholarships: "Available" },

  // --- AUSTRALIA (15) ---
  { id: 501, name: "Univ. of Melbourne", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Oct 31, 2025", cost: 42000, difficulty: 85, scholarships: "Global" },
  { id: 502, name: "Australian Nat. Univ (ANU)", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Nov 15, 2025", cost: 40000, difficulty: 82, scholarships: "Chancellor" },
  { id: 503, name: "Univ. of Sydney", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Dec 01, 2025", cost: 43000, difficulty: 84, scholarships: "VC Awards" },
  { id: 504, name: "UNSW Sydney", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Nov 30, 2025", cost: 41000, difficulty: 83, scholarships: "International" },
  { id: 505, name: "Univ. of Queensland", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Nov 30, 2025", cost: 39000, difficulty: 78, scholarships: "Available" },
  { id: 506, name: "Monash University", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Dec 01, 2025", cost: 38000, difficulty: 75, scholarships: "Good" },
  { id: 507, name: "Univ. of Western Aus.", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Dec 01, 2025", cost: 37000, difficulty: 76, scholarships: "Global" },
  { id: 508, name: "Univ. of Adelaide", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Dec 01, 2025", cost: 36000, difficulty: 72, scholarships: "Available" },
  { id: 509, name: "UTS", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Nov 30, 2025", cost: 35000, difficulty: 70, scholarships: "Merit" },
  { id: 510, name: "Macquarie University", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Dec 10, 2025", cost: 34000, difficulty: 65, scholarships: "Available" },
  { id: 511, name: "RMIT University", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Dec 15, 2025", cost: 33000, difficulty: 64, scholarships: "Available" },
  { id: 512, name: "QUT", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Dec 01, 2025", cost: 32000, difficulty: 63, scholarships: "Triple Crown" },
  { id: 513, name: "Curtin University", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Dec 01, 2025", cost: 31000, difficulty: 60, scholarships: "Merit" },
  { id: 514, name: "Griffith University", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Jan 15, 2026", cost: 30000, difficulty: 58, scholarships: "Remarkable" },
  { id: 515, name: "Univ. of Wollongong", country: "Australia", flag: "🇦🇺", intake: "Feb 2026", deadline: "Dec 31, 2025", cost: 29000, difficulty: 57, scholarships: "Available" },
];

export default function GamifiedUniversities({ initialView }: { initialView?: string }) {
  const { data: session } = useSession();
  const [lockedIds, setLockedIds] = useState<number[]>([]); // 🟢 Changed to Array for Multi-Lock
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // State - Initialize with prop or default to 'explore'
  const [activeList, setActiveList] = useState(initialView || "explore"); 
  const [shortlisted, setShortlisted] = useState<number[]>([]);
  const [notSure, setNotSure] = useState<number[]>([]);
  const [profileScore, setProfileScore] = useState(50); 
  const [isLoaded, setIsLoaded] = useState(false); // 🟢 Tracks if LocalStorage has loaded
  
  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCountry, setFilterCountry] = useState("All");
  const [filterIntake, setFilterIntake] = useState("All");
  const [filterCost, setFilterCost] = useState(100000); 

  // 🛠️ FIX 1: LOAD SHORTLIST FROM LOCAL STORAGE (Run Once)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("videsi_shortlist");
      if (saved) {
        try {
          setShortlisted(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse shortlist", e);
        }
      }
      setIsLoaded(true); // ✅ Mark as loaded so we don't overwrite it with empty array
    }
  }, []);

  // 🛠️ FIX 2: SAVE SHORTLIST TO LOCAL STORAGE (Only after loaded)
  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem("videsi_shortlist", JSON.stringify(shortlisted));
    }
  }, [shortlisted, isLoaded]);

  // Effect to update view when prop changes (from Dashboard)
  useEffect(() => {
     if (initialView) setActiveList(initialView);
  }, [initialView]);

  // 🟢 EFFECT: Sync Profile Score & Locked Status from NextAuth
  useEffect(() => {
    if (session?.user) {
       const meta = (session.user as any).metadata as any;
       
       // Handle Multi-Lock Array from Metadata
       if (meta?.lockedIds && Array.isArray(meta.lockedIds)) {
          setLockedIds(meta.lockedIds);
       } else if (meta?.lockedUniversityId) {
          // Backward compatibility for single ID
          setLockedIds([meta.lockedUniversityId]);
       }

       // Calculate Profile Score
       let score = 50; 
       const gpa = parseFloat(meta?.academic?.gpa || "0");
       if (gpa > 8.5 || gpa > 3.5) score += 20;
       if (meta?.exams?.gre > 310) score += 15;
       if (meta?.budget?.workExp > 0) score += 15;
       setProfileScore(score);
    }
  }, [session?.user]);

  // --- SERVER ACTIONS (Locking) ---
  const handleLock = async (uniId: number) => {
    if(confirm("Commit to this university? You can lock multiple options.")) {
        setLoadingId(uniId);
        await lockUniversity(uniId);
        setLockedIds(prev => [...prev, uniId]); // Optimistic Update
        setLoadingId(null);
    }
  };

  const handleUnlock = async (uniId: number) => {
    if(confirm("Unlock this university?")) {
        setLoadingId(uniId);
        await unlockUniversity(uniId);
        setLockedIds(prev => prev.filter(id => id !== uniId)); // Optimistic Update
        setLoadingId(null);
    }
  };

  // --- CLIENT ACTIONS ---
  const handleShortlist = (id: number) => {
    if (!shortlisted.includes(id)) {
        setShortlisted([...shortlisted, id]);
    }
    setNotSure(notSure.filter(uid => uid !== id));
  };

  const handleNotSure = (id: number) => {
    setNotSure([...notSure, id]);
    setShortlisted(shortlisted.filter(uid => uid !== id));
  };

  const handleRemove = (id: number) => {
    setShortlisted(shortlisted.filter(uid => uid !== id));
    setNotSure(notSure.filter(uid => uid !== id));
  };

  // --- FILTERING LOGIC ---
  const getDisplayUniversities = () => {
    let list = UNIVERSITY_DB;

    if (activeList === "shortlisted") {
      list = list.filter(u => shortlisted.includes(u.id));
    } else if (activeList === "notsure") {
      list = list.filter(u => notSure.includes(u.id));
    } else {
      // Explore Tab: Show everything EXCEPT what is already shortlisted/notsure
      list = list.filter(u => !shortlisted.includes(u.id) && !notSure.includes(u.id));
    }

    return list.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = filterCountry === "All" || u.country === filterCountry;
      const matchesIntake = filterIntake === "All" || u.intake.includes(filterIntake);
      const matchesCost = u.cost <= filterCost;
      return matchesSearch && matchesCountry && matchesIntake && matchesCost;
    });
  };

  const filteredUnis = getDisplayUniversities();

  return (
    <div className="animate-fade-in max-w-7xl mx-auto pb-20">
      
      {/* HEADER */}
      <header className="mb-10 text-center md:text-left">
         <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">🏛️ University Finder</h1>
         <p className="text-slate-500 font-medium text-lg">
            You have locked <span className="text-indigo-600 font-bold">{lockedIds.length}</span> universities.
         </p>
      </header>

      {/* CONTROLS CONTAINER */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-8 sticky top-4 z-20 backdrop-blur-xl bg-opacity-95">
         
         {/* TOP ROW: TABS & SEARCH */}
         <div className="flex flex-col md:flex-row gap-4 p-2">
            {/* TABS */}
            <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
               <TabButton label="Explore" count={UNIVERSITY_DB.length - shortlisted.length - notSure.length} active={activeList === 'explore'} onClick={() => setActiveList('explore')} />
               <TabButton label="Shortlist" count={shortlisted.length} active={activeList === 'shortlisted'} onClick={() => setActiveList('shortlisted')} />
               <TabButton label="Not Sure" count={notSure.length} active={activeList === 'notsure'} onClick={() => setActiveList('notsure')} />
            </div>

            {/* SEARCH */}
            <div className="flex-1 relative group">
               <span className="absolute left-3 top-3 text-slate-400 group-focus-within:text-indigo-500 transition-colors">🔍</span>
               <input 
                 type="text" 
                 placeholder="Search by university name..." 
                 className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700 transition-all hover:bg-white"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
         </div>

         {/* BOTTOM ROW: FILTERS */}
         <div className="flex flex-wrap gap-3 p-2 border-t border-slate-100 pt-3">
            <FilterSelect value={filterCountry} onChange={setFilterCountry} 
               options={['All', 'USA', 'UK', 'Germany', 'Canada', 'Australia']} label="Country" icon="🌍" />
            
            <FilterSelect value={filterIntake} onChange={setFilterIntake} 
               options={['All', 'Fall', 'Spring', 'Winter']} label="Intake" icon="📅" />

            <div className="ml-auto flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Max Budget</span>
               <input 
                  type="range" min="0" max="100000" step="5000" 
                  value={filterCost} 
                  onChange={(e) => setFilterCost(parseInt(e.target.value))}
                  className="accent-indigo-600 cursor-pointer"
               />
               <span className="text-sm font-bold text-slate-700 w-16 text-right">
                  {filterCost >= 100000 ? "Any" : `$${(filterCost/1000).toFixed(0)}k`}
               </span>
            </div>
         </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
         {filteredUnis.length > 0 ? (
            filteredUnis.map((uni) => {
               const isLocked = lockedIds.includes(uni.id);
               const isShortlisted = shortlisted.includes(uni.id);
               const isLoading = loadingId === uni.id;

               return (
                  <UniversityCard 
                     key={uni.id} 
                     uni={uni} 
                     profileScore={profileScore}
                     isLocked={isLocked}
                     isShortlisted={isShortlisted}
                     isLoading={isLoading}
                     onLock={() => handleLock(uni.id)}
                     onUnlock={() => handleUnlock(uni.id)}
                     onShortlist={() => handleShortlist(uni.id)}
                     onNotSure={() => handleNotSure(uni.id)}
                     onRemove={() => handleRemove(uni.id)}
                     activeTab={activeList}
                  />
               )
            })
         ) : (
            <div className="col-span-full py-32 text-center text-slate-400 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
               <div className="text-6xl mb-4 grayscale opacity-50">🏰</div>
               <h3 className="text-xl font-bold text-slate-600 mb-1">
                  {activeList === 'shortlisted' ? "Your Shortlist is Empty" : "No Kingdoms Found"}
               </h3>
               <p>
                  {activeList === 'shortlisted' ? "Go to 'Explore' and add universities here." : "Try adjusting your filters."}
               </p>
            </div>
         )}
      </div>

    </div>
  );
}

// --- SUB-COMPONENTS ---

function TabButton({ label, count, active, onClick }: any) {
   return (
      <button 
         onClick={onClick}
         className={`px-5 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2
         ${active ? 'bg-white text-indigo-600 shadow-md transform scale-105' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
      >
         {label}
         {count > 0 && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-indigo-100' : 'bg-slate-200'}`}>
               {count}
            </span>
         )}
      </button>
   )
}

function FilterSelect({ value, onChange, options, label, icon }: any) {
   return (
      <div className="relative">
         <span className="absolute left-3 top-2.5 text-xs">{icon}</span>
         <select 
            className="pl-8 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none hover:border-indigo-300 focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
            value={value} onChange={(e) => onChange(e.target.value)}
         >
            {options.map((opt: string) => (
               <option key={opt} value={opt}>{opt === 'All' ? `All ${label}s` : opt}</option>
            ))}
         </select>
         <span className="absolute right-3 top-3 text-[10px] text-slate-400">▼</span>
      </div>
   )
}

function UniversityCard({ uni, profileScore, isLocked, isShortlisted, isLoading, onLock, onUnlock, onShortlist, onNotSure, onRemove, activeTab }: any) {
   // Logic for Admission Chance
   let chance = "Low";
   let badgeColor = "bg-red-50 text-red-600 border-red-100";
   
   if (profileScore >= uni.difficulty + 5) {
      chance = "High";
      badgeColor = "bg-green-50 text-green-600 border-green-100";
   } else if (profileScore >= uni.difficulty - 10) {
      chance = "Medium";
      badgeColor = "bg-amber-50 text-amber-600 border-amber-100";
   }

   return (
      // ✨ 3D POP + LIGHT INDIGO HOVER (BOOSTED)
      <div className={`group relative bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col h-full
         ${isLocked ? 'border-purple-400 shadow-xl shadow-purple-100 scale-[1.02]' : 'border-slate-200 hover:border-indigo-300 hover:shadow-xl'}`}>
         
         {/* Locked Badge */}
         {isLocked && (
             <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                 <CheckCircle size={10} /> Locked Choice
             </div>
         )}

         {/* Header Section */}
         <div className="flex justify-between items-start mb-4">
            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
               {uni.flag}
            </div>
            {/* Chance Badge - Inside the card */}
            <div className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${badgeColor}`}>
               {chance} Chance
            </div>
         </div>

         <div className="mb-6 flex-grow">
            <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
               {uni.name}
            </h3>
            <p className="text-slate-500 text-sm font-medium">{uni.country}</p>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-2 gap-3 mb-6">
            <InfoBadge label="Intake" value={uni.intake} icon="📅" />
            <InfoBadge label="Cost/Yr" value={uni.cost === 0 ? "Free" : `$${(uni.cost/1000).toFixed(0)}k`} icon="💰" />
            <InfoBadge label="Deadline" value={uni.deadline} icon="⏳" highlight />
            <div className="bg-white border border-slate-100 rounded-xl p-2.5 flex flex-col justify-center">
               <span className="text-[10px] text-slate-400 font-bold uppercase">Aid</span>
               <span className="text-xs font-bold text-indigo-600 truncate">{uni.scholarships.includes("Available") || uni.scholarships.includes("Merit") ? "Yes" : "Limited"}</span>
            </div>
         </div>

         {/* Actions */}
         <div className="mt-auto pt-4 border-t border-slate-100 flex gap-3 opacity-90 group-hover:opacity-100 transition-opacity">
            {activeTab === 'explore' ? (
               <>
                  <button 
                     onClick={onShortlist} 
                     disabled={isShortlisted}
                     className={`flex-1 py-3 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2
                     ${isShortlisted ? 'bg-green-100 text-green-700 cursor-default' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
                  >
                     {isShortlisted ? <><CheckCircle size={16}/> Added</> : <><Heart size={16}/> Shortlist</>}
                  </button>
                  <button onClick={onNotSure} className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-slate-100 text-xl hover:bg-white hover:border-slate-300 transition-all bg-slate-50 active:scale-95" title="Not Sure">
                     🤔
                  </button>
               </>
            ) : (
               // SHORTLIST ACTIONS
               <>
                  {isLocked ? (
                      <button 
                         onClick={onUnlock} 
                         disabled={isLoading}
                         className="flex-1 bg-red-50 text-red-600 border border-red-100 py-3 rounded-xl font-bold text-sm hover:bg-red-100 transition flex items-center justify-center gap-2"
                      >
                         {isLoading ? "..." : <><Unlock size={16} /> Unlock</>}
                      </button>
                  ) : (
                      // ✨ PASTEL LOCK BUTTON ✨
                      <button 
                         onClick={onLock} 
                         disabled={isLoading}
                         className="flex-1 bg-purple-100 text-purple-900 border border-purple-200 py-3 rounded-xl font-bold text-sm hover:bg-purple-200 transition flex items-center justify-center gap-2 shadow-sm"
                      >
                         {isLoading ? "..." : <><Lock size={16} /> Commit & Lock</>}
                      </button>
                  )}
                  
                  {!isLocked && (
                      <button onClick={onRemove} className="w-12 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 transition">
                         <Trash2 size={18}/>
                      </button>
                  )}
               </>
            )}
         </div>
      </div>
   )
}

function InfoBadge({ label, value, icon, highlight }: any) {
   return (
      <div className={`rounded-xl p-2.5 flex flex-col justify-center border ${highlight ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100 group-hover:bg-white group-hover:border-indigo-100 transition-colors'}`}>
         <span className={`text-[10px] font-bold uppercase mb-0.5 ${highlight ? 'text-red-400' : 'text-slate-400'}`}>
            {icon} {label}
         </span>
         <span className={`text-sm font-bold truncate ${highlight ? 'text-red-600' : 'text-slate-700'}`}>
            {value}
         </span>
      </div>
   )
}