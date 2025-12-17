import { useMemo, useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Layout from "./components/Layout";
import Controls from "./components/Controls";
import FileUploader from "./components/FileUploader";
import Loader from "./components/Loader";
import ErrorBanner from "./components/ErrorBanner";
import PrescriptionView from "./components/results/PrescriptionView";
import ReportView from "./components/results/ReportView";
import RawView from "./components/results/RawView";
import { normalizeResult } from "./utils/parseResult";
import { API_BASE_URL } from "./constants";

function App() {
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState("report");
  const [language, setLanguage] = useState("english");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const canSubmit = useMemo(
    () => !!file && !!documentType && !!language,
    [file, documentType, language]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!file) {
      setError("Please choose a file first.");
      return;
    }
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF, JPG, and PNG files are supported.");
      return;
    }

    try {
      setIsLoading(true);
      setStatus("Uploading document to Firebase Storage...");

      const uniqueName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const storagePath = `${documentType}/${uniqueName}`;
      const fileRef = ref(storage, storagePath);
      await uploadBytes(fileRef, file, { contentType: file.type });
      const fileViewUrl = await getDownloadURL(fileRef);

      setStatus("Generating AI summary...");
      const genRes = await fetch(`${API_BASE_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  
          documentType, 
          fileUrl: fileViewUrl, 
          language,
          contentType: file.type 
        }),
      });

      if (!genRes.ok) {
        const t = await genRes.text();
        throw new Error(`Generate failed (${genRes.status}): ${t}`);
      }

      const aiJson = await genRes.json();
      const normalized = normalizeResult(aiJson);
      setResult(normalized);
      if (normalized && normalized.kind === "error") {
        setError(normalized.error || "Unexpected error from AI service.");
      } else {
        setError("");
      }
      setStatus("Done.");
    } catch (err) {
      setError(err.message || String(err));
      setStatus("");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="card">
        <Controls
          documentType={documentType}
          setDocumentType={setDocumentType}
          language={language}
          setLanguage={setLanguage}
        />

        <FileUploader file={file} onChange={setFile} />

        <div className="row">
          <button type="submit" disabled={!canSubmit || isLoading}>
            {isLoading ? "🔄 Processing..." : "✨ Analyze Document"}
          </button>
          {isLoading ? (
            <Loader text={status || "Working..."} />
          ) : status ? (
            <span className="muted" style={{ color: '#059669', fontWeight: '500' }}>✓ {status}</span>
          ) : null}
        </div>

        <ErrorBanner message={error} />
      </form>

      {result ? (
        result.kind === "prescription" ? (
          <PrescriptionView data={result} />
        ) : result.kind === "report" ? (
          <ReportView data={result} />
        ) : (
          <RawView raw={result.raw || result} />
        )
      ) : null}
    </Layout>
  );
}

export default App;
