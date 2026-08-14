'use client';

import { motion } from 'motion/react';
import { Award, Download, Share2, ExternalLink, QrCode } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const CERTIFICATES = [
  { id: 'CERT-10492', title: 'First Place - AI Challenge', event: 'TechFest 2024', date: 'Nov 15, 2024', category: 'Winner' },
  { id: 'CERT-09283', title: 'Participant - Web Dev Bootcamp', event: 'Web Workshop', date: 'Sep 10, 2024', category: 'Participation' },
  { id: 'CERT-11234', title: 'Open Source Contributor', event: 'Hacktoberfest', date: 'Oct 31, 2024', category: 'Achievement' },
  { id: 'CERT-08451', title: 'Best UI/UX Design', event: 'Designathon', date: 'Aug 22, 2024', category: 'Winner' },
  { id: 'CERT-07112', title: 'Top 10 Global Rank', event: 'CodeJam Season 2', date: 'Jul 15, 2024', category: 'Excellence' },
];

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300"
            >
              My Certificates
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 max-w-xl"
            >
              View, download, and verify your earned certificates across all events and competitions.
            </motion.p>
          </div>
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 flex items-center gap-4 backdrop-blur-sm"
          >
            <Award className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-sm text-slate-400">Total Certificates</div>
              <div className="text-2xl font-bold">{CERTIFICATES.length}</div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {CERTIFICATES.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative group bg-[#0f1523] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300"
            >
              {/* Decorative side accent */}
              <div className={cn(
                "absolute top-0 bottom-0 left-0 w-1",
                cert.category === 'Winner' ? "bg-yellow-500" :
                cert.category === 'Excellence' ? "bg-violet-500" :
                "bg-blue-500"
              )} />
              
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-medium uppercase tracking-wider text-slate-400">{cert.event}</div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">{cert.title}</h3>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <Award className={cn(
                      "w-6 h-6",
                      cert.category === 'Winner' ? "text-yellow-400" :
                      cert.category === 'Excellence' ? "text-violet-400" :
                      "text-blue-400"
                    )} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <div className="bg-white/5 px-3 py-1 rounded-md">Issued: {cert.date}</div>
                  <div className="bg-white/5 px-3 py-1 rounded-md font-mono">ID: {cert.id}</div>
                  <div className="bg-white/5 px-3 py-1 rounded-md">{cert.category}</div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-wrap gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <Link 
                    href={`/verify/${cert.id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    <QrCode className="w-4 h-4" />
                    Verify
                  </Link>
                  <button className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-slate-300 transition-colors tooltip-trigger" title="Share">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
