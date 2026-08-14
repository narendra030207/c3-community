"use client"
import { motion } from "motion/react"
import { Search, Filter, MoreVertical, Edit, Trash, Shield, ShieldOff } from "lucide-react"

export default function AdminUsersPage() {
  const users = [
    { id: "1", name: "Alice Smith", email: "alice@example.com", role: "USER", branch: "CSE", status: "Active" },
    { id: "2", name: "Bob Jones", email: "bob@example.com", role: "ADMIN", branch: "IT", status: "Active" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "USER", branch: "ECE", status: "Inactive" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-violet-400">User Management</h1>
        <div className="flex space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search users..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-violet-500 text-white" />
          </div>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-lg transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-300">Name</th>
                <th className="px-6 py-4 font-medium text-gray-300">Role</th>
                <th className="px-6 py-4 font-medium text-gray-300">Branch</th>
                <th className="px-6 py-4 font-medium text-gray-300">Status</th>
                <th className="px-6 py-4 font-medium text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{user.name}</div>
                    <div className="text-gray-400 text-xs">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs border ${user.role === 'ADMIN' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.branch}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center text-xs ${user.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${user.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors" title="Change Role">
                        {user.role === 'ADMIN' ? <ShieldOff size={16} /> : <Shield size={16} />}
                      </button>
                      <button className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 rounded transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded transition-colors" title="Delete">
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-white/10 flex items-center justify-between text-sm text-gray-400">
          <div>Showing 1 to 3 of 3 entries</div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 bg-white/5 rounded border border-white/10 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 bg-violet-600 text-white rounded">1</button>
            <button className="px-3 py-1 bg-white/5 rounded border border-white/10 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
