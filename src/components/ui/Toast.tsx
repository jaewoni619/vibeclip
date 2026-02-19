"use client";

import { createContext, useContext, useCallback, useState, ReactNode } from "react";

interface ToastItem {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}

interface ToastContextType {
  toast: (message: string, type?: "success" | "info" | "error") => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: "success" | "info" | "error" = "info") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-fade-in-up rounded-xl px-5 py-3 text-sm font-medium shadow-lg backdrop-blur-md ${
              t.type === "success"
                ? "border border-lime/30 bg-lime/10 text-lime"
                : t.type === "error"
                  ? "border border-magenta/30 bg-magenta/10 text-magenta"
                  : "border border-cyan/30 bg-cyan/10 text-cyan"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
