import React from "react";
import "./Header.css";

function Header({ className }) {
  return (
    <>
    
      <nav className={`${className}  nav `}>
        <div className="nav-list">

          <div className="nav-left">
            <ul className="nav-left-list">

            <li>JKUAT CATCOM</li>
            <li>Home </li>
            <li>Liturgy</li>
            <li>Community</li>
            </ul>

          </div>

          <div className="logo">
            <img src="/others/ctm_logo.jpg" alt=""className="catcom-logo"/>
          </div>

          <div className="nav-right">
            <ul className="nav-right-list">

          <li>About Us</li>
          <li>Contact Us</li>
          <li>Join SCC</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
