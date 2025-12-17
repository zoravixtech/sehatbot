export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader" style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
      <div className="spinner" aria-hidden style={{ borderTopColor: 'var(--accent-2)' }} />
      <span style={{ color: 'var(--accent)', fontWeight: '500' }}>{text}</span>
    </div>
  );
}
