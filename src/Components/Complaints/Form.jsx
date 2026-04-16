import React from "react";
import { useState } from "react";
import "./Form.css";

export default function Form({ complaint, upvotehandler }) {

    const [val, setval] = useState("");
    const [desc, setdesc] = useState("");
    const [category, setcategory] = useState("");
    const [error, setError] = useState("");

    // 🔥 FILTER SIMILAR COMPLAINTS
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
        console.log("Form submitted");
    }

    return (
        <div className="form-container">
            <div className="form-card">

                <h2>New Complaint</h2>

                <section className="form-body">

                    {/* TITLE */}
                    <div className="form-group">
                        <p>
                            Title: <span className="required">*</span>
                        </p>

                        <input
                            type="text"
                            placeholder="Enter complaint title"
                            value={val}
                            onChange={(e) => setval(e.target.value)}
                            style={{
                                border:
                                    val.trim() === "" && error
                                        ? "1px solid red"
                                        : "",
                            }}
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="form-group">
                        <p>
                            Description: <span className="required">*</span>
                        </p>

                        <textarea
                            placeholder="Describe the issue in detail.."
                            rows="5"
                            value={desc}
                            onChange={(e) => setdesc(e.target.value)}
                            style={{
                                border:
                                    desc.trim() === "" && error
                                        ? "1px solid red"
                                        : "",
                            }}
                        ></textarea>
                    </div>

                    {/* CATEGORY */}
                    <div className="form-group">
                        <label>
                            Category: <span className="required">*</span>
                        </label>

                        <select
                            value={category}
                            onChange={(e) => setcategory(e.target.value)}
                            style={{
                                border:
                                    category === "" && error
                                        ? "1px solid red"
                                        : "",
                            }}
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

                    {/* 🔥 SMART SIMILAR COMPLAINTS */}
                    {val.trim() !== "" && similarcomplaints.length > 0 && (
                        <div className="similar-box">

                            <p className="similar-title">
                                Similar Complaints Found:
                            </p>

                            <div className="similar-list">
                                {similarcomplaints.map((c, index) => (
                                    <div key={index}>

                                        <div>
                                            <span>{c.title}</span>
                                            <span>
                                                {" "}
                                                ({c.upvotes} upvotes)
                                            </span>
                                        </div>

                                        <button
                                            onClick={() =>
                                                upvotehandler(c.id)
                                            }
                                        >
                                            ▲ Upvote
                                        </button>

                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* OPTIONAL: NO MATCH MESSAGE */}
                    {val.trim() !== "" &&
                        similarcomplaints.length === 0 && (
                            <p className="no-match">
                                No similar complaints found
                            </p>
                        )}

                    {/* ERROR */}
                    {error && (
                        <p className="error-text">{error}</p>
                    )}

                    {/* BUTTONS */}
                    <div className="form-buttons">

                        <button
                            className="submit-btn"
                            onClick={handleSubmit}
                        >
                            Submit Complaint
                        </button>

                        <button className="cancel-btn">
                            Cancel
                        </button>

                    </div>

                </section>
            </div>
        </div>
    );
}