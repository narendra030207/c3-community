'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Sidebar from "@/components/layout/Sidebar";
import { ADMIN_NAV } from "@/lib/constants";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  
  // While loading, show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0e1a] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/10 rounded-full border-t-violet-500 animate-spin" />
          <p className="text-gray-400 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // If not admin, redirect
  if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role || '')) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex">
      <Sidebar items={ADMIN_NAV} basePath="/admin" isAdmin={true} />
      <main className="flex-1 p-6 md:p-10 ml-0 md:ml-64 transition-all duration-300">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h2 className="text-xl font-bold text-violet-400">Admin Portal</h2>
          <div className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm border border-violet-500/30">Admin Privileges Active</div>
        </div>
        {children}
      </main>
    </div>
  );
}
