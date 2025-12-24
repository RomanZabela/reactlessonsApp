import { create } from "zustand";
import type { Toast, ToastTypes } from "../types/toast";

interface ToastStore {
    toasts: Toast[];
    addToast: (message: string, type: ToastTypes, duration?: number) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
}

const timeouts = new Map<string, ReturnType<typeof setTimeout>>();

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (message, type, duration = 3000) => {
        const id = crypto.randomUUID();
        const timeStamp = Date.now();
        const toast: Toast = { id, message, type, timeStamp, duration };

        set((state) => ({
            toasts: [...state.toasts, toast]
        }));

        if (duration > 0) {
            const timeoutId = setTimeout(() => {
                set((state) => ({
                    toasts: state.toasts.filter((t) => t.id !== id)
                }));
                timeouts.delete(id);
            }, duration);
            timeouts.set(id, timeoutId);
        }
    },

    removeToast: (id: string) => {
        const timeoutId = timeouts.get(id);
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeouts.delete(id);
        }
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id)
        }));
    },

    clearToasts: () => {
        timeouts.clear();
        set({ toasts: [] });
    }
}));