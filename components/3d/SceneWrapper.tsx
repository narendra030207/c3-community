'use client';

import React, { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface SceneWrapperProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
}

export function SceneWrapper({ children, className = '', fallback }: SceneWrapperProps) {
  const { isLowEnd, prefersReducedMotion } = useDeviceCapability();

  if (isLowEnd || prefersReducedMotion) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className={`bg-gradient-to-br from-[#0a0e1a] to-[#0d152b] ${className}`} />
    );
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        {children}
      </Canvas>
    </div>
  );
}

export default SceneWrapper;

