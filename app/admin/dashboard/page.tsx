"use client";
import React, { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // 🔒 SECURITY CHECK
  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.push('/sign-in');
        return;
      }
      const currentEmail = user.primaryEmailAddress?.emailAddress.toLowerCase() || "";
      const adminEmail = "hemasameera15@gmail.com".toLowerCase();

      if (currentEmail !== adminEmail) {
        router.push('/dashboard');
      } else {
        setIsAuthorized(true);
      }
    }
  }, [isLoaded, user, router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // --- REAL ADMIN DASHBOARD CONTENT ---

  // Mock Data for the table
  const students = [
    { id: 1, name: "Rohan Das", email: "rohan@gmail.com", phone: "+91 98765 43210", stage: "Application", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya@yahoo.com", phone: "+91 99887 76655", stage: "Visa", status: "Critical" },
    { id: 3, name: "Amit Kumar", email: "amit.k@outlook.com", phone: "+91 88776 65544", stage: "Shortlisting", status: "New" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      
      {/* ADMIN NAVBAR */}
      <nav className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <span className="text-xl">🛡️</span>
             <span className="text-lg font-bold tracking-tight">Videsi Admin</span>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-sm text-slate-400">Admin: {user?.firstName}</span>
             <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-800">Welcome, Admin 👨‍✈️</h1>
        <p className="text-slate-500 mb-8">You have full control over the platform.</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <p className="text-slate-400 text-xs font-bold uppercase">Total Students</p>
             <p className="text-3xl font-extrabold text-slate-800 mt-1">1,240</p>
           </div>
           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <p className="text-slate-400 text-xs font-bold uppercase">Pending Apps</p>
             <p className="text-3xl font-extrabold text-orange-500 mt-1">45</p>
           </div>
        </div>

        {/* 👇 THIS IS THE MISSING TABLE SECTION 👇 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Recent Students</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Stage</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map(student => (
                <tr key={student.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{student.name}</div>
                    <div className="text-xs text-slate-400">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">
                    {student.phone}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                      {student.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     {student.status === 'Critical' ? (
                       <span className="text-red-600 font-bold text-xs flex items-center gap-1">
                         🔴 Action Req.
                       </span>
                     ) : (
                       <span className="text-emerald-600 font-bold text-xs">
                         🟢 Active
                       </span>
                     )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {/* 👇 THIS BUTTON LINKS TO THE DETAIL PAGE */}
                    <Link href={`/admin/students/${student.id}`} className="text-indigo-600 hover:underline text-sm font-bold">
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}