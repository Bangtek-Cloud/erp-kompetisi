import { IUser } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  zusLoginSuccess: (tokens: { accessToken: string; refreshToken: string }) => void;
  zusSetUser: (user: IUser | null) => void;
  zusLogout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      zusLoginSuccess: (tokens) => set({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }),
      zusSetUser: (user) => set({ user }),
      zusLogout: () => set({
        user: null,
        accessToken: null,
        refreshToken: null,
      }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

export default useAuthStore;
