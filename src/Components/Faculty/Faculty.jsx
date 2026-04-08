import { useState } from "react";
import data from "./data";
import FacultyCard from "./FacultyCard";
import '../Announcements/Announce.css'
import './Faculty.css'

export default function Faculty() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const departments = ["All", ...new Set(data.map(f => f.department))];

  const filteredFaculty = data.filter((f) => {
    return (
      f.name.toLowerCase().includes(search.toLowerCase()) &&
      (department === "All" || f.department === department)
    );
  });

  return (
    <div className="page" id="mainbox">

      <div className="container" id="box">

        <h1 className="page-title">Faculty Directory</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Search faculty..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="dropdown"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map((dept, index) => (
              <option key={index}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="faculty-grid">
          {filteredFaculty.map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))}
        </div>

      </div>
    </div>
  );
}