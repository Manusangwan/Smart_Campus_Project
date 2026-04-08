import React from "react";
import './Faculty.css'

export default function FacultyCard({ faculty }) {
  return (
    <div className="faculty-card">

      <img
        src={faculty.image}
        alt={faculty.name}
        className="faculty-img"
      />

      <div className="faculty-info">
        <h2 className="faculty-name">{faculty.name}</h2>

        <p className="faculty-dept">
          {faculty.department}
        </p>

        <div className="faculty-details">
          <p>📍 {faculty.cabin}</p>
          <p>✉️ {faculty.email}</p>
          <p>📞 {faculty.phone}</p>
        </div>
      </div>

    </div>
  );
}