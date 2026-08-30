import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

import heroImage from "../../assets/hero.jpg";

function Hero() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    if (!location.trim()) return;

    navigate(`/properties?location=${encodeURIComponent(location.trim())}`);
  };

  return (
    <>
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Find a Home You'll Love</h1>

            <p>
              Find the right home based on your location, budget, and needs.
            </p>

            <form className="hero-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Where are you looking?"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />

              <button type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

    </>
  );
}

export default Hero;
