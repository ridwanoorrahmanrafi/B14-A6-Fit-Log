"use client";

import React from "react";
import { usePlan } from "@/context/PlanContext";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePlan();

  if (!toasts.length) return null;

  return (
    <div className="toast toast-bottom toast-end z-50 fixed bottom-6 right-6 space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isWarning = toast.type === "warning";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            role="alert"
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-right-5 ${
              isSuccess
                ? "bg-[#141d14]/95 border-[#ccff00]/40 text-white"
                : isWarning
                ? "bg-[#251d10]/95 border-amber-500/40 text-amber-200"
                : isError
                ? "bg-[#251010]/95 border-red-500/40 text-red-200"
                : "bg-[#181d28]/95 border-blue-500/40 text-zinc-100"
            }`}
          >
            <div className="flex items-center gap-3">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#ccff00] shrink-0" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
              {isError && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
              <span className="text-sm font-medium leading-snug">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
