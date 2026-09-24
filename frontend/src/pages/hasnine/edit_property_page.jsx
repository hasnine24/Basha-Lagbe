import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./add_property_page.css";
import "./Properties.css";
import Header from "./Header";
import Footer from "./Footer";
import axiosInstance from "../../utils/axiosInstance";
import { useAuthContext } from "../../contexts/AuthContext";

export default function EditPropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [properties, setProperties] = useState([]);
  const [selectedId, setSelectedId] = useState(id || "");
  
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "", type: "", category: "", price: "", area: "", address: "", description: "",
    bedrooms: "", bathrooms: "", balconies: "",
    isBooked: false,
    includes: { gas: false, water: false, serviceCharge: false }
  });
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axiosInstance.get("/properties/my-properties");
        setProperties(res.data);
      } catch (err) {
        console.error("Failed to fetch properties list", err);
      }
    };
    if (!id) fetchAll(); 
  }, [id]);

  useEffect(() => {
    setSelectedId(id || "");
  }, [id]);
  useEffect(() => {
    const fetchProperty = async () => {
      if (!selectedId) return; 
      setFetching(true);       
      try {
        const res = await axiosInstance.get(`/properties/${selectedId}`);
        const data = res.data;
        
        const currentUserId = user?.id || user?._id;
        const propertyOwnerId = data.advertiser?._id || data.advertiser;

        if (
          !propertyOwnerId ||
          !currentUserId ||
          propertyOwnerId.toString() !== currentUserId.toString()
        ) {
          setMessage("You are not authorized to edit this property.");
          return;
        }

        setFormData({
          title: data.title || "",
          type: data.type || "",
          category: data.category || "",
          price: data.price || "",
          area: data.area || "",
          address: data.address || "",
          description: data.description || "",
          bedrooms: data.bedrooms || "",
          bathrooms: data.bathrooms || "",
          balconies: data.balconies || "",
          isBooked: data.isBooked || false,
          includes: {
            gas: data.includes?.gas || false,
            water: data.includes?.water || false,
            serviceCharge: data.includes?.serviceCharge || false,
          }
        });
        setMessage("");
      } catch (err) {
        setMessage("Failed to load property details");
      } finally {
        setFetching(false);
      }
    };
    fetchProperty();
  }, [selectedId]); 

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setCategory = (cat) => {
    setFormData((prev) => ({ ...prev, category: cat }));
  };

  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      includes: { ...prev.includes, [name]: checked }
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!selectedId) return setMessage("Please select a property to edit.");
    if (!formData.category) return setMessage("Please select a category.");
    
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        title: formData.title,
        type: formData.type,
        category: formData.category,
        price: Number(formData.price),
        area: Number(formData.area),
        address: formData.address,
        description: formData.description,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        balconies: Number(formData.balconies),
        isBooked: formData.isBooked,
        includes: formData.includes,
        images: [] 
      };

      await axiosInstance.put(`/properties/${selectedId}`, payload);
      setMessage("Property updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to update property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="add-property-page">
        <div className="add-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
            <h1 style={{ margin: 0 }}>Edit Property</h1>
            {!id && (
              <input 
                type="text" 
                placeholder="Search by property name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  width: '100%',
                  maxWidth: '300px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            )}
          </div>
          {message && <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da', color: message.includes('success') ? '#155724' : '#721c24', borderRadius: '4px' }}>{message}</div>}
          
          {!id && (
            <div className="form-section" style={{ marginBottom: "20px" }}>
              <label style={{ display: 'block', fontSize: '16px', fontWeight: 600, color: '#334155', marginBottom: '16px' }}>Select a Property to Edit:</label>
              <div className="properties-grid" style={{ marginTop: '20px' }}>
                {properties.filter(p => p.title?.toLowerCase().includes(searchQuery.toLowerCase())).map(property => (
                  <div
                    className="properties-card"
                    key={property._id}
                    onClick={() => {
                      setSelectedId(property._id);
                      navigate(`/edit-property/${property._id}`, { replace: true });
                    }}
                    style={{ cursor: 'pointer' }}
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
                      <h2 style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#1e293b' }}>{property.title}</h2>
                      <p className="properties-location" style={{ fontSize: '14px', color: '#64748b', margin: '0 0 16px 0' }}>{property.address}</p>
                      <p className="properties-price" style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>
                        ৳{property.price} <span style={{ fontSize: '14px', fontWeight: 400, color: '#64748b' }}>/ month</span>
                      </p>
                      <div className="properties-meta" style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                        <span>{property.bedrooms} Beds</span>
                        <span>{property.bathrooms} Baths</span>
                        <span>{property.area} sq ft</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {fetching && <p>Loading property details...</p>}

          {selectedId && !fetching && (
            <form onSubmit={handleSubmit}>
              
              <div className="form-section category-section" style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                  Category
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {["Family", "Bachelor", "Office", "Sublet", "Hostel", "Shop"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      style={{
                        padding: '8px 20px',
                        borderRadius: '20px',
                        border: formData.category === cat ? '1px solid #2563eb' : '1px solid #cbd5e1',
                        backgroundColor: formData.category === cat ? '#2563eb' : '#fff',
                        color: formData.category === cat ? '#fff' : '#475569',
                        fontSize: '15px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontWeight: formData.category === cat ? 500 : 400
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Basic Details Section */}
              <div className="form-section">
                <h2>Basic Details</h2>
                <div className="grid-2">
                  <div>
                    <label>Property Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label>Property Type</label>
                    <select name="type" value={formData.type} onChange={handleInputChange} required>
                      <option value="">Select Type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  <div>
                    <label>Price (BDT)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label>Area (sq ft)</label>
                    <input type="number" name="area" value={formData.area} onChange={handleInputChange} required />
                  </div>
                  <div className="full">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div className="full">
                    <label>Description</label>
                    <textarea rows="4" name="description" value={formData.description} onChange={handleInputChange} required></textarea>
                  </div>
                </div>
              </div>

              {}
              <div className="form-section">
                <h2>Features & Amenities</h2>
                <div className="grid-3">
                  <div><label>Bedrooms</label><input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} required /></div>
                  <div><label>Bathrooms</label><input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} required /></div>
                  <div><label>Balconies</label><input type="number" name="balconies" value={formData.balconies} onChange={handleInputChange} required /></div>
                </div>
                
                <div className="price-includes" style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ marginTop: 0, color: '#334155', fontSize: '15px' }}>Booking Status</h3>
                  <div className="switch-row">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: formData.isBooked ? '#dc2626' : '#16a34a' }}>
                      <input 
                        type="checkbox" 
                        name="isBooked" 
                        checked={formData.isBooked} 
                        onChange={(e) => setFormData(prev => ({ ...prev, isBooked: e.target.checked }))} 
                        style={{ width: '18px', height: '18px' }}
                      /> 
                      {formData.isBooked ? "Currently Booked" : "Available"}
                    </label>
                  </div>
                </div>
                
                <div className="price-includes">
                  <h3>Price Includes</h3>
                  <div className="switch-row">
                    <label><input type="checkbox" name="gas" checked={formData.includes.gas} onChange={handleCheckboxChange} /> Gas Bill Included</label>
                  </div>
                  <div className="switch-row">
                    <label><input type="checkbox" name="water" checked={formData.includes.water} onChange={handleCheckboxChange} /> Water Bill Included</label>
                  </div>
                  <div className="switch-row">
                    <label><input type="checkbox" name="serviceCharge" checked={formData.includes.serviceCharge} onChange={handleCheckboxChange} /> Service Charge Included</label>
                  </div>
                </div>
              </div>
              
              <div className="buttons">
                <button type="submit" className="create-btn" disabled={loading}>
                  {loading ? "Updating..." : "Update Property"}
                </button>
                <button type="button" className="cancel-btn" onClick={() => navigate("/properties")}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
