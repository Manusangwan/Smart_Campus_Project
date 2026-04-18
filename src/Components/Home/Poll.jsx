import { useState } from "react";
import "../../styles/global.css";

export default function Poll({ showTitle = true }) {

  const question = "Should college extend library hours?"; // ✅ ADD QUESTION

  const [options, setOptions] = useState([
    { key: "yes", label: "Yes", votes: 62 },
    { key: "no", label: "No", votes: 18 },
    { key: "maybe", label: "Not sure", votes: 20 },
  ]);

  const [selected, setSelected] = useState(null);

  const handleVote = (key) => {
    if (selected === key) return;

    let updated = options.map((opt) => {
      if (opt.key === selected) {
        return { ...opt, votes: opt.votes - 1 };
      }

      if (opt.key === key) {
        return { ...opt, votes: opt.votes + 1 };
      }

      return opt;
    });

    setOptions(updated);
    setSelected(key);
  };

  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);

  return (
    <div className="sca-card">

      {/* ✅ TITLE */}
      {showTitle && <h3>📊 Poll of the Week</h3>}

      {/* ✅ QUESTION (THIS WAS MISSING) */}
      <p className="sca-poll-question">{question}</p>

      {options.map((opt) => {
        const percent = Math.round((opt.votes / totalVotes) * 100);

        return (
          <div
            key={opt.key}
            className={`sca-poll-item ${selected === opt.key ? "active" : ""}`}
            onClick={() => handleVote(opt.key)}
          >
            <div className="sca-poll-top">
              <span>{opt.label}</span>
              {selected === opt.key && <span>✔</span>}
            </div>

            <div className="sca-bar">
              <div style={{ width: `${percent}%` }}></div>
            </div>

            <span>{percent}%</span>
          </div>
        );
      })}
    </div>
  );
}