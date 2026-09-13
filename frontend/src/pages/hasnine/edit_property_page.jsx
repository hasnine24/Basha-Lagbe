import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./add_property_page.css";
import Header from "./Header";
import Footer from "./Footer";
import axiosInstance from "../../utils/axiosInstance";

export default function EditPropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [selectedId, setSelectedId] = useState(id || "");
  
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "", type: "", price: "", area: "", address: "", description: "",
    bedrooms: "", bathrooms: "", balconies: "",
    includes: { gas: false, water: false, serviceCharge: false }
  });
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axiosInstance.get("/properties");
        setProperties(res.data);
      } catch (err) {
        console.error("Failed to fetch properties list", err);
      }
    };
    if (!id) fetchAll(); 
  }, [id]);

  
  
  useEffect(() => {
    const fetchProperty = async () => {
      if (!selectedId) return; 
      setFetching(true);       
      try {
        
        const res = await axiosInstance.get(`/properties/${selectedId}`);
        const data = res.data;
        
        
        setFormData({
          title: data.title || "",
          type: data.type || "",
          price: data.price || "",
          area: data.area || "",
          address: data.address || "",
          description: data.description || "",
          bedrooms: data.bedrooms || "",
          bathrooms: data.bathrooms || "",
          balconies: data.balconies || "",
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
    
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        title: formData.title,
        type: formData.type,
        price: Number(formData.price),
        area: Number(formData.area),
        address: formData.address,
        description: formData.description,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        balconies: Number(formData.balconies),
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
          <h1>Edit Property</h1>
          {message && <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da', color: message.includes('success') ? '#155724' : '#721c24', borderRadius: '4px' }}>{message}</div>}
          
          {!id && (
            <div className="form-section" style={{ marginBottom: "20px" }}>
              <label>Select a Property to Edit:</label>
              <select 
                value={selectedId} 
                onChange={(e) => {
                   setSelectedId(e.target.value);
                   navigate(`/edit-property/${e.target.value}`, { replace: true });
                }} 
                style={{ width: "100%", padding: "10px", marginTop: "10px" }}
              >
                <option value="">-- Choose a property --</option>
                {properties.map(p => (
                  <option key={p._id} value={p._id}>{p.title} (BDT {p.price})</option>
                ))}
              </select>
            </div>
          )}

          {fetching && <p>Loading property details...</p>}

          {selectedId && !fetching && (
            <form onSubmit={handleSubmit}>
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
