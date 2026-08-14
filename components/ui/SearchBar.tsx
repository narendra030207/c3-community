'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './Input';
import { cn } from '@/lib/utils';

interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch: (value: string) => void;
  debounceMs?: number;
}

export function SearchBar({ className, onSearch, debounceMs = 300, value: initialValue = '', ...props }: SearchBarProps) {
  const [value, setValue] = useState(initialValue as string);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [value, debounceMs, onSearch]);

  return (
    <div className={cn('relative w-full', className)}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        icon={<Search className="w-4 h-4" />}
        className="pr-10 bg-white/5 backdrop-blur-md"
        {...props}
      />
      {value && (
        <button
          onClick={() => setValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
