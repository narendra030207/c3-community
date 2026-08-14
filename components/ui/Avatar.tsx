import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  ring?: boolean;
}

export function Avatar({
  className,
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  status,
  ring = false,
  ...props
}: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  };

  return (
    <div className={cn('relative inline-block', className)} {...props}>
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-full bg-navy-800 text-gray-300 font-medium',
          sizes[size],
          ring && 'ring-2 ring-white/10 ring-offset-2 ring-offset-navy-950'
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 80px) 100vw, 80px"
          />
        ) : (
          <span>{fallback ? fallback.substring(0, 2).toUpperCase() : '??'}</span>
        )}
      </div>
      
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-navy-950',
            statusColors[status],
            size === 'sm' ? 'w-2 h-2' : size === 'xl' ? 'w-4 h-4' : 'w-2.5 h-2.5'
          )}
        />
      )}
    </div>
  );
}
