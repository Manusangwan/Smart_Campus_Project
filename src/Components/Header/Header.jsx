import { useContext, useState } from "react";
// import { UserContext } from "./Context";
import './Header.css'
import { Link } from "react-router-dom";

const Header = () => {
//   const { user } = useContext(UserContext);
let user =  true;
const [working,setworking]= useState("Home");
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
            <Link className={working==="Home"?"currentactive": "nonactive"} to="/home" onClick={()=>setworking("Home")}>Home</Link>
            <Link className={working==="Announcements"?"currentactive": "nonactive"} to="/announcements" onClick={()=>setworking("Announcements")}>Announcements</Link>
            <Link className={working==="Complaints"?"currentactive": "nonactive"} to="/complaints" onClick={()=>setworking("Complaints")}>Complaints</Link>
            <Link className={working==="Faculty"?"currentactive": "nonactive"} to="/faculty" onClick={()=>setworking("Faculty")}>Faculty Directory</Link>

            <div className="profile">
            
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