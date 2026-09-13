import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./add_property_page.css";
import Header from "./Header";
import Footer from "./Footer";
import axiosInstance from "../../utils/axiosInstance";
import { useAuthContext } from "../../contexts/AuthContext";

export default function AddPropertyPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      includes: {
        ...prev.includes,
        [name]: checked
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: "/add-property" } });
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      // In a real app, you'd upload images to a server/Cloudinary first and get URLs.
      // Here we just send the form data to the backend.
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
        images: [] // Empty for now as there is no image upload backend yet
      };

      const res = await axiosInstance.post("/properties", payload);
      setMessage("Property added successfully!");
      console.log(res.data);
      // Optional: reset form
      setFormData({
        title: "", type: "", price: "", area: "", address: "", description: "",
        bedrooms: "", bathrooms: "", balconies: "",
        includes: { gas: false, water: false, serviceCharge: false }
      });
      setImages([]);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login", { state: { from: "/add-property" } });
        return;
      }
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to add property. Please fill all fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="add-property-page">
        <div className="add-container">
          <h1>Add New Property</h1>
          {message && <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da', color: message.includes('success') ? '#155724' : '#721c24', borderRadius: '4px' }}>{message}</div>}
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
                    onChange={handleInputChange}
                    placeholder="e.g. Modern Apartment in Gulshan"
                    required
                  />
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
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    placeholder="Describe the property..."
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="form-section">
              <h2>Features & Amenities</h2>
              <div className="grid-3">
                <div>
                  <label>Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                      onChange={handleCheckboxChange}
                    /> Gas Bill Included
                  </label>
                </div>
                <div className="switch-row">
                  <label>
                    <input
                      type="checkbox"
                      name="water"
                      checked={formData.includes.water}
                      onChange={handleCheckboxChange}
                    /> Water Bill Included
                  </label>
                </div>
                <div className="switch-row">
                  <label>
                    <input
                      type="checkbox"
                      name="serviceCharge"
                      checked={formData.includes.serviceCharge}
                      onChange={handleCheckboxChange}
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
                  style={{ cursor: "pointer", color: "#60a5fa", marginBottom: 0 }}
                >
                  Click to upload <span>or drag and drop</span>
                </label>
                <p style={{ color: "#666", marginTop: "10px" }}>
                  SVG, PNG, JPG or GIF (max. 800x400px)
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
                      >✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="buttons">
              <button type="submit" className="create-btn" disabled={loading}>
                {loading ? "Creating..." : "Create Property"}
              </button>
              <button type="button" className="cancel-btn">
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
