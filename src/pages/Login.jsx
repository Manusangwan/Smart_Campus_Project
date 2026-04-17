import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import "./Auth.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate= useNavigate()
  const {login}= useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();
    // console.log(email, password);
    if (!email || !password) {
    alert("Please fill all fields");
    return;
    }
    try{
      await login(email,password);
      navigate("/home");
    }
    catch(error){
      alert(error.message)
    }
  };

  return (
    <AuthLayout>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="auth-btn">Login</button>
      </form>

      <div className="auth-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;