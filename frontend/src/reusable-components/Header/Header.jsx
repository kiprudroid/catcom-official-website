import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { FaBars } from "react-icons/fa";

function Header(className) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`${className}`}>
        <div className="nav-list">
          <div className="nav-left">
            <ul className="nav-left-list">
              <li>JKUAT CATCOM</li>
              <li>
                <NavLink to="/" className={"link"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/liturgy" className={"link"}>
                  Liturgy
                </NavLink>
              </li>
              <li>
                <NavLink to="/community" className={"link"}>
                  Community
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="logo">
            <img
              src="/others/ctm_logo.png"
              alt="CATCOM Logo"
              className="catcom-logo"
            />
          </div>

          <div className="nav-right">
            <ul className="nav-right-list">
              <li>
                <NavLink to="/about" className={"link"}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/media" className={"link"}>
                  Media
                </NavLink>
              </li>
              <li>
                <NavLink to="/join-scc" className={"link"}>
                  Join SCC
                </NavLink>
              </li>
            </ul>

            <FaBars className="burger" onClick={toggleMenu} />
          </div>
          {/* Mobile Menu */}
          <div className={`mobile-menu ${isOpen ? "show" : "hide"}`}>
            <ul className="mobile-nav-list">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/liturgy">Liturgy</NavLink>
              </li>
              <li>
                <NavLink to="/community">Community</NavLink>
              </li>
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/media">Media</NavLink>
              </li>
              <li>
                <NavLink to="/join-scc">Join SCC</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
