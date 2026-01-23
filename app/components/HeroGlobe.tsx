"use client";
import Spline from '@splinetool/react-spline';

export default function HeroGlobe() {
  return (
    // "w-full h-full" ensures it fills the space without forcing a specific box size
    <div className="w-full h-full flex items-center justify-center">
      <Spline scene="https://prod.spline.design/olGDdPJ8VVlE3kWQ/scene.splinecode" />
    </div>
  );
}