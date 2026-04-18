import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";
import Hero from "./Hero";
import DashboardCards from "./DashboardCards";
import Poll from "./Poll";

import announcements from "../Announcements/Announce.js";
import complaintsData from "../Complaints/Complaint.js";

export default function Home() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState(complaintsData);

  const recentAnnouncements = announcements.slice(0, 3);
  const recentComplaints = complaints.slice(0, 3);

  // 🔥 TOGGLE UPVOTE
  function upvotehandler(id) {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            upvotes: c.userUpvoted ? c.upvotes - 1 : c.upvotes + 1,
            userUpvoted: !c.userUpvoted,
          };
        }
        return c;
      })
    );
  }

  return (
    <div className="sca-app">
      <Hero />

      {/* 🔥 IMPORTANT: This component has the real bug */}
      <DashboardCards />

      {/* ===== ANNOUNCEMENTS ===== */}
      <div className="sca-card">
        <div className="sca-header">
          <h3>📢 Recent Announcements</h3>

          {/* ✅ FIX: stop propagation */}
          <span
            className="sca-link"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/announcements");
            }}
          >
            View All →
          </span>
        </div>

        <div className="sca-announcement-row">
          {recentAnnouncements.map((a) => (
            <div key={a.id} className="sca-announcement-item">
              <span className="dot"></span>
              <div>
                <h4>{a.title}</h4>
                <p>{a.description}</p>
                <span className="date">Oct 5</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== COMPLAINTS + POLL ===== */}
      <div className="sca-bottom-grid">
        <div className="sca-card">
          <div className="sca-header">
            <h3>📋 Recent Complaints</h3>

            {/* ✅ FIX: stop propagation */}
            <span
              className="sca-link"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/complaints");
              }}
            >
              View All →
            </span>
          </div>

          <table className="sca-table">
            <thead>
              <tr>
                <th>Issue</th>
                <th>Category</th>
                <th>Status</th>
                <th>Upvotes</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {recentComplaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td>{c.category}</td>

                  <td>
                    <span
                      className={`sca-status ${c.status
                        .replace(" ", "")
                        .toLowerCase()}`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td>
                    {/* ✅ FIX: prevent row click issues */}
                    <button
                      className={`sca-upvote-btn ${
                        c.userUpvoted ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        upvotehandler(c.id);
                      }}
                    >
                      ▲ {c.upvotes}
                    </button>
                  </td>

                  <td>2 days ago</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="no-more">No more complaints to show</p>
        </div>

        <Poll />
      </div>
    </div>
  );
}