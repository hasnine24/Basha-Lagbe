
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import bashaLagbeLogo from '../assets/basha_lagbe.png';
import FloatingSearch from './FloatingSearch';
import './Header.css';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="header-wrapper">
          <Link className="header-logo" to="/">
            <img
              className="header-logo-image"
              src={bashaLagbeLogo}
              alt="Basha Lagbe"
            />
            <span className="header-brand-name">Basha Lagbe</span>
          </Link>
          
          <nav className="main-nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/add-property">Add Product</NavLink>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsSearchOpen(true); }}>Search</a>
          </nav>

          <div className="header-auth" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ color: '#111827', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'default' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Profile
            </div>
          </div>
        </div>
      </header>
      
      <FloatingSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
