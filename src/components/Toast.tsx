import { type ReactNode } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
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
  { bg: string; Icon: React.ElementType; ariaLabel: string }
> = {
  success: { bg: 'bg-emerald-600 text-white', Icon: CheckCircle, ariaLabel: 'Success' },
  error: { bg: 'bg-red-600 text-white', Icon: AlertCircle, ariaLabel: 'Error' },
  info: { bg: 'bg-slate-800 text-white', Icon: Info, ariaLabel: 'Info' },
};

function ToastEntry({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const { bg, Icon, ariaLabel } = variantConfig[toast.variant];
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
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="flex-1">{toast.message}</span>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 opacity-75 hover:opacity-100 transition-opacity duration-200 ease-in-out"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

