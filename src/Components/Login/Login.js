import React, { useState } from "react";
import "./Login.css";
import Alert from "../Alert/Alert"; // import the reusable Alert
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setAlertType("error");
      setMessage("Enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost/Healhub/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setAlertType("success");
        setMessage("Login successful!");
        // Save user info to context
        if (data.user) {
          login(data.user);
        } else {
          // Set dummy user if not provided
          login({ name: "User", email: formData.email, photo: "/default-avatar.png" });
        }
        // Redirect to home page
        navigate("/home");
      } else {
        setAlertType("error");
        setMessage(data.message);
      }
    } catch (err) {
      setAlertType("error");
      setMessage("Login failed: " + err.message);
    }
  };

  return (
    <>
      <div className="login-background">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Sign in to continue your mental health journey</p>
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

        <button className="btn-primary" onClick={handleLogin}>
          Sign In
        </button>

        <p>
          Don’t have an account?{" "}
          <span className="link" onClick={() => (window.location = "/signup")}>
            Sign up
          </span>
        </p>

        <small>
          By continuing, you agree to our Terms of Service and Privacy Policy.
          Your mental health information is protected and confidential.
        </small>
      </div>

      {/* Alert shown at top center */}
      <Alert
        type={alertType}
        message={message}
        onClose={() => setMessage("")}
      />
    </>
  );
}

export default Login;
