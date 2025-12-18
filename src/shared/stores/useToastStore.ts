import { create } from "zustand";
import type { Toast, ToastTypes } from "../types/toast";

interface ToastStore {
    toasts: Toast[];
    addToast: (message: string, type: ToastTypes, duration?: number) => void;
    removeToast: (id: string) => void;
}

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
            setTimeout(() => {
                set((state) => ({
                    toasts: state.toasts.filter((t) => t.id !== id)
                }));
            }, duration);
        }
    },
    removeToast: (id: string) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id)
        }));
    },
}));