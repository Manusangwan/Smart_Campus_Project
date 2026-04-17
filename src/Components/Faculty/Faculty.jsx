import { useState } from "react";
import data from "./data";
import FacultyCard from "./FacultyCard";
import "./Faculty.css";

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
    <div id="mainbox">
      <div id="box">

        <h1 id="heading">Faculty Directory</h1>

        {/* FILTER BAR */}
        <div className="sca-filter-bar">

          <input
            type="text"
            placeholder="Search faculty..."
            className="sca-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="sca-dropdown"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map((d, i) => (
              <option key={i}>{d}</option>
            ))}
          </select>

        </div>

        {/* GRID */}
        <div className="sca-faculty-grid">
          {filteredFaculty.map((f) => (
            <FacultyCard key={f.id} faculty={f} />
          ))}
        </div>

      </div>
    </div>
  );
}