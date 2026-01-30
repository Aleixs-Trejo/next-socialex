import { create } from "zustand";

interface UIStore {
  isAsideOpen: boolean;
  isFinishOnboarding: boolean;

  setIsAsideOpen: (isAsideOpen: boolean) => void;
  setIsFinishOnboarding: (isFinishOnboarding: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isAsideOpen: false,
  isFinishOnboarding: false,

  setIsAsideOpen: (isAsideOpen) => set({ isAsideOpen }),
  setIsFinishOnboarding: (isFinishOnboarding) => set({ isFinishOnboarding }),
}));