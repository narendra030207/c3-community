import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  title: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string) => void;
}

export function Table<T>({
  columns,
  data,
  className,
  sortColumn,
  sortDirection,
  onSort,
}: TableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  'px-6 py-4 font-medium',
                  col.sortable && 'cursor-pointer hover:text-white transition-colors'
                )}
                onClick={() => col.sortable && onSort?.(String(col.key))}
              >
                <div className="flex items-center space-x-1">
                  <span>{col.title}</span>
                  {col.sortable && sortColumn === String(col.key) && (
                    <span className="text-electric">
                      {sortDirection === 'asc' ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-white/5 bg-transparent hover:bg-white/[0.02] transition-colors"
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {col.render ? col.render(item) : String(item[col.key as keyof T])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
