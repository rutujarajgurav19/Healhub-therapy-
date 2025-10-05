import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import healhublogo from "../../assets/healhublogo.png";
import defaultAvatar from "../../assets/avatar.png";
import { useUser } from "../../UserContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
        <Link to="/therapistinfo">Find Therapist</Link>

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
              <Link to="/therapy/addiction">Lifestyle Issues</Link>
            </div>
          )}
        </div>

        <Link to="/resources">Resources</Link>
        <Link to="/contact">Contact</Link>
        {user && <Link to="/feedback">Feedback</Link>}
      </nav>

      {/* Right Auth Buttons or Profile Menu */}
      <div className="auth-buttons">
        {user ? (
          <div className="profile-menu">
            <img
              src={user.photo || defaultAvatar}
              alt="Profile"
              className="profile-avatar"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            />
            {profileDropdownOpen && (
              <div className="profile-dropdown">
                <p className="dropdown-name">{user.name}</p>
                <p className="dropdown-email">{user.email}</p>
                <Link to="/profile/current">Current Bookings</Link>
                <Link to="/profile/past">Past Bookings</Link>
                <Link to="/profile/therapists">My Therapists</Link>
                <Link to="/profile/payments">Payment Details</Link>
                {!user.password && <Link to="/profile/settings">Account Settings</Link>}
                <Link to="/forgot-password">Forgot Password</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="btn login-btn">Login</Link>
            <Link to="/signup" className="btn register-btn">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
}
