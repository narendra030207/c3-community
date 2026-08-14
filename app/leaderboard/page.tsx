'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { Search, Trophy, Medal, ChevronUp, ChevronDown, Minus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Podium = dynamic(() => import('@/components/3d/Podium'), { ssr: false, loading: () => <div className="h-64 flex items-center justify-center text-slate-500">Loading 3D Podium...</div> });
const SceneWrapper = dynamic(() => import('@/components/3d/SceneWrapper'), { ssr: false, loading: () => <div className="h-64" /> });

const DEMO_USERS = Array.from({ length: 20 }, (_, i) => ({
  id: `usr-${i + 1}`,
  name: [
    'Alex Mercer', 'Sarah Chen', 'Jordan Taylor', 'Maya Patel', 'Liam O\'Connor',
    'Emma Wilson', 'Noah Smith', 'Olivia Davis', 'William Johnson', 'Sophia Brown',
    'James Taylor', 'Isabella Thomas', 'Logan Moore', 'Mia Jackson', 'Benjamin Martin',
    'Charlotte Lee', 'Elijah Perez', 'Amelia Thompson', 'Lucas White', 'Harper Harris'
  ][i],
  avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${i}`,
  branch: ['CSE', 'IT', 'ECE', 'ME', 'CE'][Math.floor(Math.random() * 5)],
  batch: ['2024', '2025', '2026', '2027'][Math.floor(Math.random() * 4)],
  score: 10000 - i * Math.floor(Math.random() * 200 + 100),
  events: Math.floor(Math.random() * 20 + 5),
  wins: Math.floor(Math.random() * 10),
  badges: Math.floor(Math.random() * 15 + 2),
  movement: ['up', 'down', 'same', 'new'][Math.floor(Math.random() * 4)] as 'up' | 'down' | 'same' | 'new',
}));

export default function LeaderboardPage() {
  const [period, setPeriod] = useState('Global');
  const [branch, setBranch] = useState('All');
  const [batch, setBatch] = useState('All');
  const [search, setSearch] = useState('');

  const filteredUsers = DEMO_USERS.filter(user => {
    if (branch !== 'All' && user.branch !== branch) return false;
    if (batch !== 'All' && user.batch !== batch) return false;
    if (search && !user.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const top3 = filteredUsers.slice(0, 3);
  const others = filteredUsers.slice(3);

  const getMovementIcon = (movement: string) => {
    switch (movement) {
      case 'up': return <ChevronUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ChevronDown className="w-4 h-4 text-red-500" />;
      case 'new': return <Sparkles className="w-4 h-4 text-violet-500" />;
      default: return <Minus className="w-4 h-4 text-slate-500" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'border-[#FFD700] text-[#FFD700] bg-[#FFD700]/10';
      case 2: return 'border-[#C0C0C0] text-[#C0C0C0] bg-[#C0C0C0]/10';
      case 3: return 'border-[#CD7F32] text-[#CD7F32] bg-[#CD7F32]/10';
      default: return 'border-white/10 text-white/70 bg-white/5';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400"
          >
            Leaderboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            The brightest minds of C3 Community. Compete, learn, and rise to the top.
          </motion.p>
        </div>

        {/* 3D Podium Section */}
        {top3.length === 3 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
            
            <div className="h-[300px] w-full relative z-10">
              <SceneWrapper>
                <Podium winners={top3.map(u => ({ name: u.name, score: u.score, avatar: u.avatar }))} />
              </SceneWrapper>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 relative z-20">
              {/* Silver - 2nd */}
              <div className="flex flex-col items-center justify-end text-center space-y-2 order-1 transform translate-y-8">
                <div className="relative">
                  <Image src={top3[1].avatar} alt={top3[1].name} width={64} height={64} className="rounded-full border-2 border-[#C0C0C0]" />
                  <span className="absolute -bottom-2 -right-2 text-2xl">🥈</span>
                </div>
                <div className="font-semibold text-lg">{top3[1].name}</div>
                <div className="text-sm text-[#C0C0C0] font-mono">{top3[1].score.toLocaleString()} XP</div>
                <div className="text-xs text-slate-400">{top3[1].branch} • {top3[1].badges} Badges</div>
              </div>

              {/* Gold - 1st */}
              <div className="flex flex-col items-center justify-end text-center space-y-2 order-2">
                <div className="relative">
                  <Image src={top3[0].avatar} alt={top3[0].name} width={80} height={80} className="rounded-full border-4 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.3)]" />
                  <span className="absolute -bottom-2 -right-2 text-3xl">🥇</span>
                </div>
                <div className="font-bold text-xl text-[#FFD700]">{top3[0].name}</div>
                <div className="text-md text-[#FFD700] font-mono">{top3[0].score.toLocaleString()} XP</div>
                <div className="text-xs text-slate-300">{top3[0].branch} • {top3[0].badges} Badges</div>
              </div>

              {/* Bronze - 3rd */}
              <div className="flex flex-col items-center justify-end text-center space-y-2 order-3 transform translate-y-12">
                <div className="relative">
                  <Image src={top3[2].avatar} alt={top3[2].name} width={56} height={56} className="rounded-full border-2 border-[#CD7F32]" />
                  <span className="absolute -bottom-2 -right-2 text-xl">🥉</span>
                </div>
                <div className="font-medium text-md">{top3[2].name}</div>
                <div className="text-sm text-[#CD7F32] font-mono">{top3[2].score.toLocaleString()} XP</div>
                <div className="text-xs text-slate-400">{top3[2].branch} • {top3[2].badges} Badges</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
            {['Global', 'Monthly', 'Weekly'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  period === p ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <select 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="All">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
              <option value="CE">CE</option>
            </select>
            
            <select 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            >
              <option value="All">All Batches</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>

            <div className="relative flex-1 md:w-48">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Leaderboard Table (Desktop) & Cards (Mobile) */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-sm text-slate-400">
                  <th className="p-4 font-medium">Rank</th>
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Branch/Batch</th>
                  <th className="p-4 font-medium">Score</th>
                  <th className="p-4 font-medium">Events</th>
                  <th className="p-4 font-medium">Wins</th>
                  <th className="p-4 font-medium">Badges</th>
                  <th className="p-4 font-medium">Movement</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => {
                  const rank = index + 1;
                  return (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "border-b border-white/5 hover:bg-white/5 transition-colors",
                        user.id === 'usr-5' ? "bg-blue-500/10 border-l-4 border-l-blue-500" : ""
                      )}
                    >
                      <td className="p-4">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border", getRankColor(rank))}>
                          {rank}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full bg-slate-800" />
                          <span className="font-medium text-white">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-300">
                        {user.branch} '{user.batch.slice(2)}
                      </td>
                      <td className="p-4 font-mono font-medium text-blue-400">
                        {user.score.toLocaleString()}
                      </td>
                      <td className="p-4 text-sm text-slate-300">{user.events}</td>
                      <td className="p-4 text-sm text-slate-300">{user.wins}</td>
                      <td className="p-4 text-sm text-slate-300">{user.badges}</td>
                      <td className="p-4">{getMovementIcon(user.movement)}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden divide-y divide-white/5">
            {filteredUsers.map((user, index) => {
               const rank = index + 1;
               return (
                <div key={user.id} className={cn("p-4 space-y-3", user.id === 'usr-5' ? "bg-blue-500/10 border-l-4 border-l-blue-500" : "")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border shrink-0", getRankColor(rank))}>
                        {rank}
                      </div>
                      <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full bg-slate-800" />
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-xs text-slate-400">{user.branch} '{user.batch.slice(2)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-medium text-blue-400">{user.score.toLocaleString()}</div>
                      <div className="flex justify-end mt-1">{getMovementIcon(user.movement)}</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 bg-white/5 p-2 rounded-lg">
                    <div className="flex flex-col items-center"><span>Events</span><span className="text-white">{user.events}</span></div>
                    <div className="flex flex-col items-center"><span>Wins</span><span className="text-white">{user.wins}</span></div>
                    <div className="flex flex-col items-center"><span>Badges</span><span className="text-white">{user.badges}</span></div>
                  </div>
                </div>
               );
            })}
          </div>
          
          <div className="p-4 border-t border-white/10 flex justify-center">
            <button className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-colors">
              Load More
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
