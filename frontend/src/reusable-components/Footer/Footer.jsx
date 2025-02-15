import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-grid-container">
                    <div className="grid-item">
                        <h3>Column 1</h3>
                        <p>Content for the first column.</p>
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
};

export default Footer;