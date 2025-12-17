export default function Layout({ children }) {
  return (
    <div className="container">
      <header className="header">
        <h1>🏥 MedifyAI </h1>
        <p className="subtitle">
          Your intelligent medical document assistant – Upload prescriptions and reports for instant, easy-to-understand summaries
        </p>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div>© {new Date().getFullYear()} MedifyAI. Powered by Google Gemini AI.</div>
        <div style={{ marginTop: '4px', fontSize: '11px' }}>Transforming healthcare documents into clear insights</div>
      </footer>
    </div>
  );
}
