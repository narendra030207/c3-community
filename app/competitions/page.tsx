import { Metadata } from 'next';
import Link from 'next/link';
import { Trophy, Calendar, Users, Star, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Competitions | C3 Community',
  description: 'Participate in coding challenges and competitions hosted by C3 Community.',
};

const DEMO_COMPETITIONS = [
  {
    id: 'global-2026',
    title: 'Global Coding Championship 2026',
    description: 'Join thousands of developers worldwide in our biggest algorithmic and system design competition of the year. Compete for prizes, recognition, and exclusive job opportunities.',
    date: 'May 1 - 5, 2026',
    prizePool: '$10,000',
    participants: 1500,
    status: 'Registration Open',
    featured: true,
  },
  {
    id: 'algo-sprint',
    title: 'Algo Sprint Q2',
    description: 'A fast-paced 3-hour algorithmic challenge designed to test your problem-solving speed.',
    date: 'Apr 20, 2026',
    prizePool: '$500',
    participants: 450,
    status: 'Upcoming',
    featured: false,
  },
  {
    id: 'web3-buildathon',
    title: 'Web3 Buildathon',
    description: 'Build decentralized applications on Ethereum over a weekend.',
    date: 'Jun 15 - 17, 2026',
    prizePool: '$2,000',
    participants: 300,
    status: 'Upcoming',
    featured: false,
  },
];

export default function CompetitionsPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-gray-200 pt-24 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center">
            <Trophy className="mr-4 text-yellow-500" size={40} /> Competitions
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Test your skills, compete with the best, and win amazing prizes in our official coding competitions.
          </p>
        </div>

        {/* Competitions List */}
        <div className="space-y-8">
          {DEMO_COMPETITIONS.map((comp) => (
            <div 
              key={comp.id} 
              className={`bg-gray-900/50 backdrop-blur-sm border rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all hover:-translate-y-1 ${
                comp.featured ? 'border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.15)]' : 'border-gray-800 hover:border-gray-600'
              }`}
            >
              <div className="p-8 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {comp.featured && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-900/30 text-violet-400 border border-violet-800/50 flex items-center">
                      <Star size={12} className="mr-1" /> Featured
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-800/50">
                    {comp.status}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{comp.title}</h2>
                <p className="text-gray-400 mb-6 max-w-3xl">{comp.description}</p>
                
                <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
                  <div className="flex items-center"><Calendar size={18} className="mr-2 text-blue-400" /> {comp.date}</div>
                  <div className="flex items-center"><Trophy size={18} className="mr-2 text-yellow-500" /> {comp.prizePool} Prize Pool</div>
                  <div className="flex items-center"><Users size={18} className="mr-2 text-cyan-400" /> {comp.participants}+ Registered</div>
                </div>
              </div>
              
              <div className="p-8 md:w-64 border-t md:border-t-0 md:border-l border-gray-800 bg-gray-900/80 flex flex-col justify-center">
                <Link 
                  href={`/competitions/${comp.id}`} 
                  className={`w-full py-4 rounded-lg font-bold text-center flex items-center justify-center transition-all ${
                    comp.featured 
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 shadow-md' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  View Details <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
