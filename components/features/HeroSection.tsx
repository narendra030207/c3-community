'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'motion/react';
import SceneWrapper from '@/components/3d/SceneWrapper';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), { ssr: false });

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a0e1a] pt-20 pb-16">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <SceneWrapper>
          <HeroScene />
        </SceneWrapper>
      </div>

      {/* Overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/80 via-[#0a0e1a]/60 to-[#0a0e1a] z-0 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              C3 Community
            </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-4xl font-semibold text-gray-200 tracking-wide"
          >
            Creating &bull; Coding &bull; Community
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Empowering the next generation of tech innovators through coding, competitions, and community.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 pt-8"
          >
            <Link 
              href="/register"
              className="px-8 py-3 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] backdrop-blur-sm border border-blue-400/30"
            >
              Join C3
            </Link>
            <Link 
              href="/events"
              className="px-8 py-3 rounded-md font-semibold text-violet-300 bg-violet-900/20 hover:bg-violet-900/40 transition-all backdrop-blur-md border border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]"
            >
              Explore Events
            </Link>
            <Link 
              href="/leaderboard"
              className="px-8 py-3 rounded-md font-semibold text-cyan-300 bg-cyan-900/20 hover:bg-cyan-900/40 transition-all backdrop-blur-md border border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              View Leaderboard
            </Link>
            <Link 
              href="/achievements"
              className="px-8 py-3 rounded-md font-semibold text-gray-300 bg-gray-800/40 hover:bg-gray-700/60 transition-all backdrop-blur-md border border-gray-600/50"
            >
              Achievements
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
