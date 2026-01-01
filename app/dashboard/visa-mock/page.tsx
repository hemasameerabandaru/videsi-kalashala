"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VisaMockInterview() {
  
  // Interview State
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Mock Questions Bank
  const questions = [
    "Why did you choose this specific university?",
    "How will you fund your education in the USA?",
    "What are your plans after graduation?",
    "Why do you want to study in the USA and not in India?",
    "Tell me about your academic background."
  ];

  // Simulate Recording
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setFeedback(null);
    } else {
      setIsRecording(false);
      // Simulate "AI Analysis" delay
      setTimeout(() => {
        setFeedback("Good confidence! Try to be more specific about your course modules in the next answer.");
      }, 1000);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setFeedback(null);
      setIsRecording(false);
    } else {
      alert("Interview Completed! Great job.");
      setStarted(false);
      setCurrentQuestion(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white flex flex-col">
      
      {/* HEADER */}
      <header className="px-8 py-6 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-slate-400 hover:text-white transition">← Exit</Link>
          <span className="font-bold text-xl tracking-tight">AI Interview Trainer 🤖</span>
        </div>
        <div className="bg-slate-800 px-4 py-1.5 rounded-full text-xs font-bold text-slate-300">
          🇺🇸 F-1 Visa Mode
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        
        {!started ? (
          // 1. START SCREEN
          <div className="max-w-md animate-fade-in-up">
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-lg shadow-indigo-500/50">
              🎤
            </div>
            <h1 className="text-4xl font-bold mb-4">Ready to Practice?</h1>
            <p className="text-slate-400 mb-8 text-lg">
              I will ask you 5 common visa questions. Speak clearly and confidently. I'll give you instant feedback.
            </p>
            <button 
              onClick={() => setStarted(true)}
              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition hover:scale-105"
            >
              Start Interview
            </button>
            <p className="text-xs text-slate-600 mt-6">Ensure your microphone is enabled.</p>
          </div>
        ) : (
          // 2. INTERVIEW INTERFACE
          <div className="w-full max-w-3xl animate-fade-in-up">
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full mb-10 overflow-hidden">
               <div 
                 className="bg-indigo-500 h-full transition-all duration-500" 
                 style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
               ></div>
            </div>

            {/* AI Avatar / Visualization */}
            <div className="mb-10 relative">
               <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center text-4xl border-4 transition-all duration-300
                 ${isRecording ? 'border-red-500 bg-red-500/10 animate-pulse' : 'border-slate-700 bg-slate-800'}
               `}>
                 {isRecording ? '🎙️' : '🤖'}
               </div>
               {isRecording && (
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-12">
                   <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                     Listening...
                   </span>
                 </div>
               )}
            </div>

            {/* Question Card */}
            <div className="mb-12">
              <p className="text-indigo-400 font-bold text-sm uppercase tracking-wider mb-4">Question {currentQuestion + 1} of {questions.length}</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                "{questions[currentQuestion]}"
              </h2>
            </div>

            {/* Feedback Area */}
            {feedback && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl mb-8 text-left animate-fade-in-up">
                 <h3 className="text-emerald-400 font-bold text-sm uppercase mb-1">AI Feedback Analysis</h3>
                 <p className="text-emerald-100 text-lg">"{feedback}"</p>
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-4 justify-center">
              {!feedback ? (
                <button 
                  onClick={toggleRecording}
                  className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition
                    ${isRecording ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}
                  `}
                >
                  {isRecording ? (
                    <><span>⬛</span> Stop Recording</>
                  ) : (
                    <><span>🔴</span> Start Answer</>
                  )}
                </button>
              ) : (
                <button 
                  onClick={nextQuestion}
                  className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition flex items-center gap-2"
                >
                  Next Question →
                </button>
              )}
            </div>

          </div>
        )}

      </main>
    </div>
  );
}