import { languages, docTypes } from "../constants";

export default function Controls({
  documentType,
  setDocumentType,
  language,
  setLanguage,
}) {
  return (
    <div className="fields-2">
      <label className="field">
        <span className="label">📄 Document Type</span>
        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        >
          {docTypes.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span className="label">🌐 Language</span>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {languages.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
