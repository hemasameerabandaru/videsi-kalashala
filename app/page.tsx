import Link from "next/link";
import Image from "next/image"; // Added for optimization if needed, or use <img>

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* 🌟 NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl mr-1">🎓</span>
            <Link href="/">
               <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent tracking-tight cursor-pointer">
               Videsi Kalashala
               </h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="#why-us" className="hover:text-indigo-600 transition">Why Us</Link>
            <Link href="#features" className="hover:text-indigo-600 transition">Features</Link>
            <Link href="#how-it-works" className="hover:text-indigo-600 transition">How it works</Link>
            <Link href="#testimonials" className="hover:text-indigo-600 transition">Stories</Link>
            
            {/* LOGIN BUTTON */}
            <Link href="/sign-in">
              <button className="bg-indigo-50 text-indigo-600 px-6 py-2.5 rounded-full hover:bg-indigo-100 transition border border-indigo-200">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 🚀 HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-100/50 rounded-full blur-3xl opacity-70 animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block mb-6 bg-indigo-50 border border-indigo-100 rounded-full px-5 py-2 text-sm font-bold text-indigo-600 uppercase tracking-wider animate-fade-in-up">
            🚀 AI-Powered Study Abroad
          </span>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight animate-fade-in-up delay-100">
            Your Dream University <br/> is just a 
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent px-2">
                click away.
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Navigate the entire journey—from university shortlisting to visa interviews—with our gamified platform and AI assistants.
          </p>
          
          {/* START BUTTON */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300">
            <Link href="/sign-up">
              <button className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-indigo-200/50">
                Start Your Journey Now ➜
              </button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto animate-fade-in-up delay-400">
             <StatBox label="Universities" value="5000+" />
             <StatBox label="Success Rate" value="98%" />
             <StatBox label="AI Tools" value="15+" />
             <StatBox label="Students Placed" value="10k+" />
          </div>
        </div>
      </section>

      {/* 🌟 NEW SECTION: WHY CHOOSE VIDESI KALASHALA */}
      <section id="why-us" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* LEFT CONTENT */}
            <div className="lg:w-1/2 space-y-8">
              <div>
                <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">The Videsi Advantage</h3>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
                  Why Choose <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    Videsi Kalashala?
                  </span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Traditional counselling is expensive, biased, and time-consuming. 
                  Our AI-powered platform gives you instant, personalized, and accurate guidance.
                </p>
              </div>

              {/* Feature List */}
              <div className="space-y-6">
                <WhyUsItem 
                  icon="⚡"
                  title="Instant Responses"
                  desc="Get answers in seconds, not days."
                />
                <WhyUsItem 
                  icon="⚖️"
                  title="Unbiased Recommendations"
                  desc="AI suggests best fit, not highest commission."
                />
                <WhyUsItem 
                  icon="🔍"
                  title="Complete Transparency"
                  desc="See exactly why each university is recommended."
                />
                <WhyUsItem 
                  icon="🕰️"
                  title="24/7 Availability"
                  desc="Ask questions anytime, anywhere."
                />
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="lg:w-1/2 relative">
               <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] opacity-20 blur-2xl"></div>
               <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                    alt="Students using AI technology" 
                    className="w-full h-auto object-cover"
                  />
                  {/* Floating Badge */}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-white/50">
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div>
                           <p className="text-xs font-bold text-slate-500 uppercase">Status</p>
                           <p className="font-bold text-slate-900">AI System Online</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ✨ FEATURES SECTION */}
      <section id="features" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
             <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Our Toolkit</h3>
             <h2 className="text-4xl font-bold text-slate-900">Everything you need in one place.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🧠"
              title="AI-Driven Matching" 
              desc="Our algorithm finds the perfect universities based on your profile, GRE/IELTS scores, and interests." 
              color="blue"
            />
            <FeatureCard 
              icon="🎮"
              title="Gamified Roadmap" 
              desc="Turn the daunting process into an exciting journey. Earn XP, unlock levels, and stay motivated." 
              color="indigo"
            />
            <FeatureCard 
              icon="🤖"
              title="24/7 AI Mentors" 
              desc="Get instant answers for SOP writing, visa questions, and living costs from our specialized bots." 
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* 🛠️ HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Simple Process</h3>
               <h2 className="text-4xl font-bold text-slate-900">Your 4-step journey to success.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <StepCard number="1" title="Profile Setup" desc="Enter your grades, test scores, and preferences to kickstart the AI." color="bg-blue-500" />
               <StepCard number="2" title="AI Shortlisting" desc="Get a curated list of universities with high acceptance chances." color="bg-indigo-500" />
               <StepCard number="3" title="Docs & Apply" desc="Use our tools to draft SOPs and track applications easily." color="bg-purple-500" />
               <StepCard number="4" title="Visa & Fly" desc="Prepare for mock interviews and sort your finances with AI." color="bg-pink-500" />
            </div>
         </div>
      </section>

      {/* 💬 TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-slate-50 relative">
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-60"></div>
         </div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Student Stories</h3>
               <h2 className="text-4xl font-bold text-slate-900">Don't just take our word for it.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <TestimonialCard name="Riya S." uni="Stanford University" quote="The AI recommendations were spot on! The gamified roadmap kept me on track without the usual stress. Made it to my dream uni!" img="👩‍🎓" />
               <TestimonialCard name="Rahul K." uni="TU Munich (Germany)" quote="I was confused about German university requirements. The AI clarified everything, and the cost calculator was a lifesaver." img="👨‍🎓" />
               <TestimonialCard name="Anita D." uni="Univ. of Toronto" quote="The Visa Mock AI was incredible. It asked the exact questions I faced in the real interview. Felt totally prepared." img="👩‍💻" />
            </div>
         </div>
      </section>

      {/* ⚡ CTA SECTION */}
      <section className="py-24 bg-indigo-600 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-90"></div>
         <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

         <div className="max-w-5xl mx-auto px-6 text-center text-white relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white">
               Ready to start your study abroad adventure?
            </h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
               Join thousands of students who found their best-fit university with Videsi Kalashala.
            </p>
            <Link href="/dashboard">
              <button className="bg-white text-indigo-600 px-12 py-4 rounded-full font-bold text-xl hover:bg-indigo-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-lg">
                Create Free Account ➜
              </button>
            </Link>
         </div>
      </section>

      {/* 🦶 FOOTER */}
      <footer className="py-12 bg-slate-100 text-slate-600 border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
               <span className="text-2xl">🎓</span>
               <h2 className="font-bold text-xl text-slate-800">Videsi Kalashala</h2>
            </div>
            <p className="text-sm font-medium">© 2024 Videsi Kalashala. Crafted for aspirants.</p>
            <div className="flex gap-6 text-sm font-bold">
               <a href="#" className="hover:text-indigo-600 transition">Terms</a>
               <a href="#" className="hover:text-indigo-600 transition">Privacy</a>
               <a href="#" className="hover:text-indigo-600 transition">Contact</a>
            </div>
         </div>
      </footer>

    </div>
  );
}

// --- 🧩 SUB-COMPONENTS ---

function StatBox({ label, value }: any) {
   return (
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
         <h3 className="text-3xl font-extrabold text-indigo-600 mb-1">{value}</h3>
         <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</p>
      </div>
   )
}

// 👇 NEW HELPER FOR WHY US SECTION
function WhyUsItem({ icon, title, desc }: any) {
   return (
      <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-300">
         <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl shadow-sm shrink-0">
            {icon}
         </div>
         <div>
            <h4 className="text-lg font-bold text-slate-900 mb-1">{title}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
         </div>
      </div>
   )
}

function FeatureCard({ icon, title, desc, color }: any) {
   const colors: any = {
      blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
      indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
      purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white"
   };

   return (
      <div className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 relative overflow-hidden">
         <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-all duration-300 ${colors[color]}`}>
            {icon}
         </div>
         <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
         <p className="text-slate-600 leading-relaxed">{desc}</p>
      </div>
   )
}

function StepCard({ number, title, desc, color }: any) {
   return (
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 relative group overflow-hidden z-10">
         <div className={`absolute top-0 left-0 w-full h-1.5 ${color}`}></div>
         <div className={`w-12 h-12 ${color} text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4 shadow-md group-hover:scale-110 transition-transform`}>
            {number}
         </div>
         <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
         <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
      </div>
   )
}

function TestimonialCard({ name, uni, quote, img }: any) {
   return (
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative">
         <div className="text-4xl absolute top-6 right-6 opacity-10 text-indigo-600">❝</div>
         <p className="text-slate-700 italic mb-8 text-lg leading-relaxed relative z-10">"{quote}"</p>
         <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-3xl border-2 border-white shadow-md">
               {img}
            </div>
            <div>
               <h4 className="font-bold text-slate-900">{name}</h4>
               <p className="text-sm text-indigo-600 font-medium">{uni}</p>
            </div>
         </div>
      </div>
   )
}