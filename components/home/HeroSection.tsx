import React from "react";
import Image from "next/image";
import { HeroCtaButton } from "./HeroCtaButton";
import { Dumbbell, Flame, Trophy } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#232732] bg-gradient-to-b from-[#13161d] via-[#0f1115] to-[#0f1115]">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-black tracking-widest uppercase">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>WORKOUT LIBRARY</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[1.05]">
              TRAIN WITH INTENT. <br />
              <span className="text-[#ccff00]">LOG EVERY SET.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <HeroCtaButton />
            </div>

            {/* Mini Trust Stats */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-medium border-t border-zinc-800/80 w-full">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Real-time Calorie Burn Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Daily 5-Lift Routine System</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Banner Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] rounded-2xl overflow-hidden border border-[#2d313b] shadow-2xl bg-zinc-900 group">
              <Image
                src="/banner.png"
                alt="FitLog Training Hero"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
