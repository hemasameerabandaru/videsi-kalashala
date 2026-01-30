"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { BookOpen, Globe, CheckCircle, Briefcase, GraduationCap, DollarSign, ArrowRight, ArrowLeft } from "lucide-react";
// 👇 IMPORT THE ACTION HERE
import { completeOnboarding } from "@/app/actions";

export default function Onboarding() {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Bachelors
    collegeName: "",
    degree: "",
    major: "",
    gpa: "",
    gradYear: "",
    
    // Step 2: Study Goals
    targetDegree: "Masters",
    targetMajor: "",
    targetCountries: [] as string[],
    
    // Step 3: Exams
    examStatus: "Planning", // Taken, Planning
    ieltsScore: "",
    greScore: "",
    
    // Step 4: Budget & Experience
    workExp: "0",
    budget: "",
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  // 👇 UPDATED FINISH FUNCTION
  const handleFinish = async () => {
    setLoading(true);

    try {
      // 1. Call the Server Action to save data
      const res = await completeOnboarding(formData);

      if (res.message === "success") {
        // 2. Simulate AI Processing Delay (UX)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        // 3. Redirect to Dashboard
        router.push("/dashboard");
      } else {
        alert("Something went wrong saving your profile. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Onboarding Error:", error);
      alert("An unexpected error occurred.");
      setLoading(false);
    }
  };

  const updateForm = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const toggleCountry = (country: string) => {
    const current = formData.targetCountries;
    if (current.includes(country)) {
      updateForm("targetCountries", current.filter((c) => c !== country));
    } else {
      updateForm("targetCountries", [...current, country]);
    }
  };

  // 🎨 STEP CONTENT RENDERER
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎓</div>
              <h2 className="text-2xl font-bold text-slate-900">Academic Background</h2>
              <p className="text-slate-500">Let's start with your Bachelor's details.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputGroup label="College / University Name" placeholder="e.g. IIT Bombay" value={formData.collegeName} onChange={(v:any) => updateForm("collegeName", v)} />
              <InputGroup label="Degree Name" placeholder="e.g. B.Tech" value={formData.degree} onChange={(v:any) => updateForm("degree", v)} />
              <InputGroup label="Major / Stream" placeholder="e.g. Computer Science" value={formData.major} onChange={(v:any) => updateForm("major", v)} />
              <div className="grid grid-cols-2 gap-4">
                 <InputGroup label="CGPA / %" placeholder="e.g. 8.5" value={formData.gpa} onChange={(v:any) => updateForm("gpa", v)} />
                 <InputGroup label="Graduation Year" placeholder="e.g. 2024" value={formData.gradYear} onChange={(v:any) => updateForm("gradYear", v)} />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🌎</div>
              <h2 className="text-2xl font-bold text-slate-900">Study Abroad Goals</h2>
              <p className="text-slate-500">Where do you want to fly?</p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700">Target Degree</label>
              <div className="flex gap-4">
                {["Masters", "MBA", "PhD"].map((deg) => (
                   <button 
                     key={deg}
                     onClick={() => updateForm("targetDegree", deg)}
                     className={`flex-1 py-3 rounded-xl border font-bold transition-all
                     ${formData.targetDegree === deg ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                   >
                     {deg}
                   </button>
                ))}
              </div>

              <InputGroup label="Intended Course" placeholder="e.g. Data Science" value={formData.targetMajor} onChange={(v:any) => updateForm("targetMajor", v)} />

              <label className="block text-sm font-bold text-slate-700 mt-4">Preferred Countries</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["USA 🇺🇸", "UK 🇬🇧", "Canada 🇨🇦", "Germany 🇩🇪", "Australia 🇦🇺", "Ireland 🇮🇪", "France 🇫🇷", "Other 🌍"].map((c) => (
                   <button
                     key={c}
                     onClick={() => toggleCountry(c)}
                     className={`py-2 px-3 rounded-lg text-sm font-bold border transition-all
                     ${formData.targetCountries.includes(c) ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-200'}`}
                   >
                     {c}
                   </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📝</div>
               <h2 className="text-2xl font-bold text-slate-900">Exams & Scores</h2>
               <p className="text-slate-500">Have you taken any tests yet?</p>
            </div>

            <div className="bg-slate-50 p-1 rounded-xl flex mb-6">
               {["Planning to Take", "Already Taken"].map((status) => (
                  <button 
                     key={status} 
                     onClick={() => updateForm("examStatus", status)}
                     className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.examStatus === status ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
                  >
                     {status}
                  </button>
               ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
               <InputGroup label="IELTS / TOEFL Score" placeholder={formData.examStatus === 'Planning' ? 'Target Score' : 'Actual Score'} value={formData.ieltsScore} onChange={(v:any) => updateForm("ieltsScore", v)} />
               <InputGroup label="GRE / GMAT Score" placeholder={formData.examStatus === 'Planning' ? 'Target Score' : 'Actual Score'} value={formData.greScore} onChange={(v:any) => updateForm("greScore", v)} />
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-xl flex gap-3 items-start border border-indigo-100">
               <div className="bg-white p-2 rounded-full shadow-sm text-lg">💡</div>
               <div>
                  <h4 className="font-bold text-indigo-900 text-sm">AI Tip</h4>
                  <p className="text-xs text-indigo-700 mt-1">Don't worry if you haven't taken them yet. The AI will generate a prep roadmap for you!</p>
               </div>
            </div>
          </div>
        );
      case 4:
        return (
           <div className="space-y-6 animate-fade-in-up">
              <div className="text-center mb-8">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">💰</div>
                 <h2 className="text-2xl font-bold text-slate-900">Profile & Budget</h2>
                 <p className="text-slate-500">Help us find universities that fit your pocket.</p>
              </div>

              <label className="block text-sm font-bold text-slate-700">Work Experience (Years)</label>
              <input 
                 type="range" min="0" max="10" step="0.5" 
                 value={formData.workExp} 
                 onChange={(e) => updateForm("workExp", e.target.value)}
                 className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center font-bold text-indigo-600 text-lg">{formData.workExp} Years</div>

              <InputGroup label="Annual Budget (USD)" placeholder="e.g. $30,000" value={formData.budget} onChange={(v:any) => updateForm("budget", v)} />
              
              <div className="mt-4 flex items-center gap-3">
                 <input type="checkbox" className="w-5 h-5 accent-indigo-600 rounded" />
                 <span className="text-sm text-slate-600">I am interested in scholarships & financial aid.</span>
              </div>
           </div>
        )
      default: return null;
    }
  };

  if (loading) {
    return (
       <div className="min-h-screen flex flex-col items-center justify-center bg-white">
          <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-bold text-slate-900 animate-pulse">Building your Roadmap...</h2>
          <p className="text-slate-500 mt-2">AI is analyzing {formData.targetMajor} programs in {formData.targetCountries.join(", ")}.</p>
       </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col min-h-[600px]">
         
         {/* HEADER */}
         <div className="bg-white p-6 border-b border-slate-100 flex justify-between items-center">
            <span className="text-lg font-bold text-slate-800 flex items-center gap-2">
               <span className="text-2xl">🤖</span> AI Counsellor
            </span>
            <div className="flex gap-1">
               {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-2 w-8 rounded-full transition-all duration-500 ${i <= step ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
               ))}
            </div>
         </div>

         {/* CONTENT */}
         <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
            {renderStep()}
         </div>

         {/* FOOTER */}
         <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <button 
               onClick={handleBack}
               disabled={step === 1}
               className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
               ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-slate-200'}`}
            >
               <ArrowLeft size={20} /> Back
            </button>

            {step < 4 ? (
               <button 
                  onClick={handleNext}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 flex items-center gap-2 transition-transform hover:translate-x-1"
               >
                  Next Step <ArrowRight size={20} />
               </button>
            ) : (
               <button 
                  onClick={handleFinish}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-200 flex items-center gap-2 animate-bounce-slow"
               >
                  Finish Profile <CheckCircle size={20} />
               </button>
            )}
         </div>
      </div>
    </div>
  );
}

// Helper Component for Inputs
function InputGroup({ label, placeholder, value, onChange }: any) {
   return (
      <div>
         <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
         <input 
            type="text" 
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all font-medium placeholder:text-slate-400"
         />
      </div>
   )
}