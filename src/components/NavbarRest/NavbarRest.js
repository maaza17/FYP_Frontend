import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import "./NavbarRest.css";
import NavSearch from "../NavSearch/NavSearch";
import logo from "../../assets/images/tcglogo.png";
import close from "../../assets/images/close.png";
import icon from "../../assets/images/profile.jpg";

function Navbar({ user }) {
  const history = useHistory();
  const [pressed, setPressed] = React.useState(false);
  const wrapperRef = useRef(null);
  const hasWindow = typeof window !== "undefined";
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );
  const [open, setOpen] = React.useState(false);
  useOutsideAlerter(wrapperRef);

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    return {
      width,
    };
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setPressed(false);
          setOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  React.useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  function Menu() {
    function DropdownItem(props) {
      if (window.location.pathname === props.path) {
        return <div className="rest__menu_item_disabled">{props.children}</div>;
      } else
        return (
          <div
            onClick={() => {
              history.push(props.path);
            }}
            className="rest__menu_item"
          >
            {props.children}
          </div>
        );
    }
    // if (windowDimensions && windowDimensions.width && windowDimensions.width > 550) {
    return (
      <>
        {sessionStorage.getItem("token") === null ? (
          <>
            <div className="navbar__rest__buttonContainer">
              <DropdownItem path="/login">Login</DropdownItem>
              <DropdownItem path="/signup">Signup</DropdownItem>
            </div>
          </>
        ) : (
          <>
            {user ? (
              <div className="single__auth__button">
                <div
                  className="profile__btn"
                  onClick={() => {
                    setPressed(true);
                  }}
                >
                  <div>Hello, {`${user.firstName} ${user.lastName}`}</div>
                  <img alt="icon" className="user__icon" src={icon} />
                </div>
              </div>
            ) : null}
            {pressed && user ? (
              <div ref={wrapperRef} className="rest__nav__dropdown">
                <img
                  alt="icon"
                  className="profile__close"
                  src={close}
                  onClick={() => {
                    setPressed(false);
                  }}
                />
                <img alt="icon" className="profile__picture" src={icon} />
                <div className="profile__one__item">{`${user.firstName} ${user.lastName}`}</div>
                <div className="profile__one__item">
                  <div className="profile__one__subitem">
                    <div className="profile__one__boxleft">Email: </div>
                    <div className="profile__one__boxright">{`${user.email}`}</div>
                  </div>
                  <div className="profile__one__subitem">
                    <div className="profile__one__boxleft">Status: </div>
                    <div className="profile__one__boxright">{`${user.status}`}</div>
                  </div>
                </div>
                <Link
                  to="/favourite"
                  className="profile__one__item__logout"
                  onClick={() => {
                    history.push("/favourite");
                  }}
                >
                  My Favourites
                </Link>
                <Link
                  to="/"
                  className="profile__one__item__logout"
                  onClick={() => {
                    console.log(sessionStorage);
                    sessionStorage.clear();
                    history.push("/");
                    console.log(sessionStorage);
                  }}
                >
                  Logout
                </Link>
              </div>
            ) : null}
          </>
        )}
        <div>
          <div
            className="media_mobile_list_icon"
            onClick={() => setOpen(!open)}
          >
            <i className="fas fa-bars" />
          </div>
          {open ? (
            <>
              <div ref={wrapperRef} className="media_mobile_list_container">
                <NavListDropdownItem path="/">
                  Home
                </NavListDropdownItem>
                <NavListDropdownItem path="/search">
                  Search Catalogue
                </NavListDropdownItem>
                <NavListDropdownItem path="/market">
                  Market Research Tool
                </NavListDropdownItem>
                <NavListDropdownItem path="/setvalue">
                  Master Set Value
                </NavListDropdownItem>
              </div>
            </>
          ) : null}
        </div>
      </>
    );
    // }
    // else return (<></>);
  }

  function NavListDropdownItem(props) {
    console.log(window.location);
    console.log(props.path);
    if (window.location.pathname === props.path) {
      return (
        <div className="media_mobile_list_item_disabled">{props.children}</div>
      );
    } else
      return (
        <div
          onClick={() => {
            history.push(props.path);
          }}
          className="media_mobile_list_item"
        >
          {props.children}
        </div>
      );
  }

  function NavList() {
    return (
      <div>
        <div className="media_mobile_list_icon" onClick={() => setOpen(!open)}>
          <i className="fas fa-bars" />
        </div>
        {open ? (
          <>
            <div className="media_mobile_list_container">
              <NavListDropdownItem path={"/"}>
                Home
              </NavListDropdownItem>
              <NavListDropdownItem path={"/search"}>
                Search Catalogue
              </NavListDropdownItem>
              <NavListDropdownItem path={"/market"}>
                Market Research Tool
              </NavListDropdownItem>
              <NavListDropdownItem path={"/setvalue"}>
                Master Set Value
              </NavListDropdownItem>
              <NavListDropdownItem path={"/login"}>Login</NavListDropdownItem>
              <NavListDropdownItem path={"/signup"}>Signup</NavListDropdownItem>
            </div>
          </>
        ) : null}
      </div>
    );
  }
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
        <div
          className={
            windowDimensions &&
            windowDimensions.width &&
            windowDimensions.width < 550
              ? "rest__search__section"
              : "rest__search__section2"
          }
        >
          <NavSearch />
        </div>
        {windowDimensions &&
        windowDimensions.width &&
        windowDimensions.width > 550 ? (
          <Menu />
        ) : (
          <NavList />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
