"use client";

import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: "bg-emerald-500 text-white",
    error: "bg-rose-500 text-white",
    info: "bg-accent text-white",
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${bgColors[type]}`}
    >
      <span className="font-semibold text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">
        ×
      </button>
    </div>
  );
}
