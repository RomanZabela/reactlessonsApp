export interface Toast {
    id: string;
    message: string;
    type: ToastTypes;
    timeStamp: number;
    duration?: number; // in milliseconds
}

export type ToastTypes = 'success' | 'error' | 'info' | 'warning';