"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { PlanItemCard } from "./PlanItemCard";
import { Dumbbell, Bookmark, ArrowRight, Loader2, Search } from "lucide-react";

export const PlanTabsAndList: React.FC = () => {
  const { plan, saved, activeTab, setActiveTab, isHydrated } = usePlan();
  const [filterQuery, setFilterQuery] = useState("");
  const searchParams = useSearchParams();

  // Sync tab with URL query parameter ?tab=saved or ?tab=plan
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else if (tabParam === "plan") {
      setActiveTab("plan");
    }
  }, [searchParams, setActiveTab]);

  if (!isHydrated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
        <p className="text-zinc-400 text-sm font-semibold tracking-wide">
          Loading workouts…
        </p>
      </div>
    );
  }

  const currentList = activeTab === "plan" ? plan : saved;

  const filteredList = currentList.filter(
    (w) =>
      w.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      w.equipment.toLowerCase().includes(filterQuery.toLowerCase()) ||
      w.muscleGroups.some((m) => m.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  const handleTabChange = (tab: "plan" | "saved") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.replaceState(null, "", url.toString());
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#282d38] pb-4">
        {/* DaisyUI / Custom Tabs */}
        <div className="flex items-center gap-2">
          {/* Today's Plan Tab */}
          <button
            onClick={() => handleTabChange("plan")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-black text-sm tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.25)]"
                : "bg-[#15171d] text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            <span>Today&apos;s Plan</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-xs font-black ${
                activeTab === "plan" ? "bg-black/20 text-black" : "bg-zinc-800 text-zinc-400"
              }`}
            >
              {plan.length}
            </span>
          </button>

          {/* Saved Tab */}
          <button
            onClick={() => handleTabChange("saved")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-black text-sm tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.25)]"
                : "bg-[#15171d] text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-xs font-black ${
                activeTab === "saved" ? "bg-black/20 text-black" : "bg-zinc-800 text-zinc-400"
              }`}
            >
              {saved.length}
            </span>
          </button>
        </div>

        {/* Search within Tab */}
        {currentList.length > 0 && (
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab === "plan" ? "today's plan" : "saved"}...`}
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full bg-[#15171d] text-xs text-white placeholder-zinc-400 pl-9 pr-3 py-2 rounded-xl border border-zinc-700/60 focus:outline-none focus:border-[#ccff00] transition-colors"
            />
          </div>
        )}
      </div>

      {/* Workout cards list or Empty State */}
      {filteredList.length > 0 ? (
        <div className="space-y-4">
          {filteredList.map((workout) => (
            <PlanItemCard key={workout.id} workout={workout} type={activeTab} />
          ))}
        </div>
      ) : currentList.length === 0 ? (
        /* Empty State */
        <div className="py-20 px-6 rounded-3xl bg-[#15171d] border border-dashed border-[#282d38] flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
            {activeTab === "plan" ? (
              <Dumbbell className="w-8 h-8" />
            ) : (
              <Bookmark className="w-8 h-8" />
            )}
          </div>

          <div className="space-y-1 max-w-md">
            <h3 className="font-heading font-black text-2xl md:text-3xl text-white tracking-wide uppercase">
              NOTHING HERE YET
            </h3>
            <p className="text-zinc-400 text-sm md:text-base">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "You haven't saved any workouts yet. Save exercises from the library to build your future routines."}
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm px-6 py-3 rounded-xl uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(204,255,0,0.25)] hover:scale-105 active:scale-95"
          >
            <span>GO TO WORKOUTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Filter matched 0 items */
        <div className="py-12 text-center text-zinc-400 text-sm">
          No workouts found matching &quot;{filterQuery}&quot;.
          <button
            onClick={() => setFilterQuery("")}
            className="block mx-auto mt-2 text-[#ccff00] font-semibold hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
};
