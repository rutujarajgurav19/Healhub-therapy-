import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    urgency: "",
    message: "",
  });
  const [expanded, setExpanded] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/Healhub/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          subject: formData.subject,
          urgency: formData.urgency,
          message: formData.message,
        }),
      });
      const result = await response.json();
      if (result.status === "success") {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          urgency: "",
          message: "",
        });
        navigate('/home');
      } else {
        alert("Failed to send message: " + result.message);
      }
    } catch (error) {
      alert("Error sending message: " + error.message);
    }
  };

  return (
    <div className="contact-page">
      <h2>Get in Touch</h2>
      <p>
        We're here to help. Reach out to our support team or access crisis
        resources when you need them.
      </p>

      <div className="contact-container">
        {/* Contact Form Card */}
        <div className="info-card form-card">
          <h3>Send Us a Message</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select a topic</option>
              <option value="General">General Question</option>
              <option value="Technical">Technical support</option>
              <option value="Therapists">Therapists Inquiry</option>
              <option value="Feedback">Feedback</option>
            </select>

            <label>Urgency Level</label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
            >
              <option value="">How urgent is this?</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>

            <label>Message</label>
            <textarea
              name="message"
              placeholder="Tell us how we can help you..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Info Cards */}
        <div className="contact-cards">
          <div className="info-card">
            <h3>Contact Information</h3>
            <p>
              Email:{" "}
              <a href="mailto:support@healhub.com">support@healhub.com</a>
            </p>
            <p>Phone: 1-800-HEALHUB</p>
            <p>
              <strong>Support Hours:</strong>
              <br />
              Mon–Fri: 9AM–8PM IST <br />
              Sat–Sun: 10AM–6PM IST
            </p>
          </div>

          <div className="info-card crisis-card">
            <h3>⚠️ Crisis Resources</h3>
            <p>
              National Suicide Prevention Lifeline: <strong>9152987821</strong> (AASRA) <br />
              <a href="https://www.aasra.info/" target="_blank" rel="noopener noreferrer">www.aasra.info</a>
            </p>
            <p>
              Crisis Support: Call <strong>9152987821</strong> or visit <a href="https://www.aasra.info/" target="_blank" rel="noopener noreferrer">www.aasra.info</a>
            </p>
            <p>
              Emergency Services: <strong>112</strong>
            </p>
          </div>

          <div className="info-card">
            <h3>Quick Help</h3>
            <div className="quick-help-list">
              <div className={`quick-help-item ${expanded === 0 ? 'expanded' : ''}`} onClick={() => setExpanded(expanded === 0 ? null : 0)}>
                <div className="question">How do I book a session?</div>
                {expanded === 0 && <div className="answer">You can book a session by signing in to your HealHub account, selecting a service or specialist, choosing an available date and time, and confirming your booking.</div>}
              </div>
              <div className={`quick-help-item ${expanded === 1 ? 'expanded' : ''}`} onClick={() => setExpanded(expanded === 1 ? null : 1)}>
                <div className="question">How do I change my appointment?</div>
                {expanded === 1 && <div className="answer">Go to the Profile section, open Bookings, select the session you want to modify, and choose Reschedule or Cancel.</div>}
              </div>
              <div className={`quick-help-item ${expanded === 2 ? 'expanded' : ''}`} onClick={() => setExpanded(expanded === 2 ? null : 2)}>
                <div className="question">Is my information secure?</div>
                {expanded === 2 && <div className="answer">Yes. HealHub uses encrypted data transmission and secure storage in compliance with healthcare privacy regulations (like HIPAA/GDPR) to keep your personal and medical information safe.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
