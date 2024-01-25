import { createStore } from "zustand";

export const useLocationStore = create((set) => ({
  user: {
    id: 1,
    name: "John Adam",
  },
}));