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
          <div className="social-links">
            {" "}
            <a href="#" aria-label="Facebook">
              {" "}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {" "}
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />{" "}
              </svg>{" "}
            </a>{" "}
            <a href="#" aria-label="YouTube">
              {" "}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {" "}
                <path d="M21.582 6.186a2.632 2.632 0 0 0-1.85-1.85C18.096 3.893 12 3.893 12 3.893s-6.096 0-7.732.443a2.632 2.632 0 0 0-1.85 1.85C2 7.822 2 12 2 12s0 4.178.418 5.814a2.632 2.632 0 0 0 1.85 1.85C5.904 20.107 12 20.107 12 20.107s6.096 0 7.732-.443a2.632 2.632 0 0 0 1.85-1.85C22 16.178 22 12 22 12s0-4.178-.418-5.814zM9.893 15.107V8.893L15.214 12l-5.321 3.107z" />{" "}
              </svg>{" "}
            </a>{" "}
            <a href="#" aria-label="Instagram">
              {" "}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  ry="5"
                ></rect>{" "}
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>{" "}
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>{" "}
              </svg>{" "}
            </a>{" "}
            <a href="#" aria-label="LinkedIn">
              {" "}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {" "}
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />{" "}
              </svg>{" "}
            </a>{" "}
          </div>{" "}
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
