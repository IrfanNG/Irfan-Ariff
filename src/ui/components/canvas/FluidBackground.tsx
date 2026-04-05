"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const FluidShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    void main() {
      vec2 st = vUv;
      float d = distance(st, uMouse);
      
      // Stronger Noir Fluid Logic
      float color = 0.0;
      color += sin(st.x * 12.0 + uTime * 0.4) * 0.15;
      color += cos(st.y * 10.0 - uTime * 0.2) * 0.15;
      
      // Interaction
      float m = 1.0 - smoothstep(0.0, 0.6, d);
      color += m * 0.1;

      // Base Noir Charcoal with visible fluid movement
      vec3 baseColor = vec3(0.02); 
      vec3 fluidColor = vec3(color * 0.5);
      
      gl_FragColor = vec4(baseColor + fluidColor, 1.0);
    }
  `,
};

function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      // Smooth mouse interpolation
      uniforms.uMouse.value.lerp(new THREE.Vector2(state.mouse.x * 0.5 + 0.5, state.mouse.y * 0.5 + 0.5), 0.05);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        fragmentShader={FluidShader.fragmentShader}
        vertexShader={FluidShader.vertexShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export function FluidBackground() {
  return (
    <div className="fixed inset-0 -z-[100] w-full h-full bg-[#030303] pointer-events-none">
      <Canvas 
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 1] }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <FluidMesh />
      </Canvas>
    </div>
  );
}
