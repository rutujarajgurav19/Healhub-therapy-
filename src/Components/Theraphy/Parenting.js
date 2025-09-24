// src/pages/Therapy/Parenting.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import parentingImage from "../../assets/parenting.jpg";
import "./Parenting.css";

export default function Parenting() {
  const navigate = useNavigate();

  return (
    <div className="parenting-page">
      {/* Header */}
      <header className="parenting-header">
        <h1>Parenting</h1>
        <p>
          Get help for your parenting-related concerns from skilled counselors at HealHub.
          Build stronger relationships with your children and learn positive parenting techniques
          for a healthier family environment.
        </p>
        <div className="parenting-buttons">
          <Link to="/therapist" className="btn-primary">Find My Therapist</Link>
        </div>
      </header>

      {/* Intro */}
      <section className="parenting-intro">
        <h2>Am I Parenting The Right Way?</h2>
        <img
          src={parentingImage}
          alt="Parenting"
          className="parenting-image"
        />
        <p>
          Parenting is a journey with its own set of ups and downs.
          In today’s world of self-awareness and evolving parenting styles, it’s natural
          to doubt your parenting skills. Whether it’s positive parenting, co-parenting,
          or building a strong parent-child bond, guidance can help you feel more confident.
        </p>
        <p>
          Challenges like parental pressure, conflicts, separation anxiety, or generational gaps
          may leave you feeling stressed and unsure. Through counseling, you can reorient your
          energy towards effective parenting, communication, and self-care while strengthening
          your bond with your child.
        </p>
      </section>

      {/* Challenges Section */}
      <section className="parenting-challenges">
        <h2>Challenges in Parenting</h2>
        <div className="challenge-cards">
          <div className="challenge-card">
            <h3>Parental Pressure</h3>
            <p>
              Striving for your child’s success is natural, but sometimes expectations
              can lead to stress and anxiety for both parent and child. Counseling helps
              improve communication and create a more supportive approach.
            </p>

          </div>
          <div className="challenge-card">
            <h3>Single Parenting</h3>
            <p>
              Managing work, home, and parenting alone can feel overwhelming. Counseling
              provides coping tools, guidance, and emotional support to help you raise your child
              with confidence.
            </p>

          </div>
          <div className="challenge-card">
            <h3>Parenting Conflicts</h3>
            <p>
              Differences in parenting styles can strain relationships. Therapy helps parents
              find common ground, improve communication, and create collaborative parenting strategies.
            </p>

          </div>
          <div className="challenge-card">
            <h3>Generation Gap</h3>
            <p>
              Misunderstandings between parents and children due to cultural or lifestyle differences
              can create distance. Therapy helps bridge the gap and foster stronger relationships.
            </p>

          </div>
          <div className="challenge-card">
            <h3>Work-Life Balance</h3>
            <p>
              Balancing professional responsibilities with family time can create
              stress. Counseling helps parents set boundaries and prioritize quality
              time with children.
            </p>

          </div>

          <div className="challenge-card">
            <h3>Separation Anxiety</h3>
            <p>
              Children and parents may both experience anxiety when apart. Therapy
              offers tools to manage emotions, build resilience, and foster trust.
            </p>

          </div>
        </div>
      </section>

      {/* Why Choose HealHub */}
      <section className="parenting-benefits">
        <h2>Why Choose HealHub for Parenting Counseling?</h2>
        <div className="benefits-list">
          <div className="benefit-item">
            <h3>Expert Guidance</h3>
            <p>
              Our licensed therapists specialize in parenting issues and provide evidence-based strategies tailored to your family's needs.
            </p>
          </div>
          <div className="benefit-item">
            <h3>Personalized Support</h3>
            <p>
              We understand that every family is unique. Our counseling sessions are customized to address your specific challenges and goals.
            </p>
          </div>
          <div className="benefit-item">
            <h3>Holistic Approach</h3>
            <p>
              We focus on the whole family dynamic, helping parents build stronger relationships with their children while managing their own well-being.
            </p>
          </div>
          <div className="benefit-item">
            <h3>Practical Tools</h3>
            <p>
              Learn actionable techniques for communication, discipline, and emotional regulation that you can apply immediately in your daily life.
            </p>
          </div>
        </div>
      </section>

      {/* Therapy Approaches */}
      <section className="parenting-approach">
        <h2>Parenting Therapy Approaches</h2>
        <div className="approach-cards">
          <div className="approach-card">
            <h3>Attachment-Based Therapy</h3>
            <p>
              Strengthens emotional bonds between parent and child, improving trust
              and secure attachments.
            </p>
          </div>
          <div className="approach-card">
            <h3>Positive Parenting</h3>
            <p>
              Encourages non-punitive methods and positive reinforcement to build a
              supportive environment for children.
            </p>
          </div>
          <div className="approach-card">
            <h3>Cognitive-Behavioral Parenting Therapy</h3>
            <p>
              Helps parents challenge ineffective parenting strategies by changing
              negative thought patterns and behaviors.
            </p>
          </div>
          <div className="approach-card">
            <h3>Mindful Parenting</h3>
            <p>
              Teaches parents mindfulness techniques to manage stress and respond
              empathetically to their child’s needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
