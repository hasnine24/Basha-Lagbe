import Header from "../hasnine/Header";
import Footer from "../hasnine/Footer";
import "./RequestPage.css";

const mockRequests = [
  {
    id: 1,
    property: "Modern Apartment",
    location: "Dhanmondi, Dhaka",
    renterName: "Waseq",
    email: "waseq@gmail.com",
    message: "I want to visit this property.",
  },
  {
    id: 2,
    property: "Family House",
    location: "Gulshan, Dhaka",
    renterName: "Hasnine",
    email: "hasnine@gmail.com",
    message: "Is this property still available?",
  },
  {
    id: 3,
    property: "Cozy Studio",
    location: "Uttara, Dhaka",
    renterName: "Tahmid",
    email: "tahmid@gmail.com",
    message: "I want to buy this house.",
  },
];

function RequestPage() {
  return (
    <>
      <Header />

      <main className="request-page">
        <div className="request-header">
          <h1>Request Page</h1>
          <p>Rental requests submitted by interested renters for your properties.</p>
        </div>

        {mockRequests.length > 0 ? (
          <div className="requests-list">
            {mockRequests.map((req) => (
              <div className="request-card" key={req.id}>
                <div className="request-card-top">
                  <h2 className="request-property-title">{req.property}</h2>
                  <p className="request-location">📍 {req.location}</p>
                </div>

                <div className="request-details">
                  <div className="request-row">
                    <span className="request-label">Renter Name:</span>
                    <span className="request-value">{req.renterName}</span>
                  </div>

                  <div className="request-row">
                    <span className="request-label">Email:</span>
                    <a href={`mailto:${req.email}`} className="request-email">
                      {req.email}
                    </a>
                  </div>

                  <div className="request-message-box">
                    <span className="request-label">Message:</span>
                    <p className="request-message-content">{req.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="requests-empty">
            <h2>No requests received yet.</h2>
            <p>When renters submit inquiries on your properties, they will appear here.</p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default RequestPage;
