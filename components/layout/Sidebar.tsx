'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Trophy,
  Award,
  Star,
  Bell,
  Image,
  Mail,
  Gift,
  Swords,
  ChevronLeft,
  ChevronRight,
  Shield,
  User,
  Settings,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react';

// Map string icon names to actual icon components
const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Calendar,
  Trophy,
  Award,
  Star,
  Bell,
  Image,
  Mail,
  Gift,
  Swords,
  Shield,
  User,
  Settings,
  MessageSquare,
};

interface NavItem {
  label: string;
  href: string;
  icon?: string | LucideIcon;
}

interface SidebarProps {
  items?: readonly NavItem[] | NavItem[];
  basePath?: string;
  isAdmin?: boolean;
}

export function Sidebar({ items, basePath, isAdmin = false }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const defaultItems: NavItem[] = isAdmin
    ? [
        { icon: 'LayoutDashboard', label: 'Dashboard', href: '/admin' },
        { icon: 'Users', label: 'Users', href: '/admin/users' },
        { icon: 'Calendar', label: 'Events', href: '/admin/events' },
        { icon: 'Swords', label: 'Competitions', href: '/admin/competitions' },
        { icon: 'Trophy', label: 'Leaderboard', href: '/admin/leaderboard' },
        { icon: 'Gift', label: 'Prizes', href: '/admin/prizes' },
        { icon: 'Award', label: 'Certificates', href: '/admin/certificates' },
        { icon: 'Star', label: 'Achievements', href: '/admin/achievements' },
        { icon: 'Bell', label: 'Notices', href: '/admin/notices' },
        { icon: 'Image', label: 'Gallery', href: '/admin/gallery' },
        { icon: 'Users', label: 'Team', href: '/admin/team' },
        { icon: 'Mail', label: 'Contact', href: '/admin/contact' },
      ]
    : [
        { icon: 'LayoutDashboard', label: 'Overview', href: '/dashboard' },
        { icon: 'User', label: 'Profile', href: '/dashboard/profile' },
        { icon: 'Award', label: 'Certificates', href: '/dashboard/certificates' },
        { icon: 'Trophy', label: 'Achievements', href: '/dashboard/achievements' },
      ];

  const menuItems = items ? [...items] : defaultItems;

  const getIcon = (icon?: string | LucideIcon): LucideIcon => {
    if (!icon) return LayoutDashboard;
    if (typeof icon === 'string') return ICON_MAP[icon] || LayoutDashboard;
    return icon;
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 256 }}
      className="hidden md:flex flex-col bg-navy-900 border-r border-white/5 h-screen sticky top-0 transition-all duration-300 z-30"
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
        {!collapsed && (
          <span className="font-semibold text-white tracking-wide uppercase text-xs">
            {isAdmin ? 'Admin' : 'Dashboard'}
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 py-6 flex flex-col gap-1 px-3 overflow-y-auto">
        {menuItems.map((item) => {
          const href = item.href;
          const isActive = pathname === href || (href !== (basePath || '/dashboard') && pathname.startsWith(`${href}/`));
          const IconComponent = getIcon(item.icon);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative",
                isActive 
                  ? "bg-electric/10 text-electric" 
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1 bottom-1 w-1 bg-electric rounded-r-md"
                />
              )}
              <IconComponent size={20} className={cn("shrink-0", isActive && "text-electric")} />
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </motion.aside>
  );
}

export default Sidebar;
