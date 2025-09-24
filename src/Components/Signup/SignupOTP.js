import React, { useState, useEffect } from "react";
import "./SignupOTP.css";

export default function SignupOTP() {
  const [step, setStep] = useState(1); // Step 1: Signup, Step 2: OTP
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [otpVerified, setOtpVerified] = useState(false);

  // Countdown for OTP
  useEffect(() => {
    if (step === 2 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, countdown]);

  // Progress bar for loading
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [loading]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setCountdown(60); // Start OTP timer
    }, 2000); // Simulate processing delay
  };

  const handleVerifyOtp = () => {
    // Simple OTP check simulation (1234)
    if (otp === "1234") setOtpVerified(true);
    else alert("Incorrect OTP");
  };

  const resendOtp = () => {
    setCountdown(60);
    alert("OTP resent!");
  };

  return (
    <div className="signup-container">
      <div className="progress-bar">
        <div className={`step ${step >= 1 ? "active" : ""}`}>Signup</div>
        <div className={`step ${step >= 2 ? "active" : ""}`}>OTP</div>
      </div>

      {step === 1 && (
        <form className="signup-form" onSubmit={handleSignup}>
          <h2>Create Account</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {loading && <div className="loading-bar"><div className="loading-fill" style={{width: `${progress}%`}}></div></div>}
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>
      )}

      {step === 2 && !otpVerified && (
        <div className="otp-form">
          <h2>Enter OTP</h2>
          <p>OTP sent to {formData.email}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
          {countdown > 0 ? (
            <p>Resend OTP in {countdown}s</p>
          ) : (
            <button onClick={resendOtp}>Resend OTP</button>
          )}
        </div>
      )}

      {otpVerified && (
        <div className="success-message">
          <h2>✔ OTP Verified!</h2>
          <p>Your account has been successfully created.</p>
        </div>
      )}
    </div>
  );
}
