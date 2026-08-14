"use client"
import { motion } from "motion/react"
import { Trophy, Star, Calendar, FileText, Activity } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Welcome back, User!</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Rank", value: "#42", icon: Trophy, color: "text-yellow-400" },
          { label: "Total Score", value: "2,450", icon: Star, color: "text-blue-400" },
          { label: "Events", value: "12", icon: Calendar, color: "text-violet-400" },
          { label: "Certificates", value: "5", icon: FileText, color: "text-cyan-400" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center space-x-4">
            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
           <h2 className="text-xl font-bold mb-4 flex items-center"><Activity className="mr-2 text-blue-400"/> Recent Activity</h2>
           <ul className="space-y-4">
             {["Registered for CyberSec Workshop", "Earned 50 points in CodeJam", "Downloaded React Certificate"].map((act, i) => (
               <li key={i} className="flex items-center text-gray-300">
                 <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3"></div>
                 {act}
               </li>
             ))}
           </ul>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
           <h2 className="text-xl font-bold mb-4 flex items-center"><Calendar className="mr-2 text-violet-400"/> Upcoming Events</h2>
           <ul className="space-y-4">
             {["Web3 Hackathon - Tomorrow", "AI Seminar - Next Week"].map((event, i) => (
               <li key={i} className="flex justify-between items-center text-gray-300 bg-white/5 p-3 rounded-lg">
                 <span>{event}</span>
                 <button className="text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-white transition-colors">Details</button>
               </li>
             ))}
           </ul>
        </div>
      </div>
    </div>
  )
}
