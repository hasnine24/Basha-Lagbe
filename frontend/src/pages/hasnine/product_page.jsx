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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || "",
      }));
    }
  }, [user]);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    if (!property?._id) return;
    setSubmitting(true);
    setFormFeedback({ type: "", message: "" });
    try {
      await axiosInstance.post("/requests", {
        propertyId: property._id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      setFormFeedback({
        type: "success",
        message: "Your request has been sent successfully! You can track it on your Requests page.",
      });
      setFormData((prev) => ({ ...prev, message: "" }));
    } catch (err) {
      setFormFeedback({
        type: "error",
        message: err.response?.data?.error || "Failed to send request. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

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
              {user?.role === "seeker" && (property.isBooked || property.isAccepted) && (
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
                {(() => {
                  const advertiserPhone = property.advertiser?.phone || "";
                  const rawDigits = advertiserPhone.replace(/[^0-9]/g, "");
                  const waNumber = rawDigits.startsWith("0")
                    ? "88" + rawDigits
                    : rawDigits.startsWith("880")
                    ? rawDigits
                    : rawDigits;
                  const waUrl = waNumber ? `https://wa.me/${waNumber}` : "#";

                  return (
                    <>
                      <a 
                        href={waUrl} 
                        className="contact-button whatsapp" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <span className="icon">💬</span> WhatsApp Us
                      </a>
                      <a 
                        href={advertiserPhone ? `tel:${advertiserPhone}` : "#"} 
                        className="contact-button phone"
                      >
                        <span className="icon">📞</span> {advertiserPhone || "Not Available"}
                      </a>
                    </>
                  );
                })()}
              </div>
            </div>
            <div className="contact-form-box">
              <h4>Request Details</h4>
              {formFeedback.message && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "6px",
                    marginBottom: "14px",
                    fontSize: "14px",
                    backgroundColor: formFeedback.type === "success" ? "#dcfce7" : "#fee2e2",
                    color: formFeedback.type === "success" ? "#15803d" : "#b91c1c",
                    border: `1px solid ${formFeedback.type === "success" ? "#bbf7d0" : "#fecaca"}`,
                  }}
                >
                  {formFeedback.message}
                </div>
              )}
              <form className="contact-form" onSubmit={handleSendRequest}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello, I am interested in this property..."
                  ></textarea>
                </div>
                <button type="submit" className="submit-button" disabled={submitting}>
                  {submitting ? "Sending Request..." : "Send Request"}
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
