import { useContext, useState } from "react";
// import { UserContext } from "./Context";
import './Header.css'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Header = () => {
  const { user,logout} = useContext(AuthContext);
const [working,setworking]= useState("Home");
  const [open, setOpen] = useState(false);
  const navigate= useNavigate()
  
  async function handlelogout(){
    await logout()
    navigate("/")
    setOpen(false)
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
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Sign Up</button></Link>
          </>
        ) : (
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
                👤 <span>{user?user.name : "User"}</span>
              </div>

              {/* Dropdown */}
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