"use client"
import { motion } from "motion/react"
import { Users, Calendar, Trophy, FileText, Star, Activity, Plus } from "lucide-react"
import dynamic from "next/dynamic"

const RegistrationsChart = dynamic(() => import("@/components/features/AdminCharts").then(mod => mod.RegistrationsChart), { ssr: false })
const EventsPieChart = dynamic(() => import("@/components/features/AdminCharts").then(mod => mod.EventsPieChart), { ssr: false })

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "1,248", icon: Users, color: "text-blue-400" },
    { label: "Active Events", value: "8", icon: Calendar, color: "text-violet-400" },
    { label: "Competitions", value: "4", icon: Trophy, color: "text-yellow-400" },
    { label: "Certificates", value: "3,412", icon: FileText, color: "text-cyan-400" },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <h2 className="text-xl font-bold mb-6">Registration Overview</h2>
          <RegistrationsChart />
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <h2 className="text-xl font-bold mb-6">Events by Type</h2>
          <EventsPieChart />
        </div>
      </div>
    </div>
  )
}
