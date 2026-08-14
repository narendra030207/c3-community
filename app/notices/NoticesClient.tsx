'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Search, Paperclip, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

type Priority = 'Normal' | 'Important' | 'Urgent';
type Category = 'General' | 'Event' | 'Competition' | 'Result' | 'Achievement' | 'Maintenance';

interface Notice {
  id: number;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  date: string;
  hasAttachment?: boolean;
  hasLink?: boolean;
}

const notices: Notice[] = [
  { id: 1, title: 'Server Maintenance Scheduled', description: 'The C3 community servers will undergo scheduled maintenance this Sunday from 2 AM to 4 AM. Expect some downtime for the main website and leaderboard.', category: 'Maintenance', priority: 'Important', date: '2 hours ago' },
  { id: 2, title: 'Results Declared: Algo Battle 2025', description: 'The final results for Algo Battle 2025 have been published. Congratulations to all the winners! Please check the results page for detailed rankings.', category: 'Result', priority: 'Normal', date: '1 day ago', hasLink: true },
  { id: 3, title: 'Urgent: Registration Deadline Extended', description: 'Due to overwhelming response, the registration deadline for the upcoming React Workshop has been extended by 24 hours. Register now before seats fill up completely.', category: 'Event', priority: 'Urgent', date: '2 days ago', hasLink: true },
  { id: 4, title: 'Call for Core Team Volunteers', description: 'We are looking for enthusiastic members to join our core team for the upcoming academic year. Roles available in Technical, Design, and Event Management teams.', category: 'General', priority: 'Important', date: '3 days ago', hasAttachment: true },
  { id: 5, title: 'C3 Wins National Hackathon', description: 'A proud moment for the C3 Community as our team secured the first runner-up position at the National Smart India Hackathon. Read the full report attached.', category: 'Achievement', priority: 'Normal', date: '1 week ago', hasAttachment: true },
  { id: 6, title: 'New Competitive Programming Series', description: 'Starting next week, we will be hosting weekly competitive programming contests on Codeforces. Join our group to participate.', category: 'Competition', priority: 'Normal', date: '1 week ago', hasLink: true },
  { id: 7, title: 'Weekly Meeting Update', description: 'The weekly community sync has been moved from Thursday to Friday this week due to the mid-term examinations.', category: 'General', priority: 'Normal', date: '2 weeks ago' },
  { id: 8, title: 'Web3 Seminar Postponed', description: 'The seminar on Decentralized Applications has been postponed due to speaker unavailability. New dates will be announced shortly.', category: 'Event', priority: 'Important', date: '2 weeks ago' },
  { id: 9, title: 'Certificate Distribution', description: 'All participants of the Open Source Day can collect their physical certificates from the Innovation Hall during lunch break this week.', category: 'General', priority: 'Normal', date: '3 weeks ago' },
  { id: 10, title: 'Welcome to the New Semester', description: 'Welcome back to campus! We have a lot of exciting events and workshops planned for this semester. Stay tuned to this notice board.', category: 'General', priority: 'Normal', date: '1 month ago' },
];

const categories: ('All' | Category)[] = ['All', 'General', 'Event', 'Competition', 'Result', 'Achievement', 'Maintenance'];
const priorities: ('All' | Priority)[] = ['All', 'Normal', 'Important', 'Urgent'];

export default function NoticesClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | Category>('All');
  const [activePriority, setActivePriority] = useState<'All' | Priority>('All');

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notice.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || notice.category === activeCategory;
    const matchesPriority = activePriority === 'All' || notice.priority === activePriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const getPriorityColor = (priority: Priority) => {
    switch(priority) {
      case 'Urgent': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Important': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Normal': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20"
          >
            <Bell className="w-8 h-8 text-blue-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-500 mb-4"
          >
            Notices & Announcements
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Stay updated with the latest news, events, and important information from the community.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          
          <div className="flex-1 flex flex-wrap gap-2 justify-center md:justify-end">
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              {categories.map(cat => <option key={cat} value={cat} className="bg-[#0a0e1a]">{cat}</option>)}
            </select>
            
            <select 
              value={activePriority}
              onChange={(e) => setActivePriority(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              {priorities.map(p => <option key={p} value={p} className="bg-[#0a0e1a]">{p} Priority</option>)}
            </select>
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn(
                      "text-xs font-semibold px-2 py-1 rounded border flex items-center gap-1.5",
                      getPriorityColor(notice.priority)
                    )}>
                      {notice.priority === 'Urgent' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      )}
                      {notice.priority}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-white/10 text-slate-300 border border-white/5">
                      {notice.category}
                    </span>
                  </div>
                  <span className="text-sm text-slate-400 font-medium">{notice.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {notice.title}
                </h3>
                
                <p className="text-slate-300 text-sm md:text-base line-clamp-2 group-hover:line-clamp-none transition-all duration-300 mb-4">
                  {notice.description}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  {notice.hasAttachment && (
                    <div className="flex items-center gap-1 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                      <Paperclip className="w-4 h-4" />
                      <span>Attachment</span>
                    </div>
                  )}
                  {notice.hasLink && (
                    <div className="flex items-center gap-1 text-sm text-slate-400 hover:text-blue-400 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      <span>Link</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
              <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-slate-300 mb-2">No notices found</h3>
              <p className="text-slate-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
