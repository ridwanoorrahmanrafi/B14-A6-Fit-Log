import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";
import { Clock, Flame, Star, Wrench, ArrowRight } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col bg-[#1b1f28] hover:bg-[#20242e] border border-[#282d38] hover:border-[#ccff00]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] cursor-pointer"
    >
      {/* Thumbnail visual */}
      <div className="relative w-full aspect-[16/10] bg-zinc-900 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b1f28] via-transparent to-transparent opacity-80" />

        {/* Category tag pills */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="bg-black/70 backdrop-blur-md text-[#ccff00] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#ccff00]/20"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Difficulty badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-zinc-900/80 backdrop-blur-md text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded border border-zinc-700">
            {workout.difficulty}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Workout Name */}
          <h3 className="font-heading font-black text-xl text-white uppercase tracking-wide group-hover:text-[#ccff00] transition-colors leading-tight">
            {workout.name}
          </h3>

          {/* Equipment line */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
            <Wrench className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="truncate">{workout.equipment}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-300 font-semibold">
          <div className="flex items-center gap-1.5" title="Duration">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5" title="Calories">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-400" title="Rating">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{workout.rating.toFixed(1)}</span>
          </div>

          <div className="p-1 rounded-lg bg-zinc-800/50 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};
