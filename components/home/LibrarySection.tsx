import React from "react";
import { Workout } from "@/types/workout";
import { LibraryGrid } from "./LibraryGrid";

interface LibrarySectionProps {
  workouts: Workout[];
}

export const LibrarySection: React.FC<LibrarySectionProps> = ({ workouts }) => {
  return (
    <section id="library" className="py-16 md:py-24 bg-[#0f1115] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading & Subtitle */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-block">
            <span className="text-xs font-black uppercase tracking-widest text-[#ccff00] bg-[#ccff00]/10 px-3 py-1 rounded-full border border-[#ccff00]/20">
              EXPLORE EXERCISES
            </span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Client Grid with Sort, Search, and 3x4 layout */}
        <LibraryGrid initialWorkouts={workouts} />
      </div>
    </section>
  );
};
