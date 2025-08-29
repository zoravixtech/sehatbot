export default function PrescriptionView({ data }) {
  const {
    parsing_status,
    patient,
    prescription,
    diagnosis,
    medications,
    tests,
    advice,
    structured_output,
    disclaimer,
  } = data;
  return (
    <section className="card">
      <h3 className="headline">Prescription Summary</h3>
      <div className="grid two">
        <div>
          <h4>Patient</h4>
          <ul className="list">
            <li>
              <strong>Name:</strong> {patient?.name || "-"}
            </li>
            <li>
              <strong>Age/Sex:</strong> {patient?.age_sex || "-"}
            </li>
            <li>
              <strong>Weight:</strong> {patient?.weight || "-"}
            </li>
          </ul>
        </div>
        <div>
          <h4>Prescription Details</h4>
          <ul className="list">
            <li>
              <strong>Date:</strong> {prescription?.date || "-"}
            </li>
            <li>
              <strong>Doctor:</strong> {prescription?.doctor_name || "-"}
            </li>
            <li>
              <strong>Clinic:</strong> {prescription?.clinic_name || "-"}
            </li>
          </ul>
        </div>
      </div>

      <div className="badge-row">
        <span
          className={`badge ${
            parsing_status?.toLowerCase().includes("fail")
              ? "danger"
              : parsing_status?.toLowerCase().includes("uncertain")
              ? "warn"
              : "ok"
          }`}
        >
          {parsing_status || "Unknown"}
        </span>
      </div>

      {diagnosis?.length ? (
        <div>
          <h4>Diagnosis / Complaints</h4>
          <ul className="bullets">
            {diagnosis.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {medications?.length ? (
        <div>
          <h4>Medications</h4>
          <div className="meds">
            {medications.map((m, i) => (
              <div key={i} className="med">
                <div className="med-title">{m.name || "Unknown"}</div>
                <div className="med-meta">
                  {m.dosage && <span>{m.dosage}</span>}
                  {m.frequency && <span>• {m.frequency}</span>}
                  {m.duration && <span>• {m.duration}</span>}
                  {m.timing_instructions && (
                    <span>• {m.timing_instructions}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {tests?.length ? (
        <div>
          <h4>Diagnostic Tests</h4>
          <ul className="chips">
            {tests.map((t, i) => (
              <li key={i} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {advice?.length ? (
        <div>
          <h4>General Advice</h4>
          <ul className="bullets">
            {advice.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {structured_output && Object.keys(structured_output).length ? (
        <details>
          <summary>Structured Output</summary>
          <pre className="pre-block small">
            {JSON.stringify(structured_output, null, 2)}
          </pre>
        </details>
      ) : null}

      {disclaimer ? <p className="disclaimer">{disclaimer}</p> : null}
    </section>
  );
}
