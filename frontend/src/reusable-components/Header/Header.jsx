import React from "react";

function Header({ className }) {
  return (
    <>
      <header className={`${className}  `}>
        <ul>
          <li>JKUAT CATCOM</li>
          <li>Home </li>
          <li>Liturgy</li>
          <li>Community</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Join SCC</li>
        </ul>
      </header>
    </>
  );
}

export default Header;
