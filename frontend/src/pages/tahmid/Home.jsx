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
      <h2>Ready to find your next home?</h2>
      <p>
        Explore available properties and find the right one for you.
      </p>
    </div>

    <a href="/properties">Explore Properties</a>
  </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;