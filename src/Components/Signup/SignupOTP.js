import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupOTP.css";

export default function SignupOTP() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Signup, Step 2: OTP
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [error, setError] = useState("");

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

  // Redirect to login after OTP verified
  useEffect(() => {
    if (otpVerified) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 1000); // 1 second delay to show success message
      return () => clearTimeout(timer);
    }
  }, [otpVerified, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch('http://localhost/Healhub/send_otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (data.success) {
        setLoading(false);
        setStep(2);
        setCountdown(60); // Start OTP timer
      } else {
        setLoading(false);
        setError(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError('Error sending OTP: ' + error.message);
    }
  };

  const handleVerifyOtp = async () => {
    setVerifyLoading(true);
    try {
      const res = await fetch('http://localhost/Healhub/verify_otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp, name: formData.name, password: formData.password })
      });
      const data = await res.json();
      if (data.success) {
        setOtpVerified(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error verifying OTP: ' + error.message);
    } finally {
      setVerifyLoading(false);
    }
  };

  const resendOtp = async () => {
    setResendLoading(true);
    try {
      const res = await fetch('http://localhost/Healhub/send_otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (data.success) {
        setCountdown(60);
        setResendLoading(false);
      } else {
        setResendLoading(false);
        alert(data.message);
      }
    } catch (error) {
      setResendLoading(false);
      alert('Error resending OTP: ' + error.message);
    }
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
          {error && <p style={{color: 'red', margin: '10px 0'}}>{error}</p>}
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
          <button onClick={handleVerifyOtp} disabled={verifyLoading} style={{
            backgroundColor: '#6a5af9',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '15px',
            cursor: verifyLoading ? 'not-allowed' : 'pointer',
            width: '100%',
            margin: '10px 0',
            opacity: verifyLoading ? 0.6 : 1,
            border: 'none'
          }}>{verifyLoading ? 'Verifying...' : 'Verify OTP'}</button>
          <button onClick={resendOtp} disabled={countdown > 0 || resendLoading} style={{
            backgroundColor: (countdown > 0 || resendLoading) ? '#f0f0f0' : '#6a5af9',
            color: (countdown > 0 || resendLoading) ? '#999' : 'white',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '15px',
            cursor: (countdown > 0 || resendLoading) ? 'not-allowed' : 'pointer',
            width: '100%',
            margin: '10px 0',
            opacity: (countdown > 0 || resendLoading) ? 0.6 : 1,
            border: 'none'
          }}>{countdown > 0 ? `Resend OTP in ${countdown}s` : resendLoading ? 'Resending...' : 'Resend OTP'}</button>
          <button onClick={() => setStep(1)} style={{
            backgroundColor: '#6a5af9',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '15px',
            cursor: 'pointer',
            width: '100%',
            margin: '10px 0',
            border: 'none'
          }}>Edit Info</button>
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
