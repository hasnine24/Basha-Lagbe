import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import bashaLagbeLogo from "../../assets/basha_lagbe.png";
import { useAuthContext } from "../../contexts/AuthContext";
import FloatingSearch from "./FloatingSearch";
import "./Header.css";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // The user can retry logout; their current session remains unchanged.
    }
  };

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

            <NavLink to="/add-property">
              Add Property
            </NavLink>

            <NavLink to="/edit-property">
              Edit Property
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
              <>
                <Link className="btn-login" to="/profile">
                  Profile
                </Link>
                <button type="button" className="btn-signup" onClick={handleLogout}>
                  Logout
                </button>
              </>
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
    </>
  );
}

export default Header;
