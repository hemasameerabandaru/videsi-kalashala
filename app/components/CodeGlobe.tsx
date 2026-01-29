"use client";
import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

function SnapStyleEarth() {
  const earthRef = useRef<THREE.Mesh>(null);

  // 1. LOAD TEXTURE
  // Ideally, use a local high-res map. For now, this standard one works.
  const [colorMap] = useLoader(TextureLoader, [
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg"
  ]);

  useFrame(({ clock }) => {
    if (earthRef.current) {
      // Slow, smooth rotation
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      {/* 🌍 THE GLOBE - REDUCED SCALE TO FIT */}
      <mesh ref={earthRef} scale={[3.0, 3.0, 3.0]}> 
        <sphereGeometry args={[1, 64, 64]} />
        
        {/* SNAPCHAT STYLE COLORS */}
        <meshStandardMaterial
          map={colorMap}
          color="#86efac"      // 🟢 Land: Pastel Green
          emissive="#22d3ee"   // 🔵 Glow: Cyan Blue
          emissiveIntensity={0.2}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* 🌊 OCEAN FILL */}
      <mesh scale={[2.15, 2.15, 2.15]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#0ea5e9" /> {/* Deep Blue Ocean */}
      </mesh>
    </group>
  );
}

export default function CodeGlobe() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* 👇 KEY FIX: 
         - Changed position z from 6 -> 8.5 (Moves camera back)
         - This prevents the globe from being cut off at the edges
      */}
      <Canvas 
        camera={{ position: [0, 0, 10.0], fov: 45 }} 
        gl={{ alpha: true, antialias: true }} 
        className="bg-transparent"
      >
        
        {/* LIGHTING */}
        <ambientLight intensity={3.0} color="#ffffff" /> 
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        
        <Suspense fallback={null}>
          <SnapStyleEarth />
        </Suspense>

        {/* CONTROLS */}
        <OrbitControls 
          enableZoom={true} 
          minDistance={3.5} 
          maxDistance={12}  
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}