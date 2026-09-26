import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavbarNavLinks } from "./NavbarNavLinks";
import { NavbarBadges } from "./NavbarBadges";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#232732] bg-[#0f1115]/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
          aria-label="FitLog Home"
        >
          <div className="relative w-7 h-7 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-heading font-black text-2xl tracking-wider text-white group-hover:text-[#ccff00] transition-colors">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="flex items-center">
          <NavbarNavLinks />
        </nav>

        {/* Right Side: Status Badges */}
        <div className="flex items-center">
          <NavbarBadges />
        </div>
      </div>
    </header>
  );
};
