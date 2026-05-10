import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import "./Auth.css";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (submitting) return;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSubmitting(true);

      await login(email, password);

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(error.message || "Login failed");
    } finally {
      setSubmitting(false);
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

        <button
          type="submit"
          className="auth-btn"
          disabled={submitting}
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="auth-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;