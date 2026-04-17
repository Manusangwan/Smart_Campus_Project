import { AuthContext } from "../../context/AuthContext";
import "../../styles/global.css";
import { useContext } from "react";
export default function Hero() {
  const {user}= useContext(AuthContext)
  return (
    <div className="sca-hero">
      <div>
        <h1>Hey, {user.name} </h1>
        <p>Welcome back! Here's what's happening on campus today.</p>
      </div>
    </div>
  );
}