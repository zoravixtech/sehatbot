export default function FileUploader({ file, onChange }) {
  return (
    <label className="field">
      <span className="label">Upload PDF</span>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
      {file && (
        <div className="muted small">
          Selected: {file.name} ({Math.ceil(file.size / 1024)} KB)
        </div>
      )}
    </label>
  );
}
