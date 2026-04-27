"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function InfiniteGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a high-quality grid texture programmatically
  const gridTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 4;
      ctx.strokeRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(10, 10);
    return tex;
  }, []);

  useFrame((state) => {
    if (gridTexture) {
      gridTexture.offset.y -= 0.0015; 
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 4 + (state.mouse.y * 0.05);
      meshRef.current.rotation.z = state.mouse.x * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial 
        map={gridTexture} 
        transparent 
        opacity={0.8} 
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function DataPackets() {
  const count = 60;
  const meshRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 30,
          -0.8, 
          (Math.random() - 0.5) * 40
        ],
        speed: Math.random() * 0.04 + 0.02,
        size: Math.random() * 0.1 + 0.05
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.children.forEach((child, i) => {
        const p = particles[i];
        child.position.z += p.speed;
        if (child.position.z > 20) child.position.z = -20;
        
        const scale = p.size * (1 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.6);
        child.scale.set(scale, scale, scale);
      });
    }
  });

  return (
    <group ref={meshRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position as any}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#93c5fd" transparent opacity={1} />
        </mesh>
      ))}
    </group>
  );
}

export function HeroCanvas() {
  return (
    <div className="w-full h-full bg-zinc-950">
      <Canvas camera={{ position: [0, 2, 12], fov: 60 }}>
        <fog attach="fog" args={["#09090b", 5, 30]} />
        <ambientLight intensity={2} />
        <pointLight position={[0, 8, 5]} intensity={25} color="#60a5fa" />
        <InfiniteGrid />
        <DataPackets />
      </Canvas>
    </div>
  );
}
