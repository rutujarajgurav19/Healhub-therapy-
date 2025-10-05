import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Alert from "../Alert/Alert";
import { useUser } from "../../UserContext";

function Signup() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [step, setStep] = useState(1); // 1=basic info, 2=OTP verify
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
    terms: false
  });
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Countdown for OTP resend
  useEffect(() => {
    if (step === 2 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, countdown]);

  // Google Signin initialization
  useEffect(() => {
    const checkGoogle = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: "215212700559-6squv4ojltte9hs514eje80mc32qfau2.apps.googleusercontent.com",
          callback: handleGoogleSignup,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signup-button"),
          { theme: "outline", size: "large", text: "signup_with" }
        );
      } else {
        setTimeout(checkGoogle, 100);
      }
    };
    checkGoogle();
  }, []);

  // Step 1: Send OTP
  const sendOTP = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      setAlertType("error");
      return setMessage("Fill all required fields");
    }
    if (formData.password !== formData.confirmPassword) {
      setAlertType("error");
      return setMessage("Passwords do not match");
    }
    if (!formData.terms) {
      setAlertType("error");
      return setMessage("Agree to Terms & Privacy Policy");
    }

    setStep(2);
    setOtpSent(false);

    try {
      const res = await fetch("http://localhost/Healhub/send_otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (data.success) {
        setTimeout(() => setOtpSent(true), 500); // Show sending message briefly
      } else {
        setStep(1);
        setAlertType("error");
        setMessage(data.message);
      }
    } catch (error) {
      setStep(1);
      setAlertType("error");
      setMessage("Error sending OTP: " + error.message);
    }
  };

  // Step 2: Verify OTP and Create Account
  const verifyOTP = async () => {
    if (!formData.otp) {
      setAlertType("error");
      return setMessage("Enter OTP");
    }

    try {
      const res = await fetch("http://localhost/Healhub/verify_otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          password: formData.password
        })
      });
      const data = await res.json();
      if (data.success) {
        setAlertType("success");
        setMessage("Account created successfully!");
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setAlertType("error");
        setMessage(data.message);
      }
    } catch (error) {
      setAlertType("error");
      setMessage("OTP verification failed: " + error.message);
    }
  };

  const resendOTP = async () => {
    setResendLoading(true);
    try {
      const res = await fetch("http://localhost/Healhub/send_otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (data.success) {
        setCountdown(60);
        setResendLoading(false);
        setAlertType("success");
        setMessage("OTP resent successfully");
      } else {
        setResendLoading(false);
        setAlertType("error");
        setMessage(data.message);
      }
    } catch (error) {
      setResendLoading(false);
      setAlertType("error");
      setMessage("Error resending OTP: " + error.message);
    }
  };

  const handleGoogleSignup = async (response) => {
    try {
      const res = await fetch("http://localhost/Healhub/google_login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          credential: response.credential,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAlertType("success");
        setMessage("Account created and signed in successfully!");
        login(data.user);
        navigate("/home");
      } else {
        setAlertType("error");
        setMessage(data.message);
      }
    } catch (err) {
      setAlertType("error");
      setMessage("Google signup failed: " + err.message);
    }
  };

  return (
    <>
      <div className="signup-background">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="signup-card">
        {step === 1 && (
          <>
            <h2>Create Your Account</h2>
            <p>Start your mental health journey today</p>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              I agree to the Terms of Service and Privacy Policy
            </label>
            <button className="btn-primary" onClick={sendOTP}>
              Create Account & Send OTP
            </button>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <span style={{ color: '#666', fontSize: '14px' }}>or</span>
            </div>
            <div id="google-signup-button" style={{ display: 'flex', justifyContent: 'center' }}></div>
            <p>
              Already have an account? <span className="link" onClick={() => window.location="/login"}>Sign in</span>
            </p>
          </>
        )}

        {step === 2 && !otpSent && (
          <>
            <h2>Verify Your Email</h2>
            <p>Sending OTP to {formData.email}...</p>
          </>
        )}

        {step === 2 && otpSent && (
          <>
            <h2>Verify Your Email</h2>
            <p>Enter the OTP sent to {formData.email}</p>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
            />
            <button className="btn-primary" onClick={verifyOTP}>
              Verify & Complete Signup
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => setStep(1)}
              style={{
                backgroundColor: '#f3e5f5',
                border: '2px solid #6a5af9',
                color: '#6a5af9',
                padding: '14px',
                borderRadius: '8px',
                fontWeight: 'bold',
                width: '100%',
                margin: '10px 0',
                minHeight: '50px',
                boxShadow: '0 2px 8px rgba(106, 90, 249, 0.2)'
              }}
            >
              Edit Info
            </button>
            {countdown > 0 ? (
              <p className="otp-countdown">Resend OTP in {countdown}s</p>
            ) : (
            <button 
              className="btn-secondary" 
              onClick={resendOTP} 
              disabled={resendLoading}
              style={{
                backgroundColor: resendLoading ? '#e0e0e0' : '#f3e5f5',
                border: '2px solid #6a5af9',
                color: resendLoading ? '#999' : '#6a5af9',
                padding: '14px',
                borderRadius: '8px',
                fontWeight: 'bold',
                width: '100%',
                margin: '10px 0',
                minHeight: '50px',
                boxShadow: resendLoading ? 'none' : '0 2px 8px rgba(106, 90, 249, 0.2)',
                cursor: resendLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {resendLoading ? 'Resending...' : 'Resend OTP'}
            </button>
            )}
            <p>
              Already have an account? <span className="link" onClick={() => window.location="/login"}>Sign in</span>
            </p>
          </>
        )}

         <small>
        Your information is encrypted and protected. We never share your personal or mental health data with third parties.
      </small>
      </div>
      <Alert type={alertType} message={message} onClose={() => setMessage("")} />

    </>
  );
}

export default Signup;
