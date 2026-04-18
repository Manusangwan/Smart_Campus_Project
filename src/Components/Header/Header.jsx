import { useContext, useState } from "react";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  async function handlelogout() {
    await logout();
    navigate("/");
    setOpen(false);
  }

  return (
    <header className="header">
      <div className="logo-section">
        <img src="/logocap.png" alt="logo" />
        <h2>Smart Campus Assistant</h2>
      </div>

      <div className="nav-section">
        {!user ? (
          <>
            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
            <NavLink to="/signup">
              <button>Sign Up</button>
            </NavLink>
          </>
        ) : (
          <>
            {/* ✅ AUTO ACTIVE LINKS */}
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "currentactive" : "nonactive"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/announcements"
              className={({ isActive }) =>
                isActive ? "currentactive" : "nonactive"
              }
            >
              Announcements
            </NavLink>

            <NavLink
              to="/complaints"
              className={({ isActive }) =>
                isActive ? "currentactive" : "nonactive"
              }
            >
              Complaints
            </NavLink>
            <NavLink
  to="/poll"
  className={({ isActive }) =>
    isActive ? "currentactive" : "nonactive"
  }
>
  Poll
</NavLink>

            <NavLink
              to="/faculty"
              className={({ isActive }) =>
                isActive ? "currentactive" : "nonactive"
              }
            >
              Faculty Directory
            </NavLink>

            {/* PROFILE */}
            <div className="profile">
              <div
                className="profile-info"
                onClick={() => setOpen(!open)}
              >
                👤 <span>{user ? user.name : "User"}</span>
              </div>

              {open && (
                <div className="dropdown">
                  <button onClick={handlelogout}>Logout</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;