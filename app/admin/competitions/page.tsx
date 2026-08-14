"use client";

import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Plus, Edit, Trash2 } from "lucide-react";

const DEMO_DATA = [
  { id: 1, title: "Code Sprint 2024", status: "UPCOMING", startDate: "2024-12-15", endDate: "2024-12-15", participants: 100, submissions: 0 },
  { id: 2, title: "HackFusion 2024", status: "UPCOMING", startDate: "2024-12-20", endDate: "2024-12-21", participants: 80, submissions: 0 },
  { id: 3, title: "Bug Hunt Challenge", status: "COMPLETED", startDate: "2024-11-10", endDate: "2024-11-10", participants: 60, submissions: 55 },
  { id: 4, title: "Web Dev Showdown", status: "UPCOMING", startDate: "2024-12-28", endDate: "2024-12-28", participants: 50, submissions: 0 },
];

export default function AdminCompetitionsPage() {
  const [data] = useState(DEMO_DATA);
  const [search, setSearch] = useState("");

  const filtered = data.filter(item => 
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Competitions</h1>
        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium hover:from-blue-500 hover:to-violet-500 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Competition
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
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Start Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">End Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Participants</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Submissions</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white">{item.title}</td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-1 text-xs rounded-full", item.status === "UPCOMING" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400")}>{item.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{formatDate(item.startDate)}</td>
                  <td className="px-4 py-3 text-gray-300">{formatDate(item.endDate)}</td>
                  <td className="px-4 py-3 text-gray-300">{item.participants}</td>
                  <td className="px-4 py-3 text-gray-300">{item.submissions}</td>
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
