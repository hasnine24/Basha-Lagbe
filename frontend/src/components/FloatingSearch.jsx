import { useEffect, useState } from 'react';
import './FloatingSearch.css';

export default function FloatingSearch({ isOpen, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="floating-search-overlay" onClick={onClose}>
      <div className="fs-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="fs-header">
          <h2>Property search</h2>
          <button className="fs-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="fs-body">
          <input 
            type="text" 
            className="fs-input mb-3" 
            placeholder="Search by location" 
            autoFocus
          />
          
          <div className="fs-section">
            <label>Category</label>
            <select 
              className="fs-select" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div className="fs-row">
            <div className="fs-col">
              <label>Division</label>
              <select className="fs-select">
                <option>Select division</option>
                <option>Dhaka</option>
                <option>Chattogram</option>
              </select>
            </div>
            <div className="fs-col">
              <label>District</label>
              <select className="fs-select" disabled>
                <option>Select division first</option>
              </select>
            </div>
          </div>

          <div className="fs-section">
            <label>Area / Thana :</label>
            <select className="fs-select" disabled>
              <option>Select division first</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="fs-footer">
          <button className="fs-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="fs-submit-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            Search
          </button>
        </div>

      </div>
    </div>
  );
}