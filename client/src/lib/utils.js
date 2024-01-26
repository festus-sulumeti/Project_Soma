import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5555"
    : import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
  // withCredentials:true
});

api.interceptors.request.use((req) => {
  if (!req.headers["Authorization"]) {
    const token = localStorage.getItem("token");

    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});
