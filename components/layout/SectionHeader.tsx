import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  centered?: boolean;
  withDecoration?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  centered = false,
  withDecoration = true,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12',
        centered && 'text-center flex flex-col items-center',
        className
      )}
      {...props}
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 inline-block">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {title}
        </span>
      </h2>
      
      {withDecoration && (
        <div className="w-16 h-1 bg-gradient-to-r from-electric to-violet rounded-full mb-4" />
      )}
      
      {subtitle && (
        <p className="text-lg text-gray-400 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
