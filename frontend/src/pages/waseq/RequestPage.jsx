import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../hasnine/Header";
import Footer from "../hasnine/Footer";
import axiosInstance from "../../utils/axiosInstance";
import { useAuthContext } from "../../contexts/AuthContext";
import "./RequestPage.css";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

function RequestPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axiosInstance.get("/requests");
        if (active) {
          setRequests(res.data || []);
        }
      } catch (err) {
        if (active) {
          if (err.response?.status === 401) {
            navigate("/login");
            return;
          }
          setError(err.response?.data?.error || "Failed to load requests.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchRequests();

    return () => {
      active = false;
    };
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      setActionLoading(id);
      await axiosInstance.delete(`/requests/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete request");
    } finally {
      setActionLoading(null);
    }
  };

  const handleAccept = async (id) => {
    try {
      setActionLoading(id);
      await axiosInstance.patch(`/requests/${id}/accept`);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "accepted" } : r))
      );
    } catch (err) {
      alert(err.response?.data?.error || "Failed to accept request");
    } finally {
      setActionLoading(null);
    }
  };

  const isAdvertiser = user?.role === "advertiser";

  return (
    <>
      <Header />

      <main className="request-page">
        <div className="request-header">
          <h1>{isAdvertiser ? "Request Page" : "My Requests"}</h1>
          <p>
            {isAdvertiser
              ? "Rental requests submitted by interested renters for your properties."
              : "Rental requests submitted by you for properties you are interested in."}
          </p>
        </div>

        {loading ? (
          <div className="requests-loading">
            <p>Loading requests...</p>
          </div>
        ) : error ? (
          <div className="requests-error">
            <p>{error}</p>
          </div>
        ) : requests.length > 0 ? (
          <div className="requests-list">
            {requests.map((req) => (
              <div className="request-card" key={req._id}>
                <div className="request-card-image">
                  <img
                    src={
                      (req.property?.images && req.property.images.length > 0 && req.property.images[0]) ||
                      DEFAULT_IMAGE
                    }
                    alt={req.property?.title || "Property"}
                  />
                  <span className={`request-status-badge ${req.status}`}>
                    {req.status === "accepted"
                      ? "Accepted"
                      : req.status === "rejected"
                      ? "Rejected"
                      : "Pending"}
                  </span>
                  {isAdvertiser && (
                    <button
                      type="button"
                      className="request-delete-btn"
                      onClick={() => handleDelete(req._id)}
                      disabled={actionLoading === req._id}
                      title="Delete request"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <div className="request-card-content">
                  <h2 className="request-property-title">
                    {req.property?._id ? (
                      <Link
                        to={`/properties/${req.property._id}`}
                        className="property-title-link"
                      >
                        {req.property.title}
                      </Link>
                    ) : (
                      req.property?.title || "Property"
                    )}
                  </h2>

                  <p className="request-location">
                    📍 {req.property?.address || "Dhaka, Bangladesh"}
                  </p>

                  {req.property?.price && (
                    <p className="request-price">
                      ৳{Number(req.property.price).toLocaleString()}{" "}
                      <span>/ month</span>
                    </p>
                  )}

                  <div className="request-details">
                    {isAdvertiser ? (
                      <>
                        <div className="request-row">
                          <span className="request-label">Renter:</span>
                          <span className="request-value">{req.renterName}</span>
                        </div>

                        <div className="request-row">
                          <span className="request-label">Email:</span>
                          <a href={`mailto:${req.email}`} className="request-email">
                            {req.email}
                          </a>
                        </div>

                        {req.phone && (
                          <div className="request-row">
                            <span className="request-label">Phone:</span>
                            <a href={`tel:${req.phone}`} className="request-phone-link">
                              {req.phone}
                            </a>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="request-row">
                          <span className="request-label">Advertiser:</span>
                          <span className="request-value">
                            {req.advertiser?.name || "Property Owner"}
                          </span>
                        </div>

                        <div className="request-row">
                          <span className="request-label">Email:</span>
                          <a
                            href={`mailto:${req.advertiser?.email}`}
                            className="request-email"
                          >
                            {req.advertiser?.email || "N/A"}
                          </a>
                        </div>

                        {req.advertiser?.phone && (
                          <div className="request-row">
                            <span className="request-label">Phone:</span>
                            <a
                              href={`tel:${req.advertiser?.phone}`}
                              className="request-phone-link"
                            >
                              {req.advertiser?.phone}
                            </a>
                          </div>
                        )}
                      </>
                    )}

                    {req.message && (
                      <div className="request-message-box">
                        <span className="request-label">Message:</span>
                        <p className="request-message-content">{req.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="request-card-footer">
                    {isAdvertiser ? (
                      req.status === "pending" ? (
                        <button
                          type="button"
                          className="request-accept-btn"
                          onClick={() => handleAccept(req._id)}
                          disabled={actionLoading === req._id}
                        >
                          {actionLoading === req._id ? "Accepting..." : "Accept Request"}
                        </button>
                      ) : (
                        <span className="request-status-note">
                          {req.status === "accepted"
                            ? "✓ Request Accepted"
                            : "Request Rejected"}
                        </span>
                      )
                    ) : (
                      <button
                        type="button"
                        className="request-cancel-btn"
                        onClick={() => handleDelete(req._id)}
                        disabled={actionLoading === req._id}
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="requests-empty">
            <h2>
              {isAdvertiser
                ? "No requests received yet."
                : "No requests submitted yet."}
            </h2>
            <p>
              {isAdvertiser
                ? "When renters submit inquiries on your properties, they will appear here."
                : "Browse available properties and send a request to get started."}
            </p>
            {!isAdvertiser && (
              <button
                type="button"
                className="browse-properties-btn"
                onClick={() => navigate("/properties")}
              >
                Browse Properties
              </button>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default RequestPage;
