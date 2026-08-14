'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Search, Filter, Calendar, MapPin, Users, ChevronRight } from 'lucide-react';

const DEMO_EVENTS = [
  { id: '1', title: 'Spring Hackathon 2026', date: 'Apr 15 - 17, 2026', type: 'Hackathon', status: 'Upcoming', participants: 120, venue: 'Main Campus Lab', organizer: 'C3 Core Team' },
  { id: '2', title: 'React Performance Workshop', date: 'Mar 20, 2026', type: 'Workshop', status: 'Live', participants: 45, venue: 'Virtual', organizer: 'Frontend Wing' },
  { id: '3', title: 'Algorithmic Coding Challenge', date: 'Mar 10, 2026', type: 'Competition', status: 'Completed', participants: 250, venue: 'Online Platform', organizer: 'Competitive Prog Wing' },
  { id: '4', title: 'AI in Healthcare Seminar', date: 'May 5, 2026', type: 'Seminar', status: 'Upcoming', participants: 85, venue: 'Auditorium', organizer: 'AI/ML Wing' },
  { id: '5', title: 'Tech Trivia Night', date: 'Mar 25, 2026', type: 'Quiz', status: 'Upcoming', participants: 60, venue: 'Student Center', organizer: 'Events Team' },
  { id: '6', title: 'Web3 Basics Bootcamp', date: 'Feb 15, 2026', type: 'Workshop', status: 'Completed', participants: 90, venue: 'Lab 3', organizer: 'Web3 Wing' },
  { id: '7', title: 'System Design Mock Interviews', date: 'Apr 2, 2026', type: 'Coding', status: 'Upcoming', participants: 30, venue: 'Virtual', organizer: 'Placement Cell' },
  { id: '8', title: 'Winter Hackathon 2025', date: 'Dec 10 - 12, 2025', type: 'Hackathon', status: 'Completed', participants: 300, venue: 'Main Campus', organizer: 'C3 Core Team' },
];

const EVENT_TYPES = ['All', 'Coding', 'Hackathon', 'Workshop', 'Seminar', 'Quiz', 'Competition'];
const STATUS_TYPES = ['All', 'Upcoming', 'Live', 'Completed'];

export default function EventsClient() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredEvents = DEMO_EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All' || event.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || event.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-gray-200 pt-24 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Events & Workshops</h1>
          <p className="text-xl text-gray-400">Discover and participate in our latest tech events.</p>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-xl p-6 mb-10 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative min-w-[160px]">
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
              >
                {EVENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
            <div className="relative min-w-[160px]">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
              >
                {STATUS_TYPES.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all flex flex-col group"
              >
                {/* Banner Area */}
                <div className="h-32 relative bg-gradient-to-br from-blue-900/40 to-violet-900/40 border-b border-gray-800 flex items-start justify-between p-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-900/80 text-gray-300 border border-gray-700 backdrop-blur-sm shadow-sm">
                    {event.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm shadow-sm ${
                    event.status === 'Upcoming' ? 'bg-green-900/80 text-green-400 border-green-800/50' : 
                    event.status === 'Live' ? 'bg-red-900/80 text-red-400 border-red-800/50' : 
                    'bg-gray-800/80 text-gray-400 border-gray-700'
                  }`}>
                    {event.status}
                  </span>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 text-sm text-gray-400 mb-6 flex-1">
                    <div className="flex items-center"><Calendar size={16} className="mr-3 text-gray-500" /> {event.date}</div>
                    <div className="flex items-center"><MapPin size={16} className="mr-3 text-gray-500" /> {event.venue}</div>
                    <div className="flex items-center"><Users size={16} className="mr-3 text-gray-500" /> {event.participants} registered</div>
                  </div>
                  
                  <Link 
                    href={`/events/${event.id}`} 
                    className={`w-full py-2.5 rounded-md font-medium flex items-center justify-center transition-colors ${
                      event.status === 'Upcoming' 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md' 
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                    }`}
                  >
                    {event.status === 'Upcoming' ? 'Register Now' : 'View Details'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
            <h3 className="text-xl font-medium text-white mb-2">No events found</h3>
            <p className="text-gray-400">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
