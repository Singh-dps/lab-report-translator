import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ValueFlag } from "@/types/api"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date)
  } catch (e) {
    return dateString
  }
}

export function getFlagColor(flag: ValueFlag | null) {
  if (flag === "low") return { bg: "bg-blue-50/50", text: "text-blue-700", border: "border-blue-200" }
  if (flag === "normal") return { bg: "bg-green-50/50", text: "text-green-700", border: "border-green-200" }
  if (flag === "high") return { bg: "bg-amber-50/50", text: "text-amber-700", border: "border-amber-200" }
  if (flag === "critical") return { bg: "bg-red-50/50", text: "text-red-700", border: "border-red-200" }
  return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" }
}

export function getFlagLabel(flag: ValueFlag | null) {
  if (!flag) return "Unknown"
  return flag
}
