import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./FeaturedProperties.css";

function FeaturedProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosInstance.get("/properties");
        
        setProperties(res.data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch featured properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) return <div style={{padding: '50px', textAlign: 'center'}}>Loading featured properties...</div>;

  return (
    <section className="featured-section">
      <div className="section-heading">
        <h2>Featured Properties</h2>
        <p>Explore some of our latest available homes.</p>
      </div>

      <div className="property-grid">
        {properties.map((property) => (
          <div
            className="property-card"
            key={property._id}
            onClick={() =>
              navigate(`/properties/${property._id}`)
            }
          >
            <div className="property-image">
              {property.images && property.images.length > 0 ? (
                <img src={property.images[0]} alt={property.title} />
              ) : (
                <div style={{width: '100%', height: '100%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8'}}>No Photo</div>
              )}
            </div>

            <div className="property-info">
              <h3>{property.title}</h3>

              <p className="property-location">
                {property.address}
              </p>

              <p className="property-price">
                ৳{property.price}
                <span> / month</span>
              </p>

              <div className="property-meta">
                <span>{property.bedrooms} Beds</span>
                <span>{property.bathrooms} Baths</span>
                <span>{property.area} sq ft</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="featured-action">
        <a href="/properties">View All Properties</a>
      </div>
    </section>
  );
}

export default FeaturedProperties;
