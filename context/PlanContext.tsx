"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Workout } from "@/types/workout";

export interface ToastItem {
  id: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  completedIds: number[];
  isHydrated: boolean;
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  addToSaved: (workout: Workout) => boolean;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  isCompleted: (id: number) => boolean;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  toasts: ToastItem[];
  showToast: (message: string, type?: "success" | "info" | "warning" | "error") => void;
  removeToast: (id: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLAN_CAP = 5;

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      const storedCompleted = localStorage.getItem("fitlog_completed");

      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
      if (storedCompleted) setCompletedIds(JSON.parse(storedCompleted));
    } catch (e) {
      console.error("Error reading localStorage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
    } catch (e) {}
  }, [plan, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    } catch (e) {}
  }, [saved, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("fitlog_completed", JSON.stringify(completedIds));
    } catch (e) {}
  }, [completedIds, isHydrated]);

  // Toast handler
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: "success" | "info" | "warning" | "error" = "success") => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        removeToast(id);
      }, 3500);
    },
    [removeToast]
  );

  const isInPlan = useCallback((id: number) => plan.some((w) => w.id === id), [plan]);
  const isSaved = useCallback((id: number) => saved.some((w) => w.id === id), [saved]);
  const isCompleted = useCallback((id: number) => completedIds.includes(id), [completedIds]);

  const addToPlan = useCallback(
    (workout: Workout): boolean => {
      if (isInPlan(workout.id)) {
        showToast(`"${workout.name}" is already in today's plan`, "info");
        return false;
      }
      if (plan.length >= PLAN_CAP) {
        showToast(`Cap of ${PLAN_CAP} lifts reached for today! Finish them first.`, "warning");
        return false;
      }
      setPlan((prev) => [...prev, workout]);
      showToast(`Added "${workout.name}" to today's plan!`, "success");
      return true;
    },
    [plan.length, isInPlan, showToast]
  );

  const removeFromPlan = useCallback(
    (id: number) => {
      const target = plan.find((w) => w.id === id);
      setPlan((prev) => prev.filter((w) => w.id !== id));
      setCompletedIds((prev) => prev.filter((item) => item !== id));
      showToast(target ? `Removed "${target.name}" from today's plan` : "Removed workout from plan", "info");
    },
    [plan, showToast]
  );

  const addToSaved = useCallback(
    (workout: Workout): boolean => {
      if (isSaved(workout.id)) {
        showToast(`"${workout.name}" is already saved`, "info");
        return false;
      }
      setSaved((prev) => [...prev, workout]);
      showToast(`Saved "${workout.name}" for later!`, "success");
      return true;
    },
    [isSaved, showToast]
  );

  const removeFromSaved = useCallback(
    (id: number) => {
      const target = saved.find((w) => w.id === id);
      setSaved((prev) => prev.filter((w) => w.id !== id));
      showToast(target ? `Removed "${target.name}" from saved` : "Removed workout from saved", "info");
    },
    [saved, showToast]
  );

  const markAsDone = useCallback(
    (id: number) => {
      const target = plan.find((w) => w.id === id);
      setCompletedIds((prev) => {
        if (prev.includes(id)) {
          showToast(target ? `Marked "${target.name}" as pending` : "Marked as pending", "info");
          return prev.filter((item) => item !== id);
        } else {
          showToast(target ? `Completed "${target.name}"! Great work!` : "Workout marked as completed!", "success");
          return [...prev, id];
        }
      });
    },
    [plan, showToast]
  );

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        completedIds,
        isHydrated,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        markAsDone,
        isCompleted,
        isInPlan,
        isSaved,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
