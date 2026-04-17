import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-brand">
                    <h2>Smart Campus Assistant</h2>
                    <p>
                        A simple platform to manage complaints, announcements, and faculty details efficiently.
                    </p>
                </div>

                <div className="footer-links">
                    <h3>Features</h3>
                   <a href="#">Home</a>
                   <a href="#">Announcements</a>
                   <a href="#">Complaints</a>
                   <a href="#">Faculty</a>
                </div>

                <div className="footer-contact">
                    <h3>Contact</h3>
                    <p>Email: support@scampus.com</p>
                    <p>Phone: +91 98765 43210</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Smart Campus Assistant. All rights reserved.</p>
            </div>
        </footer>
    );
}