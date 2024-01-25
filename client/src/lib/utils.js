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
    const session = JSON.parse(localStorage.getItem("session"));

    req.headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  return req;
});
