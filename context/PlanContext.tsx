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
  activeTab: "plan" | "saved";
  setActiveTab: (tab: "plan" | "saved") => void;
  isHydrated: boolean;
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  addToSaved: (workout: Workout) => boolean;
  removeFromSaved: (id: number) => void;
  toggleSaved: (workout: Workout) => void;
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
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
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

  const isInPlan = useCallback(
    (id: number) => plan.some((w) => Number(w.id) === Number(id)),
    [plan]
  );

  const isSaved = useCallback(
    (id: number) => saved.some((w) => Number(w.id) === Number(id)),
    [saved]
  );

  const isCompleted = useCallback(
    (id: number) => completedIds.some((itemId) => Number(itemId) === Number(id)),
    [completedIds]
  );

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
      const target = plan.find((w) => Number(w.id) === Number(id));
      setPlan((prev) => prev.filter((w) => Number(w.id) !== Number(id)));
      setCompletedIds((prev) => prev.filter((itemId) => Number(itemId) !== Number(id)));
      showToast(
        target ? `Removed "${target.name}" from today's plan` : "Removed workout from plan",
        "info"
      );
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
      const target = saved.find((w) => Number(w.id) === Number(id));
      setSaved((prev) => prev.filter((w) => Number(w.id) !== Number(id)));
      showToast(target ? `Removed "${target.name}" from saved` : "Removed workout from saved", "info");
    },
    [saved, showToast]
  );

  const toggleSaved = useCallback(
    (workout: Workout) => {
      if (isSaved(workout.id)) {
        removeFromSaved(workout.id);
      } else {
        addToSaved(workout);
      }
    },
    [isSaved, removeFromSaved, addToSaved]
  );

  const markAsDone = useCallback(
    (id: number) => {
      const target = plan.find((w) => Number(w.id) === Number(id));
      setCompletedIds((prev) => {
        if (prev.some((itemId) => Number(itemId) === Number(id))) {
          showToast(target ? `Marked "${target.name}" as pending` : "Marked as pending", "info");
          return prev.filter((itemId) => Number(itemId) !== Number(id));
        } else {
          showToast(
            target ? `Completed "${target.name}"! Great work!` : "Workout marked as completed!",
            "success"
          );
          return [...prev, Number(id)];
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
        activeTab,
        setActiveTab,
        isHydrated,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        toggleSaved,
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
