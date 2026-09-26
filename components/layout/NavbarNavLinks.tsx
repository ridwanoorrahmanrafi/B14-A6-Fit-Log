"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavbarNavLinks: React.FC = () => {
  const pathname = usePathname();

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isPlanActive = pathname === "/my-plan";

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Link
        href="/"
        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
          isWorkoutActive
            ? "text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/30 shadow-sm"
            : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
        }`}
      >
        Workout
      </Link>
      <Link
        href="/my-plan"
        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
          isPlanActive
            ? "text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/30 shadow-sm"
            : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
        }`}
      >
        My Plan
      </Link>
    </div>
  );
};
