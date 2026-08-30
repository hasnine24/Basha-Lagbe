import { useState } from "react";
import "./add_property_page.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";

export default function AddPropertyPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  
  // 1. Create state to hold all form data
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    price: "",
    area: "",
    address: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    includes: {
      gas: false,
      water: false,
      serviceCharge: false,
    }
  });

  // 2. Handle input changes and update state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        includes: {
          ...prev.includes,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // 3. Handle form submission (POST to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Connect to our backend API
      const response = await fetch("http://localhost:4000/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData) // Send data as JSON
      });
      
      const data = await response.json();
      
      if (response.ok) {
        navigate("/"); // Go back to home/product page
      } else {
        alert("Failed to add property: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      alert("Error connecting to the server. Make sure your backend is running!");
    }
  };

  return (
    <>
      <Header />
      <div className="add-property-page">
        <div className="add-container">
          <h1>Add New Property</h1>
          <form onSubmit={handleSubmit}>
            
            {/* Basic Details Section */}
            <div className="form-section">
              <h2>Basic Details</h2>
              <div className="grid-2">
                <div>
                  <label>Property Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Modern Apartment in Gulshan"
                    required
                  />
                </div>
                <div>
                  <label>Property Type</label>
                  <select name="type" value={formData.type} onChange={handleChange} required>
                    <option value="">Select Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label>Price (BDT)</label>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 25000" 
                    required 
                  />
                </div>
                <div>
                  <label>Area (sq ft)</label>
                  <input 
                    type="number" 
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g. 1200" 
                    required 
                  />
                </div>
                <div className="full">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter full property address"
                    required
                  />
                </div>
                <div className="full">
                  <label>Description</label>
                  <textarea
                    rows="4"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the property..."
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="form-section">
              <h2>Features</h2>
              <div className="grid-3">
                <div>
                  <label>Bedrooms</label>
                  <input 
                    type="number" 
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="0" 
                    required 
                  />
                </div>
                <div>
                  <label>Bathrooms</label>
                  <input 
                    type="number" 
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="0" 
                    required 
                  />
                </div>
                <div>
                  <label>Balconies</label>
                  <input 
                    type="number" 
                    name="balconies"
                    value={formData.balconies}
                    onChange={handleChange}
                    placeholder="0" 
                    required 
                  />
                </div>
              </div>
              <div className="price-includes">
                <h3>Price Includes</h3>
                <div className="switch-row">
                  <label>
                    <input 
                      type="checkbox" 
                      name="gas"
                      checked={formData.includes.gas}
                      onChange={handleChange}
                    /> Gas Bill Included
                  </label>
                </div>
                <div className="switch-row">
                  <label>
                    <input 
                      type="checkbox" 
                      name="water"
                      checked={formData.includes.water}
                      onChange={handleChange}
                    /> Water Bill Included
                  </label>
                </div>
                <div className="switch-row">
                  <label>
                    <input 
                      type="checkbox" 
                      name="serviceCharge"
                      checked={formData.includes.serviceCharge}
                      onChange={handleChange}
                    /> Service Charge Included
                  </label>
                </div>
              </div>
            </div>

            {/* Media Section */}
            <div className="form-section">
              <h2>Media</h2> 
              <label>Upload Property Images</label>
              <div className="upload-box">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  style={{
                    cursor: "pointer",
                    color: "#60a5fa",
                    marginBottom: 0,
                  }}
                >
                  <span>Click to upload </span>
                </label>
                <p style={{ color: "#666", marginTop: "10px" }}>
                  SVG, PNG, JPG or GIF
                </p>
              </div>
              {images.length > 0 && (
                <div className="image-preview-container">
                  {images.map((img, index) => (
                    <div className="image-preview-item" key={index}>
                      <img src={img} alt="Property preview" />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => removeImage(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="buttons">
              <button type="submit" className="create-btn">
                Create Property
              </button>
              <button type="button" className="cancel-btn" onClick={() => navigate("/")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
