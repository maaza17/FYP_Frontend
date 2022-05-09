import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import "./Navbar.css";
import NavSearch from "../NavSearch/NavSearch";
import logo from "../../assets/images/tcglogo.png";
import close from "../../assets/images/close.png";
import icon from "../../assets/images/profile.jpg";

function Navbar({ user }) {
  return (
    <nav className="rest__navbar">
      <div className="rest__navbar-container">
        <Link to="/" className="rest__navbar-logo">
          <img
            src={logo}
            alt="LOGO"
            onError={(e) =>
              (e.target.src =
                "https://tcgfish.com/static/media/tcglogo.a50629f7.png")
            }
          />
        </Link>
        </div>
    </nav>
  );
}

export default Navbar;
