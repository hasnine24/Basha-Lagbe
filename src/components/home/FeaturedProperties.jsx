import { useNavigate } from "react-router-dom";
import "./FeaturedProperties.css";

// Shared with the listing page; this module still exports the component below.
// eslint-disable-next-line react-refresh/only-export-components
export const properties = [
  {
    title: "Modern Apartment",
    location: "Uttara, Dhaka",
    address: "Uttara, Dhaka",
    price: "20,000",
    id: "BL-1001",
    beds: 3,
    baths: 2,
    size: "1,200 sq ft",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
    ],
    highlights: [
      ["3", "Bedrooms"],
      ["2", "Bathrooms"],
      ["1", "Parking"],
      ["1,200", "sq ft"],
      ["2022", "Built"],
    ],
    details: [
      ["Property Size", "1200 sq ft"],
      ["Bed", "3"],
      ["Bath", "2"],
      ["Parking", "1"],
      ["Year Built", "2022"],
      ["Property Type", "Residential Apartment"],
      ["Property Purpose", "For Rent"],
      ["Property ID", "BL-1001"],
    ],
  },
  {
    title: "Family Home",
    location: "Mirpur, Dhaka",
    address: "Mirpur, Dhaka",
    price: "25,000",
    id: "BL-1002",
    beds: 3,
    baths: 3,
    size: "1,500 sq ft",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80",
    ],
    highlights: [
      ["3", "Bedrooms"],
      ["3", "Bathrooms"],
      ["1", "Parking"],
      ["1,500", "sq ft"],
      ["2021", "Built"],
    ],
    details: [
      ["Property Size", "1500 sq ft"],
      ["Bed", "3"],
      ["Bath", "3"],
      ["Parking", "1"],
      ["Year Built", "2021"],
      ["Property Type", "Residential House"],
      ["Property Purpose", "For Rent"],
      ["Property ID", "BL-1002"],
    ],
  },
  {
    title: "Cozy Apartment",
    location: "Dhanmondi, Dhaka",
    address: "Dhanmondi, Dhaka",
    price: "18,000",
    id: "BL-1003",
    beds: 2,
    baths: 2,
    size: "1,000 sq ft",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
    ],
    highlights: [
      ["2", "Bedrooms"],
      ["2", "Bathrooms"],
      ["1", "Parking"],
      ["1,000", "sq ft"],
      ["2023", "Built"],
    ],
    details: [
      ["Property Size", "1000 sq ft"],
      ["Bed", "2"],
      ["Bath", "2"],
      ["Parking", "1"],
      ["Year Built", "2023"],
      ["Property Type", "Residential Apartment"],
      ["Property Purpose", "For Rent"],
      ["Property ID", "BL-1003"],
    ],
  },
];

function FeaturedProperties() {
  const navigate = useNavigate();

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
            key={property.id}
            onClick={() =>
              navigate(`/properties/${property.id}`, {
                state: { propertyData: property },
              })
            }
          >
            <div className="property-image">
              <img src={property.image} alt={property.title} />
            </div>

            <div className="property-info">
              <h3>{property.title}</h3>

              <p className="property-location">
                {property.location}
              </p>

              <p className="property-price">
                ৳{property.price}
                <span> / month</span>
              </p>

              <div className="property-meta">
                <span>{property.beds} Beds</span>
                <span>{property.baths} Baths</span>
                <span>{property.size}</span>
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
