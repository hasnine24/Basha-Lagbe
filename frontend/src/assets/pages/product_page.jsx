import { useState } from "react";
import "./product_details.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const defaultProperty = {
  title: "Hasnine 2A",
  price: "20,000",
  address: "Hatirjhill,Mohanagar,Dhaka",
  images: [
    "https://rents.sgp1.digitaloceanspaces.com/rents/property/2026/08/818f6861-6662-404d-ac44-db5f746ad0f7-qC1vMk.webp",
    "https://rents.sgp1.digitaloceanspaces.com/rents/property/2026/08/8cd135dd-b39f-4fec-8738-2863b1c95f3c-Udcd6Y.webp",
    "https://rents.sgp1.digitaloceanspaces.com/rents/property/2026/08/b593ff33-1a5f-4622-a665-5dfe5accc29a-9L6ROr.webp",
    "https://rents.sgp1.digitaloceanspaces.com/rents/property/2026/08/69aa2635-23ae-4825-9dc1-f86b0a09a644-yKLsch.webp",
  ],
  details: [
    ["Property Size", "2500 sq ft"],
    ["Bed", "4"],
    ["Bath", "3"],
    ["Balconies", "4"],
    ["Price", "20000"],
    ["Property Type", "Apartment"],
    ["Gas Included", "Yes"],
    ["Water Included", "Yes"],
    ["Service Charge Included", "No"],
    ["Description", "Modern Apartment"],
  ],
};

function ProductPage() {
  const [property, setProperty] = useState(defaultProperty);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev > 0 ? prev - 1 : property.images.length - 1,
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev < property.images.length - 1 ? prev + 1 : 0,
    );
  };

  return (
    <div className="layout" id="top">
      <Header />

      <main className="content-container">
        <section className="property-intro-modern">
          <div className="intro-main">
            <h1 className="intro-title">{property.title}</h1>
            <div className="intro-tags">
              <span className="tag purpose-tag">For Rent (To-Let)</span>
              <span className="tag type-tag">Residential</span>
            </div>
            <p className="intro-address">
              📍
              {property.address}
            </p>
          </div>
          <div className="intro-price-formatted">
            <span className="price-currency">BDT</span>
            <span className="price-amount">{property.price}</span>
            <span className="price-period">/ month</span>
          </div>
        </section>

        <section className="gallery" aria-label="Property photos">
          {property.images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className="img-wrapper"
              onClick={() => setSelectedIndex(index)}
            >
              <img src={image} alt={`Property view ${index + 1}`} />
            </div>
          ))}
        </section>

        <section className="description-section" id="details">
          <h3 className="section-title-rents">Description</h3>
          <div className="details-grid-rents">
            {property.details.map(([label, value]) => (
              <div className="detail-row-rents" key={label}>
                <span className="detail-label">{label}:</span>
                <span className="detail-value">{value}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="contact-section" id="contact">
          <div className="contact-content">
            <h3 className="section-title-rents">Schedule a Tour</h3>
            <p className="rents-footer-text">
              Want to visit this property for rent? Just WhatsApp us this
              property link or fill out the form to share your convenient
              viewing schedule.
            </p>
            <div className="contact-actions">
              <a href="  " className="contact-button whatsapp">
                <span className="icon">💬</span> WhatsApp Us
              </a>
              <a href="  " className="contact-button phone">
                <span className="icon">📞</span> +8801234567891
              </a>
            </div>
          </div>
          <div className="contact-form-box">
            <h4>Request Details</h4>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message (Optional)</label>
                <textarea
                  id="message"
                  rows="3"
                  placeholder="Hello, I am interested in..."
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Request
              </button>
            </form>
          </div>
        </section>
      </main>

      {selectedIndex !== null && (
        <div className="image-lightbox" onClick={() => setSelectedIndex(null)}>
          <button className="nav-btn prev-btn" onClick={handlePrev}>
            &#10094;
          </button>
          <div className="lightbox-content">
            <span
              className="close-lightbox"
              onClick={() => setSelectedIndex(null)}
            >
              &times;
            </span>
            <img
              src={property.images[selectedIndex]}
              alt="Full screen property view"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <button className="nav-btn next-btn" onClick={handleNext}>
            &#10095;
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductPage;
