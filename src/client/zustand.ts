import { User } from "firebase/auth";
import { create } from "zustand";

export const useCurrentStore = create((set) => ({
  user: {
    user: null,
    isUserLoaded: false,
    setUser: (user: User | null) =>
      set(() => ({ user: { user: user, isUserLoaded: true } })),
  },
}));
