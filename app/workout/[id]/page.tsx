import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkoutById, getAllWorkouts } from "@/lib/api";
import { WorkoutActionButtons } from "@/components/workout/WorkoutActionButtons";
import { ArrowLeft, Clock, Flame, Star, Dumbbell, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

interface WorkoutDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const workouts = await getAllWorkouts();
  return workouts.map((w) => ({
    id: w.id.toString(),
  }));
}

export async function generateMetadata({ params }: WorkoutDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkoutById(id);
  if (!workout) {
    return { title: "Workout Not Found - FitLog" };
  }
  return {
    title: `${workout.name} - FitLog Workout Library`,
    description: workout.description,
  };
}

export default async function WorkoutDetailPage({ params }: WorkoutDetailPageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  // Key specs rows formatted as requested
  const keySpecs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets.toString() },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: `${workout.rating.toFixed(1)} / 5.0` },
  ];

  return (
    <main className="min-h-screen bg-[#0f1115] py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb / Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-[#ccff00] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO WORKOUTS</span>
          </Link>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Visual / Media */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-[5/6] rounded-3xl overflow-hidden border border-[#282d38] bg-zinc-900 shadow-2xl group">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115]/90 via-transparent to-transparent opacity-60" />

              {/* Top floating badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                {workout.muscleGroups.map((group) => (
                  <span
                    key={group}
                    className="bg-black/80 backdrop-blur-md text-[#ccff00] text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-[#ccff00]/30 shadow-lg"
                  >
                    {group}
                  </span>
                ))}
              </div>

              {/* Bottom quick stats on image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-xs font-bold text-white z-10">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <Clock className="w-4 h-4" /> {workout.duration} min
                </span>
                <span className="flex items-center gap-1.5 text-orange-400">
                  <Flame className="w-4 h-4" /> {workout.caloriesBurned} kcal
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {workout.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Sections */}
          <div className="lg:col-span-6 space-y-8">
            {/* Header info */}
            <div className="space-y-3">
              {/* Category tags */}
              <div className="flex flex-wrap gap-2">
                {workout.muscleGroups.map((group) => (
                  <span
                    key={group}
                    className="text-xs font-extrabold uppercase tracking-wider text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/30 px-3 py-1 rounded-md"
                  >
                    {group}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight leading-none">
                {workout.name}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed pt-1">
                {workout.description}
              </p>
            </div>

            {/* Key Specs Table / Panel */}
            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-[#ccff00]" />
                KEY SPECS
              </h2>
              <div className="bg-[#15171d] border border-[#282d38] rounded-2xl overflow-hidden divide-y divide-[#232732]">
                {keySpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between px-5 py-3 hover:bg-[#1b1f28]/60 transition-colors"
                  >
                    <span className="text-xs font-black tracking-wider text-zinc-400 uppercase">
                      {spec.label}
                    </span>
                    <span className="text-sm font-bold text-white tracking-wide">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions Section: Ordered list of 4 steps */}
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
                INSTRUCTIONS
              </h2>
              <ol className="space-y-3">
                {workout.instructions.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#15171d] border border-[#282d38] hover:border-zinc-700 transition-colors"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ccff00] text-black text-xs font-black shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-zinc-300 leading-relaxed font-medium">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Call-to-action buttons (Client Component) */}
            <WorkoutActionButtons workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
}
