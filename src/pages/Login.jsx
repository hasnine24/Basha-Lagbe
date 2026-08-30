import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuthContext } from "../contexts/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuthContext();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
    } catch (requestError) {
      setError(requestError.response?.data?.error || "Login failed. Please try again.");
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
            {location.state?.message && <p className="auth-message auth-message-success">{location.state.message}</p>}
            {error && <p className="auth-message auth-message-error" role="alert">{error}</p>}
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
            <Link to="/register">Register</Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Login;
