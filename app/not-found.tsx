import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="relative max-w-lg space-y-6">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-20 h-20 mx-auto rounded-3xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] shadow-[0_0_30px_rgba(204,255,0,0.15)]">
          <Dumbbell className="w-10 h-10 rotate-45" />
        </div>

        <div className="space-y-2 relative z-10">
          <span className="text-xs font-black tracking-widest text-[#ccff00] uppercase">
            ERROR 404
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
            WORKOUT NOT FOUND
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
            Looks like this lift or page doesn&apos;t exist in our library. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="pt-2 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm px-6 py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(204,255,0,0.25)] hover:scale-105 active:scale-95"
          >
            <span>BACK TO WORKOUTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
