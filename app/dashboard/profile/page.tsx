"use client"
import { useState } from "react"
import { motion } from "motion/react"
import { User, Lock, Mail, Save, Upload, Shield } from "lucide-react"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="max-w-4xl space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Profile Settings</h1>
        <p className="text-gray-400 mt-2">Manage your account details and security.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full bg-blue-900/50 border border-blue-500/30 flex items-center justify-center overflow-hidden">
              <User size={48} className="text-blue-400" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Upload className="text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold">John Doe</h3>
            <p className="text-gray-400 text-sm">Computer Science, 2024</p>
            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-blue-300 bg-blue-500/10 py-1.5 px-3 rounded-full w-max mx-auto border border-blue-500/20">
              <Shield size={14} />
              <span>Participant</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6">
            <h2 className="text-xl font-bold flex items-center"><User className="mr-2 text-blue-400" /> Personal Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Full Name</label>
                <input type="text" defaultValue="John Doe" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email Address</label>
                <input type="email" defaultValue="john@example.com" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Roll Number</label>
                <input type="text" defaultValue="CS2020001" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Branch</label>
                <input type="text" defaultValue="CSE" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h2 className="text-xl font-bold flex items-center mb-4"><Lock className="mr-2 text-violet-400" /> Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Confirm Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button disabled={isLoading} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center">
                {isLoading ? <span className="animate-spin mr-2">⟳</span> : <Save className="mr-2" size={18} />}
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
