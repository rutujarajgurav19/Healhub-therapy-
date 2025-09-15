import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
      <div className="logo">HealHub</div>

      {/* Center Nav */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/assessment">Assessment</Link>
        <Link to="/therapist">Find Therapist</Link>
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
