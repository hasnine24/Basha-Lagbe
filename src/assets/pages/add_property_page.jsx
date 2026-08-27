import { useState } from "react";
import "./add_property_page.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
export default function AddPropertyPage() {
  const [images, setImages] = useState([]);
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };
  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  return (
    <>
      {" "}
      <Header />{" "}
      <div className="add-property-page">
        {" "}
        <div className="add-container">
          {" "}
          <h1>Add New Property</h1>{" "}
          <form onSubmit={(e) => e.preventDefault()}>
            {" "}
            {/* Basic Details Section */}{" "}
            <div className="form-section">
              {" "}
              <h2>Basic Details</h2>{" "}
              <div className="grid-2">
                {" "}
                <div>
                  {" "}
                  <label>Property Title</label>{" "}
                  <input
                    type="text"
                    placeholder="e.g. Modern Apartment in Gulshan"
                  />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label>Property Type</label>{" "}
                  <select>
                    {" "}
                    <option>Select Type</option> <option>Apartment</option>{" "}
                    <option>House</option> <option>Commercial</option>{" "}
                  </select>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label>Price (BDT)</label>{" "}
                  <input type="number" placeholder="e.g. 25000" />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label>Area (sq ft)</label>{" "}
                  <input type="number" placeholder="e.g. 1200" />{" "}
                </div>{" "}
                <div className="full">
                  {" "}
                  <label>Address</label>{" "}
                  <input
                    type="text"
                    placeholder="Enter full property address"
                  />{" "}
                </div>{" "}
                <div className="full">
                  {" "}
                  <label>Description</label>{" "}
                  <textarea
                    rows="4"
                    placeholder="Describe the property..."
                  ></textarea>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* Features Section */}{" "}
            <div className="form-section">
              {" "}
              <h2>Features & Amenities</h2>{" "}
              <div className="grid-3">
                {" "}
                <div>
                  {" "}
                  <label>Bedrooms</label>{" "}
                  <input type="number" placeholder="0" />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label>Bathrooms</label>{" "}
                  <input type="number" placeholder="0" />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label>Balconies</label>{" "}
                  <input type="number" placeholder="0" />{" "}
                </div>{" "}
              </div>{" "}
              <div className="price-includes">
                {" "}
                <h3>Price Includes</h3>{" "}
                <div className="switch-row">
                  {" "}
                  <label>
                    <input type="checkbox" /> Gas Bill Included
                  </label>{" "}
                </div>{" "}
                <div className="switch-row">
                  {" "}
                  <label>
                    <input type="checkbox" /> Water Bill Included
                  </label>{" "}
                </div>{" "}
                <div className="switch-row">
                  {" "}
                  <label>
                    <input type="checkbox" /> Service Charge Included
                  </label>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* Media Section */}{" "}
            <div className="form-section">
              {" "}
              <h2>Media</h2> <label>Upload Property Images</label>{" "}
              <div className="upload-box">
                {" "}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="image-upload"
                />{" "}
                <label
                  htmlFor="image-upload"
                  style={{
                    cursor: "pointer",
                    color: "#60a5fa",
                    marginBottom: 0,
                  }}
                >
                  {" "}
                  Click to upload <span>or drag and drop</span>{" "}
                </label>{" "}
                <p style={{ color: "#666", marginTop: "10px" }}>
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>{" "}
              </div>{" "}
              {images.length > 0 && (
                <div className="image-preview-container">
                  {" "}
                  {images.map((img, index) => (
                    <div className="image-preview-item" key={index}>
                      <img src={img} alt="Property preview" />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => removeImage(index)}
                      >
                        {" "}
                        ✕{" "}
                      </button>{" "}
                    </div>
                  ))}{" "}
                </div>
              )}{" "}
            </div>{" "}
            <div className="buttons">
              {" "}
              <button type="submit" className="create-btn">
                Create Property
              </button>{" "}
              <button type="button" className="cancel-btn">
                Cancel
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
      <Footer />{" "}
    </>
  );
}
