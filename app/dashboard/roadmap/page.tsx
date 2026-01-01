"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function StudentRoadmap() {
  
  // Roadmap Data
  const [steps, setSteps] = useState([
    { 
      id: 1, 
      month: "April - May", 
      title: "Research & Prep 🔍", 
      desc: "Start exploring countries and courses. Prepare for standardized tests.",
      completed: true,
      tasks: [
        { id: 101, name: "Decide target country (USA/UK/Germany)", done: true },
        { id: 102, name: "Check eligibility requirements", done: true },
        { id: 103, name: "Register for GRE / IELTS", done: true }
      ]
    },
    { 
      id: 2, 
      month: "June - August", 
      title: "Tests & Documentation 📝", 
      desc: "Take your exams and start gathering your transcripts and LORs.",
      completed: false,
      tasks: [
        { id: 201, name: "Take GRE/GMAT exam", done: false },
        { id: 202, name: "Take IELTS/TOEFL exam", done: false },
        { id: 203, name: "Draft Statement of Purpose (SOP)", done: false },
        { id: 204, name: "Request LORs from professors", done: false }
      ]
    },
    { 
      id: 3, 
      month: "September - November", 
      title: "Applications 🚀", 
      desc: "Shortlist universities and submit your applications before deadlines.",
      completed: false,
      tasks: [
        { id: 301, name: "Shortlist 8-10 Universities", done: false },
        { id: 302, name: "Fill application forms", done: false },
        { id: 303, name: "Pay application fees", done: false }
      ]
    },
    { 
      id: 4, 
      month: "December - February", 
      title: "Offers & Finances 💰", 
      desc: "Receive offer letters, finalize one, and arrange your loan/funding.",
      completed: false,
      tasks: [
        { id: 401, name: "Receive Offer Letters", done: false },
        { id: 402, name: "Pay seat deposit", done: false },
        { id: 403, name: "Apply for Education Loan", done: false }
      ]
    },
    { 
      id: 5, 
      month: "March - June", 
      title: "Visa & Departure ✈️", 
      desc: "Book your visa slot, attend the interview, and book flight tickets.",
      completed: false,
      tasks: [
        { id: 501, name: "Book US Visa Slot", done: false },
        { id: 502, name: "Attend Visa Interview", done: false },
        { id: 503, name: "Book Flight Tickets", done: false }
      ]
    }
  ]);

  // Toggle Checkbox Logic
  const toggleTask = (stepId: number, taskId: number) => {
    const newSteps = steps.map(step => {
      if (step.id === stepId) {
        const newTasks = step.tasks.map(task => 
          task.id === taskId ? { ...task, done: !task.done } : task
        );
        // Check if all tasks in this step are done
        const allDone = newTasks.every(t => t.done);
        return { ...step, tasks: newTasks, completed: allDone };
      }
      return step;
    });
    setSteps(newSteps);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-bold transition">
             <span>←</span> Back to Dashboard
          </Link>
          <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-6">
            Guide
          </div>
          <Link href="/dashboard/roadmap" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold transition">
             📍 My Roadmap
          </Link>
          <Link href="/dashboard/visa" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             🛂 Visa Guide
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Your Journey Roadmap 🗺️</h1>
          <p className="text-slate-500 mt-1">Follow these steps to ensure you don't miss any deadlines.</p>
        </header>

        {/* PROGRESS BAR */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 sticky top-4 z-10">
          <div className="flex justify-between items-end mb-2">
            <h2 className="font-bold text-slate-700">Overall Progress</h2>
            <span className="font-bold text-indigo-600 text-xl">20%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div className="bg-indigo-600 h-3 rounded-full w-1/5"></div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="max-w-3xl relative">
          
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>

          <div className="space-y-12">
            {steps.map((step) => (
              <div key={step.id} className="relative pl-24 group">
                
                {/* Number Circle */}
                <div className={`absolute left-0 top-0 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-4 z-10 transition
                  ${step.completed 
                    ? 'bg-emerald-500 border-emerald-100 text-white shadow-emerald-200 shadow-lg' 
                    : 'bg-white border-slate-200 text-slate-400 group-hover:border-indigo-400 group-hover:text-indigo-500'}
                `}>
                  {step.completed ? '✓' : step.id}
                </div>

                {/* Content Card */}
                <div className={`bg-white p-6 rounded-2xl border transition
                   ${step.completed ? 'border-emerald-200 shadow-sm' : 'border-slate-200 shadow-sm group-hover:shadow-md'}
                `}>
                  <div className="flex justify-between items-start mb-2">
                     <h3 className={`font-bold text-xl ${step.completed ? 'text-emerald-800' : 'text-slate-800'}`}>
                       {step.title}
                     </h3>
                     <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                       {step.month}
                     </span>
                  </div>
                  <p className="text-slate-500 mb-6">{step.desc}</p>

                  {/* Checklist Items */}
                  <div className="space-y-3">
                    {step.tasks.map(task => (
                      <label key={task.id} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg -ml-2 transition">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center text-xs text-white transition
                          ${task.done ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'}
                        `}>
                          {task.done && '✓'}
                        </div>
                        <input 
                          type="checkbox" 
                          checked={task.done} 
                          onChange={() => toggleTask(step.id, task.id)}
                          className="hidden" 
                        />
                        <span className={`text-sm font-medium ${task.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                          {task.name}
                        </span>
                      </label>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </main>
    </div>
  );
}