import bashaLagbeLogo from "../assets/basha_lagbe.png";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="main-footer">
      {" "}
      <div className="footer-container">
        {" "}
        {/* Brand Section */}{" "}
        <div className="footer-brand">
          {" "}
          <a className="footer-logo" href="#top">
            {" "}
            <img
              className="footer-logo-image"
              src={bashaLagbeLogo}
              alt="Basha Lagbe"
            />{" "}
            <span>Basha Lagbe</span>{" "}
          </a>{" "}
          <p className="footer-desc">
            {" "}
            Premium residential and commercial properties for rent and buy in
            Bangladesh. Discover your perfect home today with a secure and
            hassle-free process.{" "}
          </p>{" "}
        </div>{" "}
        {/* Links Section */}{" "}
        <div className="footer-links-wrapper">
          {" "}
          <div className="footer-column">
            {" "}
            <h3>Company</h3> <a href="/about">About us</a>{" "}
            <a href="/careers">Careers</a> <a href="/press">Press & Media</a>{" "}
            <a href="/blog">Our Blog</a>{" "}
          </div>{" "}
          <div className="footer-column">
            {" "}
            <h3>Support</h3> <a href="/help">Help Center</a>{" "}
            <a href="/contact">Contact Us</a> <a href="/faq">FAQ</a>{" "}
            <a href="/safety">Safety Center</a>{" "}
          </div>{" "}
          <div className="footer-column">
            {" "}
            <h3>Legal</h3> <a href="/privacy">Privacy Policy</a>{" "}
            <a href="/terms">Terms of Service</a>{" "}
            <a href="/cookies">Cookie Policy</a>{" "}
            <a href="/guidelines">Community Guidelines</a>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="footer-bottom">
        {" "}
        <p>
          &copy; {new Date().getFullYear()} Basha Lagbe. All rights reserved.
        </p>{" "}
      </div>{" "}
    </footer>
  );
}
