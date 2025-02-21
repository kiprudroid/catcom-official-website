import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header({ className }) {
  return (
    <>
      <nav className={`${className}  nav `}>
        <div className="nav-list">
          <div className="nav-left">
            <ul className="nav-left-list">
              <li>JKUAT CATCOM</li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/liturgy">Liturgy</NavLink>
              </li>
              <li>
                <NavLink to="/community">Community</NavLink>
              </li>
            </ul>
          </div>

          <div className="logo">
            <img src="./others/ctm_logo.png" alt="" className="catcom-logo" />
          </div>

          <div className="nav-right">
            <ul className="nav-right-list">
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/media"> Media</NavLink>
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
