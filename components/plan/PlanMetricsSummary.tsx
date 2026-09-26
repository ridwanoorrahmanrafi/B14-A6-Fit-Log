"use client";

import React, { useMemo } from "react";
import { usePlan } from "@/context/PlanContext";
import { Dumbbell, Clock, Flame } from "lucide-react";

export const PlanMetricsSummary: React.FC = () => {
  const { plan, isHydrated } = usePlan();

  const metrics = useMemo(() => {
    if (!isHydrated) {
      return { exercises: 0, minutes: 0, calories: 0 };
    }
    const exercises = plan.length;
    const minutes = plan.reduce((acc, curr) => acc + (curr.duration || 0), 0);
    const calories = plan.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);
    return { exercises, minutes, calories };
  }, [plan, isHydrated]);

  const cards = [
    {
      label: "Exercises",
      value: `${metrics.exercises}`,
      sub: "of 5 lifts cap",
      icon: Dumbbell,
      color: "text-[#ccff00]",
      bg: "bg-[#ccff00]/10",
      border: "border-[#ccff00]/30",
    },
    {
      label: "Minutes",
      value: `${metrics.minutes}`,
      sub: "total training time",
      icon: Clock,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
      border: "border-sky-500/30",
    },
    {
      label: "Calories",
      value: `${metrics.calories}`,
      sub: "estimated energy burn",
      icon: Flame,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="p-5 md:p-6 rounded-2xl bg-[#15171d] border border-[#282d38] hover:border-zinc-700 transition-all flex items-center justify-between shadow-lg"
          >
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                {card.label}
              </span>
              <div className="text-3xl md:text-4xl font-heading font-black text-white tracking-tight">
                {card.value}
              </div>
              <p className="text-[11px] text-zinc-400 font-medium">{card.sub}</p>
            </div>

            <div className={`p-3.5 rounded-2xl ${card.bg} ${card.border} border`}>
              <Icon className={`w-6 h-6 md:w-7 md:h-7 ${card.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
