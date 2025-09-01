import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import {
  FaBars,
  FaHome,
  FaBook,
  FaInfoCircle,
  FaUsers,
  FaChurch,
  FaPlusCircle,
} from "react-icons/fa";
import {
  SectionHeading,
  Paragraph,
} from "../../components/Typography/Typography";

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

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.navList}>
        {!isMobile && (
          <ul className={styles.navUnifiedList}>
            <div className={styles.logoGroup}>
              <img
                src="/others/ctm_logo.png"
                alt="CATCOM Logo"
                className={styles.catcomLogo}
              />
              <SectionHeading className={styles.title}>
                JKUAT CATCOM
              </SectionHeading>
            </div>

            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                <FaHome className={styles.icon} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/liturgy"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                <FaBook className={styles.icon} />
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
                <FaInfoCircle className={styles.icon} /> About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/groups"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                <FaUsers className={styles.icon} /> Groups
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/scc"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                <FaChurch className={styles.icon} /> SCC
              </NavLink>
            </li>
          </ul>
        )}
        {isMobile && (
          <FaBars
            className={styles.burger}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          />
        )}
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
                <FaHome className={styles.icon} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/liturgy" onClick={closeMenu}>
                <FaBook className={styles.icon} /> Liturgy
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMenu}>
                <FaInfoCircle className={styles.icon} /> About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/groups" onClick={closeMenu}>
                <FaUsers className={styles.icon} /> Groups
              </NavLink>
            </li>
            <li>
              <NavLink to="/community" onClick={closeMenu}>
                <FaChurch className={styles.icon} /> SCC
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Header;
