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
      style={{ 
        animation: 'slideDown 0.3s ease-out',
        background: 'rgba(254, 226, 226, 0.95)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="alert-icon" aria-hidden style={{ background: '#fca5a5', fontSize: '14px', fontWeight: 'bold' }}>
        ⚠
      </div>
      <div className="alert-body">
        <div className="alert-title" style={{ fontSize: '14px' }}>Error Occurred</div>
        <div className="alert-message" style={{ fontSize: '13px' }}>{message}</div>
      </div>
      <button
        className="alert-close"
        onClick={() => setOpen(false)}
        aria-label="Dismiss"
        style={{ fontSize: '24px', opacity: 0.7 }}
      >
        ×
      </button>
    </div>
  );
}

// Add keyframe animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      transform: translate(-50%, -100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
`;
if (typeof document !== 'undefined' && !document.querySelector('style[data-error-banner]')) {
  style.setAttribute('data-error-banner', '');
  document.head.appendChild(style);
}
