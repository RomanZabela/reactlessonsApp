import { create } from "zustand";
import type { SidebarStore } from "../types/sidebarStore";

export const useSidebarStore = create<SidebarStore>((set) => {
    const storedState = localStorage.getItem('sidebarStore');
    const initialState = storedState ? JSON.parse(storedState) : false;

    return {
        isOpen: initialState,
        open: () => {
            set({ isOpen: true });
            localStorage.setItem('sidebarStore', JSON.stringify(true));
        },
        close: () => {
            set({ isOpen: false });
            localStorage.setItem('sidebarStore', JSON.stringify(false));
        },
        toggle: () => {
            set((state) => {
                const newState = !state.isOpen;
                localStorage.setItem('sidebarStore', JSON.stringify(newState));
                return { isOpen: newState };
            });
        }
    }
});