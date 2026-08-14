'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Calendar, Trophy, Award, Zap } from 'lucide-react';

const stats = [
  { id: 1, label: 'Members', value: 500, suffix: '+', icon: Users, color: 'text-blue-500' },
  { id: 2, label: 'Events', value: 50, suffix: '+', icon: Calendar, color: 'text-violet-500' },
  { id: 3, label: 'Competitions', value: 25, suffix: '+', icon: Trophy, color: 'text-yellow-500' },
  { id: 4, label: 'Workshops', value: 30, suffix: '+', icon: Zap, color: 'text-cyan-500' },
  { id: 5, label: 'Achievements', value: 200, suffix: '+', icon: Award, color: 'text-pink-500' },
];

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / (duration * 60); // Assuming 60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [value, duration, isInView]);

  return <span ref={nodeRef}>{count}</span>;
}

export default function HomeStats() {
  return (
    <section className="py-16 bg-[#0a0e1a] relative z-10 border-t border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-gray-900/40 backdrop-blur-md border border-gray-800 hover:border-gray-700 hover:bg-gray-800/50 transition-all group"
              >
                <div className={`p-3 rounded-full bg-gray-800/80 mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                  <Icon size={28} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 flex items-center">
                  <AnimatedCounter value={stat.value} />
                  <span className="text-gray-400 ml-1">{stat.suffix}</span>
                </div>
                <p className="text-sm text-gray-400 uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
