"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import { Clock, Flame, Star, Wrench, CheckCircle2, X, Eye, CalendarPlus } from "lucide-react";

interface PlanItemCardProps {
  workout: Workout;
  type: "plan" | "saved";
}

export const PlanItemCard: React.FC<PlanItemCardProps> = ({ workout, type }) => {
  const { removeFromPlan, removeFromSaved, markAsDone, isCompleted, addToPlan, isInPlan } = usePlan();

  const completed = type === "plan" && isCompleted(workout.id);
  const alreadyInPlan = isInPlan(workout.id);

  return (
    <div
      className={`group relative flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
        completed
          ? "bg-[#121c12]/80 border-[#ccff00]/40 shadow-[0_0_15px_rgba(204,255,0,0.1)]"
          : "bg-[#1b1f28] hover:bg-[#20242e] border-[#282d38] hover:border-zinc-600 shadow-md"
      }`}
    >
      {/* Left side: Thumbnail + Info */}
      <div className="flex items-start sm:items-center gap-4 flex-1">
        {/* Thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-700/60">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="96px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          {completed && (
            <div className="absolute inset-0 bg-[#0f1115]/70 flex items-center justify-center backdrop-blur-xs">
              <CheckCircle2 className="w-8 h-8 text-[#ccff00]" />
            </div>
          )}
        </div>

        {/* Workout Info */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={`font-heading font-black text-lg sm:text-xl uppercase tracking-wide truncate ${
                completed ? "line-through text-zinc-400" : "text-white group-hover:text-[#ccff00]"
              }`}
            >
              {workout.name}
            </h3>

            {completed && (
              <span className="bg-[#ccff00] text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                COMPLETED
              </span>
            )}
          </div>

          {/* Equipment line */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
            <Wrench className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="truncate">{workout.equipment}</span>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-4 pt-1 text-xs text-zinc-300 font-semibold">
            <span className="flex items-center gap-1 text-sky-400">
              <Clock className="w-3.5 h-3.5" />
              {workout.duration} min
            </span>
            <span className="flex items-center gap-1 text-orange-400">
              <Flame className="w-3.5 h-3.5" />
              {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {workout.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 justify-end pt-3 md:pt-0 border-t md:border-t-0 border-zinc-800/80">
        {/* View Details button */}
        <Link
          href={`/workout/${workout.id}`}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-zinc-300 bg-zinc-800/80 hover:bg-zinc-700 hover:text-white border border-zinc-700/60 transition-colors"
          title="View workout details"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">View Details</span>
        </Link>

        {type === "plan" ? (
          /* Challenge C3: Mark as Done button */
          <button
            onClick={() => markAsDone(workout.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              completed
                ? "bg-[#ccff00] text-black shadow-sm hover:bg-[#b8e600]"
                : "bg-zinc-800 hover:bg-[#ccff00] text-zinc-200 hover:text-black border border-zinc-700"
            }`}
            title={completed ? "Mark as pending" : "Mark as done"}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{completed ? "Done" : "Mark Done"}</span>
          </button>
        ) : (
          /* If in saved tab, button to move/add to Today's Plan */
          <button
            onClick={() => addToPlan(workout)}
            disabled={alreadyInPlan}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              alreadyInPlan
                ? "bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-default"
                : "bg-[#ccff00] hover:bg-[#b8e600] text-black font-black uppercase tracking-wider"
            }`}
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            <span>{alreadyInPlan ? "In Plan" : "Add to Plan"}</span>
          </button>
        )}

        {/* Remove (X) button */}
        <button
          onClick={() => {
            if (type === "plan") {
              removeFromPlan(workout.id);
            } else {
              removeFromSaved(workout.id);
            }
          }}
          className="p-2 rounded-xl text-zinc-400 hover:text-red-400 bg-zinc-800/60 hover:bg-red-500/10 border border-zinc-700/60 hover:border-red-500/30 transition-colors"
          title="Remove workout"
          aria-label="Remove workout"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
