"use client";

import { useState } from "react";
import { RefreshCw, Edit } from "lucide-react";

const DEMO_DATA = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  rank: i + 1,
  name: `Participant ${i + 1}`,
  branch: ["Computer Science", "Information Technology", "Electronics"][i % 3],
  score: 1000 - i * 50,
  events: Math.floor(Math.random() * 10) + 1
}));

export default function AdminLeaderboardPage() {
  const [data] = useState(DEMO_DATA);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Leaderboard Management</h1>
        <button className="px-4 py-2 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Recalculate Rankings
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Rank</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Branch</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Total Score</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Events Participated</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white font-bold">#{item.rank}</td>
                  <td className="px-4 py-3 text-white">{item.name}</td>
                  <td className="px-4 py-3 text-gray-300">{item.branch}</td>
                  <td className="px-4 py-3 text-blue-400 font-medium">{item.score}</td>
                  <td className="px-4 py-3 text-gray-300">{item.events}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="text-gray-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
