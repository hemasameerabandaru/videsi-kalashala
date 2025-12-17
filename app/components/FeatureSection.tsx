"use client";
import React from 'react';

export default function FeatureSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Students <span className="text-indigo-600">Love Us</span> 💙
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Old consultancies make you wait. We make it happen instantly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🚀
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Real-Time Tracking</h3>
            <p className="text-slate-500 leading-relaxed">
              No more "We will call you back." See your application move from 'Submitted' to 'Accepted' live on your dashboard.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
              📹
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Instant Video Calls</h3>
            <p className="text-slate-500 leading-relaxed">
              Talk to university alumni or certified counselors face-to-face instantly. No appointments needed.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🤖
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">AI Probability Match</h3>
            <p className="text-slate-500 leading-relaxed">
              Stop guessing. Our AI analyzes 10,000+ profiles to tell you exactly where you can get a scholarship.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}