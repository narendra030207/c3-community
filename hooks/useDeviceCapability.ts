'use client';

import { useState, useEffect } from 'react';

export type GPUTier = 'low' | 'mid' | 'high';

export interface DeviceCapability {
  isMobile: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  gpuTier: GPUTier;
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    isMobile: false,
    isLowEnd: false,
    prefersReducedMotion: false,
    gpuTier: 'low',
  });

  useEffect(() => {
    const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let gpuTier: GPUTier = 'low';
    let isLowEnd = isMobile;

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      const hardwareConcurrency = navigator.hardwareConcurrency || 2;
      
      if (gl) {
        if (hardwareConcurrency >= 8) {
          gpuTier = 'high';
          isLowEnd = false;
        } else if (hardwareConcurrency >= 4) {
          gpuTier = 'mid';
          isLowEnd = isMobile;
        } else {
          gpuTier = 'low';
          isLowEnd = true;
        }
      } else {
        isLowEnd = true;
      }
    } catch (e) {
      isLowEnd = true;
    }

    setCapability({
      isMobile,
      isLowEnd,
      prefersReducedMotion,
      gpuTier,
    });
  }, []);

  return capability;
}
