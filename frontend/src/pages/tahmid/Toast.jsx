import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import "./Toast.css";

const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}

function ToastMessage({ toast }) {
  if (!toast) return null;

  return (
    <>
      <div className={`toast-backdrop ${toast.visible ? "toast-backdrop-visible" : ""}`} />
      <div
        className={`toast toast-${toast.type} ${toast.visible ? "toast-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        <span className="toast-icon" aria-hidden="true">
          {toast.type === "success" ? "✓" : "!"}
        </span>
        <span>{toast.message}</span>
      </div>
    </>
  );
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const hideTimeoutRef = useRef(null);
  const removeTimeoutRef = useRef(null);

  const clearTimers = useCallback(() => {
    clearTimeout(hideTimeoutRef.current);
    clearTimeout(removeTimeoutRef.current);
  }, []);

  const showToast = useCallback((type, message) => {
    clearTimers();
    setToast({ type, message, visible: true });

    hideTimeoutRef.current = setTimeout(() => {
      setToast((currentToast) => currentToast && { ...currentToast, visible: false });
      removeTimeoutRef.current = setTimeout(() => setToast(null), 220);
    }, 2000);
  }, [clearTimers]);

  const showSuccess = useCallback((message) => showToast("success", message), [showToast]);
  const showError = useCallback((message) => showToast("error", message), [showToast]);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <ToastContext.Provider value={{ showSuccess, showError }}>
      {children}
      <ToastMessage toast={toast} />
    </ToastContext.Provider>
  );
}
