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
              Mon–Fri: 9AM–8PM EST <br />
              Sat–Sun: 10AM–6PM EST
            </p>
          </div>

          <div className="info-card crisis-card">
            <h3>⚠️ Crisis Resources</h3>
            <p>
              National Suicide Prevention Lifeline: <strong>988</strong> (24/7)
            </p>
            <p>
              Crisis Text Line: Text <strong>HOME</strong> to 741741 (24/7)
            </p>
            <p>
              Emergency Services: <strong>911</strong>
            </p>
          </div>

          <div className="info-card">
            <h3>Quick Help</h3>
            <ul>
              <li>How do I book a session?</li>
              <li>What insurance do you accept?</li>
              <li>How do I change my appointment?</li>
              <li>Is my information secure?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
