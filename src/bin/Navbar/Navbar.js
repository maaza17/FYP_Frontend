import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import "./Navbar.css";
import NavSearch from "../../components/NavSearch/NavSearch";
import logo from "../../assets/images/tcglogo.png";

function Navbar(props) {
  const checksearch = props.search;

  const STYLES = ["main", "other"];

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const [open, setOpen] = useState(false);

  const checkpage = STYLES.includes(props.page) ? props.page : STYLES[0];

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener("resize", showButton);

  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);



  function NavItem(props) {


    return (
      <li className="nav_item">
        <div className="nav__hamburger" onClick={() => setOpen(!open)}>
          {props.icon}
        </div>

        {open && props.children}
      </li>
    );
  }

  function DropdownMenu() {
    function DropdownItem(props) {
      return (
        <Link to={props.path} onClick={() => { setOpen(false) }} className="nav__menu_item">
          {props.children}
        </Link>
      )
    }
      <div className="nav__dropdown" >
        <DropdownItem path="/search">SHOP</DropdownItem>
        <DropdownItem path="/market">MARKET</DropdownItem>
      </div>
  }
  return (
    <nav className={`navbar ${checkpage}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="LOGO" onError={(e) => ((e.target.src = "https://tcg.bilalmohsin.com/static/media/tcglogo.a50629f7.png"))} />
        </Link>
        <div className="search__section">
          <NavSearch />
        </div>
        <nav ref={wrapperRef} className="nav-drops" >
          <ul className="nav-ul">
            <NavItem icon={<i className="fas fa-bars" />}>
              <DropdownMenu />
            </NavItem>
          </ul>
        </nav>
      </div>
    </nav>
  );
}

export default Navbar;
