import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import { Brain, Users, Calendar, BookOpen, Shield, MessageCircle, Heart } from "lucide-react";

import heroImg from "../../assets/hero.jpg";
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
      rating: 5.0,
      text: "HealHub helped me find the perfect therapist. The assessment was insightful and the booking process was seamless.",
      avatar: user1
    },
    {
      name: "David K.",
      rating: 4.5,
      text: "The mental health resources and assessment tool gave me clarity on my anxiety. Highly recommend!",
      avatar: user2
    },
    {
      name: "Emma L.",
      rating: 5.0,
      text: "Professional, caring, and convenient. HealHub made getting mental health support so much easier.",
      avatar: user3
    },
    {
      name: "Michael S.",
      rating: 4.0,
      text: "The platform is easy to use, and the therapists are highly professional. Very satisfied!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Olivia T.",
      rating: 3.5,
      text: "I love the resources section. The mental health tips and articles are very helpful.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Liam R.",
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
    speed: 600,
    slidesToShow: 3,     // show 3 testimonials at once
    slidesToScroll: 1,   // move 1 at a time
    autoplay: true,
    autoplaySpeed: 2500, // delay before next slide
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero flex flex-col md:flex-row items-center justify-between py-20 px-6 bg-gradient-to-b from-purple/10 to-white">
        <div className="hero-text md:w-1/2 text-center md:text-left">
          <p className="uppercase text-sm font-semibold text-purple-600 mb-2">Professional Mental Health Support</p>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">Your Journey to Mental Wellness Starts Here</h1>
          <p className="text-gray-700 mb-8 max-w-lg">Connect with licensed therapists, take evidence-based assessments, and access resources to support your mental health journey in a safe, confidential environment.</p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="btn primary" onClick={() => navigate('/assessment')}>Take Free Assessment</button>
            <button className="btn secondary"onClick={() => navigate('/therapistinfo')}>Find a Therapist</button>
          </div>
        </div>
        <div className="hero-image md:w-1/2 mt-10 md:mt-0">
          <img src={heroImg} alt="Mental wellness" className="rounded-lg shadow-lg"/>
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
  <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
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
      <svg xmlns="https://www.svgrepo.com/show/331250/privacy.svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12l9-5-9-5-9 5 9 5zm0 0l9-5-9-5-9 5 9 5zm0 0v10" />
      </svg>
      <h3>Your Privacy Matters</h3>
      <p>
        All conversations and data are protected with enterprise-grade security.  
        Your mental health journey remains completely confidential.
      </p>
    </div>
  </div>
</section>


    <section className="testimonials px-4">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold mb-12">What Our Users Say</h2>
    <Slider {...settings}>
      {testimonials.map((testimonial, index) => (
        <div key={index} className="px-3">
          <div className="testimonial-card p-8 bg-white rounded-2xl shadow-xl">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name} 
              className="avatar mx-auto mb-4 border-4 border-purple-300"
            />
            <h3 className="text-lg font-semibold mb-1">{testimonial.headline}</h3>
            <p className="text-sm text-purple-600 mb-2">{testimonial.role}</p>
            <div className="flex justify-center mb-4">
              {renderStars(testimonial.rating)}
            </div>

            <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
            <p className="font-semibold text-gray-900">— {testimonial.name}</p>
            <p className="text-gray-500 text-sm mt-2">{testimonial.location}</p>
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
    <div>
      <h2 className="text-2xl font-bold text-purple-700 mb-3">HealHub</h2>
      <p className="text-gray-600 text-sm leading-relaxed">
        Professional mental health support made accessible and confidential.
      </p>
    </div>

    {/* Services */}
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Services</h3>
      <ul className="space-y-2">
        <li><a href="/assessment" className="hover:text-purple-600">Assessment</a></li>
        <li><a href="/therapistinfo" className="hover:text-purple-600">Find Therapist</a></li>
        <li><a href="/resources" className="hover:text-purple-600">Resources</a></li>
      </ul>
    </div>

    {/* Support */}
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Support</h3>
      <ul className="space-y-2">
        <li><a href="/contact" className="hover:text-purple-600">Contact Us</a></li>
        <li><a href="#crisis" className="hover:text-purple-600">Crisis Support</a></li>
        <li><a href="#faq" className="hover:text-purple-600">FAQ</a></li>
      </ul>
    </div>

    {/* Crisis Resources */}
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Crisis Resources</h3>
      <p className="text-gray-600 text-sm mb-2">
        National Suicide Prevention Lifeline:
      </p>
      <p className="font-bold">988</p>
      <p className="text-gray-600 text-sm mt-2">Crisis Text Line:</p>
      <p className="font-bold">Text HOME to 741741</p>
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
