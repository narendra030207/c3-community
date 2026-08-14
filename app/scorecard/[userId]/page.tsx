'use client';

import { use, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Trophy, Star, Medal, Target, Download, ExternalLink, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const ScoreProgressionChart = dynamic(() => import('@/components/features/ScorecardCharts').then(m => m.ScoreProgressionChart), { ssr: false });
const CompetitionPerformanceChart = dynamic(() => import('@/components/features/ScorecardCharts').then(m => m.CompetitionPerformanceChart), { ssr: false });

// Demo Data
const USER_DATA = {
  name: 'Alex Mercer',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=0',
  branch: 'Computer Science',
  batch: '2025',
  totalScore: 9540,
  globalRank: 1,
  events: 24,
  wins: 8
};

const SCORE_HISTORY = [
  { month: 'Jan', score: 1200 },
  { month: 'Feb', score: 2100 },
  { month: 'Mar', score: 3400 },
  { month: 'Apr', score: 4200 },
  { month: 'May', score: 4800 },
  { month: 'Jun', score: 5600 },
  { month: 'Jul', score: 7100 },
  { month: 'Aug', score: 7900 },
  { month: 'Sep', score: 8500 },
  { month: 'Oct', score: 8900 },
  { month: 'Nov', score: 9200 },
  { month: 'Dec', score: 9540 },
];

const COMP_PERFORMANCE = [
  { name: 'Hackathon X', score: 850 },
  { name: 'CodeJam 24', score: 620 },
  { name: 'UI/UX Sprint', score: 400 },
  { name: 'AI Challenge', score: 950 },
  { name: 'Web Dev Comp', score: 780 },
];

const BADGES = [
  { id: 1, icon: '🏆', name: 'Hackathon Winner', date: 'Oct 2024', locked: false },
  { id: 2, icon: '⭐', name: 'Top Contributor', date: 'Sep 2024', locked: false },
  { id: 3, icon: '🔥', name: '7-Day Streak', date: 'Aug 2024', locked: false },
  { id: 4, icon: '💻', name: 'Code Ninja', date: 'Jul 2024', locked: false },
  { id: 5, icon: '🎨', name: 'Design Master', date: '', locked: true },
  { id: 6, icon: '🧠', name: 'AI Expert', date: '', locked: true },
];

const CERTIFICATES = [
  { id: 'CERT-10492', title: 'First Place - AI Challenge', event: 'TechFest 2024', date: 'Nov 15, 2024' },
  { id: 'CERT-09283', title: 'Participant - Web Dev Bootcamp', event: 'Web Workshop', date: 'Sep 10, 2024' },
];

export default function ScorecardPage({ params }: { params: Promise<{ userId: string }> }) {
  const resolvedParams = use(params);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black print:pt-0">
      <div className="max-w-6xl mx-auto space-y-8" ref={containerRef}>
        
        {/* Header & Print Button */}
        <div className="flex justify-between items-center print:hidden">
          <h1 className="text-2xl font-bold">Personal Scorecard</h1>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-sm font-medium border border-white/10"
          >
            <Printer className="w-4 h-4" />
            Print Scorecard
          </button>
        </div>

        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-900/40 to-violet-900/40 border border-white/10 rounded-2xl p-8 relative overflow-hidden backdrop-blur-xl print:border-slate-300 print:bg-none print:shadow-none"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 print:hidden">
            <Trophy className="w-48 h-48" />
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <Image 
              src={USER_DATA.avatar} 
              alt={USER_DATA.name} 
              width={120} 
              height={120} 
              className="rounded-full bg-slate-800 border-4 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] print:shadow-none" 
            />
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold">{USER_DATA.name}</h2>
              <p className="text-blue-400 text-lg">{USER_DATA.branch} • Batch of {USER_DATA.batch}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm font-medium print:border-slate-400">
                  Global Rank: #{USER_DATA.globalRank}
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-sm font-medium print:border-slate-400 print:text-black">
                  Elite Tier
                </span>
              </div>
            </div>
            
            <div className="md:ml-auto text-center md:text-right mt-6 md:mt-0">
              <div className="text-sm text-slate-400 uppercase tracking-wider mb-1">Total Score</div>
              <div className="text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 print:text-black print:bg-none">
                {USER_DATA.totalScore.toLocaleString()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Current Rank', value: `#${USER_DATA.globalRank}`, icon: Trophy, color: 'text-yellow-400' },
            { label: 'Total Score', value: USER_DATA.totalScore.toLocaleString(), icon: Star, color: 'text-blue-400' },
            { label: 'Events Attended', value: USER_DATA.events, icon: Target, color: 'text-violet-400' },
            { label: 'Competitions Won', value: USER_DATA.wins, icon: Medal, color: 'text-cyan-400' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm flex flex-col items-center text-center print:border-slate-300 print:bg-transparent"
            >
              <stat.icon className={`w-8 h-8 mb-3 ${stat.color} print:text-black`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 print:block print:space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm print:border-slate-300 print:bg-transparent">
            <h3 className="text-lg font-semibold mb-6">Score Progression</h3>
            <ScoreProgressionChart data={SCORE_HISTORY} />
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm print:border-slate-300 print:bg-transparent">
            <h3 className="text-lg font-semibold mb-6">Competition Performance</h3>
            <CompetitionPerformanceChart data={COMP_PERFORMANCE} />
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm print:border-slate-300 print:bg-transparent">
          <h3 className="text-xl font-bold mb-6">Achievements & Badges</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {BADGES.map((badge) => (
              <div 
                key={badge.id}
                className={cn(
                  "flex flex-col items-center text-center p-4 rounded-xl border transition-all",
                  badge.locked 
                    ? "bg-white/5 border-white/5 opacity-50 grayscale print:border-slate-200" 
                    : "bg-gradient-to-b from-white/10 to-transparent border-white/20 hover:border-blue-500/50 print:border-slate-300"
                )}
              >
                <div className="text-4xl mb-3">{badge.icon}</div>
                <div className="text-sm font-medium leading-tight mb-1">{badge.name}</div>
                {!badge.locked && <div className="text-xs text-slate-400">{badge.date}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm print:border-slate-300 print:bg-transparent">
          <h3 className="text-xl font-bold mb-6">Verified Certificates</h3>
          <div className="space-y-4">
            {CERTIFICATES.map((cert) => (
              <div key={cert.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors print:border-slate-300 print:bg-transparent">
                <div>
                  <h4 className="font-semibold text-lg">{cert.title}</h4>
                  <div className="text-sm text-slate-400 mt-1">
                    {cert.event} • Issued: {cert.date} • ID: <span className="font-mono">{cert.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 sm:mt-0 print:hidden">
                  <a href={`/verify/${cert.id}`} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors tooltip-trigger" title="Verify">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm font-medium transition-colors">
                    <Download className="w-4 h-4" />
                    PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
