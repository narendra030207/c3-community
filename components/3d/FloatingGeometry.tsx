'use client';

import { useMemo } from 'react';
import { Float } from '@react-three/drei';

type ShapeType = 'icosahedron' | 'torus' | 'octahedron' | 'dodecahedron';

interface FloatingGeometryProps {
  shape: ShapeType;
  color: string;
  position?: [number, number, number];
  scale?: number;
}

export function FloatingGeometry({ 
  shape, 
  color, 
  position = [0, 0, 0], 
  scale = 1 
}: FloatingGeometryProps) {
  const geometry = useMemo(() => {
    switch (shape) {
      case 'icosahedron': return <icosahedronGeometry args={[1, 0]} />;
      case 'torus': return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case 'octahedron': return <octahedronGeometry args={[1, 0]} />;
      case 'dodecahedron': return <dodecahedronGeometry args={[1, 0]} />;
      default: return <icosahedronGeometry args={[1, 0]} />;
    }
  }, [shape]);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1} position={position}>
      <mesh scale={scale}>
        {geometry}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

export default FloatingGeometry;
