import "./FeaturedProperties.css";

const properties = [
  {
    title: "Modern Apartment",
    location: "Uttara, Dhaka",
    price: "20,000",
    beds: 3,
    baths: 2,
    size: "1,200 sq ft",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Family Home",
    location: "Mirpur, Dhaka",
    price: "25,000",
    beds: 3,
    baths: 3,
    size: "1,500 sq ft",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cozy Apartment",
    location: "Dhanmondi, Dhaka",
    price: "18,000",
    beds: 2,
    baths: 2,
    size: "1,000 sq ft",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  },
];

function FeaturedProperties() {
  return (
    <section className="featured-section">
      <div className="section-heading">
        <h2>Featured Properties</h2>
        <p>Explore some of our latest available homes.</p>
      </div>

      <div className="property-grid">
        {properties.map((property) => (
          <div className="property-card" key={property.title}>
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