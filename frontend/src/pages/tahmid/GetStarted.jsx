import { useNavigate } from "react-router-dom";
import Header from "../hasnine/Header";
import "./GetStarted.css";

function GetStarted() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main className="get-started-page">
        <div className="get-started-container">
          <h1>How Would You Like to Get Started?</h1>
          <p className="get-started-subtitle">
            Choose an option to continue with Basha Lagbe.
          </p>

          <div className="role-cards">
            <button
              className="role-card role-card-seeker"
              onClick={() =>
                navigate("/register", { state: { role: "seeker" } })
              }
            >
              <div className="role-visual" aria-hidden="true">
                <svg className="role-icon" viewBox="0 0 24 24" fill="none">
                  <path d="m3 10 9-7 9 7" />
                  <path d="M5 9.5V21h14V9.5" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <h2>I’m Looking for a Home</h2>
              <p>Find a place that feels like home.</p>
              <span className="role-action">Continue →</span>
            </button>

            <button
              className="role-card role-card-advertiser"
              onClick={() =>
                navigate("/register", { state: { role: "advertiser" } })
              }
            >
              <div className="role-visual" aria-hidden="true">
                <svg className="role-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M4 21h16" />
                  <path d="M6 21V4h12v17" />
                  <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
                  <path d="M10 21v-3h4v3" />
                </svg>
              </div>
              <h2>I’m Listing a Property</h2>
              <p>List your property and find the right people.</p>
              <span className="role-action">Continue →</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="auth-footer">© 2026 Basha Lagbe. All rights reserved.</footer>
    </>
  );
}

export default GetStarted;
