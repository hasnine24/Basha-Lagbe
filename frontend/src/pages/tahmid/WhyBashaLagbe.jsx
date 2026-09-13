import "./WhyBashaLagbe.css";

function WhyBashaLagbe() {
  return (
    <section className="why-section">
      <div className="section-heading">
        <h2>Why Basha Lagbe?</h2>
        <p>A simple way to find your next home.</p>
      </div>

      <div className="why-grid">
        <div className="why-card">
          <div className="why-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
          </div>
          <h3>Easy Search</h3>
          <p>
            Find suitable homes quickly based on your location and budget.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="m5 12 4 4 10-10" />
              <path d="M12 3a9 9 0 1 0 9 9" />
            </svg>
          </div>
          <h3>Trusted Listings</h3>
          <p>
            Explore organized property information in one convenient place.
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="6" r="2.5" />
              <circle cx="18" cy="18" r="2.5" />
              <path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" />
            </svg>
          </div>
          <h3>Simple Process</h3>
          <p>
            Search, view and connect with property owners easily.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyBashaLagbe;
