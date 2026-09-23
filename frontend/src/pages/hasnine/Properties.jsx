import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Header from "./Header";
import Footer from "./Footer";
import "./Properties.css";

function Properties() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get("location") || "";
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosInstance.get("/properties");
        setProperties(res.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const [priceRange, setPriceRange] = useState("");
  const [bookingStatus, setBookingStatus] = useState("all");
  const categoryQuery = searchParams.get("category") || "";

  const filteredProperties = properties.filter((property) => {
    const matchesLocation = property.address?.toLowerCase().includes(locationQuery.toLowerCase()) ||
                            property.title?.toLowerCase().includes(locationQuery.toLowerCase());
                            
    const matchesCategory = categoryQuery 
      ? property.category?.toLowerCase() === categoryQuery.toLowerCase() ||
        property.type?.toLowerCase().includes(categoryQuery.toLowerCase()) || 
        property.description?.toLowerCase().includes(categoryQuery.toLowerCase()) || 
        property.title?.toLowerCase().includes(categoryQuery.toLowerCase())
      : true;

    let matchesPrice = true;
    if (priceRange === "under20k") matchesPrice = property.price < 20000;
    else if (priceRange === "20k-50k") matchesPrice = property.price >= 20000 && property.price <= 50000;
    else if (priceRange === "above50k") matchesPrice = property.price > 50000;
    
    let matchesBooking = true;
    if (bookingStatus === "available") matchesBooking = property.isBooked === false;
    else if (bookingStatus === "booked") matchesBooking = property.isBooked === true;
    
    return matchesLocation && matchesCategory && matchesPrice && matchesBooking;
  });

  const processedProperties = [...filteredProperties].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(processedProperties.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = processedProperties.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [locationQuery, categoryQuery, sortOrder, priceRange, bookingStatus]);

  if (loading) return <div><Header /><main style={{padding: '50px', textAlign: 'center'}}>Loading properties...</main><Footer /></div>;

  return (
    <>
      <Header />

      <main className="properties-page">
        <div className="properties-heading-container">
          <div className="properties-heading">
            <h1>Available Properties</h1>
            {(locationQuery || categoryQuery) && (
              <p>
                Showing {categoryQuery ? categoryQuery : 'properties'} {locationQuery ? `in ${locationQuery}` : ''}
              </p>
            )}
          </div>
          <div className="properties-controls">
            <select
              value={bookingStatus}
              onChange={(e) => setBookingStatus(e.target.value)}
              className="sort-select"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
            </select>
            
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="sort-select"
            >
              <option value="">All Prices</option>
              <option value="under20k">Under ৳20,000</option>
              <option value="20k-50k">৳20,000 - ৳50,000</option>
              <option value="above50k">Above ৳50,000</option>
            </select>

            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="sort-select"
            >
              <option value="">Sort by Price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {currentProperties.length > 0 ? (
          <>
            <div className="properties-grid">
              {currentProperties.map((property) => (
                <div
                  className="properties-card"
                  key={property._id}
                  onClick={() =>
                    navigate(`/properties/${property._id}`)
                  }
                >
                  <div className="properties-image">
                    {property.isBooked && <div className="booked-badge">Booked</div>}
                    {property.images && property.images.length > 0 ? (
                      <img src={property.images[0]} alt={property.title} />
                    ) : (
                      <div style={{width: '100%', height: '100%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8'}}>No Photo</div>
                    )}
                  </div>

                  <div className="properties-info">
                    <h2>{property.title}</h2>
                    <p className="properties-location">{property.address}</p>
                    <p className="properties-price">
                      ৳{property.price} <span>/ month</span>
                    </p>
                    <div className="properties-meta">
                      <span>{property.bedrooms} Beds</span>
                      <span>{property.bathrooms} Baths</span>
                      <span>{property.area} sq ft</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="properties-empty">
            <h2>No properties found</h2>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Properties;
