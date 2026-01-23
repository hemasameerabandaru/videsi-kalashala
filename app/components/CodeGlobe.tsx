"use client";
import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Load High-Res Textures
  const [colorMap, normalMap, cloudsMap] = useLoader(TextureLoader, [
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
  ]);

  useFrame(() => {
    // Rotation Logic
    if (earthRef.current) earthRef.current.rotation.y += 0.001;
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0015;
  });

  return (
    <group>
      {/* 🌍 1. MAIN EARTH */}
      {/* Reduced scale slightly (2.8 -> 2.4) so it doesn't get cut off */}
      <mesh ref={earthRef} scale={[2.4, 2.4, 2.4]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughness={0.7}
          metalness={0.1}
          color="#ffffff"
        />
      </mesh>

      {/* ☁️ 2. CLOUDS */}
      <mesh ref={cloudsRef} scale={[2.43, 2.43, 2.43]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function CodeGlobe() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* 👇 KEY FIX: 
         - Moved Camera Back (z: 8.5)
         - Adjusted FOV (45)
         This ensures the globe fits INSIDE the view without clipping edges.
      */}
      <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} gl={{ alpha: true, antialias: true }} className="bg-transparent">

        {/* BRIGHT STUDIO LIGHTING */}
        <ambientLight intensity={3.0} color="#ffffff" />
        <directionalLight position={[10, 10, 5]} intensity={2.0} color="#ffffff" />
        <spotLight position={[-5, 5, -5]} intensity={5} color="#818cf8" angle={0.5} />

        <Suspense fallback={null}>
          <Earth />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}