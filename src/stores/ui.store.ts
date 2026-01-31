import { create } from "zustand";

interface UIStore {
  isAsideOpen: boolean;
  isInitOnboarding: boolean;
  isFinishOnboarding: boolean;
  isModalLogoutOpen: boolean;
  isOpenMenuProfilHeader: boolean;

  setIsAsideOpen: (isAsideOpen: boolean) => void;
  setIsInitOnboarding: (isInitOnboarding: boolean) => void;
  setIsFinishOnboarding: (isFinishOnboarding: boolean) => void;
  setIsModalLogoutOpen: (isModalLogoutOpen: boolean) => void;
  setIsOpenMenuProfilHeader: (isOpenMenuProfilHeader: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isAsideOpen: false,
  isInitOnboarding: false,
  isFinishOnboarding: false,
  isModalLogoutOpen: false,
  isOpenMenuProfilHeader: false,

  setIsAsideOpen: (isAsideOpen) => set({ isAsideOpen }),
  setIsInitOnboarding: (isInitOnboarding) => set({ isInitOnboarding }),
  setIsFinishOnboarding: (isFinishOnboarding) => set({ isFinishOnboarding }),
  setIsModalLogoutOpen: (isModalLogoutOpen) => set({ isModalLogoutOpen }),
  setIsOpenMenuProfilHeader: (isOpenMenuProfilHeader) => set({ isOpenMenuProfilHeader }),
}));