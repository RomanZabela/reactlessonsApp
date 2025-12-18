import { useToastStore } from "../../stores/useToastStore";
import type { Toast } from "../../types/toast";
import "./ToastContainer.css";

export const ToastContainer = () => {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    )
}

interface ToastProps {
    toast: Toast;
    onClose: () => void;
}

const Toast = ({toast, onClose}: ToastProps) => {
    return (
        <div className={`toast toast-${toast.type}`}>
            <div className="toast-message">{toast.message}</div>
            <button className="toast-close-button" onClick={onClose}>×</button>
        </div>
    );
}