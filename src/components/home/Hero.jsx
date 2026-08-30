import "./Hero.css";
import heroImage from "../../assets/hero.jpg";

function Hero() {
  return (
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

          <div className="hero-search">
            <input
              type="text"
              placeholder="Where are you looking?"
            />

            <button type="button">Search</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;