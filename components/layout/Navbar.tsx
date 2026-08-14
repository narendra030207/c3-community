'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';
// Note: next-auth useSession would be used here in real app
// import { useSession } from 'next-auth/react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Community', href: '/community' },
  { label: 'Events', href: '/events' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  // Mock session for UI purposes
  const session = { data: null }; // or { data: { user: { name: 'Admin', role: 'admin' } } }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-all duration-300 border-b',
          scrolled
            ? 'bg-navy-950/80 backdrop-blur-md border-white/10 py-3 shadow-lg'
            : 'bg-transparent border-transparent py-5'
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-violet flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-shadow">
              C3
            </div>
            <span className="font-bold text-xl tracking-tight text-white hidden sm:block">Community 3D</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-white relative py-2',
                      isActive ? 'text-white' : 'text-gray-400'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-4 pl-4 border-l border-white/10">
              {session?.data ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <Avatar fallback="US" size="sm" ring />
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 glass-card rounded-md shadow-xl py-1 border border-white/10">
                      <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-sm font-medium text-white">User Name</p>
                        <p className="text-xs text-gray-400 truncate">user@example.com</p>
                      </div>
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                        Dashboard
                      </Link>
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                        Profile
                      </Link>
                      <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300">
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    Log in
                  </Link>
                  <Button variant="primary" size="sm" asChild>
                    <Link href="/register">Join Now</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu (would normally be imported component, inlining logic here for simplicity if needed, but we have MobileMenu.tsx) */}
    </>
  );
}
