export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader">
      <div className="spinner" aria-hidden />
      <span>{text}</span>
    </div>
  );
}
