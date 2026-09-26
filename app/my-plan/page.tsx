import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PlanMetricsSummary } from "@/components/plan/PlanMetricsSummary";
import { PlanTabsAndList } from "@/components/plan/PlanTabsAndList";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "My Plan & Saved Workouts - FitLog",
  description: "Track your daily training plan, mark completed lifts, and calculate total calories and minutes.",
};

export default function MyPlanPage() {
  return (
    <main className="min-h-screen bg-[#0f1115] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Section */}
        <div className="flex flex-col items-start space-y-2">
          <div className="inline-block">
            <span className="text-xs font-black uppercase tracking-widest text-[#ccff00] bg-[#ccff00]/10 px-3 py-1 rounded-full border border-[#ccff00]/20">
              DAILY TRAINING LOG
            </span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            MY PLAN
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Live Metrics Summary Row: Exercises, Minutes, Calories */}
        <PlanMetricsSummary />

        {/* Tabs, Filter & Workout Lists (Suspense wrapped for useSearchParams) */}
        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
            </div>
          }
        >
          <PlanTabsAndList />
        </Suspense>
      </div>
    </main>
  );
}
