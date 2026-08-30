import Header from "../components/Header";
import Hero from "../components/home/Hero";
import FeaturedProperties from "../components/home/FeaturedProperties";
import WhyBashaLagbe from "../components/home/WhyBashaLagbe";
import Footer from "../components/Footer";
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