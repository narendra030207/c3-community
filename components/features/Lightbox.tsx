'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export type GalleryItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  color: string; // for placeholder
};

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ items, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const item = items[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e1a]/95 backdrop-blur-xl p-4"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white bg-white/10 p-2 rounded-full transition-colors z-50"
        >
          <X className="w-6 h-6" />
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); onNavigate((currentIndex - 1 + items.length) % items.length); }}
          className="absolute left-4 sm:left-10 text-slate-400 hover:text-white bg-white/10 p-3 rounded-full transition-colors z-50"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div className="w-full max-w-5xl max-h-[80vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
          {/* Placeholder Image */}
          <div 
            className="w-full aspect-video rounded-xl flex items-center justify-center shadow-2xl relative overflow-hidden"
            style={{ background: item.color }}
          >
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
             <span className="text-4xl font-bold text-white/50 z-10">{item.title}</span>
          </div>
          
          <div className="mt-6 text-center text-white w-full max-w-3xl">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-xs font-medium px-2 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {item.category}
              </span>
              <span className="text-sm text-slate-400">{item.date}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{item.title}</h2>
            <p className="text-slate-300">{item.description}</p>
          </div>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); onNavigate((currentIndex + 1) % items.length); }}
          className="absolute right-4 sm:right-10 text-slate-400 hover:text-white bg-white/10 p-3 rounded-full transition-colors z-50"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
