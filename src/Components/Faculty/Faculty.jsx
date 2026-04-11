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
    <div id="mainbox">

      <div  id="box">

        <h1 id="heading">Faculty Directory</h1>
        <div id="line"></div>

        <div id="extra">
          {/* <input
            type="text"
            placeholder="Search faculty..."
            className="search-in"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
           <div className="search-container">
                                <input type="text" placeholder="Search faculty...." value={search} onChange={(e) => setSearch(e.target.value)} />
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                                </svg>
          </div>

          <select
            id="drop"
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