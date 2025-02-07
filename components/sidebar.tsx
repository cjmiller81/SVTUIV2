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

// Define the type for Lucide icons
type IconType = typeof Briefcase | typeof TrendingUp | typeof Calendar | typeof ArrowDownUp;

type NavRoute = {
  label: string;
  icon: IconType;
  href: string;
  color: string;
};

type SeparatorRoute = {
  label: string;
  type: 'separator';
};

type Route = NavRoute | SeparatorRoute;

const routes: Route[] = [
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
          if ('type' in route && route.type === 'separator') {
            return (
              <h3 
                key={`separator-${index}`}
                className="px-7 py-2 text-xs font-semibold text-gray-400"
              >
                {route.label}
              </h3>
            );
          }

          // TypeScript now knows this must be a NavRoute
          const navRoute = route as NavRoute;
          return (
            <Link
              key={navRoute.href}
              href={navRoute.href}
              className={cn(
                "flex items-center gap-x-2 px-7 py-2 text-sm font-medium transition-colors hover:text-white hover:bg-[#1F2937]/50",
                pathname === navRoute.href ? "text-white bg-[#1F2937]" : "text-gray-400"
              )}
            >
              <navRoute.icon className={cn("h-5 w-5", navRoute.color)} />
              {navRoute.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}