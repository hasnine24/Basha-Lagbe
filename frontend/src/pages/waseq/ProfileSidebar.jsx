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
      // Ignored
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
            </div>

            <nav className="profile-sidebar-nav">
              <Link to="/add-property" onClick={onClose}>Add Property</Link>
              <Link to="/edit-property" onClick={onClose}>Edit Property</Link>
              <Link to="/my-properties" onClick={onClose}>My Properties</Link>
              <Link to="/requests" onClick={onClose}>Requests</Link>
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
