import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Platform',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Integrations', href: '/integrations' },
        { label: 'Changelog', href: '/changelog' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Forums', href: '/community/forums' },
        { label: 'Events', href: '/events' },
        { label: 'Members', href: '/community/members' },
        { label: 'Showcase', href: '/showcase' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Blog', href: '/blog' },
        { label: 'Help Center', href: '/help' },
        { label: 'API Reference', href: '/api' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Security', href: '/security' },
      ],
    },
  ];

  return (
    <footer className="bg-navy-950 border-t border-white/5 relative overflow-hidden">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group inline-flex mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-violet flex items-center justify-center font-bold text-white">
                C3
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Community 3D</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              The professional platform for 3D creators, developers, and visionaries to connect, collaborate, and build the future.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'GitHub', 'LinkedIn', 'Instagram'].map((social) => (
                <a key={social} href={`#${social.toLowerCase()}`} className="text-gray-500 hover:text-white transition-colors text-sm">
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-electric transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} C3 Community Platform. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-gray-500">
            <span>Built with Next.js & Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
