import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    urgency: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/healhub/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        alert("Your message has been sent. We'll get back to you soon!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          urgency: "",
          message: "",
        });
      } else {
        alert("Error sending message: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <div className="contact-page">
      {/* Contact Form */}
      <div className="contact-form card">
        <h2>Get in Touch</h2>
        <p className="subtitle">
          We're here to help. Reach out to our support team or access crisis resources when you need them.
        </p>

        <form onSubmit={handleSubmit}>
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
          <select name="subject" value={formData.subject} onChange={handleChange} required>
            <option value="">Select a topic</option>
            <option value="GeneralQuestion">General Question</option>
            <option value="TechnicalSupport">Technical Support</option>
            <option value="TherapistInquiry">Therapist Inquiry </option>
            <option value="Feedback">Feedback
 </option>
          </select>

          <label>Urgency Level</label>
          <select name="urgency" value={formData.urgency} onChange={handleChange} required>
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
          />

          <button type="submit" className="btn primary">Send Message</button>
        </form>
      </div>

      {/* Info Container */}
      <div className="info-container">
        {/* Contact Information */}
        <div className="contact-info card">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> support@healhub.com</p>
          <p><strong>Phone:</strong> 1-800-HEALHUB</p>
          <p><strong>Support Hours:</strong><br />Mon-Fri: 9AM-8PM EST<br />Sat-Sun: 10AM-6PM EST</p>
        </div>

        {/* Crisis Resources */}
        <div className="crisis-resources-card card">
          <div className="crisis-resources">
            <h2>⚠️ Crisis Resources</h2>
            <ul>
              <li><strong>National Suicide Prevention Lifeline:</strong> 988 (24/7 Free & Confidential)</li>
              <li><strong>Crisis Text Line:</strong> Text HOME to 741741 (24/7 Crisis Support)</li>
              <li><strong>Emergency Services:</strong> Call 911 (For immediate danger)</li>
            </ul>
          </div>
        </div>

        {/* Quick Help */}
        <div className="quick-help-card card">
          <h3>Quick Help</h3>
          <ul className="quick-help">
            <li>How do I book a session?</li>
            <li>What insurance do you accept?</li>
            <li>How do I change my appointment?</li>
            <li>Is my information secure?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
