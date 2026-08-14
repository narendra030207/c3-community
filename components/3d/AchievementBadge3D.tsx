'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface AchievementBadge3DProps {
  icon: string;
  color: string;
  label?: string;
}

export function AchievementBadge3D({ icon, color, label }: AchievementBadge3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <spotLight position={[-5, -5, 5]} intensity={0.5} color={color} />
      
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2} 
        />
        {/* Front Face with Icon */}
        <group position={[0, 0, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
          <Text
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {icon}
          </Text>
        </group>
      </mesh>
    </group>
  );
}

export default AchievementBadge3D;
