import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Therapistsinfo.css";
import PriyaImg from "../../assets/therapists/Priya.jpg";
import emilyImg from "../../assets/therapists/emily.jpg";
import RajeshImg from "../../assets/therapists/Rajesh.jpg";
import MichaelImg from "../../assets/therapists/Michael.jpg";
import AaravImg  from "../../assets/therapists/Aarav.jpg";
import OliviaImg from "../../assets/therapists/Olivia.jpg";
import AnjaliImg  from "../../assets/therapists/Anjali.jpg";
import DavidImg from "../../assets/therapists/David.jpg";
import KavitaImg from "../../assets/therapists/Kavita.jpg";
import EthanImg from "../../assets/therapists/Ethan.jpg";
import MeeraImg from "../../assets/therapists/Meera.jpg";
import KevinImg from "../../assets/therapists/Kevin.jpg";
import RohanImg from "../../assets/therapists/Rohan.jpg";
import SophiaImg from "../../assets/therapists/Sophia.jpg";
import ArjunImg from "../../assets/therapists/Arjun.jpg";
import LisaImg from "../../assets/therapists/Lisa.jpg"; 

const therapists = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    title: "Clinical Psychologist",
    education: "Ph.D.in Clinical Psychology,Stanford University",
    experience: "12+ years experience",
    specializations: ["Anxiety Disorders", "Depression", "Trauma Therapy"],
    approach: "Cognitive Behavioral Therapy (CBT) and EMDR",
    availability: "Available today",
    rating: "4.9 (127 reviews)",
    location: "Mumbai, India",
    price: "$120/session",
    image: PriyaImg,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Relationship Counsellor",
    education: "  M.A. in Counseling Psychology,  UCLA",
    experience: "8+ years experience",
    specializations: ["Relationship Counselling",  "Stress Management",  "Depression",  "Anxiety"],
    approach: "Solution-Focused  Brief  Therapy  and  Mindfulness-Based  Cognitive  Therapy",
    availability: "Available this week",
    rating: "4.8 (89 reviews)",
    location: "Los Angeles, CA",
    price: "$100/session",
    image: MichaelImg,
  },
  {
    id: 3,
    name: "Dr. Rajesh Kumar",
    title: "Marriage & Family Therapist",
    education: "M.S. in Marriage and Family Therapy, University of Delhi",
    experience: "15+ years experience",
    specializations: ["Family Therapy", "Couples Counseling", "Teen Issues"],
    approach: "Systemic Family Therapy and Bowenian Therapy",
    availability: "Available tomorrow",
    rating: "4.9 (203 reviews)",
    location: "Delhi, India",
    price: "$110/session",
  image: RajeshImg,
  },
  {
    id: 4,
    name: "Dr. Emily Rodriguez",
    title: "Psychiatrist",
    education: "M.D. in Psychiatry, Harvard Medical School",
    experience: "6+ years experience",
    specializations: ["Bipolar Disorder", "Medication Management", "Depression"],
    approach: "Integrative Psychiatry combining medication and psychotherapy",
    availability: "Available next week",
    rating: "4.7 (156 reviews)",
    location: "Chicago, IL",
    price: "$150/session",
    image: emilyImg,
  },
  {
    id: 5,
    name: "Dr. Aarav Singh",
    title: "Clinical Social Worker",
    education: "M.S.W., Tata Institute of Social Sciences",
    experience: "9+ years experience",
    specializations: ["Grief Counseling", "Life Transitions", "Mindfulness"],
    approach: "Person-Centered Therapy and Mindfulness-Based Stress Reduction",
    availability: "Available today",
    rating: "4.8 (94 reviews)",
    location: "Denver, CO",
    price: "$95/session",
    image: AaravImg ,
  },
  {
    id: 6,
    name: "Dr. Olivia Taylor",
    title: "Behavioral Therapist",
    education: "Ph.D.in Behavioral Psychology,University of Washington",
    experience: "11+ years experience",
    specializations: ["OCD", "Phobias", "Behavioral Issues"],
    approach: "Exposure and Response Prevention (ERP) and Acceptance and Commitment Therapy",
    availability: "Available this week",
    rating: "4.9 (112 reviews)",
    location: "Portland, OR",
    price: "$115/session",
   image: OliviaImg,
  },
  {
    id: 7,
    name: "Dr. Anjali Gupta",
    title: "Counseling Psychologist",
    education: "M.Phil in Clinical Psychology, NIMHANS",
    experience: "7+ years experience",
    specializations: ["Anxiety", "Self-Esteem", "Career Counseling"],
    approach: "Humanistic Therapy and Rational Emotive Behavior Therapy",
    availability: "Available today",
    rating: "4.8 (98 reviews)",
    location: "Bangalore, India",
    price: "$105/session",
   image: AnjaliImg ,
  },
  {
    id: 8,
    name: "Dr. David Patel",
    title: "Clinical Therapist",
    education: "Psy.D. in Clinical Psychology, University of Texas",
    experience: "13+ years experience",
    specializations: ["Depression", "PTSD", "EMDR"],
    approach: "Eye Movement Desensitization and Reprocessing (EMDR) and Trauma-Focused CBT",
    availability: "Available tomorrow",
    rating: "4.7 (145 reviews)",
    location: "Austin, TX",
    price: "$125/session",
    image: DavidImg,
  },
  {
    id: 9,
    name: "Dr. Kavita Rao",
    title: "Family Counselor",
    education: "M.A. in Family Counseling, Osmania University",
    experience: "14+ years experience",
    specializations: ["Family Dynamics", "Parenting", "Adolescent Issues"],
    approach: "Structural Family Therapy and Parent-Child Interaction Therapy",
    availability: "Available this week",
    rating: "4.9 (167 reviews)",
    location: "Hyderabad, India",
    price: "$110/session",
   image:KavitaImg,
  },
  {
    id: 10,
    name: "Dr. Ethan Wilson",
    title: "Addiction Specialist",
    education: "Ph.D. in Addiction Psychology, Johns Hopkins University",
    experience: "16+ years experience",
    specializations: ["Substance Abuse", "Recovery", "Relapse Prevention"],
    approach: "Motivational Interviewing and Cognitive Behavioral Therapy for Addiction",
    availability: "Available next week",
    rating: "4.6 (89 reviews)",
    location: "Raleigh, NC",
    price: "$130/session",
   image: EthanImg,
  },
  {
    id: 11,
    name: "Dr. Meera Joshi",
    title: "Art Therapist",
    education: "M.A. in Art Therapy, Savannah College of Art and Design",
    experience: "6+ years experience",
    specializations: ["Creative Therapy", "Trauma", "Emotional Expression"],
    approach: "Art Therapy and Expressive Arts Therapy",
    availability: "Available today",
    rating: "4.8 (76 reviews)",
    location: "Bangalore, India",
    price: "$95/session",
    image:MeeraImg,
  },
  {
    id: 12,
    name: "Dr. Kevin Brown",
    title: "Sports Psychologist",
    education: "Ph.D. in Sports Psychology, University of Florida",
    experience: "12+ years experience",
    specializations: ["Performance Anxiety", "Motivation", "Injury Recovery"],
    approach: "Performance Psychology and Mental Skills Training",
    availability: "Available this week",
    rating: "4.7 (112 reviews)",
    location: "Phoenix, AZ",
    price: "$120/session",
   image: KevinImg,
  },
  {
    id: 13,
    name: "Dr. Rohan Desai",
    title: "Geriatric Therapist",
    education: "M.S. in Geriatric Psychology, University of Southern California",
    experience: "8+ years experience",
    specializations: ["Elder Care", "Dementia", "Life Transitions"],
    approach: "Geriatric Psychotherapy and Reminiscence Therapy",
    availability: "Available tomorrow",
    rating: "4.9 (134 reviews)",
    location: "Chennai, India",
    price: "$100/session",
   image: RohanImg,
  },
  {
    id: 14,
    name: "Dr. Sophia Martinez",
    title: "Relationship Counsellor",
    education: "M.A. in Couples Therapy, The Gottman Institute",
    experience: "10+ years experience",
    specializations: ["Depression", "Anxiety", "Stress", "Parenting", "Lifestyle & Issues", "Trauma"],
    approach: "Gottman Method Couples Therapy and Emotionally Focused Therapy",
    availability: "Available this week",
    rating: "4.8 (156 reviews)",
    location: "Denver, CO",
    price: "$115/session",
   image: SophiaImg,
  },
  {
    id: 15,
    name: "Dr. Arjun Nair",
    title: "Child Psychologist",
    education: "Ph.D. in Child Psychology, University of Michigan",
    experience: "9+ years experience",
    specializations: ["Child Development", "Behavioral Issues", "Play Therapy"],
    approach: "Play Therapy and Child-Centered Therapy",
    availability: "Available today",
    rating: "4.9 (98 reviews)",
    location: "Pune, India",
    price: "$105/session",
   image: ArjunImg,
  },
  {
    id: 16,
    name: "Dr. Lisa Thompson",
    title: "Relationship Counsellor",
    education: "M.A. in Marriage and Family Therapy, University of Toronto",
    experience: "5+ years experience",
    specializations: ["Relationship Counselling", "Depression", "Anxiety", "Stress"],
    approach: "Emotionally Focused Therapy and Cognitive Behavioral Therapy",
    availability: "Available this week",
    rating: "4.8 (134 reviews)",
    location: "Toronto, Canada",
    price: "$125/session",
   image: LisaImg,
  },
];

export default function Therapists() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All Specialties");
  const [location, setLocation] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // collect all specialties
  const allSpecialties = [
    "All Specialties",
    "Relationship Counselling",
    "Depression",
    "Anxiety",
    "Stress",
    "Parenting",
    "Lifestyle & Issues",
    "Trauma",
  ];

  const filteredTherapists = therapists.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.specializations.some((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      );

    const matchesSpecialty =
      specialty === "All Specialties"
        ? true
        : specialty === "Relationship Counselling"
        ? t.specializations.some((spec) =>
            ["Depression", "Anxiety", "Stress", "Parenting", "Lifestyle & Issues", "Trauma"].includes(spec)
          )
        : t.specializations.includes(specialty);

    const matchesLocation =
      location === "" ||
      t.location.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const handleCloseMessage = () => {
    setSelectedTherapist(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Here you can handle sending the message, e.g., call an API or show a success message
    alert(`Message sent to ${selectedTherapist.name}!`);
    setSelectedTherapist(null);
  };

  const renderStars = (rating) => {
    const stars = [];
    const ratingNum = parseFloat(rating.split(' ')[0]);
    const fullStars = Math.floor(ratingNum);
    const hasHalfStar = ratingNum % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star">★</span>);
    }
    return stars;
  };

  return (
    <div className="therapists">
      <h2>Find Your Perfect Therapist</h2>
      <p className="subtitle">
        Connect with licensed mental health professionals who specialize in your
        specific needs
      </p>

      {/* Filter Section */}
      <div className="filter-box">
        <h3 className="filter-title">🔍 Filter Therapists</h3>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="custom-dropdown">
            <div
              className="dropdown-selected"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {specialty}
              <span className="dropdown-arrow">{dropdownOpen ? "▲" : "▼"}</span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-options">
                {allSpecialties.map((s, idx) => (
                  <div
                    key={idx}
                    className={`dropdown-option ${s === specialty ? "selected" : ""}`}
                    onClick={() => {
                      setSpecialty(s);
                      setDropdownOpen(false);
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Therapist Count */}
      <p className="count">
        Showing {filteredTherapists.length} of {therapists.length} therapists
      </p>

      {/* Therapist Cards */}
      <div className="therapist-grid">
        {filteredTherapists.map((t) => (
          <div key={t.id} className="therapist-card">
            <img src={t.image} alt={t.name} className={`therapist-image therapist-${t.id}`} />
            <h3>{t.name}</h3>
            <p className="title">{t.title}</p>
            <p className="education">{t.education}</p>
            <p className="experience">{t.experience}</p>
            <div className="specializations">
              <strong>Specializations:</strong> {t.specializations.join(", ")}
            </div>
            <div className="approach">
              <strong>Approach:</strong> {t.approach}
            </div>
            <p className="availability">{t.availability}</p>
            <div className="rating">
              {renderStars(t.rating)} {t.rating}
            </div>
            <p className="location">{t.location}</p>
            <p className="price">{t.price}</p>
            <div className="actions">
              <button className="btn secondary" onClick={() => setSelectedTherapist(t)}>Message</button>
              <button className="btn primary" onClick={() => {
                const therapistData = {
                  therapist_id: t.id,
                  name: t.name,
                  title: t.title,
                  education: t.education,
                  experience: t.experience,
                  specialties: t.specializations.join(", "),
                  approach: t.approach,
                  availability: t.availability,
                  rating: t.rating,
                  location: t.location,
                  price: t.price,
                  photo_url: t.image
                };
                navigate('/booking', { state: { therapist: therapistData } });
              }}>Book</button>
            </div>
          </div>
        ))}
      </div>

      {/* Message Modal */}
      {selectedTherapist && (
        <div className="message-modal">
          <div className="message-content">
            <h3>Send Message to {selectedTherapist.name}</h3>
            <form onSubmit={handleSendMessage}>
              <textarea
                required
                placeholder="Type your message here..."
                rows="5"
                cols="40"
              />
              <div className="modal-actions">
                <button type="submit" className="btn primary">Send</button>
                <button type="button" className="btn secondary" onClick={handleCloseMessage}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}