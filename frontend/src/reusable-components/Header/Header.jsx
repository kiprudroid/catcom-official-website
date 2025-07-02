import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { FaBars } from "react-icons/fa";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 850);
      if (window.innerWidth > 850) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navList}>
        {!isMobile && (
          <ul className={styles.navUnifiedList}>
            <img
              src="/others/ctm_logo.png"
              alt="CATCOM Logo"
              className={styles.catcomLogo}
            />
            <li>JKUAT CATCOM</li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/liturgy"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                Liturgy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                Groups
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                SCC
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/join-scc"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                Join SCC
              </NavLink>
            </li>
          </ul>
        )}
        {isMobile && <FaBars className={styles.burger} onClick={toggleMenu} />}
      </div>

      {isMobile && (
        <div
          className={`${styles.mobileMenu} ${
            isOpen ? styles.show : styles.hide
          }`}
        >
          <ul className={styles.mobileNavList}>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/liturgy" onClick={closeMenu}>
                Liturgy
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" onClick={closeMenu}>
                About Us
              </NavLink>
            </li>
            <li>
              <li>
                <NavLink to="/community" onClick={closeMenu}>
                  SCCs
                </NavLink>
              </li>
            </li>
            <li>
              <NavLink to="/join-scc" onClick={closeMenu}>
                Join SCC
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Header;
