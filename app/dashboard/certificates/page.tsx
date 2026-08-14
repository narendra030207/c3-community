"use client"
import { motion } from "motion/react"
import { Download, Award, CheckCircle, ExternalLink } from "lucide-react"

export default function CertificatesPage() {
  const certificates = [
    { id: "CERT-2024-001", title: "Web3 Mastery Bootcamp", date: "Oct 15, 2024", type: "Completion", color: "from-blue-500 to-cyan-500" },
    { id: "CERT-2024-042", title: "CyberSec CTF 2024", date: "Sep 22, 2024", type: "Winner", color: "from-violet-500 to-fuchsia-500" },
    { id: "CERT-2023-112", title: "Intro to Machine Learning", date: "Dec 05, 2023", type: "Participation", color: "from-emerald-500 to-teal-500" },
  ]

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">My Certificates</h1>
          <p className="text-gray-400 mt-2">View and download your earned certificates.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, i) => (
          <motion.div key={cert.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} 
            className="group relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent hover:from-white/20 transition-all duration-300">
            <div className="bg-[#0a0e1a] rounded-xl p-6 h-full flex flex-col border border-white/5">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center mb-4 shadow-lg shadow-blue-900/20`}>
                <Award className="text-white" size={24} />
              </div>
              
              <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-300 transition-colors">{cert.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{cert.type} • {cert.date}</p>
              
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 bg-black/30 px-3 py-1.5 rounded-md">
                <CheckCircle size={14} className="text-green-400" />
                <span>Verified ID: {cert.id}</span>
              </div>
              
              <div className="mt-auto flex space-x-3">
                <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center text-sm">
                  <Download size={16} className="mr-2" /> Download
                </button>
                <button className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
