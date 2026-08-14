"use client";

import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Eye, Reply, Archive } from "lucide-react";

const DEMO_DATA = [
  { id: 1, sender: "John Doe", email: "john@example.com", subject: "Membership Inquiry", status: "UNREAD", date: "2024-12-05" },
  { id: 2, sender: "Jane Smith", email: "jane@example.com", subject: "Workshop Request", status: "READ", date: "2024-12-04" },
  { id: 3, sender: "Mike Wilson", email: "mike@example.com", subject: "Sponsorship Proposal", status: "REPLIED", date: "2024-12-03" },
  { id: 4, sender: "Sarah Lee", email: "sarah@example.com", subject: "Certificate Issue", status: "UNREAD", date: "2024-12-02" },
  { id: 5, sender: "Alex Chen", email: "alex@example.com", subject: "Collaboration", status: "ARCHIVED", date: "2024-12-01" },
];

export default function AdminContactPage() {
  const [data] = useState(DEMO_DATA);
  const [filter, setFilter] = useState("ALL");

  const filtered = data.filter(item => filter === "ALL" || item.status === filter);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {["ALL", "UNREAD", "READ", "REPLIED", "ARCHIVED"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap",
              filter === tab ? "bg-white/10 text-white" : "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Sender</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white">{item.sender}</td>
                  <td className="px-4 py-3 text-gray-300">{item.email}</td>
                  <td className="px-4 py-3 text-gray-300">{item.subject}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-full",
                      item.status === "UNREAD" ? "bg-blue-500/20 text-blue-400" :
                      item.status === "READ" ? "bg-gray-500/20 text-gray-400" :
                      item.status === "REPLIED" ? "bg-green-500/20 text-green-400" :
                      "bg-gray-800 text-gray-500"
                    )}>{item.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{formatDate(item.date)}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="text-gray-400 hover:text-white"><Eye className="w-4 h-4" /></button>
                    <button className="text-gray-400 hover:text-blue-400"><Reply className="w-4 h-4" /></button>
                    {item.status !== "ARCHIVED" && <button className="text-gray-400 hover:text-gray-200"><Archive className="w-4 h-4" /></button>}
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
