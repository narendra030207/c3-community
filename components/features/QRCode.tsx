'use client';

import React from 'react';

// Fallback to simple SVG if qrcode.react is not installed
// We try to import it, but gracefully degrade if it fails in this environment
let QRCodeReact: any;
try {
  QRCodeReact = require('qrcode.react').QRCodeSVG;
} catch (e) {
  // Graceful fallback
}

interface QRCodeProps {
  value: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  bgColor?: string;
  fgColor?: string;
}

export default function QRCode({ 
  value, 
  size = 128, 
  level = 'M', 
  bgColor = '#ffffff', 
  fgColor = '#000000' 
}: QRCodeProps) {
  if (QRCodeReact) {
    return (
      <QRCodeReact 
        value={value} 
        size={size} 
        level={level} 
        bgColor={bgColor} 
        fgColor={fgColor} 
        includeMargin={true}
      />
    );
  }

  // Fallback visual representation if library isn't loaded
  return (
    <div 
      style={{ width: size, height: size, backgroundColor: bgColor, borderColor: fgColor }} 
      className="border-8 p-2 flex flex-wrap gap-1 items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIj48L3JlY3Q+Cjwvc3ZnPg==')]"></div>
      <div className="w-4 h-4 bg-black absolute top-1 left-1"></div>
      <div className="w-4 h-4 bg-black absolute top-1 right-1"></div>
      <div className="w-4 h-4 bg-black absolute bottom-1 left-1"></div>
      <span className="text-[10px] font-mono font-bold text-black z-10 bg-white/80 p-1 truncate max-w-full">QR_MOCK</span>
    </div>
  );
}
