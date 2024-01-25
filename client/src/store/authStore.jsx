import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  setUser:(user) => set(() => ({
    user
  })),
  isAuthenticated:false,
  setIsAuthenticated:(value) => set(() => ({
    isAuthenticated:value
  })),
  logOut:() => set(() => ({
    user:null, 
    isAuthenticated:false,
  }))
}));
