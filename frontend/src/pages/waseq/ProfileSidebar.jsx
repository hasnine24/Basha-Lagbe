import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import "./ProfileSidebar.css";

function ProfileSidebar({ isOpen, onClose }) {
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch {
      
    }
  };

  return (
    <>
      {isOpen && (
        <div className="profile-overlay" onClick={onClose}></div>
      )}
      <div className={`profile-sidebar ${isOpen ? "open" : ""}`}>
        <div className="profile-sidebar-header">
          <h2>My Profile</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {user ? (
          <div className="profile-sidebar-content">
            <div className="user-details">
              <div className="user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <div className={`profile-role-card ${user.role}`}>
                <span className="profile-role-icon" aria-hidden="true">
                  {user.role === "seeker" ? (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="m3 10 9-7 9 7" />
                      <path d="M5 9.5V21h14V9.5" />
                      <path d="M9 21v-6h6v6" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M4 21h16" />
                      <path d="M6 21V4h12v17" />
                      <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
                      <path d="M10 21v-3h4v3" />
                    </svg>
                  )}
                </span>
                <span className="profile-role-copy">
                  <span className="profile-role-caption">Account type</span>
                  <strong>
                    {user.role === "seeker"
                      ? "Home Seeker"
                      : user.role === "admin"
                        ? "Admin"
                        : "Property Advertiser"}
                  </strong>
                </span>
              </div>
            </div>

            <nav className="profile-sidebar-nav">
              {user.role === "admin" && (
                <Link to="/admin" onClick={onClose}>Admin Dashboard</Link>
              )}
              {user.role === "advertiser" && (
                <>
                  <Link to="/add-property" onClick={onClose}>Add Property</Link>
                  <Link to="/edit-property" onClick={onClose}>Edit Property</Link>
                  <Link to="/my-properties" onClick={onClose}>My Properties</Link>
                </>
              )}
              {user.role !== "admin" && (
                <Link to="/requests" onClick={onClose}>Requests</Link>
              )}
              <button type="button" onClick={handleLogout}>Logout</button>
            </nav>
          </div>
        ) : (
          <div className="profile-sidebar-content">
            <p>Please log in to view your profile.</p>
            <Link to="/login" className="sidebar-login-btn" onClick={onClose}>Login</Link>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileSidebar;
