import { Link } from "react-router-dom";
import Header from "../hasnine/Header";
import Hero from "./Hero";
import FeaturedProperties from "./FeaturedProperties";
import WhyBashaLagbe from "./WhyBashaLagbe";
import Footer from "../hasnine/Footer";
import "./Home.css";

function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <FeaturedProperties />
        <WhyBashaLagbe />
        <section className="home-cta">
          <div>
            <h2>Ready to Find a Home or List Your Property?</h2>
            <p>Get started with Basha Lagbe today.</p>
          </div>

          <Link to="/get-started">Get Started →</Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
