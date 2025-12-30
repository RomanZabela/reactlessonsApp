import { create } from "zustand";

type Theme = 'lara-light-blue' | 'lara-dark-blue'

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: (typeof window === 'undefined' ? 'lara-light-blue' : (localStorage.getItem('theme') as Theme)) || 'lara-light-blue',
    setTheme: (theme: Theme) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('theme', theme);
        set({ theme });
    },
}));