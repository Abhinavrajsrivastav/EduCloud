import React from 'react';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer" id="footers">
            <div className="footer-container">
                {/* About Developer */}
                <div className="footer-section about-developer">
                    <h2>About the Developer</h2>
                    <p>
                        Hi, I'm <strong>Abhinav Raj Srivastava</strong>, A Final Year Computer Science Engineering Student at ABES Engineering College, Ghaziabad.</p> 
                </div>

                {/* About Project */}
                <div className="footer-section about-project">
                    <h2>About the Project</h2>
                    <p>
                        Columbae isdesigned to make interview processes seamless.
                    </p>
                </div>

                <div className="footer-section footer-navigation">
                    <h2>Developer Profiles</h2>
                    <ul>
                        <li><a href="https://github.com/Abhinavrajsrivastav" className="footer-link">GitHub</a></li>
                        <li><a href="https://www.linkedin.com/in/abhinav-raj-srivastava-599aaa1b2/" className="footer-link">LinkedIn</a></li>
                        <li><a href="https://twitter.com/srivast254" className="footer-link">Twitter</a></li>
                        <li><a href="https://leetcode.com/Abhinav254/" className="footer-link">Leetcode</a></li>
                        <li><a href="https://abhinav-raj.onrender.com/" className="footer-link">Portfolio</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Columbae<br/> Made with 💜 by <a href="https://github.com/Abhinavrajsrivastav">Abhinav Raj Srivastava</a></p>
            </div>
        </footer>
    );
};

export default Footer;
