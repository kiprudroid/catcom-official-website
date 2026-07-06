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
  FaBookOpen,
  FaBullhorn,
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
                src="/others/catcom-logo.png"
                alt="CATCOM Logo"
                className={styles.catcomLogo}
              />
              <SectionHeading className={styles.title}>
                JKUAT CATCOM
              </SectionHeading>
            </div>

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                <FaHome className={styles.icon} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/prayers-readings"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                <FaBookOpen className={styles.icon} /> Daily Readings &amp;
                Prayers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/media"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                <FaBullhorn className={styles.icon} /> Media &amp; Announcements
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
          <>
            <div className={styles.logoGroup}>
              <img
                src="/others/catcom-logo.png"
                alt="CATCOM Logo"
                className={styles.catcomLogo}
              />
              <SectionHeading className={styles.title}>
                JKUAT CATCOM
              </SectionHeading>
            </div>
            <FaBars
              className={styles.burger}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            />
          </>
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
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                <FaHome className={styles.icon} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/prayers-readings"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                <FaBookOpen className={styles.icon} /> Daily Readings &amp;
                Prayers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/media"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
                <FaBullhorn className={styles.icon} /> Media &amp; Announcements
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={closeMenu}
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
                onClick={closeMenu}
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
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
              >
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
