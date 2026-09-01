"use client";

import { useCallback } from "react";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

function showToast({ title, description, variant = "default" }: ToastOptions) {
  if (typeof document === "undefined") return;
  const el = document.createElement("div");
  el.setAttribute("role", "status");
  el.className = [
    "fixed right-4 top-4 z-[100] max-w-sm rounded-xl border px-4 py-3 shadow-lg",
    variant === "destructive" ? "border-red-500/40 bg-red-950 text-red-50" : "border-border bg-background text-foreground",
  ].join(" ");
  el.innerHTML = `<div class="font-medium">${escapeHtml(title ?? "")}</div><div class="mt-1 text-sm opacity-80">${escapeHtml(description ?? "")}</div>`;
  document.body.appendChild(el);
  window.setTimeout(() => el.remove(), 4000);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char] ?? char));
}

export function useToast() {
  const toast = useCallback((options: ToastOptions) => showToast(options), []);
  return { toast };
}
