"use client";

import React from "react";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import { CalendarPlus, BookmarkPlus, Check, BookmarkCheck } from "lucide-react";

interface WorkoutActionButtonsProps {
  workout: Workout;
}

export const WorkoutActionButtons: React.FC<WorkoutActionButtonsProps> = ({ workout }) => {
  const { addToPlan, addToSaved, isInPlan, isSaved, plan } = usePlan();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const isCapReached = plan.length >= 5 && !inPlan;

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-[#282d38]">
      {/* Primary CTA: Add to today's plan */}
      <button
        onClick={() => addToPlan(workout)}
        disabled={inPlan || isCapReached}
        className={`flex-1 flex items-center justify-center gap-2.5 font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md ${
          inPlan
            ? "bg-[#ccff00]/20 text-[#ccff00] border border-[#ccff00]/40 cursor-default"
            : isCapReached
            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700"
            : "bg-[#ccff00] hover:bg-[#b8e600] text-black hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_20px_rgba(204,255,0,0.25)]"
        }`}
        title={isCapReached ? "Daily plan cap of 5 lifts reached" : "Add to today's plan"}
      >
        {inPlan ? (
          <>
            <Check className="w-5 h-5 text-[#ccff00]" />
            <span>IN TODAY&apos;S PLAN</span>
          </>
        ) : (
          <>
            <CalendarPlus className="w-5 h-5" />
            <span>{isCapReached ? "PLAN CAP REACHED (5/5)" : "ADD TO TODAY'S PLAN"}</span>
          </>
        )}
      </button>

      {/* Secondary CTA: Save for later */}
      <button
        onClick={() => addToSaved(workout)}
        disabled={saved}
        className={`flex-1 flex items-center justify-center gap-2.5 font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl border transition-all duration-200 ${
          saved
            ? "bg-zinc-800/80 border-zinc-600 text-zinc-400 cursor-default"
            : "bg-[#1b1f28] hover:bg-[#222630] border-zinc-700 hover:border-zinc-500 text-white hover:-translate-y-0.5 active:translate-y-0"
        }`}
      >
        {saved ? (
          <>
            <BookmarkCheck className="w-5 h-5 text-[#ccff00]" />
            <span>SAVED FOR LATER</span>
          </>
        ) : (
          <>
            <BookmarkPlus className="w-5 h-5 text-zinc-300" />
            <span>SAVE FOR LATER</span>
          </>
        )}
      </button>
    </div>
  );
};
