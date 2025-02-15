import React from "react";
import "./Footer.css";

function Footer(){
    return (
      <footer className="footer" style={{ fontFamily: "Roboto, sans-serif" }}>
        <div className="footer-content">
          <div className="footer-grid-container">
            <div className="grid-item first">
              <img
                src="/others/ctm_logo.jpg"
                alt="Catcom Logo"
                className="ctm-logo"
              />
              <p className="location-wrapper">
                JKUAT Catcom <br /> Main Campus <br />
                Juja{" "}
              </p>
            </div>
            <div className="grid-item">
              <h3>Column 2</h3>
              <p>Content for the second column.</p>
            </div>
            <div className="grid-item">
              <h3>Column 3</h3>
              <p>Content for the third column.</p>
            </div>
            <div className="grid-item">
              <h3>Column 4</h3>
              <p>Content for the fourth column, which is wider.</p>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;