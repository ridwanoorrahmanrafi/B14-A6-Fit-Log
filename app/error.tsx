"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("FitLog Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black tracking-widest text-red-400 uppercase">
            SOMETHING WENT WRONG
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase">
            UNEXPECTED ERROR
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            We encountered an issue loading this workout data. Please try again or return home.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm px-6 py-3 rounded-xl uppercase tracking-wider transition-all shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>TRY AGAIN</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1b1f28] hover:bg-[#20242e] text-zinc-300 hover:text-white border border-zinc-700 font-bold text-sm px-6 py-3 rounded-xl uppercase tracking-wider transition-all"
          >
            <Home className="w-4 h-4" />
            <span>HOME</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
