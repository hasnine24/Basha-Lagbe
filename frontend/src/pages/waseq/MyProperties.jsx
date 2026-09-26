import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../hasnine/Header";
import Footer from "../hasnine/Footer";
import axiosInstance from "../../utils/axiosInstance";
import "./MyProperties.css";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDeleteProperty = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this property advertisement? It will be deleted from everywhere."
      )
    ) {
      return;
    }
    try {
      await axiosInstance.delete(`/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete property.");
    }
  };

  useEffect(() => {
    let active = true;

    const fetchMyProperties = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axiosInstance.get("/properties/my-properties");
        if (active) {
          setProperties(response.data || []);
        }
      } catch (err) {
        if (active) {
          if (err.response?.status === 401) {
            navigate("/login");
            return;
          }
          setError(
            err.response?.data?.message || "Failed to load your properties. Please try again."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchMyProperties();

    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <>
      <Header />

      <main className="my-properties-page">
        <div className="my-properties-header">
          <div>
            <h1>My Properties</h1>
          </div>
        </div>

        {loading ? (
          <div className="my-properties-loading">
            <p>Loading your properties...</p>
          </div>
        ) : properties.length > 0 ? (
          <div className="my-properties-grid">
            {properties.map((property) => {
              const imageSrc =
                (property.images && property.images.length > 0 && property.images[0]) ||
                property.image ||
                DEFAULT_IMAGE;

              return (
                <div
                  className="my-properties-card"
                  key={property._id}
                  onClick={() => navigate(`/properties/${property._id}`, {
                    state: { propertyData: property },
                  })}
                >
                  <div className="my-properties-image">
                    <img src={imageSrc} alt={property.title} />
                  </div>

                  <div className="my-properties-info">
                    <h2>{property.title}</h2>
                    <p className="my-properties-price">
                      ৳{Number(property.price).toLocaleString()} <span>/ month</span>
                    </p>
                    <p className="my-properties-location">
                      📍 {property.address || property.location || "Dhaka, Bangladesh"}
                    </p>

                    <div className="my-properties-meta-row">
                      <div className="my-properties-meta">
                        <span>{property.bedrooms || 0} Beds</span>
                        <span>{property.bathrooms || 0} Baths</span>
                        <span>{property.area || 0} sq ft</span>
                      </div>
                      <button
                        type="button"
                        className="my-properties-delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProperty(property._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="my-properties-empty">
            <h2>You haven't listed any properties yet.</h2>
            <p>Start by adding your first property to Basha Lagbe.</p>
            <button
              type="button"
              className="my-properties-add-btn"
              onClick={() => navigate("/add-property")}
            >
              Add Property
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default MyProperties;
