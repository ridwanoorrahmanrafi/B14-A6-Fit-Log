"use client";

import React, { useState, useMemo } from "react";
import { Workout, SortOption } from "@/types/workout";
import { WorkoutCard } from "@/components/workout/WorkoutCard";
import { ChevronDown, Search, SlidersHorizontal, Sparkles } from "lucide-react";

interface LibraryGridProps {
  initialWorkouts: Workout[];
}

export const LibraryGrid: React.FC<LibraryGridProps> = ({ initialWorkouts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  // Extract all unique muscle groups for quick filters
  const muscleGroups = useMemo(() => {
    const set = new Set<string>();
    initialWorkouts.forEach((w) => {
      w.muscleGroups.forEach((m) => set.add(m));
    });
    return ["All", ...Array.from(set)];
  }, [initialWorkouts]);

  // Filter & Sort
  const filteredAndSortedWorkouts = useMemo(() => {
    let result = [...initialWorkouts];

    // Filter by muscle group
    if (selectedMuscle !== "All") {
      result = result.filter((w) =>
        w.muscleGroups.some((m) => m.toLowerCase() === selectedMuscle.toLowerCase())
      );
    }

    // Filter by search query (name or muscle group)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.muscleGroups.some((m) => m.toLowerCase().includes(q)) ||
          w.equipment.toLowerCase().includes(q)
      );
    }

    // Sort by criteria
    result.sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }
      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned; // higher calories first
      }
      if (sortBy === "rating") {
        return b.rating - a.rating; // higher rating first
      }
      return 0;
    });

    return result;
  }, [initialWorkouts, selectedMuscle, searchQuery, sortBy]);

  return (
    <div className="space-y-8">
      {/* Controls Bar: Search, Category Filters, and Sort Dropdown */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#15171d] border border-[#282d38]">
        {/* Search Input (Optional enhancement) */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search lifts, muscle group, or equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1b1f28] text-sm text-white placeholder-zinc-400 pl-10 pr-4 py-2.5 rounded-xl border border-zinc-700/60 focus:outline-none focus:border-[#ccff00] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-between lg:justify-end">
          {/* Muscle Group Quick Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {muscleGroups.slice(0, 5).map((muscle) => (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedMuscle === muscle
                    ? "bg-[#ccff00] text-black shadow-sm"
                    : "bg-[#1b1f28] text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {muscle}
              </button>
            ))}
          </div>

          {/* Challenge C1: Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-semibold flex items-center gap-1 hidden sm:flex">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Sort By:
            </span>
            <div className="relative inline-block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-[#1b1f28] text-zinc-200 font-semibold text-xs sm:text-sm pl-4 pr-9 py-2 rounded-xl border border-zinc-700/80 hover:border-zinc-500 focus:outline-none focus:border-[#ccff00] cursor-pointer transition-all"
                aria-label="Sort Workouts"
              >
                <option value="duration">Duration (Shortest first)</option>
                <option value="calories">Calories (Highest first)</option>
                <option value="rating">Rating (Top rated)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid count summary */}
      <div className="flex items-center justify-between text-xs text-zinc-400 font-medium px-1">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
          Showing <span className="text-white font-bold">{filteredAndSortedWorkouts.length}</span> of {initialWorkouts.length} workouts
        </span>
        {selectedMuscle !== "All" && (
          <button
            onClick={() => setSelectedMuscle("All")}
            className="text-[#ccff00] hover:underline"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* 3x4 Responsive Grid */}
      {filteredAndSortedWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl bg-[#15171d] border border-dashed border-zinc-800">
          <p className="text-lg font-heading font-bold text-white uppercase tracking-wider">
            No Workouts Found
          </p>
          <p className="text-sm text-zinc-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or reset the muscle filter to explore other lifts.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedMuscle("All");
            }}
            className="mt-4 px-4 py-2 bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#b8e600] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
