"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Edit, Trash2 } from "lucide-react";

const DEMO_DATA = [
  { id: 1, name: "Dr. Rajesh Kumar", position: "Faculty Advisor", category: "FACULTY_MENTOR", department: "Computer Science", active: true },
  { id: 2, name: "Prof. Anita Sharma", position: "Faculty Co-Advisor", category: "FACULTY_MENTOR", department: "Information Technology", active: true },
  { id: 3, name: "Arjun Patel", position: "President", category: "CORE_TEAM", department: "Computer Science", active: true },
  { id: 4, name: "Priya Sharma", position: "Vice President", category: "CORE_TEAM", department: "Information Technology", active: true },
  { id: 5, name: "Rahul Kumar", position: "Technical Lead", category: "CORE_TEAM", department: "Computer Science", active: true },
  { id: 6, name: "Sneha Gupta", position: "Design Lead", category: "CORE_TEAM", department: "Computer Science", active: true },
  { id: 7, name: "Amit Joshi", position: "Former President", category: "ALUMNI", department: "Computer Science", active: false },
  { id: 8, name: "Neha Kapoor", position: "Former Tech Lead", category: "ALUMNI", department: "Information Technology", active: false },
];

export default function AdminTeamPage() {
  const [data] = useState(DEMO_DATA);
  const [search, setSearch] = useState("");

  const filtered = data.filter(item => 
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Team Members</h1>
        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium hover:from-blue-500 hover:to-violet-500 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Member
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
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Position</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Department</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white">{item.name}</td>
                  <td className="px-4 py-3 text-gray-300">{item.position}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-violet-500/20 text-violet-400">{item.category}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{item.department}</td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-1 text-xs rounded-full", item.active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400")}>
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </td>
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
