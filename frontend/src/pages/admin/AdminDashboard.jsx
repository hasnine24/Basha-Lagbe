import { useCallback, useEffect, useState } from "react";
import Header from "../hasnine/Header";
import Footer from "../hasnine/Footer";
import axiosInstance from "../../utils/axiosInstance";
import { useToast } from "../tahmid/Toast";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, properties: 0, requests: 0 });
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { showSuccess, showError } = useToast();

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [statsResponse, usersResponse, propertiesResponse, requestsResponse] =
        await Promise.all([
          axiosInstance.get("/admin/stats"),
          axiosInstance.get("/admin/users"),
          axiosInstance.get("/admin/properties"),
          axiosInstance.get("/admin/requests"),
        ]);

      setStats(statsResponse.data);
      setUsers(usersResponse.data);
      setProperties(propertiesResponse.data);
      setRequests(requestsResponse.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(fetchDashboard);
  }, [fetchDashboard]);

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Delete ${user.name}'s account? This also removes their properties and requests.`)) {
      return;
    }

    try {
      await axiosInstance.delete(`/admin/users/${user._id}`);
      await fetchDashboard();
      showSuccess("User deleted successfully.");
    } catch (err) {
      showError(err.response?.data?.error || "Failed to delete user.");
    }
  };

  const handleDeleteProperty = async (property) => {
    if (!window.confirm(`Delete ${property.title}? This also removes its requests.`)) {
      return;
    }

    try {
      await axiosInstance.delete(`/admin/properties/${property._id}`);
      await fetchDashboard();
      showSuccess("Property deleted successfully.");
    } catch (err) {
      showError(err.response?.data?.error || "Failed to delete property.");
    }
  };

  return (
    <>
      <Header />
      <main className="admin-page">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage Basha Lagbe users, properties, and requests.</p>
          </div>
        </div>

        {loading ? (
          <p className="admin-state">Loading dashboard...</p>
        ) : error ? (
          <p className="admin-state admin-error">{error}</p>
        ) : (
          <>
            <section className="admin-stats" aria-label="Dashboard statistics">
              <div className="admin-stat-card">
                <span>Total Users</span>
                <strong>{stats.users}</strong>
              </div>
              <div className="admin-stat-card">
                <span>Total Properties</span>
                <strong>{stats.properties}</strong>
              </div>
              <div className="admin-stat-card">
                <span>Total Requests</span>
                <strong>{stats.requests}</strong>
              </div>
            </section>

            <section className="admin-section">
              <h2>Users</h2>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td className="admin-role">{user.role}</td>
                        <td>
                          <button
                            type="button"
                            className="admin-delete-button"
                            onClick={() => handleDeleteUser(user)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.length === 0 && <p className="admin-empty">No users found.</p>}
              </div>
            </section>

            <section className="admin-section">
              <h2>Properties</h2>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Address</th>
                      <th>Price</th>
                      <th>Advertiser</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property) => (
                      <tr key={property._id}>
                        <td>{property.title}</td>
                        <td>{property.address}</td>
                        <td>৳{Number(property.price).toLocaleString()}</td>
                        <td>{property.advertiser?.name || "Unknown"}</td>
                        <td>
                          <button
                            type="button"
                            className="admin-delete-button"
                            onClick={() => handleDeleteProperty(property)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {properties.length === 0 && <p className="admin-empty">No properties found.</p>}
              </div>
            </section>

            <section className="admin-section">
              <h2>Requests</h2>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Seeker</th>
                      <th>Advertiser</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request._id}>
                        <td>{request.property?.title || "Deleted property"}</td>
                        <td>{request.seeker?.name || request.renterName}</td>
                        <td>{request.advertiser?.name || "Deleted user"}</td>
                        <td className={`admin-status admin-status-${request.status}`}>
                          {request.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {requests.length === 0 && <p className="admin-empty">No requests found.</p>}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default AdminDashboard;
