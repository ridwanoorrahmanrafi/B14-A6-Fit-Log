import React from "react";
import { Dumbbell } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col items-center justify-center space-y-6 px-4">
      {/* Animated Gym Logo / Dumbbell */}
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-4 border-zinc-800 border-t-[#ccff00] animate-spin" />
        <Dumbbell className="w-8 h-8 text-[#ccff00] absolute animate-pulse" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="font-heading font-black text-2xl text-white uppercase tracking-wider">
          LOADING WORKOUTS
        </h3>
        <p className="text-zinc-500 text-sm animate-pulse">
          Retrieving lifts and exercise data…
        </p>
      </div>

      {/* Skeleton Cards Preview */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 opacity-40">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-64 rounded-2xl bg-[#1b1f28] border border-zinc-800 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
