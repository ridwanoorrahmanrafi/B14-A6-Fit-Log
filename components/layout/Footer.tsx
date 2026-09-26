import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#232732] bg-[#0c0e12] py-8 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand logo icon + FITLOG */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="font-heading font-black text-xl tracking-wider text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </div>

        {/* Right: Copyright line */}
        <p className="text-xs sm:text-sm text-zinc-400 font-medium text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};
