import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../hasnine/Header";
import axiosInstance from "../../utils/axiosInstance";
import { useToast } from "./Toast";
import { useAuthContext } from "../../contexts/AuthContext";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRole = location.state?.role;
  const { showError } = useToast();
  const { login } = useAuthContext();

  useEffect(() => {
    if (!location.state?.role) {
      navigate("/get-started", { replace: true });
    }
  }, [location.state, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      const message = "Passwords do not match.";
      setError(message);
      showError(message);
      return;
    }

    const passwordPattern = /^.{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      const message = "Password must be at least 8 characters.";
      setError(message);
      showError(message);
      return;
    }

    if (!["seeker", "advertiser"].includes(selectedRole)) {
      const message = "Please select how you would like to get started.";
      setError(message);
      showError(message);
      return;
    }

    setSubmitting(true);
    let accountCreated = false;
    try {
      await axiosInstance.post("/users", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: selectedRole,
      });
      accountCreated = true;
      await login(formData.email, formData.password);
    } catch (requestError) {
      const message = requestError.response?.data?.error || "Registration failed. Please try again.";
      if (!accountCreated) showError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="auth-page">
        <div className="auth-card">
          <h1>Create an Account</h1>
          <p className="auth-subtitle">
            Join Basha Lagbe and get started.
          </p>

          <div className="register-role-indicator">
            <span>You're joining as</span>
            <strong>
              {selectedRole === "seeker" ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m3 10 9-7 9 7" />
                    <path d="M5 9.5V21h14V9.5" />
                    <path d="M9 21v-6h6v6" />
                  </svg>
                  Home Seeker
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 21h16" />
                    <path d="M6 21V4h12v17" />
                    <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
                    <path d="M10 21v-3h4v3" />
                  </svg>
                  Property Advertiser
                </>
              )}
            </strong>
          </div>

          <form onSubmit={handleSubmit}>
            {error && <p className="auth-message auth-message-error" role="alert">{error}</p>}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                minLength="8"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={submitting}>
              {submitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </main>

      <footer className="auth-footer">© 2026 Basha Lagbe. All rights reserved.</footer>
    </>
  );
}

export default Register;
