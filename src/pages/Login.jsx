import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = login(email, password);

    if (!result.success) {
      showToast(result.message, "error");
      return;
    }

    showToast("Login successful!");
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">A</div>

        <h1>Welcome back</h1>
        <p>Sign in to your admin account</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="primary-button login-button"
          >
            Sign In
          </button>
        </form>

        <div className="login-hint">
          Demo: any valid email and password
        </div>
      </div>
    </div>
  );
}

export default Login;