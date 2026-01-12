import React from 'react';
import Link from 'next/link';
import { syncUser } from "@/app/actions"; // 👈 Import the backend action

export default async function StudentDashboard() { // 👈 Must be async
  
  // 👇 This line runs the backend sync automatically!
  const user = await syncUser(); 

  // ... (Keep the rest of your existing Dashboard code below) ...
  // ... (But update the Welcome H1 to use the real name) ...

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* ... keep sidebar ... */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="flex justify-between items-center mb-8">
          <div>
            {/* 👇 REAL USER NAME FROM DATABASE */}
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome back, {user?.firstName || "Student"}! 👋
            </h1>
            <p className="text-slate-500 mt-1">Here is your daily activity overview.</p>
          </div>
          <div className="flex gap-4">
             {/* ... keep buttons ... */}
          </div>
        </header>

        {/* ... keep the rest of your dashboard UI ... */}
      </main>
    </div>
  );
}