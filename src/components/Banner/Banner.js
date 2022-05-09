import React from "react";
import { Button } from "../Button/Button";
import "./Banner.css";

function Banner({ user }) {
  return (
    <div className="banner-container">
      <div className="banner-box">
        <div className="banner-content">
          <h3>Market & Set Research and Analytics</h3>
          <h2>
            A complete Analytical breakdown of all the sales data of all cards
          </h2>
          {user ? (
            <div className="banner-btns">
              <Button
                to="/market"
                className="btns"
                buttonStyle="btn--outline"
                buttonSize="btn--medium"
              >
                Market Reasearch Tool
              </Button>
              <Button
                to="/setvalue"
                className="btns"
                buttonStyle="btn--outline"
                buttonSize="btn--medium"
              >
                Master Set Value
              </Button>
            </div>
          ) : (
            <h4 className="banner-btns">
              Note : Please Register or Login as a Member to find the results of
              our research and records.
            </h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;
