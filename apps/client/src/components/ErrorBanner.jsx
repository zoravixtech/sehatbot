import { useEffect, useState } from "react";

export default function ErrorBanner({ message }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
      const t = setTimeout(() => setOpen(false), 6000);
      return () => clearTimeout(t);
    }
    setOpen(false);
  }, [message]);

  if (!message || !open) return null;
  return (
    <div
      className="alert alert-error"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="alert-icon" aria-hidden>
        !
      </div>
      <div className="alert-body">
        <div className="alert-title">Error</div>
        <div className="alert-message">{message}</div>
      </div>
      <button
        className="alert-close"
        onClick={() => setOpen(false)}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
