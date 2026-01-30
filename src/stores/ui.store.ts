import { create } from "zustand";

interface UIStore {
  isAsideOpen: boolean;
  setIsAsideOpen: (isAsideOpen: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isAsideOpen: false,
  setIsAsideOpen: (isAsideOpen) => set({ isAsideOpen }),
}));