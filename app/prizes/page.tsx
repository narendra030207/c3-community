'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Gift, Award, Star, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Cash Prizes', 'Trophies', 'Medals', 'Goodies'];

const PRIZES = Array.from({ length: 12 }, (_, i) => ({
  id: `prize-${i}`,
  title: [
    'Hackathon Grand Prize', 'CodeJam Runner Up', 'UI/UX Best Design', 
    'AI Track Winner', 'Top Contributor of Month', 'Debug Champion'
  ][i % 6],
  type: ['Cash Prizes', 'Trophies', 'Goodies', 'Cash Prizes', 'Medals', 'Goodies'][i % 6],
  value: ['₹50,000', 'Trophy + Swags', 'Premium Mechanical Keyboard', '₹25,000', 'Gold Medal', 'Exclusive Hoodie'][i % 6],
  position: [1, 2, 1, 1, 1, 1][i % 6],
  competition: ['Winter Hackathon 2024', 'CodeJam Spring', 'Design Sprint', 'AI Challenge 24', 'Community Stats', 'Bug Bounty'][i % 6],
  winnerName: ['Alex Mercer', 'Sarah Chen', 'Jordan Taylor', 'Maya Patel', 'Liam O\'Connor', 'Emma Wilson'][i % 6],
  winnerAvatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${i}`,
  date: 'Nov 2024'
}));

export default function PrizesPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPrizes = PRIZES.filter(prize => 
    activeCategory === 'All' || prize.type === activeCategory
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Cash Prizes': return <Gift className="w-4 h-4" />;
      case 'Trophies': return <Trophy className="w-4 h-4" />;
      case 'Medals': return <Medal className="w-4 h-4" />;
      case 'Goodies': return <Star className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  const getPositionBadge = (pos: number) => {
    if (pos === 1) return <span className="absolute -top-3 -right-3 text-4xl drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">🥇</span>;
    if (pos === 2) return <span className="absolute -top-3 -right-3 text-4xl drop-shadow-[0_0_15px_rgba(192,192,192,0.5)]">🥈</span>;
    if (pos === 3) return <span className="absolute -top-3 -right-3 text-4xl drop-shadow-[0_0_15px_rgba(205,127,50,0.5)]">🥉</span>;
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.3)] mb-6"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600"
          >
            Prizes & Rewards
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Celebrate the achievements of our community members. Compete in events to win exclusive rewards, cash prizes, and glory.
          </motion.p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border",
                activeCategory === cat 
                  ? "bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white" 
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Winners Showcase (Top Prize) */}
        {activeCategory === 'All' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative bg-gradient-to-r from-blue-900/40 to-violet-900/40 border border-blue-500/30 rounded-3xl p-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-cyan-500/10" />
            <div className="bg-[#0a0e1a]/80 backdrop-blur-xl rounded-[23px] p-8 md:p-12 relative z-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4" fill="currentColor" /> Feature Reward
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight">Winter Hackathon<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Grand Prize</span></h2>
                  <p className="text-xl text-slate-300">₹50,000 Cash + Premium Internship Opportunity</p>
                  
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 inline-flex">
                    <Image src={PRIZES[0].winnerAvatar} alt="Winner" width={48} height={48} className="rounded-full bg-slate-800" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider">Won By</div>
                      <div className="font-semibold text-lg">{PRIZES[0].winnerName}</div>
                    </div>
                  </div>
                </div>
                
                <div className="relative h-64 md:h-full min-h-[300px] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-radial from-blue-500/20 to-transparent opacity-50" />
                  <Trophy className="w-48 h-48 text-yellow-400 drop-shadow-[0_0_50px_rgba(250,204,21,0.4)] animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Prize Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPrizes.map((prize, index) => (
            <motion.div
              key={prize.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-blue-500/30 flex flex-col"
            >
              {getPositionBadge(prize.position)}
              
              <div className="mb-6 flex justify-between items-start">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-blue-500/20 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors">
                  {getTypeIcon(prize.type)}
                </div>
                <div className="text-xs font-medium px-2.5 py-1 bg-white/5 rounded-full text-slate-300">
                  {prize.type}
                </div>
              </div>
              
              <div className="space-y-2 flex-grow">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                  {prize.title}
                </h3>
                <p className="text-sm text-slate-400">{prize.competition}</p>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 pt-2">
                  {prize.value}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image src={prize.winnerAvatar} alt={prize.winnerName} width={24} height={24} className="rounded-full bg-slate-800" />
                  <span className="text-sm font-medium text-slate-300">{prize.winnerName}</span>
                </div>
                <div className="text-xs text-slate-500">{prize.date}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
