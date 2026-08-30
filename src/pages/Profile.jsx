import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuthContext } from "../contexts/AuthContext";
import "./Profile.css";

function Profile() {
  const { user, logout } = useAuthContext();

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

          <button type="button" className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Profile;
