"use client";
import dynamic from "next/dynamic";

// 👇 Move the dynamic import here (Client Component)
const CodeGlobe = dynamic(() => import("./CodeGlobe"), { 
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-transparent"></div>
});

export default function GlobeWrapper() {
  return <CodeGlobe />;
}