"use client";

import { useEffect, useState } from "react";
import type { ToastOptions } from "./use-toast";

type ToastItem = ToastOptions & { id: number };
let nextToastId = 0;

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const detail = (event as CustomEvent<ToastOptions>).detail;
      const id = ++nextToastId;
      setItems((current) => [...current, { ...detail, id }].slice(-4));
      window.setTimeout(() => {
        setItems((current) => current.filter((item) => item.id !== id));
      }, 5000);
    };

    window.addEventListener("drp:toast", handleToast);
    return () => window.removeEventListener("drp:toast", handleToast);
  }, []);

  return (
    <div
      className="fixed right-4 top-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2"
      aria-live="polite"
      aria-atomic="false"
    >
      {items.map((item) => (
        <div
          key={item.id}
          role="status"
          className={[
            "rounded-lg border p-4 shadow-lg backdrop-blur",
            item.variant === "destructive"
              ? "border-red-400/40 bg-red-950/95 text-red-50"
              : "border-white/10 bg-slate-950/95 text-white",
          ].join(" ")}
        >
          {item.title && <div className="font-semibold">{item.title}</div>}
          {item.description && <div className="mt-1 text-sm opacity-80">{item.description}</div>}
        </div>
      ))}
    </div>
  );
}
