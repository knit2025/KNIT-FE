import { useEffect } from 'react';

type ToastProps = {
  open: boolean;
  message: string;
  onClose?: () => void;
  duration?: number; // ms
};

export default function Toast({ open, message, onClose, duration = 2000 }: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-[110px] z-[60]">
      <div className="px-4 py-2 rounded-lg bg-black/75 text-white text-sm shadow-lg transition-opacity">
        {message}
      </div>
    </div>
  );
}

