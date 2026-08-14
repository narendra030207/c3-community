'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface ParticleLinesProps {
  positions: Float32Array;
  particleCount: number;
}

function ParticleLines({ positions, particleCount }: ParticleLinesProps) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  
  useFrame(() => {
    if (!linesRef.current) return;
    
    // Simple line connecting logic based on distance
    const linePositions = [];
    const maxDistance = 2.5;
    
    // In a real app we'd optimize this O(N^2) search, e.g. using spatial partitioning
    // but we're keeping count low (100-300) so it should be manageable
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;
        
        if (distSq < maxDistance * maxDistance) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesRef.current.geometry = lineGeometry;
  });

  return (
    <lineSegments ref={linesRef}>
      <lineBasicMaterial color="#3b82f6" transparent opacity={0.15} />
    </lineSegments>
  );
}

export function HeroScene() {
  const { gpuTier } = useDeviceCapability();
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const particleCount = gpuTier === 'high' ? 500 : gpuTier === 'mid' ? 300 : 100;
  const showLines = gpuTier !== 'low';

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return pos;
  }, [particleCount]);

  const colors = useMemo(() => {
    const col = new Float32Array(particleCount * 3);
    const colorBlue = new THREE.Color('#3b82f6');
    const colorViolet = new THREE.Color('#8b5cf6');
    
    for (let i = 0; i < particleCount; i++) {
      const mixedColor = colorBlue.clone().lerp(colorViolet, Math.random());
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return col;
  }, [particleCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.025;
      
      // Parallax effect
      pointsRef.current.position.x = mouse.x * 0.5;
      pointsRef.current.position.y = mouse.y * 0.5;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {showLines && (
        <group ref={(g) => {
          if (g && pointsRef.current) {
             g.rotation.copy(pointsRef.current.rotation);
             g.position.copy(pointsRef.current.position);
          }
        }}>
           <ParticleLines positions={positions} particleCount={particleCount} />
        </group>
      )}

      {/* Floating Geometries */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1} position={[-4, 2, -3]}>
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2} position={[5, -2, -4]}>
        <mesh>
          <torusGeometry args={[1, 0.4, 16, 32]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5} position={[0, -4, -6]}>
        <mesh>
          <octahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

export default HeroScene;
