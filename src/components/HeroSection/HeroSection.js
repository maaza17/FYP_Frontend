import React from "react";
import { Button } from "../Button/Button";
import "./HeroSection.css";
// import '../App.css';
import empty from "../../assets/images/herosection-dnd.jpg";

function HeroSection() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-content-heading">WELCOME TO TCGFISH</h1>
        <div className="hero-content-text">
          Get all the data on your favourite and most<br/> popular Pokemon cards
        </div>

        <div className="hero-btns">
          <Button
            to="/search"
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--medium"
          >
            Search Catalog <i class="fas fa-long-arrow-alt-right"></i>
          </Button>
        </div>
      </div>
      {/* <div className="hero__slider__section">
        <img
          className="hero__slider__image1"
          src={"../../assets/images/herosection-dnd.jpg"}
          onError={(e) => (e.target.src = empty)}
          alt="IMG"
        />
      </div> */}
    </div>
  );
}

export default HeroSection;
