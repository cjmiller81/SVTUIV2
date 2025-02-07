"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Briefcase, 
  TrendingUp, 
  Calendar, 
  ArrowDownUp
} from 'lucide-react';

const routes = [
  {
    label: 'Brokerage',
    icon: Briefcase,
    href: '/brokerage',
    color: 'text-sky-500'
  },
  {
    label: 'STRATEGIES',
    type: 'separator'
  },
  {
    label: 'IVL Automated',
    icon: TrendingUp,
    href: '/ivl-automated',
    color: 'text-emerald-500'
  },
  {
    label: 'SDTE',
    icon: Calendar,
    href: '/sdte',
    color: 'text-pink-500'
  },
  {
    label: 'Diagonal Hedge',
    icon: ArrowDownUp,
    href: '/diagonal-hedge',
    color: 'text-orange-500'
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#0B0F17] border-r border-[#1F2937] w-64">
      <div className="space-y-1">
        {routes.map((route, index) => {
          if (route.type === 'separator') {
            return (
              <h3 
                key={index} 
                className="px-7 py-2 text-xs font-semibold text-gray-400"
              >
                {route.label}
              </h3>
            );
          }

          const Icon = route.icon;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-x-2 px-7 py-2 text-sm font-medium transition-colors hover:text-white hover:bg-[#1F2937]/50",
                pathname === route.href ? "text-white bg-[#1F2937]" : "text-gray-400"
              )}
            >
              <Icon className={cn("h-5 w-5", route.color)} />
              {route.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}