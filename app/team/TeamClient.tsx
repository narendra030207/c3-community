'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = ['Faculty Mentors', 'Core Team', 'Coordinators', 'Volunteers', 'Alumni'];

const teamMembers = [
  { id: 1, name: 'Dr. Alan Turing', position: 'Faculty Mentor', department: 'Computer Science', bio: 'Pioneer of theoretical computer science and artificial intelligence.', skills: ['AI', 'Theory', 'Cryptography'], category: 'Faculty Mentors', github: '#', linkedin: '#', twitter: '#' },
  { id: 2, name: 'Ada Lovelace', position: 'President', department: 'Computer Science', bio: 'Passionate about algorithms and community building. Leading the C3 vision.', skills: ['Algorithms', 'Leadership', 'C++'], category: 'Core Team', github: '#', linkedin: '#', twitter: '#' },
  { id: 3, name: 'Grace Hopper', position: 'Vice President', department: 'Information Tech', bio: 'Compiler enthusiast and hardware debugger. Organizing hackathons.', skills: ['Compilers', 'Management', 'Java'], category: 'Core Team', github: '#', linkedin: '#', twitter: '#' },
  { id: 4, name: 'Linus Torvalds', position: 'Technical Head', department: 'Computer Science', bio: 'Open source advocate. Building the core infrastructure for C3.', skills: ['Linux', 'Git', 'C'], category: 'Core Team', github: '#', linkedin: '#', twitter: '#' },
  { id: 5, name: 'Margaret Hamilton', position: 'Event Coordinator', department: 'Software Eng', bio: 'Ensuring flawless execution of all C3 events and workshops.', skills: ['Planning', 'Software Eng', 'Apollo'], category: 'Coordinators', github: '#', linkedin: '#', twitter: '#' },
  { id: 6, name: 'Tim Berners-Lee', position: 'Web Coordinator', department: 'Computer Science', bio: 'Weaving the web presence of the community.', skills: ['Web', 'HTML', 'Networks'], category: 'Coordinators', github: '#', linkedin: '#', twitter: '#' },
  { id: 7, name: 'Hedy Lamarr', position: 'Design Lead', department: 'Electronics', bio: 'Creating beautiful and functional designs for all our platforms.', skills: ['UI/UX', 'Figma', 'Wireless'], category: 'Core Team', github: '#', linkedin: '#', twitter: '#' },
  { id: 8, name: 'Claude Shannon', position: 'Volunteer', department: 'Mathematics', bio: 'Helping out with data management and event logistics.', skills: ['Info Theory', 'Logistics'], category: 'Volunteers', github: '#', linkedin: '#', twitter: '#' },
  { id: 9, name: 'John von Neumann', position: 'Volunteer', department: 'Computer Science', bio: 'Assisting in competitive programming workshops.', skills: ['Math', 'Architecture'], category: 'Volunteers', github: '#', linkedin: '#', twitter: '#' },
  { id: 10, name: 'Katherine Johnson', position: 'Alumni', department: 'Mathematics', bio: 'Former President, currently a software engineer at a top tech firm.', skills: ['Calculations', 'Mentoring'], category: 'Alumni', github: '#', linkedin: '#', twitter: '#' },
  { id: 11, name: 'Dennis Ritchie', position: 'Alumni', department: 'Computer Science', bio: 'Created the foundational tools we use today. Continues to guide us.', skills: ['C', 'Unix', 'Systems'], category: 'Alumni', github: '#', linkedin: '#', twitter: '#' },
  { id: 12, name: 'Bjarne Stroustrup', position: 'Volunteer', department: 'Computer Science', bio: 'Helping beginners learn object-oriented programming concepts.', skills: ['C++', 'Teaching'], category: 'Volunteers', github: '#', linkedin: '#', twitter: '#' },
];

export default function TeamClient() {
  const [activeTab, setActiveTab] = useState(categories[1]);

  const filteredMembers = teamMembers.filter(member => member.category === activeTab);

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-500 mb-4"
          >
            Our Team
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Meet the passionate individuals who make the C3 Community thrive.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md border",
                activeTab === category 
                  ? "bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-300"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col items-center text-center transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              {/* Photo placeholder */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 p-1 mb-6 relative">
                <div className="w-full h-full rounded-full bg-[#0a0e1a] flex items-center justify-center text-3xl font-bold text-white/80">
                  {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-blue-400 text-sm font-medium mb-1">{member.position}</p>
              <p className="text-slate-400 text-xs mb-4">{member.department}</p>
              
              <p className="text-slate-300 text-sm mb-6 line-clamp-3">
                {member.bio}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mt-auto w-full mb-6">
                {member.skills.map(skill => (
                  <span key={skill} className="text-xs px-2 py-1 rounded-md bg-white/10 text-cyan-300 border border-white/5">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links on Hover */}
              <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center gap-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-[#0a0e1a] to-transparent pt-12">
                <a href={member.github} className="text-slate-400 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20">
                  <Github className="w-5 h-5" />
                </a>
                <a href={member.linkedin} className="text-slate-400 hover:text-blue-400 transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={member.twitter} className="text-slate-400 hover:text-cyan-400 transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
