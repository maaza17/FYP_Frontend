import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-text-small">Copyright TCG Fish © 2022</div>
      <div className="footer-text-big">
        All information used in the website are public information.
        This website does not contain any financial advice.
        Pokémon © 2002-2022 Pokémon. © 1995-2022 Nintendo/Creatures Inc./GAME FREAK inc.
        TM, ® and Pokémon character names are trademarks of Nintendo.
        This website is not produced, endorsed, supported,
        or affiliated with Nintendo/Creatures Inc./GAME FREAK inc.
      </div>
      <div className="footer-link">
        <Link
          to="//walzixdigitals.com"
          target="_blank"
          className="footer-link-text"
        >
          Powered By Walzix Digitals
        </Link>
      </div>
    </div>
  );
}

export default Footer;
