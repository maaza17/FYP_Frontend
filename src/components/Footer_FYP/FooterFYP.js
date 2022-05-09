import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import "./FooterFYP.css";

function Footer() {
  return (
    <div className="footer-fyp-container">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Shop</h2>
            <Link to="/shop">Magic</Link>
            <Link to="/shop">Yu-Gi-Oh!</Link>
            <Link to="/shop">Pokemon</Link>
            <Link to="/shop">Cardfigth!! Vanguard</Link>
            <Link to="/shop">Dragon Ball Super</Link>
            <Link to="/shop">Force of Will</Link>
            <Link to="/shop">Final Fantasy</Link>
            <Link to="/shop">Funko Pop! Vinyl</Link>
            <Link to="/shop">Star Wars: Destiny</Link>
            <Link to="/shop">Weiss Schwarz</Link>
            <Link to="/shop">Heroclix</Link>
          </div>
          <div className="footer-link-items">
            <h2>Articles & Deck</h2>
            <Link to="/shop">TCGplayer Infinite</Link>
            <Link to="/shop">Magic Articles & Videos</Link>
            <Link to="/shop">Yu-Gi-Oh! Articles & Videos</Link>
            <div className="footer-link-items-2">
              <h2>About</h2>
              <Link to="/shop">About Us</Link>
              <Link to="/shop">Our Core Values</Link>
              <Link to="/shop">Working at TCGPlayer</Link>
              <Link to="/shop">Working in Syracuse</Link>
              <Link to="/shop">Careers</Link>
              <Link to="/shop">Press Center</Link>
            </div>
          </div>
          <div className="footer-link-items">
            <h2>Buy With Us</h2>
            <Link to="/shop">Buyer Safeguard</Link>
            <Link to="/shop">Direct by TCGPlayer</Link>
            <Link to="/shop">Gift Cards</Link>
            <Link to="/shop">Cart Optimizer</Link>
            <Link to="/shop">Mass Entry</Link>
            <Link to="/shop">Collection Tracker</Link>
          </div>
          <div className="footer-link-items">
            <h2>Sell With Us</h2>
            <Link to="/shop">Sell on TCGPlayer</Link>
            <Link to="/shop">Unlock Pro</Link>
            <Link to="/shop">Direct by TCGPlayer</Link>
            <Link to="/shop">Price Data API's</Link>
            <div className="footer-link-items-2">
              <h2>TCGPlayer Buylist</h2>
              <Link to="/shop">Buylist for Players</Link>
              <Link to="/shop">Buylist for Stores</Link>
            </div>
          </div>
        </div>
      </div>
      <section className="sub-footer">
        <h7 className="sub-footer-text">How can we help?</h7>
        <div className="contact-wrap">
          <Link className="contact-link facebook" to="/shop">
            Help Center
          </Link>
          <Link className="contact-link instagram" to="/shop">
            Leave Us Feedback
          </Link>
          <Link className="contact-link youtube" to="/shop">
            Contact Customer Service
          </Link>
          <Link className="contact-link twitter" to="/shop">
            Refund and Return Policy
          </Link>
        </div>
        <h8 className="sub-footer-subtext">
          5640 E. Taft Road, #3267 Syracuse, NY 13220
        </h8>
        <div className="social-media-wrap">
          {/* <small className="website-rights">
            OMA © 2021 All rights reserved
          </small> */}
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </Link>
            <Link
              className="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i className="fab fa-youtube"></i>
            </Link>
            <Link
              className="social-icon-link linkedin"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>
        </div>
        <Link to="//walzixdigitals.com" target="_blank" className="website-rights">
          Powered By Walzix Digitals
        </Link>
      </section>
    </div>
  );
}

export default Footer;
