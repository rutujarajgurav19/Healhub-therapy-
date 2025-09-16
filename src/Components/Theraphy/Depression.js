// src/pages/Therapy/StressAnxietyDepression.js
import React from "react";
import { Link } from "react-router-dom";
import therapyImg1 from "../../assets/therapy1.jpg"; // replace with your images

import "./Depression.css";

export default function StressAnxietyDepression() {
  const approaches = [
    { title: "Cognitive Behavioural Therapy (CBT)", description: "CBT focuses on understanding and restructuring anxious thought patterns and developing healthier coping strategies." },
    { title: "Mindfulness Training", description: "Helps center your mind, improve focus, and increase resilience by bringing awareness to the present moment." },
    { title: "Dialectical Behaviour Therapy (DBT)", description: "Focuses on acknowledging negative behaviors and emotions while learning validation and stress management skills." },
    { title: "Behavioural Therapy", description: "Encourages positive activities that enhance your sense of well-being and emotional health." }
  ];

  return (
    <div className="therapy-page">
      {/* Header Section */}
      <header className="therapy-header">
        <h1>Stress, Anxiety & Depression Therapy</h1>
        <p>
          Avail counseling for stress, depression, and anxiety from the best therapists who
          will guide you in coping effectively with your distress.
        </p>
        <div className="therapy-buttons">
          <Link to="/therapist" className="btn-primary">Find My Therapist</Link>
          <Link to="/signup" className="btn-secondary">Book Session</Link>
        </div>
      </header>

      {/* How Are You Today Section */}
      <section className="therapy-checkin">
        <h2>How Are You Today?</h2>
        <p>
          Feeling overwhelmed is normal in our fast-paced lives. Recognizing your emotions,
          pausing, and asking yourself "Am I okay?" is essential. Persistent stress, low mood,
          or anxiety may indicate a need for counseling.
        </p>
        <ul>
          <li>Everyone experiences ups and downs; seeking help is a sign of strength.</li>
          <li>Daily stressors can affect sleep, appetite, and energy levels.</li>
          <li>Checking in with yourself helps identify early signs of burnout or anxiety.</li>
          <li>Counseling provides a safe, confidential space to explore your thoughts and feelings.</li>
          <li>Small lifestyle adjustments combined with therapy improve resilience and clarity.</li>
        </ul>
      </section>

      {/* Impact on Daily Life Section */}
      <section className="therapy-impact">
        <h2>Impact on Daily Life</h2>
        <div className="impact-content">
          <div className="impact-text">
            <p>
              Conditions like depression, anxiety, and stress can reduce mental and physical well-being,
              affecting attention, productivity, and personal relationships. Therapy helps restore balance
              and improves cognitive and emotional health.
            </p>
            <ul>
              <li>Emotional strain affects focus, motivation, and decision-making.</li>
              <li>Stress and anxiety may trigger physical symptoms such as headaches or fatigue.</li>
              <li>Social connections may suffer, leading to isolation or withdrawal.</li>
              <li>Therapy equips you with coping strategies and emotional regulation skills.</li>
              <li>Early intervention prevents escalation and supports long-term mental wellness.</li>
            </ul>
          </div>
          <div className="impact-image">
            <img src={therapyImg1} alt="Therapy illustration" />
          </div>
        </div>
      </section>

      {/* Therapy Concerns */}
      <section className="therapy-concerns">
        <h2>Common Concerns We Address</h2>
        <ul>
          <li>Phobia Disorder</li>
          <li>Grief</li>
          <li>Exam Anxiety</li>
          <li>Generalized Anxiety Disorder</li>
          <li>OCD</li>
          <li>Panic Disorder</li>
          <li>Social Anxiety</li>
          <li>Health Anxiety</li>
          <li>Loneliness</li>
          <li>Anxiety</li>
          <li>Depression</li>
          <li>Stress</li>
        </ul>
      </section>

      {/* Therapy Approaches */}


      <section className="therapy-action">
        <h2>Get Started</h2>
        <p>
          Take the first step toward better mental health. Book a session or find a therapist
          to help you manage your stress, anxiety, or depression.
        </p>
      </section>
    </div>
  );
}
