"use client";

import React from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { Calendar, Bookmark } from "lucide-react";

export const NavbarBadges: React.FC = () => {
  const { plan, saved, isHydrated, setActiveTab } = usePlan();

  const planCount = isHydrated ? plan.length : 0;
  const savedCount = isHydrated ? saved.length : 0;

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* Plan Badge - Filled pill with accent background (#ccff00) */}
      <Link
        href="/my-plan?tab=plan"
        onClick={() => setActiveTab("plan")}
        title="View Today's Plan"
        className="flex items-center gap-1.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs px-3 py-1.5 rounded-full transition-all duration-200 shadow-[0_0_12px_rgba(204,255,0,0.25)] hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span className="hidden sm:inline uppercase tracking-wider">Plan</span>
        <span className="bg-black/15 text-black px-1.5 py-0.2 rounded-full font-black min-w-[18px] text-center">
          {planCount}
        </span>
      </Link>

      {/* Saved Badge - Pill with outline/border only */}
      <Link
        href="/my-plan?tab=saved"
        onClick={() => setActiveTab("saved")}
        title="View Saved Workouts"
        className="flex items-center gap-1.5 border border-zinc-700 hover:border-zinc-400 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Bookmark className="w-3.5 h-3.5 text-zinc-400" />
        <span className="hidden sm:inline uppercase tracking-wider">Saved</span>
        <span className="bg-zinc-800 text-zinc-200 border border-zinc-700 px-1.5 py-0.2 rounded-full font-bold min-w-[18px] text-center">
          {savedCount}
        </span>
      </Link>
    </div>
  );
};
