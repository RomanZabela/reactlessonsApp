import { create } from "zustand";
import type { SidebarStore } from "../types/sidebarStore";

export const useSidebarStore = create<SidebarStore>((set) => {
    const storedState = typeof window !== 'undefined'
        ? localStorage.getItem('sidebarStore')
        : null;

    const initialState = storedState ? JSON.parse(storedState) : false;

    return {
        isOpen: initialState,
        open: () => {
            set({ isOpen: true });
            if (typeof window !== 'undefined') {
                localStorage.setItem('sidebarStore', JSON.stringify(true));
            }
        },
        toggle: () => {
            set((state) => {
                const newState = !state.isOpen;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('sidebarStore', JSON.stringify(newState));
                }
                return { isOpen: newState };
            });
        }
    }
});