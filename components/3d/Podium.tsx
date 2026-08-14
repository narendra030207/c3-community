'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';

interface Winner {
  name: string;
  score: number;
  avatar?: string;
}

interface PodiumProps {
  winners: Winner[]; // Assumes [1st, 2nd, 3rd]
}

export function Podium({ winners }: PodiumProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 10, 5]} intensity={1} penumbra={0.5} color="#ffffff" />
      <spotLight position={[-5, 5, 0]} intensity={0.5} color="#3b82f6" />
      <spotLight position={[5, 5, 0]} intensity={0.5} color="#8b5cf6" />

      {/* 2nd Place - Silver */}
      <group position={[-2, 0, 0]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1.5, 2, 1.5]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </mesh>
        <Text position={[0, 1, 0.76]} fontSize={0.8} color="black" fontWeight="bold">
          2
        </Text>
      </group>

      {/* 1st Place - Gold */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[1.5, 3, 1.5]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} emissive="#4a3f00" emissiveIntensity={0.2} />
        </mesh>
        <Text position={[0, 1.5, 0.76]} fontSize={1} color="black" fontWeight="bold">
          1
        </Text>
      </group>

      {/* 3rd Place - Bronze */}
      <group position={[2, 0, 0]}>
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#CD7F32" metalness={0.7} roughness={0.3} />
        </mesh>
        <Text position={[0, 0.75, 0.76]} fontSize={0.6} color="black" fontWeight="bold">
          3
        </Text>
      </group>
    </group>
  );
}

export default Podium;
