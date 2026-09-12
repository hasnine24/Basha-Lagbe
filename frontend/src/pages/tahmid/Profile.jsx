import { useNavigate } from "react-router-dom";
import Header from "../hasnine/Header";
import Footer from "../hasnine/Footer";
import { useAuthContext } from "../../contexts/AuthContext";
import "./Profile.css";

function Profile() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Keep the profile visible if the server could not clear the cookie.
    }
  };

  return (
    <>
      <Header />

      <main className="profile-page">
        <div className="profile-card">
          <h1>My Profile</h1>

          <div className="profile-info">
            <div>
              <span>Name</span>
              <strong>{user.name}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>{user.phone}</strong>
            </div>
          </div>

          <div className="profile-actions">
            <button type="button" className="logout-button" onClick={handleLogout}>
              Logout
            </button>

            <button
              type="button"
              className="my-properties-button"
              onClick={() => navigate("/my-properties")}
            >
              My Properties
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Profile;
