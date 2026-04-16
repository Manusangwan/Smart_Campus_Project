import "./Faculty.css";

export default function FacultyCard({ faculty }) {
  return (
    <div className="sca-faculty-card">

      {/* TOP */}
      <div className="sca-faculty-top">
        <img
          src={faculty.image}
          alt={faculty.name}
          className="sca-avatar"
        />

        <div>
          <h3 className="sca-name">{faculty.name}</h3>
          <p className="sca-role">{faculty.department}</p>
        </div>
      </div>

      {/* INFO */}
      <div className="sca-info-row">

        <div>
          <p className="sca-label">Department</p>
          <p className="sca-value">{faculty.department}</p>
        </div>

        <div>
          <p className="sca-label">Cabin</p>
          <p className="sca-value sca-cabin">

            <svg className="sca-icon" viewBox="0 0 24 24">
              <path d="M12 21s-6-5.4-6-10a6 6 0 1112 0c0 4.6-6 10-6 10z"/>
              <circle cx="12" cy="11" r="2"/>
            </svg>

            {faculty.cabin}
          </p>
        </div>

      </div>

      {/* CONTACT */}
      <div className="sca-contact">

        <div className="sca-contact-row">
          <svg className="sca-icon" viewBox="0 0 24 24">
            <path d="M4 4h16v16H4z" fill="none"/>
            <path d="M4 4l8 6 8-6"/>
          </svg>
          <span>{faculty.email}</span>
        </div>

        <div className="sca-contact-row">
          <svg className="sca-icon" viewBox="0 0 24 24">
            <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.2 11.7 11.7 0 003.7.6 1 1 0 011 1V20a1 1 0 01-1 1C10 21 3 14 3 5a1 1 0 011-1h3.4a1 1 0 011 1 11.7 11.7 0 00.6 3.7 1 1 0 01-.2 1z"/>
          </svg>
          <span>{faculty.phone}</span>
        </div>

      </div>

    </div>
  );
}