'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Result {
  id: string;
  eventName: string;
  participantName: string;
  rollNumber: string;
  rank: number | string;
  score: number;
  remarks: string;
  date: string;
}

const demoResults: Result[] = [
  { id: '1', eventName: 'Algo Battle 2025', participantName: 'Ravi Kumar', rollNumber: '22CS0145', rank: 1, score: 950, remarks: 'Gold Medalist', date: 'Jul 05, 2025' },
  { id: '2', eventName: 'Algo Battle 2025', participantName: 'Priya Sharma', rollNumber: '22IT0089', rank: 2, score: 920, remarks: 'Silver Medalist', date: 'Jul 05, 2025' },
  { id: '3', eventName: 'Algo Battle 2025', participantName: 'Amit Singh', rollNumber: '22CS0211', rank: 3, score: 890, remarks: 'Bronze Medalist', date: 'Jul 05, 2025' },
  { id: '4', eventName: 'CodeFest 2025', participantName: 'Team Alpha (Lead: Sneha)', rollNumber: '21CS0055', rank: 1, score: 100, remarks: 'Best Innovation', date: 'Aug 10, 2025' },
  { id: '5', eventName: 'CodeFest 2025', participantName: 'Team Beta', rollNumber: '21EC0102', rank: 2, score: 95, remarks: 'Great UI/UX', date: 'Aug 10, 2025' },
  { id: '6', eventName: 'React Workshop Quiz', participantName: 'Karan Patel', rollNumber: '23CS0012', rank: 1, score: 50, remarks: 'Full Marks', date: 'Sep 22, 2025' },
  { id: '7', eventName: 'React Workshop Quiz', participantName: 'Megha Gupta', rollNumber: '23IT0045', rank: 2, score: 48, remarks: 'Excellent', date: 'Sep 22, 2025' },
  { id: '8', eventName: 'React Workshop Quiz', participantName: 'Rahul Verma', rollNumber: '23CS0088', rank: 3, score: 45, remarks: 'Good', date: 'Sep 22, 2025' },
  { id: '9', eventName: 'AI Hackathon', participantName: 'NeuroMancers', rollNumber: '21CS0199', rank: 1, score: 98, remarks: 'Best AI Model', date: 'Mar 28, 2025' },
  { id: '10', eventName: 'AI Hackathon', participantName: 'Data Wizards', rollNumber: '21IT0076', rank: 2, score: 92, remarks: 'Innovative approach', date: 'Mar 28, 2025' },
  { id: '11', eventName: 'Debug the Code', participantName: 'Vikas Reddy', rollNumber: '22EE0034', rank: 1, score: 200, remarks: 'Fastest solver', date: 'Jan 10, 2025' },
  { id: '12', eventName: 'Debug the Code', participantName: 'Anjali Desai', rollNumber: '22CS0111', rank: 2, score: 180, remarks: 'Highly accurate', date: 'Jan 10, 2025' },
  { id: '13', eventName: 'Web3 Seminar Quiz', participantName: 'Sanjay Jain', rollNumber: '20CS0043', rank: 1, score: 30, remarks: 'Winner', date: 'Apr 12, 2025' },
  { id: '14', eventName: 'Web3 Seminar Quiz', participantName: 'Pooja Tiwari', rollNumber: '20IT0012', rank: 2, score: 28, remarks: 'Runner up', date: 'Apr 12, 2025' },
  { id: '15', eventName: 'Game Jam', participantName: 'Pixel Pioneers', rollNumber: '21CS0222', rank: 1, score: 100, remarks: 'Best Gameplay', date: 'Aug 25, 2024' },
];

const maskRollNumber = (roll: string) => {
  if (roll.length < 4) return roll;
  return roll.substring(0, 2) + '*'.repeat(roll.length - 4) + roll.substring(roll.length - 2);
};

export default function ResultsClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('All');

  const events = ['All', ...Array.from(new Set(demoResults.map(r => r.eventName)))];

  const filteredResults = demoResults.filter(result => {
    const matchesSearch = 
      result.participantName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      result.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEvent = selectedEvent === 'All' || result.eventName === selectedEvent;
    
    return matchesSearch && matchesEvent;
  });

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20"
          >
            <Trophy className="w-8 h-8 text-yellow-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-500 mb-4"
          >
            Results & Leaderboards
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Check out the top performers and winners across all our events and competitions.
          </motion.p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0e1a]/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          
          <div className="relative w-full md:w-1/2">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select 
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full bg-[#0a0e1a]/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              {events.map(event => <option key={event} value={event} className="bg-[#0a0e1a]">{event}</option>)}
            </select>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-slate-300 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">Rank</th>
                  <th className="p-4 font-semibold">Participant</th>
                  <th className="p-4 font-semibold">Roll No.</th>
                  <th className="p-4 font-semibold">Event</th>
                  <th className="p-4 font-semibold">Score</th>
                  <th className="p-4 font-semibold">Remarks</th>
                  <th className="p-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {filteredResults.length > 0 ? (
                  filteredResults.map((result, idx) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={result.id} 
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4 font-bold">
                        {result.rank === 1 ? <span className="text-yellow-400">#1</span> : 
                         result.rank === 2 ? <span className="text-slate-300">#2</span> : 
                         result.rank === 3 ? <span className="text-amber-600">#3</span> : 
                         <span className="text-slate-500">#{result.rank}</span>}
                      </td>
                      <td className="p-4 font-medium text-white">{result.participantName}</td>
                      <td className="p-4 font-mono text-sm text-slate-400">{maskRollNumber(result.rollNumber)}</td>
                      <td className="p-4 text-blue-300">{result.eventName}</td>
                      <td className="p-4 font-mono">{result.score}</td>
                      <td className="p-4 text-sm">{result.remarks}</td>
                      <td className="p-4 text-sm text-slate-500">{result.date}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No results found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={result.id}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 relative overflow-hidden"
              >
                {/* Rank indicator background */}
                {result.rank === 1 && <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-3xl" />}
                {result.rank === 2 && <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-slate-300/20 to-transparent rounded-bl-3xl" />}
                {result.rank === 3 && <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-600/20 to-transparent rounded-bl-3xl" />}

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <h3 className="text-lg font-bold text-white">{result.participantName}</h3>
                    <p className="text-sm font-mono text-slate-400 mt-1">{maskRollNumber(result.rollNumber)}</p>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "text-2xl font-bold",
                      result.rank === 1 ? "text-yellow-400" : 
                      result.rank === 2 ? "text-slate-300" : 
                      result.rank === 3 ? "text-amber-600" : "text-slate-500"
                    )}>
                      #{result.rank}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-t border-white/5 pt-2">
                    <span className="text-slate-400">Event</span>
                    <span className="text-blue-300 font-medium">{result.eventName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Score</span>
                    <span className="text-white font-mono">{result.score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Remarks</span>
                    <span className="text-slate-300">{result.remarks}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
             <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
              <Trophy className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500">No results found.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
