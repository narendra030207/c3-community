"use client";

import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Plus, Eye, Trash2 } from "lucide-react";

const DEMO_DATA = [
  { id: 1, certId: "C3-ABCD-EF01", recipient: "Arjun Patel", event: "Web Dev Bootcamp", issueDate: "2024-12-10" },
  { id: 2, certId: "C3-GHIJ-KL23", recipient: "Priya Sharma", event: "Bug Hunt Challenge", issueDate: "2024-11-10" },
  { id: 3, certId: "C3-MNOP-QR45", recipient: "Rahul Kumar", event: "Git Workshop", issueDate: "2024-11-25" },
  { id: 4, certId: "C3-STUV-WX67", recipient: "Sneha Gupta", event: "AI/ML Seminar", issueDate: "2024-12-08" },
  { id: 5, certId: "C3-YZAB-CD89", recipient: "Arjun Patel", event: "Bug Hunt Challenge", issueDate: "2024-11-10" },
  { id: 6, certId: "C3-EFGH-IJ01", recipient: "Vikram Singh", event: "Top Performer Q4", issueDate: "2024-12-01" },
];

export default function AdminCertificatesPage() {
  const [data] = useState(DEMO_DATA);
  const [search, setSearch] = useState("");

  const filtered = data.filter(item => 
    item.certId.toLowerCase().includes(search.toLowerCase()) || 
    item.recipient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Certificates</h1>
        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium hover:from-blue-500 hover:to-violet-500 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Issue Certificate
        </button>
      </div>

      <input
        type="text"
        placeholder="Search ID or Recipient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-80 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Certificate ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Recipient Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Event/Competition</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Issue Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-blue-400 font-mono text-sm">{item.certId}</td>
                  <td className="px-4 py-3 text-white">{item.recipient}</td>
                  <td className="px-4 py-3 text-gray-300">{item.event}</td>
                  <td className="px-4 py-3 text-gray-300">{formatDate(item.issueDate)}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="text-gray-400 hover:text-white"><Eye className="w-4 h-4" /></button>
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
