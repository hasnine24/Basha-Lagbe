import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../hasnine/Header";
import Footer from "../hasnine/Footer";
import axiosInstance from "../../utils/axiosInstance";
import { useAuthContext } from "../../contexts/AuthContext";
import "../hasnine/add_property_page.css";

export default function EditPropertyPage() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    category: "",
    price: "",
    area: "",
    address: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    isBooked: false,
    includes: {
      gas: false,
      water: false,
      serviceCharge: false,
    },
  });

  const [pageLoading, setPageLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [accessError, setAccessError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchProperty = async () => {
      try {
        setPageLoading(true);
        setAccessError("");
        const response = await axiosInstance.get(`/properties/${id}`);
        const data = response.data;

        if (!active) return;

        const currentUserId = user?.id || user?._id;
        const propertyOwnerId = data.owner?._id || data.owner;

        if (
          propertyOwnerId &&
          currentUserId &&
          propertyOwnerId.toString() !== currentUserId.toString()
        ) {
          setAccessError("You are not authorized to edit this property.");
          return;
        }

        setFormData({
          title: data.title || "",
          type: data.type || "",
          category: data.category || "",
          price: data.price !== undefined ? String(data.price) : "",
          area: data.area !== undefined ? String(data.area) : "",
          address: data.address || "",
          description: data.description || "",
          bedrooms: data.bedrooms !== undefined ? String(data.bedrooms) : "",
          bathrooms: data.bathrooms !== undefined ? String(data.bathrooms) : "",
          balconies: data.balconies !== undefined ? String(data.balconies) : "",
          isBooked: data.isBooked || false,
          includes: {
            gas: Boolean(data.includes?.gas),
            water: Boolean(data.includes?.water),
            serviceCharge: Boolean(data.includes?.serviceCharge),
          },
        });
        setImages(data.images || []);
      } catch (err) {
        if (!active) return;
        if (err.response?.status === 404) {
          setAccessError("Property not found.");
        } else {
          setAccessError("Failed to load property details. Please try again.");
        }
      } finally {
        if (active) {
          setPageLoading(false);
        }
      }
    };

    fetchProperty();

    return () => {
      active = false;
    };
  }, [id, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setCategory = (cat) => {
    setFormData((prev) => ({
      ...prev,
      category: cat,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      includes: {
        ...prev.includes,
        [name]: checked,
      },
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
      navigate("/login");
      return;
    }
    
    if (!formData.category) {
      setMessage("Please select a category.");
      return;
    }

    setSubmitting(true);
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
        images: images,
      };

      await axiosInstance.put(`/properties/${id}`, payload);
      navigate("/my-properties");
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
        return;
      }
      if (error.response?.status === 403) {
        setMessage("You are not authorized to edit this property.");
        return;
      }
      console.error(error);
      setMessage(
        error.response?.data?.message || "Failed to update property. Please check all fields."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="add-property-page">
        <div className="add-container">
          {pageLoading ? (
            <p style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
              Loading property details...
            </p>
          ) : accessError ? (
            <div
              style={{
                padding: "24px",
                backgroundColor: "#f8d7da",
                color: "#721c24",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginBottom: "12px" }}>{accessError}</h3>
              <button
                type="button"
                className="cancel-btn"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/my-properties")}
              >
                Back to My Properties
              </button>
            </div>
          ) : (
            <>
              <h1>Edit Property</h1>
              {message && (
                <div
                  style={{
                    padding: "10px",
                    marginBottom: "15px",
                    backgroundColor: message.includes("success") ? "#d4edda" : "#f8d7da",
                    color: message.includes("success") ? "#155724" : "#721c24",
                    borderRadius: "4px",
                  }}
                >
                  {message}
                </div>
              )}
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
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                      >
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

                {}
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
                      <label>
                        <input
                          type="checkbox"
                          name="gas"
                          checked={formData.includes.gas}
                          onChange={handleCheckboxChange}
                        />{" "}
                        Gas Bill Included
                      </label>
                    </div>
                    <div className="switch-row">
                      <label>
                        <input
                          type="checkbox"
                          name="water"
                          checked={formData.includes.water}
                          onChange={handleCheckboxChange}
                        />{" "}
                        Water Bill Included
                      </label>
                    </div>
                    <div className="switch-row">
                      <label>
                        <input
                          type="checkbox"
                          name="serviceCharge"
                          checked={formData.includes.serviceCharge}
                          onChange={handleCheckboxChange}
                        />{" "}
                        Service Charge Included
                      </label>
                    </div>
                  </div>
                </div>

                {}
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
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="buttons">
                  <button type="submit" className="create-btn" disabled={submitting}>
                    {submitting ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => navigate("/my-properties")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
