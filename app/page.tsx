import React from "react";
import type { Metadata } from "next";
import { getAllWorkouts } from "@/lib/api";
import { HeroSection } from "@/components/home/HeroSection";
import { LibrarySection } from "@/components/home/LibrarySection";

export const metadata: Metadata = {
  title: "FitLog - Train With Intent. Log Every Set.",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default async function HomePage() {
  const workouts = await getAllWorkouts();

  return (
    <main className="min-h-screen bg-[#0f1115]">
      {/* 2. Hero / Banner (Top of Home page) */}
      <HeroSection />

      {/* 3. The Library Section (Home Page) */}
      <LibrarySection workouts={workouts} />
    </main>
  );
}
