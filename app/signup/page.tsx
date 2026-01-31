"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signupWithEmail } from "@/app/actions";

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [error, setError] = useState("");
  const fullText = "Create your profile and let our AI build your personalized study abroad roadmap.";

  // Typing effect
  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [displayedText, fullText]);

  const handleGoogleSignup = () => {
    signIn("google", { callbackUrl: "/onboarding" });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      // Call signup action
      const result = await signupWithEmail(firstName, lastName, email, password);
      
      if (result.success) {
        // After signup, sign in with the credentials
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInResult?.ok) {
          router.push("/onboarding");
        } else {
          setError("Signup successful but login failed. Please try logging in.");
        }
      } else {
        setError(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans text-slate-900">
      
      {/* 🟣 LEFT SIDE: Purple Gradient with Glass Card */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#6B5DF9] via-[#5B4DF5] to-[#3D2FE0] relative items-center justify-center p-8 overflow-hidden">
         
         {/* Animated Gradient Orbs */}
         <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
         
         {/* THE GLASS CARD - LARGER */}
         <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 p-16 rounded-4xl text-center shadow-2xl relative z-10">
            
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-4xl"></div>
            
            {/* ✨ DANCING SCRIPT FONT - LARGER */}
            <h1 className="text-7xl text-white font-[family-name:var(--font-brand)] mb-10 drop-shadow-lg whitespace-nowrap leading-tight">
                Join the Journey
            </h1>
            
            {/* Typing Effect Text - LARGER */}
            <p className="text-indigo-100 text-lg leading-relaxed font-light opacity-95 min-h-24 flex items-center justify-center">
                <span className="inline-block">{displayedText}</span>
                <span className={`inline-block w-1.5 h-6 ml-1 bg-indigo-200 transition-opacity duration-300 ${displayedText.length < fullText.length ? 'animate-pulse opacity-100' : 'opacity-0'}`}></span>
            </p>
         </div>
      </div>

      {/* ⚪ RIGHT SIDE: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 shadow-xl">
            
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
                <p className="text-slate-400 text-sm mt-2">Start your global education journey today.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Google Button */}
            <button
                onClick={handleGoogleSignup}
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 active:bg-slate-100 py-3.5 rounded-2xl font-semibold transition-all shadow-sm mb-8"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <image href="https://www.svgrepo.com/show/475656/google-color.svg" width="24" height="24" />
                </svg>
                <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative flex py-4 items-center mb-8">
                <div className="flex-grow border-t border-slate-300"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase font-bold tracking-wider">OR REGISTER WITH EMAIL</span>
                <div className="flex-grow border-t border-slate-300"></div>
            </div>

            <form className="space-y-5" onSubmit={handleSignup}>
                
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600">First Name</label>
                        <input 
                            type="text" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name" 
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6B5DF9] focus:border-transparent transition-all font-medium" 
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600">Last Name</label>
                        <input 
                            type="text" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name" 
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6B5DF9] focus:border-transparent transition-all font-medium" 
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email" 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6B5DF9] focus:border-transparent transition-all font-medium" 
                        required
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password" 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6B5DF9] focus:border-transparent transition-all font-medium" 
                        required
                    />
                </div>
                
                {/* Continue Button - Dark */}
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-800 hover:bg-slate-900 active:bg-black disabled:opacity-70 text-white py-3.5 rounded-xl font-bold shadow-lg transition-all mt-8"
                >
                    {isLoading ? "Creating Account..." : "Continue"}
                </button>
            </form>

            <p className="text-center text-slate-400 mt-10 text-sm font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-[#6B5DF9] font-bold hover:text-[#5a4ce8] transition-colors">
                Sign in
              </Link>
            </p>

        </div>
      </div>
    </div>
  );
}