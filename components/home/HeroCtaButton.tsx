"use client";

import React from "react";
import { ArrowDown } from "lucide-react";

export const HeroCtaButton: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("library");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href="#library"
      onClick={handleScroll}
      className="inline-flex items-center gap-3 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm md:text-base px-6 md:px-8 py-3.5 md:py-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_24px_rgba(204,255,0,0.3)] group cursor-pointer"
    >
      <span className="tracking-wider uppercase">BROWSE WORKOUTS</span>
      <ArrowDown className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-y-1" />
    </a>
  );
};
