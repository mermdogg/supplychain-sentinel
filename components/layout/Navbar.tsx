"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert, BarChart3, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/dashboard/suppliers", label: "Suppliers", icon: Users },
  { href: "/dashboard/simulator", label: "Simulator", icon: Zap },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-800/60 bg-gray-950/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow">
              <ShieldAlert className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-base tracking-tight">
              SupplyChain<span className="text-blue-400">Sentinel</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center bg-gray-900/60 border border-gray-800/60 rounded-xl p-1 gap-0.5">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  pathname === href
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </div>
              <span className="text-gray-500 hidden sm:block">Live Monitoring</span>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}