// src/pages/Therapy/Trauma.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import "./Truma.css";

export default function Trauma() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleBookSession = () => {
    if (user) {
      navigate('/booking');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="trauma-page">
      {/* Header */}
      <header className="trauma-header">
        <h1>Trauma Therapy</h1>
        <p>
          Seek trauma counselling from qualified mental health experts who provide a safe space to talk about your experiences.
        </p>
        <div className="trauma-buttons">
          <Link to="/therapist" className="btn-primary">Find My Therapist</Link>
        </div>
      </header>

      {/* Intro */}
      <section className="trauma-intro">
        <h2>Does it Ever Really Go Away?</h2>
        <img src={require("../../assets/trauma.jpg")} alt="Trauma" className="trauma-image" />
        <p>
          When we hear the word trauma, we think of wars, natural disasters, and assault. Trauma also involves subtle but impactful incidents such as childhood experiences or abusive relationships. Trauma becomes distressing when the response to these events affects your mental and neurobiological functioning.
        </p>
        <p>
          Seeking counselling for trauma helps process experiences, manage symptoms, and develop healthy coping strategies for future stressful events.
        </p>
      </section>

      {/* Disorders */}
      <section className="trauma-disorders">
        <h2>Trauma-Related Conditions</h2>
        <div className="disorder-cards">
          <div className="disorder-card">
            <h3>Post-Traumatic Stress Disorder</h3>
            <p>
              Dealing with trauma alone can be devastating. PTSD may involve intrusive thoughts, nightmares, or flashbacks. Trauma-informed therapists provide strategies to process these experiences safely.
            </p>
            <Link to="/ptsd" className="view-details">View Details {'>'}</Link>
          </div>
          <div className="disorder-card">
            <h3>Complex PTSD</h3>
            <p>
              Complex PTSD arises from prolonged trauma, affecting security, emotions, relationships, and self-perception. Counseling can provide coping strategies and emotional regulation skills.
            </p>
            <Link to="/complex-ptsd" className="view-details">View Details {'>'}</Link>
          </div>
        </div>
      </section>

      {/* Therapy Approach */}
      <section className="trauma-approach">
        <h2>Trauma Therapy Approach</h2>
        <div className="approach-cards">
          <div className="approach-card">
            <h3>Trauma-Informed Counseling</h3>
            <p>Focuses on understanding a person’s history, trauma manifestations, and patterns in a safe, insightful way.</p>
          </div>
          <div className="approach-card">
            <h3>Cognitive Behaviour Therapy</h3>
            <p>Helps identify and replace negative thoughts, equips with breathing techniques, and teaches coping with anxiety.</p>
          </div>
          <div className="approach-card">
            <h3>Acceptance & Commitment Therapy</h3>
            <p>Enhances psychological and behavioral flexibility to regain control over painful reactions to trauma.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
