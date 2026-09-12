import { useState } from "react";
import "./add_property_page.css";
import Header from "./Header";
import Footer from "./Footer";
import axiosInstance from "../../utils/axiosInstance";

export default function AddPropertyPage() {
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

  // handleInputChange updates our formData state when the user types in a text box
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get the name of the input and what the user typed
    setFormData((prev) => ({
      ...prev,          // Keep all the old data
      [name]: value     // Update only the field that changed
    }));
  };

  // handleCheckboxChange updates checkboxes like "Gas Included", "Water Included"
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      includes: {
        ...prev.includes,
        [name]: checked // Update the specific checkbox to true or false
      }
    }));
  };

  // handleImageUpload shows a preview of the images before uploading
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Store both the file object (for uploading) and the preview URL (for showing on screen)
    const newImages = files.map((file) => ({
      file: file,
      url: URL.createObjectURL(file)
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  // removeImage deletes an image from the preview list
  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // handleSubmit runs when the user clicks the "Create Property" button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading
    setLoading(true);   // Show a loading text on the button
    setMessage("");     // Clear any old messages

    try {
      // 1. Upload images to our Node.js Backend first
      const uploadedImageUrls = [];
      
      if (images.length > 0) {
        const uploadData = new FormData();
        // Loop through all selected images and append them to FormData
        for (const imgObj of images) {
          uploadData.append("images", imgObj.file);
        }

        try {
          // Send to our backend which will upload to Cloudinary
          const uploadRes = await axiosInstance.post("/properties/uploadImages", uploadData, {
            headers: { "Content-Type": "multipart/form-data" }
          });
          
          if (uploadRes.data.urls) {
            uploadedImageUrls.push(...uploadRes.data.urls);
          }
        } catch (uploadError) {
          console.error("Failed to upload images to backend", uploadError);
        }
      }

      // 2. Prepare data for our backend
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
        images: uploadedImageUrls // Send the Cloudinary URLs to our backend!
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
                  {images.map((imgObj, index) => (
                    <div className="image-preview-item" key={index}>
                      <img src={imgObj.url} alt="Property preview" />
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
                {loading ? "Adding..." : "Add Property"}
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
