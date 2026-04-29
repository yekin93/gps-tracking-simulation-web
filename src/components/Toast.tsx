import { type ReactNode } from 'react';
import { ToastContext, useToastState, type ToastItem, type ToastVariant } from './toastContext';

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, addToast, dismiss } = useToastState();

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end pointer-events-none"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <ToastEntry key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const variantConfig: Record<
  ToastVariant,
  { bg: string; icon: string; ariaLabel: string }
> = {
  success: { bg: 'bg-emerald-600 text-white', icon: '✓', ariaLabel: 'Success' },
  error: { bg: 'bg-red-600 text-white', icon: '✕', ariaLabel: 'Error' },
  info: { bg: 'bg-slate-800 text-white', icon: 'ℹ', ariaLabel: 'Info' },
};

function ToastEntry({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const { bg, icon, ariaLabel } = variantConfig[toast.variant];
  return (
    <div
      className={[
        'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg',
        'text-sm font-medium min-w-56 max-w-sm toast-enter',
        bg,
      ].join(' ')}
      role="alert"
      aria-label={ariaLabel}
    >
      <span className="shrink-0 text-base" aria-hidden="true">
        {icon}
      </span>
      <span className="flex-1">{toast.message}</span>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 opacity-75 hover:opacity-100 transition-opacity"
        aria-label="Dismiss notification"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
