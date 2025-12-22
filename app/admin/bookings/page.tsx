"use client";
import React, { useState } from 'react';

export default function AdminBookings() {
  // Mock Data: Calls booked by students
  const [bookings, setBookings] = useState([
    { id: 1, student: "Rohan Das", mentor: "Anjali Mehta", date: "Today", time: "10:00 AM", status: "Upcoming", link: "https://meet.google.com/abc-defg-hij" },
    { id: 2, student: "Sarah Khan", mentor: "David Smith", date: "Today", time: "02:00 PM", status: "Upcoming", link: "https://meet.google.com/xyz-uvw-lmn" },
    { id: 3, student: "Amit Verma", mentor: "Dr. Emily Chen", date: "Tomorrow", time: "11:30 AM", status: "Confirmed", link: "" },
    { id: 4, student: "Priya Sharma", mentor: "Anjali Mehta", date: "Dec 24", time: "04:30 PM", status: "Pending", link: "" },
  ]);

  const handleStatusChange = (id: number, newStatus: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleCancel = (id: number) => {
    if(confirm("Are you sure you want to cancel this meeting?")) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  return (
    <main className="p-8 bg-slate-100 min-h-screen">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Mentorship Bookings 📅</h1>
          <p className="text-slate-500 mt-1">Manage your upcoming student consultation calls.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Calls</span>
          <p className="text-xl font-bold text-indigo-600">{bookings.filter(b => b.status === 'Upcoming').length}</p>
        </div>
      </header>

      {/* BOOKINGS TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Mentor Requested</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-bold text-slate-800">{booking.student}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                    {booking.mentor.charAt(0)}
                  </div>
                  {booking.mentor}
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-700">{booking.date}</span>
                  <span className="text-slate-400 mx-1">•</span>
                  <span>{booking.time}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    booking.status === 'Upcoming' ? 'bg-emerald-100 text-emerald-700 animate-pulse' :
                    booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  {booking.status === 'Upcoming' && (
                    <a 
                      href={booking.link} 
                      target="_blank"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-indigo-700 transition shadow-md"
                    >
                      Join Call 📹
                    </a>
                  )}
                  {booking.status !== 'Upcoming' && (
                    <button 
                      onClick={() => handleStatusChange(booking.id, 'Upcoming')}
                      className="text-indigo-600 font-bold text-xs hover:underline"
                    >
                      Approve
                    </button>
                  )}
                  <button 
                    onClick={() => handleCancel(booking.id)}
                    className="text-red-400 font-bold text-xs hover:text-red-600 transition"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            No bookings found. Time to relax! ☕
          </div>
        )}
      </div>

    </main>
  );
}