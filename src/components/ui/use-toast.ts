"use client";

import type { ReactNode } from "react";

export type ToastOptions = {
  title?: ReactNode;
  description?: ReactNode;
  variant?: "default" | "destructive";
};

export function toast(options: ToastOptions) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ToastOptions>("drp:toast", { detail: options }));
}

export function useToast() {
  return { toast };
}
