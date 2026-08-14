"use client";

import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Plus, Edit, Trash2 } from "lucide-react";

const DEMO_DATA = [
  { id: 1, title: "CodeStorm Registration Open", category: "COMPETITION", priority: "IMPORTANT", date: "2024-12-01" },
  { id: 2, title: "Team Formation", category: "EVENT", priority: "NORMAL", date: "2024-12-02" },
  { id: 3, title: "Leaderboard Updated", category: "ACHIEVEMENT", priority: "NORMAL", date: "2024-12-03" },
  { id: 4, title: "Server Maintenance", category: "MAINTENANCE", priority: "URGENT", date: "2024-12-04" },
  { id: 5, title: "Certificates Available", category: "RESULT", priority: "IMPORTANT", date: "2024-12-05" },
  { id: 6, title: "DSA Masterclass Announced", category: "EVENT", priority: "NORMAL", date: "2024-12-06" },
  { id: 7, title: "Bug Hunt Results", category: "RESULT", priority: "IMPORTANT", date: "2024-12-07" },
  { id: 8, title: "Community Meetup", category: "GENERAL", priority: "NORMAL", date: "2024-12-08" },
];

export default function AdminNoticesPage() {
  const [data] = useState(DEMO_DATA);
  const [search, setSearch] = useState("");

  const filtered = data.filter(item => 
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Notices</h1>
        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium hover:from-blue-500 hover:to-violet-500 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Notice
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
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Priority</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Published Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white">{item.title}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300">{item.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-full", 
                      item.priority === "URGENT" ? "bg-red-500/20 text-red-400" : 
                      item.priority === "IMPORTANT" ? "bg-orange-500/20 text-orange-400" : 
                      "bg-blue-500/20 text-blue-400"
                    )}>{item.priority}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{formatDate(item.date)}</td>
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
