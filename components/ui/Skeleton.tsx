import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
}

export function Skeleton({ className, variant = 'text', ...props }: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded',
    circular: 'h-12 w-12 rounded-full',
    rectangular: 'h-24 w-full rounded-md',
    card: 'h-64 w-full rounded-xl',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-white/10',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
