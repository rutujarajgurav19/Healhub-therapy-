import React from "react";
import therapyImage from "../../assets/Addiction.svg";
import "./Addication.css";

export default function Addication() {
  return (
    <div className="addiction-page">
      {/* Header */}
      <header className="addiction-header">
        <h1>Addiction Counseling</h1>
        <p>
          Get support for overcoming addiction and building a healthier life.
          Our experts provide compassionate guidance to help you regain control.
        </p>
        <div className="addiction-buttons">
          <a href="/therapist" className="btn-primary">Find My Therapist</a>
        </div>
      </header>

      {/* Intro */}
      <section className="addiction-intro">
        <h2>Addiction Counseling Services</h2>
        <p>
          Our addiction counseling services address various forms of dependency,
          helping you understand the root causes and develop strategies for recovery.
        </p>
        <img src={therapyImage} alt="Addiction Counseling" className="addiction-image" />
      </section>

      {/* Challenges Section */}
      <section className="addiction-challenges">
        <h2>Addiction Challenges We Address</h2>
        <div className="challenge-cards">
          <div className="challenge-card">
            <h3>Substance Abuse</h3>
            <p>
              Substance abuse can disrupt every aspect of life, from health to relationships.
              Counseling helps identify triggers and build coping mechanisms for sobriety.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
          <div className="challenge-card">
            <h3>Alcohol Dependency</h3>
            <p>
              Alcohol dependency affects millions, leading to health issues and strained
              relationships. Our counselors provide support for detoxification and
              long-term recovery.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
          <div className="challenge-card">
            <h3>Drug Addiction</h3>
            <p>
              Drug addiction is a complex condition that requires comprehensive treatment.
              We offer therapy to address physical and psychological dependence.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
          <div className="challenge-card">
            <h3>Behavioral Addictions</h3>
            <p>
              Behavioral addictions like gambling or internet addiction can be just as debilitating.
              Counseling helps break the cycle and rebuild healthy habits.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
          <div className="challenge-card">
            <h3>Relapse Prevention</h3>
            <p>
              Many individuals face setbacks during recovery. Counseling provides tools
              and strategies to manage triggers, prevent relapse, and stay on track.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
          <div className="challenge-card">
            <h3>Dual Diagnosis</h3>
            <p>
              Addiction often coexists with mental health issues like anxiety or depression.
              Integrated counseling addresses both conditions for holistic recovery.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
        </div>
      </section>

      {/* Therapy Approaches */}
      <section className="addiction-approaches">
        <h2>Therapeutic Approaches</h2>
        <div className="approach-cards">
          <div className="approach-card">
            <h3>Cognitive Behavioral Therapy (CBT)</h3>
            <p>
              CBT helps clients recognize destructive thought patterns and replace them with
              healthier behaviors that support recovery.
            </p>
          </div>
          <div className="approach-card">
            <h3>Motivational Interviewing</h3>
            <p>
              A client-centered approach that enhances motivation and commitment to change
              by exploring personal goals and values.
            </p>
          </div>
          <div className="approach-card">
            <h3>Group Therapy</h3>
            <p>
              Group sessions provide peer support, shared experiences, and accountability
              to reinforce positive change.
            </p>
          </div>
          <div className="approach-card">
            <h3>Family Therapy</h3>
            <p>
              Addiction impacts families as well. Therapy strengthens communication,
              repairs relationships, and creates a supportive environment for healing.
            </p>
          </div>
        </div>
      </section>

      {/* Support Resources */}
      <section className="addiction-resources">
        <h2>Support Resources</h2>
        <ul>
          <li>24/7 Helpline: <strong>1-800-HEALHUB</strong></li>
          <li>Emergency: Call <strong>911</strong> if you or a loved one are in immediate danger</li>
          <li>National Helpline (SAMHSA): <strong>1-800-662-4357</strong></li>
          <li>Anonymous Support Groups available through HealHub community</li>
        </ul>
      </section>
    </div>
  );
}
