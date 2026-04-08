import React from "react";
import { useState } from "react";
import './Form.css'
export default function Form({ complaint, upvotehandler }) {
    const [val, setval] = useState("")
    const [desc, setdesc] = useState("")
    const [category, setcategory] = useState("")
    const [error, setError] = useState("");
    let similarcomplaints = complaint
    if (val.trim() != "") {
        similarcomplaints = similarcomplaints.filter((c) => {
            return c.title.toLocaleLowerCase().includes(val.toLocaleLowerCase()) || c.description.toLocaleLowerCase().includes(val.toLocaleLowerCase())
        })
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
                    <div className="form-group">
                        <p>Title: <span className="required" style={{ color: "red" }}>*</span></p>
                        <input type="text" placeholder="Enter complaint title" value={val} onChange={(e) => { setval(e.target.value) }}
                            style={{
                                border: val.trim() === "" && error ? "1px solid red" : ""
                            }} />
                    </div>
                    <div className="form-group">
                        <p>Description: <span className="required" style={{ color: "red" }}>*</span></p>
                        <textarea placeholder="Describe the issue in detail.." rows="5" cols="40" value={desc} onChange={(e) => setdesc(e.target.value)}
                            style={{
                                border: desc.trim() === "" && error ? "1px solid red" : ""
                            }}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category: <span className="required" style={{ color: "red" }}>*</span></label>
                        <select id="category" value={category} onChange={(e) => setcategory(e.target.value)} style={{
                            border: category.trim() === "" && error ? "1px solid red" : ""
                        }}>
                            <option value="">--Select Category--</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Cleanliness">Cleanliness</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Technical">Technical</option>
                            <option value="Wifi">Wifi</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="similar-box">
                        <p className="similar-title">Similar Complaints Found: </p>
                        <div className="similar-list">
                            {val !== "" ? (similarcomplaints.map((c, index) => {
                                return (
                                    <div key={index}>
                                        <div>
                                            <span>{c.title}</span>
                                            <span>({c.upvotes} upvotes)</span>
                                        </div>
                                        <div>
                                            <button onClick={() => upvotehandler(c.id)}>Upvote</button>
                                        </div>
                                    </div>
                                )
                            })) : "None"}
                        </div>
                    </div>
                    {error && (
                            <p className="error-text" style={{ color: "red" }}>
                                {error}
                            </p>
                        )}
                    <div className="form-buttons">
                        <button className="submit-btn" onClick={handleSubmit}>Submit Complaint</button>
                        <button className="cancel-btn">Cancel</button>
                    </div>
                </section>
            </div>
        </div>
    )
}