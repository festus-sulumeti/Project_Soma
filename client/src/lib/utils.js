import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? 'http://127.0.0.1:5555'
    : import.meta.env.VITE_BACKEND_URL;