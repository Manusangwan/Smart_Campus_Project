import React, { useState } from "react";
import "./Form.css";
import { generateComplaintDescription } from "../../utils/api";

export default function Form({ complaint, upvotehandler }) {
  const [val, setval] = useState("");
  const [desc, setdesc] = useState("");
  const [category, setcategory] = useState("");
  const [error, setError] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // ✅ ONLY API CALL HERE (BUTTON CLICK)
  const handleGenerateDescription = async () => {
    if (!val.trim()) {
      setError("Enter title first");
      return;
    }

    try {
      setLoadingAI(true);
      setError("");

      const result = await generateComplaintDescription(val);

      setdesc(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate description");
    } finally {
      setLoadingAI(false);
    }
  };

  // 🔍 Similar complaints (unchanged)
  let similarcomplaints = [];

  if (val.trim() !== "") {
    similarcomplaints = complaint.filter((c) => {
      return (
        c.title.toLowerCase().includes(val.toLowerCase()) ||
        c.description.toLowerCase().includes(val.toLowerCase())
      );
    });
  }

  function handleSubmit() {
    if (val.trim() === "" || desc.trim() === "" || category === "") {
      setError("Please fill in all required fields");
      return;
    }

    setError("");
    console.log("Form submitted", { val, desc, category });
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>New Complaint</h2>

        <section className="form-body">

          {/* TITLE */}
          <div className="form-group">
            <p>Title: <span className="required">*</span></p>

            <input
              type="text"
              placeholder="Enter complaint title"
              value={val}
              onChange={(e) => setval(e.target.value)}
            />
          </div>

          {/* ✅ AI BUTTON */}
          <button
            type="button"
            onClick={handleGenerateDescription}
            className="ai-btn"
            disabled={!val.trim() || loadingAI}
          >
            {loadingAI ? "Generating..." : " Generate Description"}
          </button>

          {/* DESCRIPTION */}
          <div className="form-group">
            <p>Description: <span className="required">*</span></p>

            <textarea
              rows="5"
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
            />
          </div>

          {/* CATEGORY */}
          <div className="form-group">
            <label>Category: <span className="required">*</span></label>

            <select
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            >
              <option value="">--Select Category--</option>
              <option value="Electrical">Electrical</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Technical">Technical</option>
              <option value="Wifi">Wifi</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* SIMILAR COMPLAINTS */}
          {val.trim() !== "" && similarcomplaints.length > 0 && (
            <div className="similar-box">
              <p>Similar Complaints Found:</p>

              {similarcomplaints.map((c, index) => (
                <div key={index}>
                  <span>{c.title} ({c.upvotes})</span>
                  <button onClick={() => upvotehandler(c.id)}>
                    ▲ Upvote
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && <p className="error-text">{error}</p>}

          <div className="form-buttons">
            <button onClick={handleSubmit}>Submit</button>
            <button>Cancel</button>
          </div>

        </section>
      </div>
    </div>
  );
}