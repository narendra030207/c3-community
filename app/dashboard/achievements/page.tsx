"use client"
import { motion } from "motion/react"
import { Target, Zap, Code, Shield, Brain, Star } from "lucide-react"

export default function AchievementsPage() {
  const achievements = [
    { title: "First Blood", desc: "Solve the first challenge in any CTF", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-400/10", earned: true },
    { title: "Code Ninja", desc: "Submit 10 perfect competitive programming solutions", icon: Code, color: "text-blue-400", bg: "bg-blue-400/10", earned: true },
    { title: "Guardian", desc: "Identify a vulnerability in the mock infrastructure", icon: Shield, color: "text-violet-400", bg: "bg-violet-400/10", earned: true },
    { title: "Mastermind", desc: "Top 3 in an AI/ML hackathon", icon: Brain, color: "text-fuchsia-400", bg: "bg-fuchsia-400/10", earned: false, progress: 65 },
    { title: "All-Star", desc: "Participate in 5 distinct event categories", icon: Star, color: "text-cyan-400", bg: "bg-cyan-400/10", earned: false, progress: 80 },
    { title: "Sharpshooter", desc: "100% accuracy in tech quiz", icon: Target, color: "text-red-400", bg: "bg-red-400/10", earned: false, progress: 0 },
  ]

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Achievements</h1>
        <p className="text-gray-400 mt-2">Unlock badges by completing challenges and participating.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
            className={`p-6 rounded-2xl border backdrop-blur-md relative overflow-hidden ${item.earned ? 'bg-white/5 border-white/10' : 'bg-black/20 border-white/5 opacity-70 grayscale hover:grayscale-0 transition-all duration-500'}`}>
            
            {item.earned && (
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl" />
            )}
            
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${item.bg} ${item.color}`}>
              <item.icon size={28} />
            </div>
            
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{item.desc}</p>
            
            {!item.earned && item.progress !== undefined && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-gray-500 to-gray-300 h-1.5 rounded-full" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            )}
            
            {item.earned && (
              <div className="mt-4 inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-full">
                Unlocked
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
