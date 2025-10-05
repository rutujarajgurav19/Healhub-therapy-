import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import "./Feedback.css";

export default function Feedback() {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    message: "",
  });
  const [therapists, setTherapists] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    } else if (!loading && user) {
      fetchTherapists();
    }
  }, [user, loading, navigate]);

  const fetchTherapists = async () => {
    try {
      const response = await fetch("http://localhost/Healhub/api/therapists.php");
      const result = await response.json();
      setTherapists(Array.isArray(result) ? result : (result.therapists || []));
    } catch (error) {
      console.error("Error fetching therapists:", error);
    }
  };

  const uniqueSpecializations = [
    "Relationship Counselling",
    "Depression",
    "Anxiety",
    "Stress",
    "Parenting",
    "Lifestyle & Issues",
    "Trauma"
  ];

  const getFilteredTherapists = () => {
    return therapists.filter(t => {
      if (!t.specialties) return false;
      const therapistSpecs = Array.isArray(t.specialties) ? t.specializations : t.specialties.split(',').map(s => s.trim().toLowerCase());
      return therapistSpecs.some(spec => spec.toLowerCase().includes(selectedSpecialization.toLowerCase()));
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to access the feedback form.</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpecializationChange = (e) => {
    setSelectedSpecialization(e.target.value);
    setSelectedTherapist(""); // reset therapist
  };

  const handleTherapistChange = (e) => {
    const therapistId = e.target.value;
    const therapist = therapists.find(t => (t.id || t.therapist_id) == therapistId);
    setSelectedTherapist(therapist ? therapist.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTherapist) {
      alert("Please select a therapist.");
      return;
    }
    try {
      const response = await fetch("http://localhost/Healhub/api/feedback.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          therapist_name: selectedTherapist,
          rating: parseInt(formData.rating),
          message: formData.message,
        }),
      });
      const result = await response.json();
      if (result.status === "success") {
        alert("Thank you for your feedback!");
        navigate('/');
      } else {
        alert("Failed to submit feedback: " + result.message);
      }
    } catch (error) {
      alert("Error submitting feedback: " + error.message);
    }
  };

  return (
    <div className="feedback-page">
      {/* Hero Section */}
      <section className="feedback-hero">
        <div className="hero-text">
          <h1 className="hero-title">Share Your Feedback</h1>
          <p className="hero-description">
            Your input helps us improve our services and support more people on their mental health journey. Thank you for being part of HealHub.
          </p>
        </div>
      </section>

      <div className="feedback-container">
        <div className="feedback-card">
          <h3>Therapist Feedback Form</h3>
          <form className="feedback-form" onSubmit={handleSubmit}>
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

            <label>Therapy Type</label>
            <select
              value={selectedSpecialization}
              onChange={handleSpecializationChange}
              required
            >
              <option value="">Select therapy type</option>
              {uniqueSpecializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>

            <label>Therapist</label>
            <select
              value={selectedTherapist ? therapists.find(t => t.name === selectedTherapist)?.id : ""}
              onChange={handleTherapistChange}
              required
              disabled={!selectedSpecialization}
            >
              <option value="">Select therapist</option>
              {getFilteredTherapists().map(therapist => (
                <option key={therapist.id || therapist.therapist_id} value={therapist.id || therapist.therapist_id}>{therapist.name}</option>
              ))}
            </select>

            <label>Rating (1-5)</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value="">Select a rating</option>
              <option value="1">1 - Very Poor</option>
              <option value="2">2 - Poor</option>
              <option value="3">3 - Average</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Excellent</option>
            </select>

            <label>Feedback Message</label>
            <textarea
              name="message"
              placeholder="Tell us about your experience..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Submit Feedback</button>
          </form>
        </div>
      </div>
    </div>
  );
}
