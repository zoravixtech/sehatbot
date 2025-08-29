// Normalizes raw AI response (which may be JSON or raw text) into a UI-friendly object

export function safeJsonParse(textOrObj) {
  if (typeof textOrObj === "object" && textOrObj !== null) return textOrObj;
  try {
    return JSON.parse(String(textOrObj));
  } catch {
    return { raw: String(textOrObj) };
  }
}

export function normalizeResult(raw) {
  const data = safeJsonParse(raw);
  // Prescription shape
  if (
    typeof data === "object" &&
    (data.medications || data.patient_details || data.prescription_details)
  ) {
    return {
      kind: "prescription",
      parsing_status: data.parsing_status || "Unknown",
      patient: data.patient_details || {},
      prescription: data.prescription_details || {},
      diagnosis: Array.isArray(data.diagnosis_complaints)
        ? data.diagnosis_complaints
        : [],
      medications: Array.isArray(data.medications) ? data.medications : [],
      tests: Array.isArray(data.diagnostic_tests) ? data.diagnostic_tests : [],
      advice: Array.isArray(data.general_advice) ? data.general_advice : [],
      structured_output: data.structured_output || {},
      disclaimer: data.disclaimer_text || data.disclaimer || "",
      raw: null,
    };
  }

  // Report shape
  if (
    typeof data === "object" &&
    ("purpose" in data || "good_news" in data || "summary" in data)
  ) {
    return {
      kind: "report",
      purpose: data.purpose || "",
      good_news: data.good_news || "",
      points_to_note: data.points_to_note || data.warnings || "",
      summary: data.summary || "",
      tips: data.tips || "",
      disclaimer: data.disclaimer || "",
      raw: null,
    };
  }

  // Error shape
  if (typeof data === "object" && data.error) {
    return { kind: "error", error: data.error, raw: null };
  }

  // Fallback raw text
  return {
    kind: "raw",
    raw: typeof raw === "string" ? raw : JSON.stringify(raw),
  };
}
