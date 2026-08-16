import React from 'react';
import './Home.css';

const mockHouses = [
  {
    id: 1,
    title: '৩ বেডরুমের ফ্ল্যাট বাসা',
    location: 'ধানমন্ডি, ঢাকা',
    rent: '৳ ৩৫,০০০ / মাস',
    specs: '৩ বেড • ৩ বাথ • বারান্দা',
    type: 'Family',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'ব্যাচেলর রুম (এটাচড বাথ)',
    location: 'মিরপুর-২, ঢাকা',
    rent: '৳ ৮,৫০০ / মাস',
    specs: '১ বেড • ১ বাথ • ওয়াইফাই',
    type: 'Bachelor',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'মডার্ন স্টুডিও অ্যাপার্টমেন্ট',
    location: 'উত্তরা সেক্টর ১১, ঢাকা',
    rent: '৳ ১৮,০০০ / মাস',
    specs: '২ বেড • ২ বাথ • লিফট সুবিধা',
    type: 'Sublet',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Home() {
  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="brand-logo">বাসালাগবে</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#listings">বাসা খুঁজুন</a>
          <button className="btn-primary">লগইন</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <h1 className="hero-title">সহজে খুঁজুন আপনার পছন্দের বাসা</h1>
        <p className="hero-subtitle">ফ্যামিলি, ব্যাচেলর কিংবা সাবলেট — আপনার প্রয়োজনীয় বাসা এক ক্লিকেই</p>

        <div className="search-wrapper">
          <input 
            type="text" 
            placeholder="এলাকা লিখুন (যেমন: ধানমন্ডি, মিরপুর)..." 
            className="search-input" 
          />
          <select className="search-select">
            <option value="">সব টাইপ</option>
            <option value="family">ফ্যামিলি</option>
            <option value="bachelor">ব্যাচেলর</option>
            <option value="sublet">সাবলেট</option>
          </select>
          <button className="btn-search">খুঁজুন</button>
        </div>
      </header>

      {/* Featured Listings */}
      <main className="main-content" id="listings">
        <div className="section-header">
          <h2>নতুন বাসার তালিকা</h2>
        </div>

        <div className="property-grid">
          {mockHouses.map((house) => (
            <article key={house.id} className="property-card">
              <img src={house.image} alt={house.title} className="property-img" />
              <div className="card-details">
                <span className="property-type">{house.type}</span>
                <h3 className="property-title">{house.title}</h3>
                <p className="property-location">📍 {house.location}</p>
                <p className="property-specs">{house.specs}</p>
                <div className="card-footer">
                  <span className="property-rent">{house.rent}</span>
                  <button className="btn-view">বিস্তারিত</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        © 2026 বাসালাগবে — All Rights Reserved.
      </footer>
    </div>
  );
}