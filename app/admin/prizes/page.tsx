"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

const DEMO_DATA = [
  { id: 1, title: "1st Place - HackFusion", position: 1, type: "PHYSICAL", competition: "HackFusion 2024", winner: "Team Alpha" },
  { id: 2, title: "2nd Place - HackFusion", position: 2, type: "DIGITAL", competition: "HackFusion 2024", winner: "Team Beta" },
  { id: 3, title: "Code Sprint Winner", position: 1, type: "MONEY", competition: "Code Sprint 2024", winner: "Arjun Patel" },
  { id: 4, title: "Best UI/UX Award", position: 1, type: "PHYSICAL", competition: "Web Dev Showdown", winner: "Sneha Gupta" },
  { id: 5, title: "Bug Hunt Champ", position: 1, type: "DIGITAL", competition: "Bug Hunt Challenge", winner: "Priya Sharma" },
  { id: 6, title: "3rd Place - Code Sprint", position: 3, type: "MONEY", competition: "Code Sprint 2024", winner: "Rahul Kumar" },
];

export default function AdminPrizesPage() {
  const [data] = useState(DEMO_DATA);
  const [search, setSearch] = useState("");

  const filtered = data.filter(item => 
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Prizes</h1>
        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium hover:from-blue-500 hover:to-violet-500 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Prize
        </button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-80 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Position</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Competition</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Winner</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white">{item.title}</td>
                  <td className="px-4 py-3 text-gray-300">{item.position}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">{item.type}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{item.competition}</td>
                  <td className="px-4 py-3 text-gray-300">{item.winner}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="text-gray-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                    <button className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
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
