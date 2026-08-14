'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Trophy, Target, Users, Zap, Lock, Code, Brush, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Competitions', 'Events', 'Community', 'Milestones'];

const ACHIEVEMENTS = [
  { id: 1, title: 'First Blood', description: 'Complete your first coding challenge.', xp: 100, icon: '🩸', type: 'Competitions', unlockedDate: 'Jan 12, 2024', progress: 100 },
  { id: 2, title: 'Social Butterfly', description: 'Attend 5 community events.', xp: 250, icon: '🦋', type: 'Events', unlockedDate: 'Mar 05, 2024', progress: 100 },
  { id: 3, title: 'Code Ninja', description: 'Solve 50 algorithmic problems.', xp: 500, icon: '🥷', type: 'Competitions', unlockedDate: 'Jun 20, 2024', progress: 100 },
  { id: 4, title: 'Helpful Hand', description: 'Answer 20 questions in the forum.', xp: 300, icon: '🤝', type: 'Community', unlockedDate: 'Aug 14, 2024', progress: 100 },
  { id: 5, title: 'Hackathon Champion', description: 'Win 1st place in a major hackathon.', xp: 1000, icon: '🏆', type: 'Competitions', unlockedDate: 'Nov 15, 2024', progress: 100 },
  { id: 6, title: 'Consistency is Key', description: 'Log in for 30 consecutive days.', xp: 400, icon: '🔥', type: 'Milestones', unlockedDate: null, progress: 70 }, // 21/30 days
  { id: 7, title: 'Design Maestro', description: 'Submit 5 UI/UX designs to challenges.', xp: 350, icon: '🎨', type: 'Competitions', unlockedDate: null, progress: 40 }, // 2/5 designs
  { id: 8, title: 'Event Organizer', description: 'Help organize a C3 community event.', xp: 800, icon: '📋', type: 'Events', unlockedDate: null, progress: 0 },
  { id: 9, title: 'Open Source Pro', description: 'Merge 10 PRs to community projects.', xp: 600, icon: '💻', type: 'Community', unlockedDate: null, progress: 10 }, // 1/10 PRs
  { id: 10, title: 'Level 50', description: 'Reach Level 50 overall.', xp: 2000, icon: '⭐', type: 'Milestones', unlockedDate: null, progress: 84 }, // Level 42/50
];

const MILESTONES = [
  { date: 'Nov 15, 2024', title: 'Hackathon Champion', xp: 1000 },
  { date: 'Aug 14, 2024', title: 'Helpful Hand', xp: 300 },
  { date: 'Jun 20, 2024', title: 'Code Ninja', xp: 500 },
  { date: 'Mar 05, 2024', title: 'Social Butterfly', xp: 250 },
  { date: 'Jan 12, 2024', title: 'First Blood', xp: 100 },
];

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredAchievements = ACHIEVEMENTS.filter(a => 
    activeCategory === 'All' || a.type === activeCategory
  );

  const totalXP = ACHIEVEMENTS.reduce((acc, a) => acc + (a.unlockedDate ? a.xp : 0), 0);
  const currentLevel = Math.floor(totalXP / 500) + 1;
  const xpForNextLevel = currentLevel * 500;
  const xpIntoCurrentLevel = totalXP % 500;
  const levelProgress = (xpIntoCurrentLevel / 500) * 100;

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] mb-4 transform rotate-12"
          >
            <Star className="w-8 h-8 text-white transform -rotate-12" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400"
          >
            Achievements & Badges
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Track your progress, unlock exclusive badges, and level up your profile.
          </motion.p>
        </div>

        {/* XP Progress Bar Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Zap className="w-48 h-48" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 text-center md:text-left">
              <div className="text-slate-400 font-medium uppercase tracking-wider text-sm mb-1">Current Level</div>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                {currentLevel}
              </div>
            </div>
            
            <div className="flex-grow w-full space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-violet-300">{totalXP.toLocaleString()} XP Total</span>
                <span className="text-slate-400">{xpForNextLevel.toLocaleString()} XP for Level {currentLevel + 1}</span>
              </div>
              <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 relative"
                >
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8L3N2Zz4=')] opacity-30"></div>
                </motion.div>
              </div>
              <div className="text-xs text-slate-500 text-right">
                {(xpForNextLevel - totalXP).toLocaleString()} XP remaining
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content: Achievements Grid */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
                    activeCategory === cat 
                      ? "bg-violet-600/20 border-violet-500/50 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]" 
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredAchievements.map((achievement, i) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "p-5 rounded-2xl border transition-all relative overflow-hidden",
                    achievement.unlockedDate 
                      ? "bg-white/5 border-white/10 hover:bg-white/10" 
                      : "bg-[#0a0e1a] border-white/5 opacity-70"
                  )}
                >
                  {achievement.unlockedDate && (
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-violet-500/10 rounded-full blur-xl pointer-events-none"></div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "text-4xl p-2 rounded-xl border",
                      achievement.unlockedDate ? "bg-white/5 border-white/10" : "bg-black/50 border-white/5 grayscale"
                    )}>
                      {achievement.icon}
                    </div>
                    <div className="space-y-1 flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className={cn("font-bold", achievement.unlockedDate ? "text-white" : "text-slate-400")}>
                          {achievement.title}
                        </h3>
                        {!achievement.unlockedDate && <Lock className="w-4 h-4 text-slate-600" />}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-violet-400">+{achievement.xp} XP</span>
                      {achievement.unlockedDate ? (
                        <span className="text-slate-500">Unlocked: {achievement.unlockedDate}</span>
                      ) : (
                        <span className="text-slate-500">{achievement.progress}%</span>
                      )}
                    </div>
                    
                    {!achievement.unlockedDate && (
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-slate-600 rounded-full" 
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar: Timeline */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-fuchsia-400" />
                Recent Milestones
              </h3>
              
              <div className="space-y-6">
                {MILESTONES.map((milestone, i) => (
                  <div key={i} className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-[-24px] before:w-px before:bg-white/10 last:before:hidden">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#0a0e1a] border-2 border-violet-500/50 flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-fuchsia-400"></div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">{milestone.date}</div>
                      <div className="font-medium text-white">{milestone.title}</div>
                      <div className="text-xs font-mono text-violet-400 mt-1">+{milestone.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-2xl p-6 backdrop-blur-md text-center">
               <h4 className="font-bold text-white mb-2">Want more XP?</h4>
               <p className="text-sm text-slate-300 mb-4">Join the upcoming weekend Hackathon and earn up to 2000 XP!</p>
               <button className="w-full py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors">
                 View Upcoming Events
               </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
