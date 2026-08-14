"use client";

import { useState } from "react";
import { Edit } from "lucide-react";

const DEMO_DATA = [
  { id: 1, name: 'Coding Champion', type: 'CODING_CHAMPION', description: 'Win a coding competition', xpReward: 500, icon: "🏆" },
  { id: 2, name: 'Hackathon Winner', type: 'HACKATHON_WINNER', description: 'Win a hackathon', xpReward: 750, icon: "🚀" },
  { id: 3, name: 'Top Performer', type: 'TOP_PERFORMER', description: 'Reach top 5 on leaderboard', xpReward: 400, icon: "⭐" },
  { id: 4, name: 'Problem Solver', type: 'PROBLEM_SOLVER', description: 'Solve 50+ problems', xpReward: 300, icon: "🧠" },
  { id: 5, name: 'Workshop Contributor', type: 'WORKSHOP_CONTRIBUTOR', description: 'Attend 5 workshops', xpReward: 200, icon: "📚" },
  { id: 6, name: 'Community Leader', type: 'COMMUNITY_LEADER', description: 'Help 10+ community members', xpReward: 350, icon: "🤝" },
  { id: 7, name: 'Event Organizer', type: 'EVENT_ORGANIZER', description: 'Organize a C3 event', xpReward: 400, icon: "📅" },
  { id: 8, name: 'First Event', type: 'FIRST_EVENT', description: 'Attend your first event', xpReward: 50, icon: "🎯" },
];

export default function AdminAchievementsPage() {
  const [data] = useState(DEMO_DATA);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Achievements</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative group">
            <button className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
              <Edit className="w-4 h-4" />
            </button>
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
            <p className="text-xs text-blue-400 mb-3">{item.type}</p>
            <p className="text-sm text-gray-400 mb-4">{item.description}</p>
            <div className="text-sm font-medium text-violet-400">+{item.xpReward} XP</div>
          </div>
        ))}
      </div>
    </div>
  );
}
