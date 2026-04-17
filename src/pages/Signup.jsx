import { useState ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

import "./Auth.css";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const {signup}= useContext(AuthContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const navigate= useNavigate()

  const handleSignup = async (e) => {
  e.preventDefault();
  try {
    await signup({
      name,
      course,
      year,
      department,
      rollNo,
      email,
      password,
    });

    alert("Signup successful");
    navigate("/home")
  } 
  catch (error) {
    // console.log(error);
    alert(error.message);
  }
};

  return (
    <AuthLayout>
      <h2>Create Account</h2>

      <form onSubmit={handleSignup}>

        <input
          className="auth-input"
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="auth-input"
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          <option value="BTech">B.Tech</option>
          <option value="MTech">M.Tech</option>
          <option value="MBA">MBA</option>
          <option value="MCA">MCA</option>
        </select>

        {(course === "BTech" || course === "MTech") && (
          <select
            className="auth-input"
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Branch</option>
            <option value="CSE">Computer Science</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics</option>
            <option value="ME">Mechanical</option>
            <option value="CE">Civil</option>
          </select>
        )}

         <select
          className="auth-input"
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <input
          className="auth-input"
          type="text"
          placeholder="University Roll No"
          onChange={(e) => setRollNo(e.target.value)}
        />

        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
       
        

        <button className="auth-btn">Sign Up</button>
      </form>

      <div className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </AuthLayout>
  );
};

export default Signup;