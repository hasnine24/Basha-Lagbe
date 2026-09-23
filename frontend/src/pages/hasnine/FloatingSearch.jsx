import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FloatingSearch.css";

function FloatingSearch({ isOpen, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSearch = () => {
    onClose();

    const queryParams = new URLSearchParams();
    if (location.trim()) queryParams.set("location", location.trim());
    if (selectedCategory) queryParams.set("category", selectedCategory);
    
    navigate(
      queryParams.toString()
        ? `/properties?${queryParams.toString()}`
        : "/properties"
    );
  };

  return (
    <div className="floating-search-overlay" onClick={onClose}>
      <div
        className="fs-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="fs-header">
          <h2>Property search</h2>

          <button
            className="fs-close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="fs-body">
          <input
            type="text"
            className="fs-input mb-3"
            placeholder="Search by location"
            autoFocus
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />

          <div className="fs-section">
            <label>Category</label>

            <div className="fs-pills">
              {[
                "Family",
                "Bachelor",
                "Office",
                "Sublet",
                "Hostel",
                "Shop",
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`fs-pill ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="fs-footer">
          <button
            className="fs-cancel-btn"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="fs-submit-btn"
            type="button"
            onClick={handleSearch}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>

            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default FloatingSearch;
