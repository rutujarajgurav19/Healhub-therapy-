import React from 'react';
import { useLocation } from 'react-router-dom';
import './Booking.css';

const Booking = () => {
  const location = useLocation();
  const therapist = location.state?.therapist;

  if (!therapist) {
    return <p>No therapist selected. Go back to therapist list.</p>;
  }

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

  const ratingValue = parseFloat(therapist.rating.split(' ')[0]);

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h2>Book Your Session</h2>
        <p>Please confirm your therapist and session details</p>
      </div>

      <div className="booking-content">
        <div className="therapist-info">
          <img src={therapist.image} alt={therapist.name} className="therapist-photo" />
          <h3>{therapist.name}</h3>
          <p className="role">{therapist.title}</p>
          <p className="education">{therapist.education}</p>
          <p className="experience">{therapist.experience}</p>
          <div className="therapist-bio">
            <strong>Specializations:</strong> {therapist.specializations.join(", ")}<br />
            <strong>Approach:</strong> {therapist.approach}
          </div>
          <p className="availability">{therapist.availability}</p>
          <div className="therapist-rating">
            {renderStars(ratingValue)} {therapist.rating}
          </div>
          <p className="location">{therapist.location}</p>
          <p className="price">{therapist.price}</p>
        </div>

        {/* Booking Form */}
        <form className="booking-form">
        <div className="form-section">
          <label htmlFor="session-type">Session Type</label>
          <select id="session-type" required>
            <option value="">Select session type</option>
            <option value="individual">Individual Therapy</option>
            <option value="couples">Couples Therapy</option>
            <option value="family">Family Therapy</option>
          </select>
        </div>

        <div className="form-section">
          <label htmlFor="date">Preferred Date</label>
          <input type="date" id="date" required />
        </div>

        <div className="form-section">
          <label htmlFor="time">Preferred Time</label>
          <select id="time" required>
            <option value="">Select time</option>
            <option value="9am">9:00 AM</option>
            <option value="10am">10:00 AM</option>
            <option value="11am">11:00 AM</option>
            <option value="1pm">1:00 PM</option>
            <option value="2pm">2:00 PM</option>
            <option value="3pm">3:00 PM</option>
            <option value="4pm">4:00 PM</option>
          </select>
        </div>

        <div className="form-section">
          <label htmlFor="concerns">Brief Description of Concerns</label>
          <textarea id="concerns" placeholder="Describe your concerns or goals for the session..." rows="4"></textarea>
        </div>
        {/* Removed reviews section as per user request */}

        <button type="submit" className="booking-button">Book Session</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
