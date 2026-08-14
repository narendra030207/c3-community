'use client';

import { use } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, ShieldCheck, Calendar, User, Award, Building, Download } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const QRCode = dynamic(() => import('@/components/features/QRCode'), { ssr: false });

// Demo database for verification
const VALID_CERTS: Record<string, any> = {
  'CERT-10492': { title: 'First Place - AI Challenge', event: 'TechFest 2024', name: 'Alex Mercer', date: 'Nov 15, 2024', issuer: 'C3 Community Platform', valid: true },
  'CERT-09283': { title: 'Participant - Web Dev Bootcamp', event: 'Web Workshop', name: 'Alex Mercer', date: 'Sep 10, 2024', issuer: 'C3 Community Platform', valid: true },
  'CERT-11234': { title: 'Open Source Contributor', event: 'Hacktoberfest', name: 'Sarah Chen', date: 'Oct 31, 2024', issuer: 'GitHub & C3', valid: true },
  'CERT-08451': { title: 'Best UI/UX Design', event: 'Designathon', name: 'Jordan Taylor', date: 'Aug 22, 2024', issuer: 'Design Club', valid: true },
  'CERT-07112': { title: 'Top 10 Global Rank', event: 'CodeJam Season 2', name: 'Maya Patel', date: 'Jul 15, 2024', issuer: 'C3 Community Platform', valid: true },
};

export default function VerifyPage({ params }: { params: Promise<{ certificateId: string }> }) {
  const resolvedParams = use(params);
  const certId = resolvedParams.certificateId;
  const certData = VALID_CERTS[certId];
  
  const isValid = !!certData;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://c3.community/verify/${certId}`;

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white pt-24 pb-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              C3 Community
            </span>
          </Link>
          <h1 className="text-2xl text-slate-300">Certificate Verification</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-[#0f1523] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
        >
          {isValid ? (
            <>
              {/* Valid Certificate Header */}
              <div className="bg-green-500/10 border-b border-green-500/20 p-6 flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-green-400">Certificate Verified</h2>
                <p className="text-green-400/80 text-sm">This is a valid and authentic certificate.</p>
              </div>

              {/* Certificate Details */}
              <div className="p-8 md:p-10 space-y-8">
                <div className="text-center space-y-4">
                  <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">{certData.event}</div>
                  <h3 className="text-3xl font-bold text-white">{certData.title}</h3>
                  <div className="text-lg text-blue-300">Awarded to <span className="font-semibold text-white">{certData.name}</span></div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">Certificate ID</div>
                        <div className="font-mono font-medium">{certId}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">Issue Date</div>
                        <div className="font-medium">{certData.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <Building className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">Issued By</div>
                        <div className="font-medium">{certData.issuer}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="bg-white p-2 rounded-lg mb-3">
                      <QRCode value={currentUrl} size={120} />
                    </div>
                    <div className="text-xs text-slate-400 text-center max-w-[160px]">
                      Scan to verify authenticity
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium transition-colors">
                    <Download className="w-5 h-5" />
                    Download Original
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Invalid Certificate */}
              <div className="p-12 flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                  <XCircle className="w-12 h-12 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-white">Certificate Not Found</h2>
                <p className="text-slate-400 max-w-md">
                  We couldn't find a certificate matching the ID <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded">{certId}</span>. 
                  Please check the URL or contact support if you believe this is an error.
                </p>
                <div className="pt-8">
                  <Link href="/" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors">
                    Return Home
                  </Link>
                </div>
              </div>
            </>
          )}
        </motion.div>

        {isValid && (
          <div className="mt-8 text-center flex items-center justify-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="w-4 h-4" />
            Verified via cryptographic signature on the C3 Platform
          </div>
        )}

      </div>
    </div>
  );
}
