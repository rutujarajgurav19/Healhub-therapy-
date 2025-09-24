import React from "react";
import relationshipImage from "../../assets/Relationship.jpg";
import "./RelationshipCounseling.css";

export default function RelationshipCounseling() {
  return (
    <div className="relationship-page">
      {/* Header */}
      <header className="relationship-header">
        <h1>Relationship Counseling</h1>
        <p>
          Talk to a counselor and get guidance on important aspects of
          relationships. Our experts are here to help you heal, grow, and
          strengthen your bonds.
        </p>
        <div className="relationship-buttons">
          <a href="/therapist" className="btn-primary">Find My Therapist</a>
        </div>
      </header>

      {/* Intro */}
      <section className="relationship-intro">
        <h2>Relationship Counseling Services</h2>
        <p>
          Our relationship counseling services cover a wide range of issues to help you navigate the complexities of interpersonal connections.
        </p>
        <img src={relationshipImage} alt="Relationship Counseling" className="relationship-image" />
      </section>

      {/* Challenges Section */}
      <section className="relationship-challenges">
        <h2>Relationship Challenges We Address</h2>
        <div className="challenge-cards">
          <div className="challenge-card">
            <h3>Cheating & Infidelity</h3>
            <p>
              Discovering or experiencing infidelity can be one of the most
              painful challenges in a relationship. It often leaves partners
              feeling betrayed, insecure, and unsure about the future of their
              bond. Counselors provide a safe and non-judgmental space to
              express emotions, process the shock, and explore the reasons
              behind the betrayal. With guidance, couples can work toward
              rebuilding trust, making informed decisions about their
              relationship, or moving forward individually with healing.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
          <div className="challenge-card">
            <h3>Break Up</h3>
            <p>
              A breakup can feel like the world has been turned upside down. The
              loss of a relationship often brings deep sadness, loneliness, and
              even a loss of identity. Talking to a counselor during this time
              can help you process the grief, rediscover your sense of self, and
              rebuild your confidence. Counselors offer emotional support and
              coping strategies, empowering you to heal from the pain and
              embrace a fresh start with resilience and strength.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
          <div className="challenge-card">
            <h3>Pre-Marital</h3>
            <p>
              Marriage is a beautiful commitment, but it also brings challenges
              that require understanding and preparation. Pre-marital counseling
              allows couples to explore important topics such as communication
              styles, conflict resolution, financial planning, family
              expectations, and shared values. These conversations help create a
              solid foundation for marriage, reducing future conflicts and
              increasing relationship satisfaction.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
          <div className="challenge-card">
            <h3>Dating</h3>
            <p>
              Dating can be exciting, but it also comes with uncertainties and
              challenges. Many people struggle with finding compatible partners,
              maintaining healthy boundaries, or overcoming fears of rejection.
              A counselor can help you identify what you truly want in a
              relationship, boost your self-esteem, and build confidence to
              create healthy and meaningful connections.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
          <div className="challenge-card">
            <h3>Family</h3>
            <p>
              Family relationships are at the heart of our lives, but they can
              also be a source of conflict, misunderstanding, and stress. From
              communication gaps between parents and children to sibling rivalry
              or struggles with in-laws, these issues can create lasting
              tension. Counselors assist families in improving communication,
              strengthening bonds, and resolving conflicts, fostering a more
              supportive and loving environment.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
          <div className="challenge-card">
            <h3>Toxic Relationship</h3>
            <p>
              Toxic relationships can drain your energy, damage your self-esteem,
              and impact your overall well-being. These relationships are often
              filled with manipulation, control, disrespect, or emotional harm.
              Recognizing toxicity is the first step toward healing. Counselors
              guide you in setting boundaries, rebuilding confidence, and making
              healthier choices for your emotional and mental health.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
          <div className="challenge-card">
            <h3>Friendship</h3>
            <p>
              Friendships play a vital role in our happiness, but even they can
              become complicated. Conflicts, misunderstandings, or feelings of
              neglect may cause strain in what should be supportive
              relationships. Counselors can help you explore these issues,
              rebuild trust, and maintain healthy friendships that nurture your
              growth and well-being.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
          <div className="challenge-card">
            <h3>Communication Issues</h3>
            <p>
              Misunderstandings, frequent arguments, or the inability to express feelings
              openly are common struggles in relationships. Counseling helps partners
              develop healthy communication skills, learn active listening, and resolve
              conflicts constructively, building stronger and more respectful bonds.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
          <div className="challenge-card">
            <h3>Trust Issues</h3>
            <p>
              Trust is the foundation of any relationship. When it’s broken due to lies,
              secrecy, or past experiences, it can be difficult to move forward. Counselors
              provide guidance to rebuild trust, set boundaries, and create a more secure
              and stable connection between partners.
            </p>
            <a href="/booking" className="view-details">Book Appointment {'>'}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
