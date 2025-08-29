import { useState } from "react";

export default function HealthCheck() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function check() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/health");
      const data = await res.json();
      setHealth(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <div className="row">
        <button onClick={check} disabled={loading}>
          {loading ? "Checking..." : "Check API Health"}
        </button>
        {error && <span className="muted">{error}</span>}
      </div>
      <pre className="pre-block">
        {health ? JSON.stringify(health, null, 2) : "No data yet"}
      </pre>
    </section>
  );
}
