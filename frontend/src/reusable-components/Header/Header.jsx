import React from "react";
import { Link } from "react-router-dom";
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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/liturgy">Liturgy</Link>
              </li>
              <li>
                <Link to="/community">Community</Link>
              </li>
            </ul>
          </div>

          <div className="logo">
            <img src="/others/ctm_logo.jpg" alt="" className="catcom-logo" />
          </div>

          <div className="nav-right">
            <ul className="nav-right-list">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact"> Contact Us</Link>
              </li>
              <li>
                <Link to="/join-scc">Join SCC</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
