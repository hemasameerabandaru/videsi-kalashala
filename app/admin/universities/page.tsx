import React from 'react';
import Link from 'next/link';
import { getUniversities, addUniversity, deleteUniversity } from "@/app/actions";
import { redirect } from 'next/navigation';

export default async function AdminUniversities() {
  
  // 👇 FETCH REAL DATA FROM DB
  const unis = await getUniversities();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-full">
        <div className="p-6 text-xl font-bold">🛡️ Admin Panel</div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin/dashboard" className="block px-4 py-3 text-slate-400 hover:text-white rounded-xl font-medium">📊 Dashboard</Link>
          <Link href="/admin/bookings" className="block px-4 py-3 text-slate-400 hover:text-white rounded-xl font-medium">📅 Bookings</Link>
          <Link href="/admin/universities" className="block px-4 py-3 bg-indigo-600 text-white rounded-xl font-bold">🏛️ Universities</Link>
          <Link href="/admin/students" className="block px-4 py-3 text-slate-400 hover:text-white rounded-xl font-medium">🎓 Students</Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">University Manager 🏛️</h1>
        </header>

        {/* ADD FORM (Server Action) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <h3 className="font-bold text-slate-800 mb-4">Add New University</h3>
          <form action={async (formData) => {
            "use server";
            await addUniversity(formData);
            redirect('/admin/universities'); // Refresh page
          }} className="flex gap-4">
            <input name="name" type="text" placeholder="University Name" required className="flex-1 p-3 border rounded-xl" />
            <input name="country" type="text" placeholder="Country" required className="w-32 p-3 border rounded-xl" />
            <input name="rank" type="text" placeholder="Rank #" required className="w-24 p-3 border rounded-xl" />
            <input name="fees" type="text" placeholder="Fees" required className="w-32 p-3 border rounded-xl" />
            <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700">Add +</button>
          </form>
        </div>

        {/* LIST */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Fees</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {unis.map((uni) => (
                <tr key={uni.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-800">{uni.name}</td>
                  <td className="px-6 py-4 text-sm font-medium">{uni.country}</td>
                  <td className="px-6 py-4 text-sm font-bold text-indigo-600">{uni.rank}</td>
                  <td className="px-6 py-4 text-sm font-medium">{uni.fees}</td>
                  <td className="px-6 py-4 text-right">
                    <form action={async () => {
                      "use server";
                      await deleteUniversity(uni.id);
                      redirect('/admin/universities');
                    }}>
                      <button className="text-red-400 hover:text-red-600 font-bold text-sm">Delete</button>
                    </form>
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