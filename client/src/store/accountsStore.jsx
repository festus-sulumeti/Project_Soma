import { create } from "zustand";

export const useAccountStore = create((set) => ({
  students: [],
  setStudents: (fetchedStudents) => set(() => ({ students: fetchedStudents })),
  classes:[],
  setClasses: (fetchedClasses) => set(() => ({ classes: fetchedClasses })),
}));
