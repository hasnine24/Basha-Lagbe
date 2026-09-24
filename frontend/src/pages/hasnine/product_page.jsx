import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./product_details.css";
import Header from "./Header";
import Footer from "./Footer";
import { useAuthContext } from "../../contexts/AuthContext";

function ProductPage() {
  const { id } = useParams(); 
  const { user } = useAuthContext();
  
  const [property, setProperty] = useState(null);       
  const [loading, setLoading] = useState(true);         
  const [error, setError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosInstance.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error("Failed to fetch property details", err);
        setError(err.message || "Failed to load property");
      } finally {
        setLoading(false); 
      }
    };
    
    fetchProperty();
  }, [id]); 

  const handlePrev = (e) => {
    e.stopPropagation(); 
    if (!property?.images?.length) return;
    
    setSelectedIndex((prev) =>
      prev > 0 ? prev - 1 : property.images.length - 1
    );
  };

  
  const handleNext = (e) => {
    e.stopPropagation(); 
    if (!property?.images?.length) return;
    
    setSelectedIndex((prev) =>
      prev < property.images.length - 1 ? prev + 1 : 0
    );
  };

  
  if (loading) return <div><Header /><main style={{padding: '50px', textAlign: 'center'}}>Loading property...</main><Footer /></div>;
  if (error) return <div><Header /><main style={{padding: '50px', textAlign: 'center', color: 'red'}}>Error: {error}</main><Footer /></div>;
  if (!property) return <div><Header /><main style={{padding: '50px', textAlign: 'center'}}>Property not found</main><Footer /></div>;

  
  const images = property.images?.length > 0 ? property.images : [];
  const safeProperty = { ...property, images };

  
  
  const details = [
    ["Property Size", `${property.area} sq ft`],
    ["Bed", property.bedrooms],
    ["Bath", property.bathrooms],
    ["Balconies", property.balconies],
    ["Price", property.price],
    ["Property Type", property.type],
    ["Gas Included", property.includes?.gas ? "Yes" : "No"],
    ["Water Included", property.includes?.water ? "Yes" : "No"],
    ["Service Charge", property.includes?.serviceCharge ? "Yes" : "No"],
    ["Description", property.description],
  ];
  return (
    <div className="layout" id="top">
      <Header />

      <main className="content-container">
        <section className="property-intro-modern">
          <div className="intro-main">
            <h1 className="intro-title">{property.title}</h1>
            <div className="intro-tags">
              {property.isBooked && (
                <span className="tag" style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none' }}>Booked</span>
              )}
              <span className="tag purpose-tag">{property.category || property.type || "Property"}</span>
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

        {safeProperty.images.length > 0 && (
          <section className="gallery" aria-label="Property photos">
            {safeProperty.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="img-wrapper"
                onClick={() => setSelectedIndex(index)}
              >
                <img src={image} alt={`Property view ${index + 1}`} />
              </div>
            ))}
          </section>
        )}

        <section className="description-section" id="details">
          <h3 className="section-title-rents">Description</h3>
          <div className="details-grid-rents">
            {details.map(([label, value]) => (
              <div className="detail-row-rents" key={label}>
                <span className="detail-label">{label}:</span>
                <span className="detail-value">{value}</span>
              </div>
            ))}
          </div>
        </section>
        {user?.role === 'seeker' && (
          <section className="contact-section" id="contact">
            <div className="contact-content">
              <h3 className="section-title-rents">Schedule a Tour</h3>
              <p className="rents-footer-text">
                Want to visit this property for rent? Just WhatsApp us this
                property link or fill out the form to share your convenient
                viewing schedule.
              </p>
              <div className="contact-actions">
                <a 
                  href={`https://wa.me/${property.advertiser?.phone?.replace(/[^0-9]/g, '') || '8801234567891'}`} 
                  className="contact-button whatsapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span className="icon">💬</span> WhatsApp Us
                </a>
                <a 
                  href={`tel:${property.advertiser?.phone || '+8801234567891'}`} 
                  className="contact-button phone"
                >
                  <span className="icon">📞</span> {property.advertiser?.phone || '+8801234567891'}
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
        )}
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
              src={safeProperty.images[selectedIndex]}
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
