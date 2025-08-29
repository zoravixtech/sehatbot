export default function RawView({ raw }) {
  return (
    <section className="card">
      <h3 className="headline">Result</h3>
      <pre className="pre-block">
        {typeof raw === "string" ? raw : JSON.stringify(raw, null, 2)}
      </pre>
    </section>
  );
}
