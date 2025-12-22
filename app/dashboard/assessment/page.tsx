"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function CourseMatcher() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [result, setResult] = useState<any>(null);

  const questions = [
    {
      id: "budget",
      question: "💰 What is your yearly tuition budget?",
      options: [
        { label: "Low (Under ₹15L)", value: "low" },
        { label: "Medium (₹15L - ₹30L)", value: "med" },
        { label: "High (₹30L+)", value: "high" }
      ]
    },
    {
      id: "interest",
      question: "🧠 What interests you the most?",
      options: [
        { label: "Coding & Tech", value: "tech" },
        { label: "Business & Management", value: "biz" },
        { label: "Art & Design", value: "art" },
        { label: "Science & Research", value: "sci" }
      ]
    },
    {
      id: "weather",
      question: "🌤️ What kind of weather do you prefer?",
      options: [
        { label: "I love the Cold / Snow", value: "cold" },
        { label: "Sunny & Warm", value: "warm" },
        { label: "I don't care", value: "any" }
      ]
    },
    {
      id: "work",
      question: "💼 Post-study goal?",
      options: [
        { label: "Settle there permanently (PR)", value: "pr" },
        { label: "Work for few years then return", value: "work" },
        { label: "High Salary is priority", value: "money" }
      ]
    }
  ];

  const handleAnswer = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult({ ...answers, [key]: value });
    }
  };

  const calculateResult = (finalAnswers: any) => {
    // Simple Logic for Demo
    let suggestion = { country: "USA 🇺🇸", course: "MS in Computer Science", reason: "Best for high salaries and tech jobs." };

    if (finalAnswers.interest === 'biz') {
      suggestion = { country: "UK 🇬🇧", course: "MBA / MIM", reason: "Short 1-year masters with great networking." };
    }
    if (finalAnswers.budget === 'low' && finalAnswers.interest === 'tech') {
      suggestion = { country: "Germany 🇩🇪", course: "MSc Data Science", reason: "Almost zero tuition fees at public universities." };
    }
    if (finalAnswers.work === 'pr' || finalAnswers.weather === 'cold') {
      suggestion = { country: "Canada 🇨🇦", course: "PG Diploma / Masters", reason: "Simplest path to Permanent Residency (PR)." };
    }
    if (finalAnswers.weather === 'warm' && finalAnswers.interest === 'tech') {
      suggestion = { country: "Australia 🇦🇺", course: "Master of IT", reason: "Great lifestyle, weather, and 3-year post-study work visa." };
    }

    setResult(suggestion);
    setStep(questions.length);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">Videsi Kalashala</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto h-[calc(100vh-180px)]">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition">
             <span>←</span> Back to Dashboard
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-0 md:ml-64 flex flex-col justify-center items-center min-h-[90vh]">
        
        {step < questions.length ? (
          <div className="w-full max-w-xl animate-fade-in-up">
            <div className="mb-8">
               <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                 <span>Question {step + 1} of {questions.length}</span>
                 <span>{Math.round(((step) / questions.length) * 100)}%</span>
               </div>
               <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${((step) / questions.length) * 100}%` }}></div>
               </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center leading-tight">
              {questions[step].question}
            </h1>

            <div className="grid gap-4">
              {questions[step].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(questions[step].id, option.value)}
                  className="p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 transition font-bold text-slate-700 text-left text-lg group"
                >
                  <span className="inline-block w-6 h-6 rounded-full border-2 border-slate-300 mr-4 group-hover:border-indigo-600 group-hover:bg-indigo-600"></span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg text-center animate-bounce-in">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-2">We found your match!</h2>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6">
              You should study in <span className="text-indigo-600">{result.country}</span>
            </h1>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 mb-8 transform hover:scale-105 transition duration-300">
               <p className="text-sm font-bold text-slate-400 uppercase mb-2">Recommended Course</p>
               <p className="text-2xl font-bold text-slate-800 mb-4">{result.course}</p>
               <div className="h-px w-full bg-slate-100 mb-4"></div>
               <p className="text-slate-600 italic">" {result.reason} "</p>
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={() => {setStep(0); setAnswers({});}} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition">
                Retake Quiz 🔄
              </button>
              <Link href="/dashboard/universities" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg">
                View Universities 🎓
              </Link>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}