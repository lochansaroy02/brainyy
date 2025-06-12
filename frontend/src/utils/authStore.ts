import { create } from "zustand";

// authStore.ts
export const useAuthStore = create((set) => ({
    isLoggedIn: !!localStorage.getItem("token"),
    logout: () => {
        localStorage.removeItem("token");
        set({ isLoggedIn: false });
    }
}));