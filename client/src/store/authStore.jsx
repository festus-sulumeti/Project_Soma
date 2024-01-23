import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: {
    id: 1,
    name: "John Adam",
  },
}));
