export default function FileUploader({ file, onChange }) {
  return (
    <label className="field">
      <span className="label">📎 Upload Document (PDF, JPG, PNG)</span>
      <input
        type="file"
        accept="application/pdf,image/jpeg,image/png,image/jpg"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
      {file && (
        <div className="muted small" style={{ marginTop: '8px', padding: '8px 12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>✓</span>
          <span>Selected: <strong>{file.name}</strong> ({Math.ceil(file.size / 1024)} KB)</span>
        </div>
      )}
    </label>
  );
}
