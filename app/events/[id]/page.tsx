import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Users, Clock, User, ArrowLeft, Trophy, CheckCircle2 } from 'lucide-react';

// Demo Data shared with other pages for consistency
const DEMO_EVENTS = [
  { 
    id: '1', title: 'Spring Hackathon 2026', date: 'Apr 15 - 17, 2026', time: '48 Hours', type: 'Hackathon', status: 'Upcoming', 
    participants: 120, maxCapacity: 200, venue: 'Main Campus Lab & Virtual', organizer: 'C3 Core Team',
    description: 'Join our biggest hackathon of the spring! Build innovative solutions to real-world problems. Whether you are a beginner or a pro, there is something for everyone. Form teams of 2-4 and compete for amazing prizes.',
    rules: ['Teams must have 2-4 members', 'All code must be written during the event', 'Open source libraries are allowed'],
    eligibility: 'Open to all university students',
    prizes: ['1st Place: $1000 + Swag', '2nd Place: $500 + Swag', 'Best UI/UX: $200'],
    registrationDeadline: 'Apr 10, 2026'
  },
  { 
    id: '2', title: 'React Performance Workshop', date: 'Mar 20, 2026', time: '10:00 AM - 2:00 PM', type: 'Workshop', status: 'Live', 
    participants: 45, maxCapacity: 50, venue: 'Virtual (Zoom)', organizer: 'Frontend Wing',
    description: 'Learn advanced techniques for optimizing React applications. We will cover memoization, concurrent features, code splitting, and how to use the React Profiler effectively.',
    rules: ['Participants must have basic React knowledge', 'Bring your own laptop'],
    eligibility: 'Members of C3 Frontend Wing (Open to guests if seats available)',
    prizes: ['Certificate of Completion for all attendees'],
    registrationDeadline: 'Mar 19, 2026'
  },
  { 
    id: '3', title: 'Algorithmic Coding Challenge', date: 'Mar 10, 2026', time: '2:00 PM - 5:00 PM', type: 'Competition', status: 'Completed', 
    participants: 250, maxCapacity: 300, venue: 'Online Platform (HackerRank)', organizer: 'Competitive Prog Wing',
    description: 'Test your algorithmic skills against the best programmers in the community. 5 problems, 3 hours. Languages supported: C++, Java, Python, Go, Rust.',
    rules: ['Individual participation only', 'Plagiarism will result in immediate ban', 'Webcams must be enabled'],
    eligibility: 'Open to all',
    prizes: ['1st Place: Mechanical Keyboard', 'Top 10: Exclusive C3 T-shirts'],
    registrationDeadline: 'Mar 9, 2026'
  }
];

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const event = DEMO_EVENTS.find(e => e.id === id);
  
  if (!event) {
    return {
      title: 'Event Not Found | C3 Community'
    };
  }
  
  return {
    title: `${event.title} | C3 Community Events`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = DEMO_EVENTS.find(e => e.id === id);
  
  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-gray-200 pt-24 pb-20">
      {/* Banner */}
      <div className="h-48 md:h-64 w-full bg-gradient-to-r from-blue-900/40 via-violet-900/40 to-[#0a0e1a] border-b border-gray-800 relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
          <Link href="/events" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4 absolute top-4 left-4 bg-gray-900/60 px-3 py-1.5 rounded-md backdrop-blur-sm border border-gray-800">
            <ArrowLeft size={16} className="mr-2" /> Back to Events
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl">
              <div className="flex flex-wrap gap-3 mb-6">
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
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {event.title}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <div className="flex items-center"><Calendar className="mr-3 text-blue-400" size={20} /> {event.date}</div>
                <div className="flex items-center"><Clock className="mr-3 text-violet-400" size={20} /> {event.time}</div>
                <div className="flex items-center"><MapPin className="mr-3 text-pink-400" size={20} /> {event.venue}</div>
                <div className="flex items-center"><User className="mr-3 text-cyan-400" size={20} /> By {event.organizer}</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">About the Event</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                {event.description}
              </p>
            </div>

            {/* Rules & Eligibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-8">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <CheckCircle2 className="mr-2 text-green-500" /> Rules & Guidelines
                </h2>
                <ul className="space-y-3 text-gray-300">
                  {event.rules.map((rule, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span> {rule}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-8">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Users className="mr-2 text-blue-500" /> Eligibility
                </h2>
                <p className="text-gray-300 bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                  {event.eligibility}
                </p>
              </div>
            </div>
            
            {/* Prizes */}
            <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Trophy className="mr-3 text-yellow-500" size={28} /> Prizes & Rewards
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {event.prizes.map((prize, i) => (
                  <div key={i} className="bg-gray-900/80 border border-gray-800 rounded-lg p-4 text-center flex flex-col items-center justify-center min-h-[100px]">
                    <span className="font-semibold text-gray-200">{prize}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">Registration Info</h3>
              
              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Registered</span>
                    <span className="text-white font-medium">{event.participants} / {event.maxCapacity}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${event.participants >= event.maxCapacity ? 'bg-red-500' : 'bg-blue-500'}`} 
                      style={{ width: `${Math.min((event.participants / event.maxCapacity) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 flex-shrink-0 text-gray-500 mt-1">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Deadline</p>
                    <p className="text-gray-200">{event.registrationDeadline}</p>
                  </div>
                </div>
              </div>

              {event.status === 'Upcoming' ? (
                <button 
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                    event.participants >= event.maxCapacity 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                  }`}
                  disabled={event.participants >= event.maxCapacity}
                >
                  {event.participants >= event.maxCapacity ? 'Event Full' : 'Register Now'}
                </button>
              ) : event.status === 'Live' ? (
                <button className="w-full py-4 rounded-lg font-bold text-lg bg-red-900/50 text-red-400 border border-red-800/50 cursor-default">
                  Event is Live
                </button>
              ) : (
                <button className="w-full py-4 rounded-lg font-bold text-lg bg-gray-800 text-gray-400 cursor-default">
                  Event Completed
                </button>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
