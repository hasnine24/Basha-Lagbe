import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Header from "../hasnine/Header";
import Footer from "../hasnine/Footer";
import "./Properties.css";

function Properties() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get("location") || "";
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosInstance.get("/properties");
        setProperties(res.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) =>
    property.address?.toLowerCase().includes(locationQuery.toLowerCase()) ||
    property.title?.toLowerCase().includes(locationQuery.toLowerCase())
  );

  if (loading) return <div><Header /><main style={{padding: '50px', textAlign: 'center'}}>Loading properties...</main><Footer /></div>;

  return (
    <>
      <Header />

      <main className="properties-page">
        <div className="properties-heading">
          <h1>Available Properties</h1>
          {locationQuery && (
            <p>Showing properties in {locationQuery}</p>
          )}
        </div>

        {filteredProperties.length > 0 ? (
          <div className="properties-grid">
            {filteredProperties.map((property) => (
              <div
                className="properties-card"
                key={property._id}
                onClick={() =>
                  navigate(`/properties/${property._id}`)
                }
              >
                <div className="properties-image">
                  {property.images && property.images.length > 0 ? (
                    <img src={property.images[0]} alt={property.title} />
                  ) : (
                    <div style={{width: '100%', height: '100%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8'}}>No Photo</div>
                  )}
                </div>

                <div className="properties-info">
                  <h2>{property.title}</h2>
                  <p className="properties-location">{property.address}</p>
                  <p className="properties-price">
                    ৳{property.price} <span>/ month</span>
                  </p>
                  <div className="properties-meta">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>{property.area} sq ft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="properties-empty">
            <h2>No properties found</h2>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Properties;
