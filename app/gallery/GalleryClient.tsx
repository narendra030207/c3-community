'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import Lightbox, { GalleryItem } from '@/components/features/Lightbox';

const categories = ['All', 'Events', 'Workshops', 'Hackathons', 'Competitions', 'Team', 'Awards'];

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Annual Tech Symposium', description: 'Our biggest event of the year featuring over 500 participants.', category: 'Events', date: 'Oct 15, 2025', color: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' },
  { id: 2, title: 'React Workshop', description: 'A hands-on session on building modern web applications.', category: 'Workshops', date: 'Sep 22, 2025', color: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
  { id: 3, title: 'CodeFest 2025', description: '48-hour hackathon to build solutions for sustainability.', category: 'Hackathons', date: 'Aug 10, 2025', color: 'linear-gradient(135deg, #10b981, #059669)' },
  { id: 4, title: 'Algo Battle', description: 'Fierce competitive programming contest among top coders.', category: 'Competitions', date: 'Jul 05, 2025', color: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { id: 5, title: 'Core Team Meet', description: 'Planning the roadmap for the upcoming semester.', category: 'Team', date: 'Jun 15, 2025', color: 'linear-gradient(135deg, #6366f1, #4f46e5)' },
  { id: 6, title: 'Best Community Award', description: 'Receiving the award for the most active technical club.', category: 'Awards', date: 'May 20, 2025', color: 'linear-gradient(135deg, #ec4899, #be185d)' },
  { id: 7, title: 'Web3 Seminar', description: 'Exploring the future of decentralized applications.', category: 'Workshops', date: 'Apr 12, 2025', color: 'linear-gradient(135deg, #8b5cf6, #d946ef)' },
  { id: 8, title: 'AI Hackathon', description: 'Building intelligent agents using modern LLMs.', category: 'Hackathons', date: 'Mar 28, 2025', color: 'linear-gradient(135deg, #14b8a6, #0f766e)' },
  { id: 9, title: 'Freshers Orientation', description: 'Welcoming the new batch of tech enthusiasts.', category: 'Events', date: 'Feb 15, 2025', color: 'linear-gradient(135deg, #f43f5e, #e11d48)' },
  { id: 10, title: 'Debug the Code', description: 'A fun competition to find and fix bugs in given projects.', category: 'Competitions', date: 'Jan 10, 2025', color: 'linear-gradient(135deg, #84cc16, #65a30d)' },
  { id: 11, title: 'Alumni Connect', description: 'Networking session with successful past members.', category: 'Team', date: 'Dec 05, 2024', color: 'linear-gradient(135deg, #0ea5e9, #0284c7)' },
  { id: 12, title: 'Designathon Winner', description: 'Our team winning the national UI/UX designathon.', category: 'Awards', date: 'Nov 22, 2024', color: 'linear-gradient(135deg, #f59e0b, #ea580c)' },
  { id: 13, title: 'Open Source Day', description: 'Contributing to popular open-source repositories.', category: 'Events', date: 'Oct 10, 2024', color: 'linear-gradient(135deg, #10b981, #3b82f6)' },
  { id: 14, title: 'Cloud Computing 101', description: 'Introduction to AWS and Google Cloud Platform.', category: 'Workshops', date: 'Sep 18, 2024', color: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
  { id: 15, title: 'Game Jam', description: 'Creating 2D games from scratch in 24 hours.', category: 'Hackathons', date: 'Aug 25, 2024', color: 'linear-gradient(135deg, #ec4899, #8b5cf6)' },
];

export default function GalleryClient() {
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = activeTab === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  const openLightbox = (id: number) => {
    const index = filteredItems.findIndex(item => item.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
      setLightboxOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20"
          >
            <Camera className="w-8 h-8 text-blue-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-500 mb-4"
          >
            Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            A glimpse into the vibrant activities, events, and memories of the C3 Community.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md border",
                activeTab === category 
                  ? "bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-300"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layoutId={`gallery-item-${item.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(item.id)}
              className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid border border-white/10 shadow-lg"
            >
              {/* Using a div with random-ish height to simulate masonry images */}
              <div 
                className="w-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{ 
                  background: item.color,
                  height: `${200 + (item.id % 3) * 100}px` 
                }}
              >
                <span className="text-3xl font-bold text-white/30">{item.title.substring(0, 2)}</span>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/90 via-[#0a0e1a]/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute top-3 right-3">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-black/50 backdrop-blur-md text-white border border-white/10">
                  {item.category}
                </span>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-bold text-white mb-1 leading-tight">{item.title}</h3>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Lightbox 
        items={filteredItems}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </div>
  );
}
