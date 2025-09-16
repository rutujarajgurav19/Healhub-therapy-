import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import healhublogo from "../../assets/healhublogo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Left Logo */}
      <div className="logo">
        <img src={healhublogo} alt="HealHub Logo" />
      </div>

      {/* Center Nav */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/assessment">Assessment</Link>
        <Link to="/therapist">Find Therapist</Link>

        {/* Dropdown for Therapy Types */}
        <div
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span className="dropdown-title">Therapy Types ▾</span>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/therapy/relationship">Relationship Counselling</Link>
              <Link to="/therapy/depression">Depression, Anxiety & Stress</Link>
              <Link to="/therapy/parenting">Parenting</Link>
              <Link to="/therapy/trauma">Trauma</Link>
              <Link to="/therapy/lifestyle">Lifestyle Issues</Link>
            </div>
          )}
        </div>

        <Link to="/resources">Resources</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Right Auth Buttons */}
      <div className="auth-buttons">
        <Link to="/login" className="btn login-btn">Login</Link>
        <Link to="/signup" className="btn register-btn">Signup</Link>
      </div>
    </header>
  );
}
