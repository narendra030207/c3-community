'use client';

import { motion } from 'motion/react';
import { Target, Lightbulb, Rocket, Code2, Users, Briefcase, Zap, ShieldCheck } from 'lucide-react';

const TIMELINE_DATA = [
  { year: '2021', title: 'Community Founded', description: 'Started with 10 passionate computer science students.' },
  { year: '2022', title: 'First Hackathon', description: 'Hosted our inaugural campus-wide hackathon with 100+ participants.' },
  { year: '2022', title: '100 Members Milestone', description: 'Reached 100 active members and formed specialized study groups.' },
  { year: '2023', title: 'State-level Competition', description: 'Organized our first inter-college competition drawing talent from across the state.' },
  { year: '2024', title: 'AI Workshop Series', description: 'Launched comprehensive AI/ML training pathways for members.' },
  { year: '2024', title: 'National Recognition', description: 'Awarded "Best Tech Community" by the National Student Developer Council.' },
];

export default function AboutPageClient() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0e1a] text-gray-200">
      
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-[#0a0e1a] to-[#0a0e1a] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">C3 Community</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We are a collective of developers, designers, and innovators building the future of technology through collaborative learning and competition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Objectives */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-8 rounded-2xl hover:border-blue-500/50 transition-colors"
          >
            <div className="w-14 h-14 bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-400">
              <Target size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To foster a vibrant coding culture and empower students with cutting-edge technical skills through hands-on projects and peer collaboration.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-8 rounded-2xl hover:border-violet-500/50 transition-colors"
          >
            <div className="w-14 h-14 bg-violet-900/30 rounded-xl flex items-center justify-center mb-6 text-violet-400">
              <Lightbulb size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              To be the premier student-led technology community driving innovation, excellence, and creating industry-ready professionals.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-colors"
          >
            <div className="w-14 h-14 bg-cyan-900/30 rounded-xl flex items-center justify-center mb-6 text-cyan-400">
              <Rocket size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Objectives</h2>
            <p className="text-gray-400 leading-relaxed">
              Bridge the gap between academic learning and industry skills through hands-on experience, competitive programming, and open-source contributions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What C3 Offers */}
      <section className="py-20 bg-gray-900/20 border-y border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What C3 Offers</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive pathways to accelerate your technical growth.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Code2, title: 'Competitive Programming', desc: 'Regular contests and practice sessions to sharpen algorithmic thinking.', color: 'text-blue-400' },
              { icon: Zap, title: 'Hackathons', desc: '24-48 hour coding marathons to build innovative solutions from scratch.', color: 'text-yellow-400' },
              { icon: Users, title: 'Workshops & Seminars', desc: 'Expert-led sessions on trending technologies and frameworks.', color: 'text-violet-400' },
              { icon: Briefcase, title: 'Project Building', desc: 'Collaborative development of real-world applications.', color: 'text-cyan-400' },
              { icon: ShieldCheck, title: 'Peer Learning', desc: 'Study groups and mentorship programs driven by senior members.', color: 'text-green-400' },
              { icon: Rocket, title: 'Industry Connect', desc: 'Networking opportunities with tech professionals and alumni.', color: 'text-pink-400' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0a0e1a] p-6 rounded-xl border border-gray-800 flex flex-col items-start hover:bg-gray-900/80 transition-colors"
              >
                <div className={`p-3 rounded-lg bg-gray-800 mb-4 ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Timeline */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Journey</h2>
          <p className="text-gray-400">The milestones that shaped C3 Community.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 via-violet-600 to-[#0a0e1a] rounded-full hidden md:block" />
          
          <div className="space-y-12">
            {TIMELINE_DATA.map((item, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center justify-between w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12" />
                
                <div className="relative z-10 w-10 h-10 rounded-full bg-gray-900 border-4 border-violet-500 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)] my-4 md:my-0">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`w-full md:w-5/12 bg-gray-900/60 backdrop-blur-sm border border-gray-800 p-6 rounded-xl hover:border-gray-600 transition-colors text-left ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
                >
                  <span className="text-blue-400 font-bold text-sm tracking-wider uppercase mb-1 block">{item.year}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Benefits & Innovation Ecosystem */}
      <section className="py-20 bg-gradient-to-t from-blue-950/20 to-[#0a0e1a] border-t border-gray-800/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Innovation Ecosystem</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
            C3 provides a comprehensive ecosystem where raw talent is refined into professional excellence. 
            Through continuous learning, practical implementation, and robust networking, we create leaders of tomorrow.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Skill Development', desc: 'Master new languages and frameworks' },
              { title: 'Networking', desc: 'Connect with peers and industry experts' },
              { title: 'Recognition', desc: 'Build your profile and earn badges' },
              { title: 'Career Growth', desc: 'Get ready for technical interviews and jobs' }
            ].map((benefit, idx) => (
              <div key={idx} className="p-6 bg-gray-900/40 rounded-xl border border-gray-800">
                <h3 className="font-bold text-white text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
