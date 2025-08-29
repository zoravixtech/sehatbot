export default function ReportView({ data }) {
  const { purpose, good_news, points_to_note, summary, tips, disclaimer } =
    data;
  return (
    <section className="card">
      <h3 className="headline">Report Summary</h3>

      {purpose && (
        <div className="block">
          <h4>Purpose</h4>
          <p>{purpose}</p>
        </div>
      )}

      {good_news && (
        <div className="block ok">
          <h4>Good News ✅</h4>
          <p>{good_news}</p>
        </div>
      )}

      {points_to_note && (
        <div className="block warn">
          <h4>Points to Note ⚠️</h4>
          <p>{points_to_note}</p>
        </div>
      )}

      {summary && (
        <div className="block">
          <h4>Summary 💡</h4>
          <p>{summary}</p>
        </div>
      )}

      {tips && (
        <div className="block">
          <h4>Tips 🍎😴</h4>
          <p>{tips}</p>
        </div>
      )}

      {disclaimer ? <p className="disclaimer">{disclaimer}</p> : null}
    </section>
  );
}
