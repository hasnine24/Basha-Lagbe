import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import bashaLagbeLogo from "../../assets/basha_lagbe.png";
import { useAuthContext } from "../../contexts/AuthContext";
import FloatingSearch from "./FloatingSearch";
import ProfileSidebar from "../waseq/ProfileSidebar";
import "./Header.css";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuthContext();

  return (
    <>
      <header className="site-header">
        <div className="header-wrapper">
          <Link className="header-logo" to="/">
            <img
              className="header-logo-image"
              src={bashaLagbeLogo}
              alt="Basha Lagbe"
            />

            <span className="header-brand-name">
              Basha Lagbe
            </span>
          </Link>

          <nav className="main-nav">
            <NavLink to="/" end>
              Home
            </NavLink>

            <NavLink to="/properties">
              Properties
            </NavLink>

            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                setIsSearchOpen(true);
              }}
            >
              Search
            </a>
          </nav>

          <div className="header-auth">
            {user ? (
              <button 
                type="button" 
                className="header-profile-icon-btn" 
                onClick={() => setIsProfileOpen(true)}
                aria-label="Profile"
                title="Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
            ) : (
              <>
                <Link className="btn-login" to="/login">
                  Login
                </Link>
                <Link className="btn-signup" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <FloatingSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <ProfileSidebar
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
}

export default Header;
