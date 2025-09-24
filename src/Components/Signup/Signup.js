import React, { useState } from "react";
import "./Signup.css";
import Alert from "../Alert/Alert";

function Signup() {
  const [step, setStep] = useState(1); // 1=basic info, 2=OTP verify
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    terms: false
  });
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Step 1: Send OTP
  const sendOTP = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
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
        setOtpSent(true);
      } else {
        setOtpSent(false);
        setAlertType("error");
        setMessage(data.message);
      }
    } catch (error) {
      setOtpSent(false);
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
          password: formData.password
        })
      });
      const data = await res.json();
      if (data.success) {
        setAlertType("success");
        setMessage("Account created successfully!");
        setStep(1);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          otp: "",
          terms: false
        });
      } else {
        setAlertType("error");
        setMessage(data.message);
      }
    } catch (error) {
      setAlertType("error");
      setMessage("OTP verification failed: " + error.message);
    }
  };

  return (
    <>
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
            <button className="btn-secondary" onClick={() => setStep(1)}>
              Edit Info
            </button>
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
