import "./product_details.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const defaultProperty = {
  title: "Shanta Aronno 7A",
  price: "400,000",
  address: "Baridhara Diplomatic Zone, Dhaka 1212",
  id: "RT 1001489",
  images: [
    "https://rents.sgp1.digitaloceanspaces.com/rents/property/2026/08/818f6861-6662-404d-ac44-db5f746ad0f7-qC1vMk.webp",
    "https://rents.sgp1.digitaloceanspaces.com/rents/property/2026/08/8cd135dd-b39f-4fec-8738-2863b1c95f3c-Udcd6Y.webp",
    "https://rents.sgp1.digitaloceanspaces.com/rents/property/2026/08/b593ff33-1a5f-4622-a665-5dfe5accc29a-9L6ROr.webp",
    "https://rents.sgp1.digitaloceanspaces.com/rents/property/2026/08/69aa2635-23ae-4825-9dc1-f86b0a09a644-yKLsch.webp",
  ],
  highlights: [
    ["3", "Bedrooms"],
    ["4", "Bathrooms"],
    ["2", "Parking"],
    ["3,900", "sq ft"],
    ["2023", "Built"],
  ],
  details: [
    ["Property Size", "3900"],
    ["Bed", "3"],
    ["Bath", "4"],
    ["Num Of Balcony", "3"],
    ["Parking", "2"],
    ["Lift", "2"],
    ["Floor", "7"],
    ["Unit", "7A"],
    ["Unit Per Floor", "1"],
    ["Total Units", "8"],
    ["Price", "400000"],
    ["Service Charge", "At actual"],
    ["Year Built", "2023"],
    ["Garage Size", "240 sq ft"],
    ["Property Type", "Residential Apartment / Luxury Apartment"],
    ["Property Purpose", "For Rent"],
    ["Interior", "Semi Furnished"],
    ["Building Registration Type", "Residential"],
    ["House Rules", "Basic"],
    ["Front Road Size", "24"],
    ["Common Area", "250 sq ft"],
    ["Nearby Landmark", "Road 8"],
    ["Preferred Tenant", "Foreigner"],
    ["Gas", "L.P.G"],
    ["Servant Room", "yes"],
    ["Servant Washroom", "yes"],
    ["Apartment Facing", "West"],
    ["Property ID", "RT 1001489"],
  ],
};

const getIcon = (label) => {
  switch (label) {
    case 'Bedrooms':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/></svg>;
    case 'Bathrooms':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path><line x1="10" y1="5" x2="8" y2="7"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="7" y1="19" x2="7" y2="21"></line><line x1="17" y1="19" x2="17" y2="21"></line></svg>;
    case 'Parking':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>;
    case 'sq ft':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 3v18"></path><path d="M15 3v18"></path><path d="M3 9h18"></path><path d="M3 15h18"></path></svg>;
    case 'Built':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
    default:
      return null;
  }
};

function ProductPage({ propertyData }) {
  // Use passed dynamic property if available, otherwise fallback to the default property data
  const property = propertyData || defaultProperty;

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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', color: 'var(--green)'}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
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
            <div key={image} className="img-wrapper">
              <img src={image} alt={`Property view ${index + 1}`} />
            </div>
          ))}
        </section>

        <section className="overview-section">
          <div className="overview-head">
            <h3 className="section-title-rents">Overview</h3>
            <p className="property-id-text">Property Id: {property.id}</p>
          </div>
          <hr className="rents-hr" />
          <div className="overview-summary">
            <div className="property-type-highlight">
              <strong>Residential Apartment / Luxury Apartment</strong>
              <p>Property Type</p>
            </div>
            <div className="facts-card rents-style">
              {property.highlights.map(([value, label]) => (
                <div className="fact" key={label}>
                  <span className="fact-icon">{getIcon(label)}</span>
                  <div>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

        <hr className="rents-hr" />
        <section className="contact-section" id="contact">
          <div className="contact-content">
            <h3 className="section-title-rents">Schedule a Tour</h3>
            <p className="rents-footer-text">
              Want to visit this property for rent? Just WhatsApp us this property link or fill out the form to share your convenient viewing schedule.
            </p>
            <div className="contact-actions">
              <a href="https://wa.me/8801616191191" className="contact-button whatsapp">
                <span className="icon">💬</span> WhatsApp Us
              </a>
              <a href="tel:+8801616191191" className="contact-button phone">
                <span className="icon">📞</span> +880 1616 191 191
              </a>
            </div>
          </div>
          <div className="contact-form-box">
            <h4>Request Details</h4>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message (Optional)</label>
                <textarea id="message" rows="3" placeholder="Hello, I am interested in..."></textarea>
              </div>
              <button type="submit" className="submit-button">Send Request</button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProductPage;