import { IUser } from "@/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
      zusLogout: () => {
        useAuthStore.persist.clearStorage();
        console.log('test')
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
        });
      }
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user
      }),
    }
  )
);

export default useAuthStore;
