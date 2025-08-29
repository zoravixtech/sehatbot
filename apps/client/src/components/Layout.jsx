export default function Layout({ children }) {
  return (
    <div className="container">
      <header className="header">
        <h1>SehatBot</h1>
        <p className="subtitle">
          Upload a medical report or prescription to get a friendly summary.
        </p>
      </header>
      <main>{children}</main>
      <footer className="footer">© {new Date().getFullYear()} SehatBot</footer>
    </div>
  );
}
