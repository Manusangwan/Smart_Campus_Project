import { useContext, useState } from "react";
// import { UserContext } from "./Context";
import './Header.css'

const Header = () => {
//   const { user } = useContext(UserContext);
let user =  true;
  const [open, setOpen] = useState(false);

  return (
    <header className="header">

      {/* LEFT SIDE (FIXED) */}
      <div className="logo-section">
        <img src="/logocap.png" alt="logo" />
        <h2>Smart Campus Assistant</h2>
      </div>

      {/* RIGHT SIDE (DYNAMIC) */}
      <div className="nav-section">

        {!user ? (
          <>
            <button>Login</button>
            <button>Sign Up</button>
          </>
        ) : (
          // 🔹 LOGGED IN
          <>
            <button>Home</button>
            <button>Complaint</button>
            <button>Announcement</button>
            <button>Faculty Finder</button>
            {/* PROFILE DROPDOWN */}
            <div className="profile">
              
              {/* Clickable Profile */}
              <div 
                className="profile-info" 
                onClick={() => setOpen(!open)}
              >
                👤 <span>Guest</span>
              </div>

              {/* Dropdown */}
              {open && (
                <div className="dropdown">
                  <button>Logout</button>
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