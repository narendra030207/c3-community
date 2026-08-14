import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Users, Trophy, ChevronRight, Bell, Code, Zap, Award, Sparkles } from 'lucide-react';
import HeroSection from '@/components/features/HeroSection';
import HomeStats from '@/components/features/HomeStats';

export const metadata: Metadata = {
  title: 'C3 Community | Code • Compete • Conquer',
  description: 'Empowering the next generation of tech innovators through coding, competitions, and community.',
};

// Demo Data
const DEMO_EVENTS = [
  { id: '1', title: 'Spring Hackathon 2026', date: 'Apr 15 - 17, 2026', type: 'Hackathon', status: 'Upcoming', participants: 120 },
  { id: '2', title: 'React Performance Workshop', date: 'Mar 20, 2026', type: 'Workshop', status: 'Live', participants: 45 },
  { id: '3', title: 'Algorithmic Coding Challenge', date: 'Mar 10, 2026', type: 'Competition', status: 'Completed', participants: 250 },
];

const DEMO_LEADERBOARD = [
  { rank: 1, name: 'Alex Rivera', initials: 'AR', score: 12500, badges: 15 },
  { rank: 2, name: 'Sam Chen', initials: 'SC', score: 11200, badges: 12 },
  { rank: 3, name: 'Jordan Taylor', initials: 'JT', score: 10850, badges: 11 },
  { rank: 4, name: 'Casey Smith', initials: 'CS', score: 9900, badges: 9 },
  { rank: 5, name: 'Riley Jones', initials: 'RJ', score: 9500, badges: 8 },
];

const DEMO_NOTICES = [
  { id: 1, title: 'Registrations open for Spring Hackathon', date: 'Mar 1, 2026', priority: 'High' },
  { id: 2, title: 'New Web Dev Pathway released', date: 'Feb 28, 2026', priority: 'Medium' },
  { id: 3, title: 'System maintenance scheduled for weekend', date: 'Feb 25, 2026', priority: 'Low' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0e1a] text-gray-200">
      <HeroSection />
      <HomeStats />

      {/* Upcoming Events Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Upcoming Events</h2>
            <p className="text-gray-400">Join our latest workshops, hackathons, and challenges.</p>
          </div>
          <Link href="/events" className="hidden md:flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            View All Events <ChevronRight size={20} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_EVENTS.map(event => (
            <div key={event.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all flex flex-col group">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-800/50">
                    {event.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    event.status === 'Upcoming' ? 'bg-green-900/30 text-green-400 border-green-800/50' : 
                    event.status === 'Live' ? 'bg-red-900/30 text-red-400 border-red-800/50' : 
                    'bg-gray-800 text-gray-400 border-gray-700'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{event.title}</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center"><Calendar size={16} className="mr-2" /> {event.date}</div>
                  <div className="flex items-center"><Users size={16} className="mr-2" /> {event.participants} Participants</div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-800 bg-gray-900/80">
                <Link href={`/events/${event.id}`} className="block text-center w-full py-2 rounded-md bg-blue-600/10 text-blue-400 font-medium hover:bg-blue-600 hover:text-white transition-colors border border-blue-900/50">
                  {event.status === 'Completed' ? 'View Details' : 'Register Now'}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/events" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium">
            View All Events <ChevronRight size={20} className="ml-1" />
          </Link>
        </div>
      </section>

      {/* Featured Competition Section */}
      <section className="py-20 bg-gradient-to-b from-[#0a0e1a] to-[#0f172a] border-y border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden bg-gray-900/60 backdrop-blur-md border border-gray-800 p-1">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-cyan-500/10" />
            <div className="relative rounded-xl bg-[#0a0e1a]/90 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-900/30 text-violet-400 text-sm font-medium border border-violet-800/50">
                  <Sparkles size={16} className="mr-2" /> Featured Competition
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white">Global Coding Championship 2026</h2>
                <p className="text-gray-400 text-lg">
                  Join thousands of developers worldwide in our biggest algorithmic and system design competition of the year. Compete for prizes, recognition, and exclusive job opportunities.
                </p>
                <div className="flex flex-wrap gap-4 text-sm font-medium">
                  <div className="flex items-center bg-gray-800 px-4 py-2 rounded-md"><Calendar size={18} className="mr-2 text-blue-400"/> May 1 - 5, 2026</div>
                  <div className="flex items-center bg-gray-800 px-4 py-2 rounded-md"><Trophy size={18} className="mr-2 text-yellow-500"/> $10,000 Prize Pool</div>
                </div>
                <Link href="/competitions/global-2026" className="inline-block px-8 py-4 rounded-md font-bold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  Register for Championship
                </Link>
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-900 to-violet-900 border-4 border-gray-800 flex items-center justify-center relative shadow-[0_0_50px_rgba(139,92,246,0.2)]">
                  <Trophy size={100} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview & Notices */}
      <section className="py-20 container mx-auto px-4 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Top Performers</h2>
            <Link href="/leaderboard" className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
              View Full Leaderboard
            </Link>
          </div>
          <div className="bg-gray-900/40 border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-800/50 text-gray-400 text-sm">
                    <th className="p-4 font-medium">Rank</th>
                    <th className="p-4 font-medium">Developer</th>
                    <th className="p-4 font-medium">Score</th>
                    <th className="p-4 font-medium">Badges</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {DEMO_LEADERBOARD.map((user, idx) => (
                    <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                      <td className="p-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          user.rank === 1 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' :
                          user.rank === 2 ? 'bg-gray-300/20 text-gray-300 border border-gray-300/50' :
                          user.rank === 3 ? 'bg-amber-700/20 text-amber-500 border border-amber-700/50' :
                          'text-gray-500'
                        }`}>
                          #{user.rank}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                            {user.initials}
                          </div>
                          <span className="font-semibold text-gray-200">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-medium text-cyan-400">{user.score.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Award size={16} className="text-pink-500" /> {user.badges}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center"><Bell size={24} className="mr-2 text-violet-400" /> Latest Notices</h2>
            <Link href="/notices" className="text-gray-400 hover:text-white transition-colors text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {DEMO_NOTICES.map(notice => (
              <div key={notice.id} className="bg-gray-900/40 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${
                    notice.priority === 'High' ? 'bg-red-900/50 text-red-400' :
                    notice.priority === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
                    'bg-blue-900/50 text-blue-400'
                  }`}>
                    {notice.priority}
                  </span>
                  <span className="text-xs text-gray-500">{notice.date}</span>
                </div>
                <h3 className="font-medium text-gray-300">{notice.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Highlights */}
      <section className="py-20 bg-gray-900/20 border-t border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Join C3?</h2>
            <p className="text-gray-400">Discover a platform designed to accelerate your technical growth and connect you with like-minded innovators.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: 'Hackathons', desc: 'Participate in time-bound coding challenges to build innovative solutions.', color: 'text-blue-400' },
              { icon: Zap, title: 'Workshops', desc: 'Learn cutting-edge technologies from industry experts and peers.', color: 'text-yellow-400' },
              { icon: Award, title: 'Certificates', desc: 'Earn verifiable digital certificates for your achievements and participation.', color: 'text-pink-400' },
              { icon: Sparkles, title: 'AI Assistant', desc: 'Leverage our integrated AI for coding help, project ideas, and debugging.', color: 'text-violet-400' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#0a0e1a] p-6 rounded-xl border border-gray-800 hover:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div className={`w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-[#0a0e1a] to-violet-900/20 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Code, Compete, and Conquer?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Join thousands of students building the future. Create your profile today and start your journey.</p>
          <Link href="/register" className="inline-block px-10 py-4 rounded-md font-bold text-lg text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
            Join C3 Community Today
          </Link>
        </div>
      </section>
    </div>
  );
}
