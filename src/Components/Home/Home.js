import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import { Brain, Users, Calendar, BookOpen, Shield, MessageCircle, Heart } from "lucide-react";

import user1 from "../../assets/user1.jpg";
import user2 from "../../assets/user2.jpg";
import user3 from "../../assets/user3.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HealHub() {

  const services = [
    { icon: Brain, title: "Mental Health Assessment", description: "Take our scientifically-backed assessment to understand your current mental health status.", link: "/assessment" },
    { icon: Users, title: "Find Your Therapist", description: "Connect with licensed mental health professionals who specialize in your needs.", link: "/therapists" },
    { icon: Calendar, title: "Easy Scheduling", description: "Book therapy sessions at your convenience with our simple booking system.", link: "/therapists" },
    { icon: BookOpen, title: "Resources & Support", description: "Access our library of articles, guides, and tools for mental health support.", link: "/blog" }
  ];

  // Removed unused features array to fix eslint warning

  const testimonials = [
    {
      name: "Sarah M.",
      headline: "Therapy Client",
      role: "Anxiety Management",
      rating: 5.0,
      text: "HealHub helped me find the perfect therapist. The assessment was insightful and the booking process was seamless.",
      avatar: user1
    },
    {
      name: "David K.",
      headline: "Wellness Seeker",
      role: "Stress Relief",
      rating: 4.5,
      text: "The mental health resources and assessment tool gave me clarity on my anxiety. Highly recommend!",
      avatar: user2
    },
    {
      name: "Emma L.",
      headline: "Mental Health Advocate",
      role: "Depression Support",
      rating: 5.0,
      text: "Professional, caring, and convenient. HealHub made getting mental health support so much easier.",
      avatar: user3
    },
    {
      name: "Michael S.",
      headline: "Platform User",
      role: "General Therapy",
      rating: 4.0,
      text: "The platform is easy to use, and the therapists are highly professional. Very satisfied!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Olivia T.",
      headline: "Resource Enthusiast",
      role: "Self-Help Tools",
      rating: 3.5,
      text: "I love the resources section. The mental health tips and articles are very helpful.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Liam R.",
      headline: "Booking User",
      role: "Session Scheduling",
      rating: 4.1,
      text: "Booking therapy sessions is very simple and convenient. Great service!",
      avatar: "https://randomuser.me/api/portraits/men/58.jpg"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const decimalPart = rating - fullStars;
    const hasHalfStar = decimalPart >= 0.25 && decimalPart < 0.75;
    const hasQuarterStar = decimalPart >= 0.1 && decimalPart < 0.25;
    const hasThreeQuarterStar = decimalPart >= 0.75;
    let emptyStars = 5 - fullStars;

    if (hasHalfStar) {
      emptyStars -= 1;
    } else if (hasQuarterStar || hasThreeQuarterStar) {
      emptyStars -= 1;
    }

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }

    if (hasThreeQuarterStar) {
      stars.push(<span key="three-quarter" className="star three-quarter">★</span>);
    } else if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    } else if (hasQuarterStar) {
      stars.push(<span key="quarter" className="star quarter">★</span>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    return stars;
  };

  const navigate = useNavigate();

  const settings = {
    infinite: true,
    centerMode: false,
    centerPadding: '0px',
    speed: 600,
    slidesToShow: 3,     // show 3 testimonials at once
    slidesToScroll: 1,   // move 1 at a time
    autoplay: true,
    autoplaySpeed: 2500, // delay before next slide
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1, centerPadding: '0px' } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1, centerPadding: '0px' } }
    ]
  };

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <p className="hero-subtitle">Professional Mental Health Support</p>
          <h1 className="hero-title">Your Journey to Mental Wellness Starts Here</h1>
          <p className="hero-description">Connect with licensed therapists, take evidence-based assessments, and access resources to support your mental health journey in a safe, confidential environment.</p>
          <div className="hero-buttons">
            <button className="btn primary" onClick={() => navigate('/assessment')}>Take Free Assessment</button>
            <button className="btn secondary"onClick={() => navigate('/therapistinfo')}>Find a Therapist</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/hero.jpg" alt="Mental wellness" className="hero-img"/>
        </div>
      </section>

      {/* Supports Section Modern */}
      <section className="supports">
        <div className="max-w-6xl mx-auto text-center relative">
          <h2 className="text-3xl font-bold mb-12">How HealHub Supports You</h2>
          <div className="feature-grid">
            {services.map((service, idx) => (
              <div key={idx} className="feature-card">
                <service.icon />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* Why Choose HealHub Section */}
<section className="section">
  <div className="grid md:grid-cols-2 gap-10 items-center">
    {/* Left: Text + Features */}
    <div>
      <h2 className="text-3xl font-bold mb-4">Why Choose HealHub?</h2>
      <p className="text-gray-600 mb-6">
        We're committed to providing accessible, professional, and confidential mental health support for everyone.
      </p>
      <ul>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Licensed mental health professionals
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Secure and confidential platform
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Flexible scheduling options
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Evidence-based treatments
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          24/7 crisis support resources
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Affordable therapy options
        </li>
      </ul>
    </div>

    {/* Right: Card */}
    <div className="info-card">
      <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" role="img" aria-labelledby="title">
        <title id="title">Privacy Shield with Lock</title>
        <path fill="#7B1FA2" d="M12 2l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V6l7-4z"/>
        <rect x="9" y="10" width="6" height="5" rx="1" ry="1" fill="#fff"/>
        <rect x="10.5" y="11.2" width="3" height="2.6" rx="0.6" ry="0.6" fill="#7B1FA2"/>
        <circle cx="12" cy="13.5" r="0.3" fill="#7B1FA2"/>
      </svg>
      <h3>Your Privacy Matters</h3>
      <p>
        All conversations and data are protected with enterprise-grade security.
        Your mental health journey remains completely confidential.
      </p>
    </div>
  </div>
</section>


    <section className="testimonials">
  <div className="text-center">
    <h2 className="text-4xl font-bold mb-12">What Our Users Say</h2>
    <Slider {...settings}>
      {testimonials.map((testimonial, index) => (
        <div key={index}>
          <div className="testimonial-card p-8 bg-white rounded-2xl shadow-xl">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="avatar mx-auto mb-4 border-4 border-purple-300"
            />
            <div className="flex justify-center mb-4">
              {renderStars(testimonial.rating)}
            </div>
            <h3 className="text-lg font-semibold mb-1">{testimonial.headline}</h3>
            <p className="text-sm text-purple-600 mb-2">{testimonial.role}</p>

            <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
            <p className="font-semibold text-gray-900">— {testimonial.name}</p>
          </div>
        </div>
      ))}
    </Slider>
  </div>
</section>

{/* Footer */}
<footer className="footer">
  <div className="container mx-auto grid md:grid-cols-4 gap-8">
    
    {/* Logo + Description */}
    <div className="text-2xl font-bold text-purple-700 mb-3">
      <h2 className="footer-logo">HealHub</h2>
      <p className="footer-description">
        Professional mental health support made accessible and confidential.
      </p>
    </div>

    {/* Services */}
    <div className="footer-section">
      <h3 className="footer-section-title">Services</h3>
      <ul className="footer-list">
        <li><a href="/assessment" className="footer-link">Assessment</a></li>
        <li><a href="/therapistinfo" className="footer-link">Find Therapist</a></li>
        <li><a href="/resources" className="footer-link">Resources</a></li>
      </ul>
    </div>

    {/* Support */}
    <div className="footer-section">
      <h3 className="footer-section-title">Support</h3>
      <ul className="footer-list">
        <li><a href="/contact" className="footer-link">Contact Us</a></li>
        <li><a href="/resources#faq" className="footer-link">FAQ</a></li>
      </ul>
    </div>

    {/* Crisis Resources */}
    <div className="footer-section">
      <h3 className="footer-section-title">⚠️ Crisis Resources</h3>
      <p className="footer-crisis-text">
        National Suicide Prevention Lifeline: <strong>9152987821</strong>
      </p>
      <p className="footer-crisis-text">
        Crisis Support: Call <strong>9152987821</strong>
      </p>
      <p className="footer-crisis-text">
        Emergency Services: <strong>112</strong>
      </p>
    </div>
  </div>

  {/* Bottom Note */}
  <div className="bottom-note">
    © 2025 HealHub. All rights reserved. Professional mental health platform.
  </div>
</footer>


    </div>
  );
}
