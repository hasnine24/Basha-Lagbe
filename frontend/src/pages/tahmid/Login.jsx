import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../hasnine/Header";
import { useAuthContext } from "../../contexts/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await login(email, password);
    } catch {
      // AuthContext displays the API error in the global toast.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="auth-page">
        <div className="auth-card">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">
            Login to continue to Basha Lagbe.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={submitting}>
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/get-started">Get Started</Link>
          </p>
        </div>
      </main>

      <footer className="auth-footer">© 2026 Basha Lagbe. All rights reserved.</footer>
    </>
  );
}

export default Login;
