'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Sidebar from "@/components/layout/Sidebar";
import { DASHBOARD_NAV } from "@/lib/constants";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0e1a] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/10 rounded-full border-t-blue-500 animate-spin" />
          <p className="text-gray-400 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex">
      <Sidebar items={DASHBOARD_NAV} basePath="/dashboard" />
      <main className="flex-1 p-6 md:p-10 ml-0 md:ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
