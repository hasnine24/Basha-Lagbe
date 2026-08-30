import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { properties } from "../components/home/FeaturedProperties";
import "./Properties.css";

function Properties() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get("location") || "";

  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(locationQuery.toLowerCase())
  );

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
                key={property.id}
                onClick={() =>
                  navigate(`/properties/${property.id}`, {
                    state: { propertyData: property },
                  })
                }
              >
                <div className="properties-image">
                  <img src={property.image} alt={property.title} />
                </div>

                <div className="properties-info">
                  <h2>{property.title}</h2>
                  <p className="properties-location">{property.location}</p>
                  <p className="properties-price">
                    ৳{property.price} <span>/ month</span>
                  </p>
                  <div className="properties-meta">
                    <span>{property.beds} Beds</span>
                    <span>{property.baths} Baths</span>
                    <span>{property.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="properties-empty">
            <h2>No properties found</h2>
            <p>Try searching for another location.</p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Properties;
