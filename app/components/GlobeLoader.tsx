"use client";
import dynamic from "next/dynamic";

// 👇 This logic is allowed here because we added "use client" at the top
const HeroGlobe = dynamic(() => import("./HeroGlobe"), { 
  ssr: false,
  loading: () => <div className="h-[500px] w-full bg-indigo-50 animate-pulse rounded-3xl"></div>
});

export default function GlobeLoader() {
  return <HeroGlobe />;
}