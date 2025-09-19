import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import Alert from '../Alert/Alert';
import './Booking.css';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const therapist = location.state?.therapist;
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (!user) {
      setTimeout(() => navigate('/login'), 0);
    } else if (!therapist) {
      setTimeout(() => navigate('/therapist'), 0);
    } else {
      setCanRender(true);
    }
  }, [user, therapist, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!therapist || !therapist.therapist_id) {
      setAlertType('error');
      setMessage('Therapist information is missing. Cannot proceed with booking.');
      return;
    }

    const bookingData = new URLSearchParams();
    bookingData.append('user_id', user.id);
    bookingData.append('therapist_id', therapist.therapist_id);
    bookingData.append('session_type', formData.get('session-type'));
    bookingData.append('booking_date', formData.get('date'));
    bookingData.append('booking_time', formData.get('time'));
    bookingData.append('concerns', formData.get('concerns'));

    try {
      const res = await fetch('http://localhost/Healhub/api/create_booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bookingData.toString()
      });
      const data = await res.json();
      if (data.success) {
        setAlertType('success');
        setMessage('Booking successful!');
        setTimeout(() => navigate('/home'), 2000);
      } else {
        setAlertType('error');
        setMessage(data.message || 'Booking failed');
      }
    } catch (err) {
      setAlertType('error');
      setMessage('Booking failed: ' + err.message);
    }
  };

  if (!therapist) {
    return null;
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
          <img src={therapist.photo_url} alt={therapist.name} className="therapist-photo" />
          <h3>{therapist.name}</h3>
          <p className="role">{therapist.title}</p>
          <p className="education">{therapist.education}</p>
          <p className="experience">{therapist.experience}</p>
          <div className="therapist-bio">
            <strong>Specializations:</strong> {therapist.specialties}<br />
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
        <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor="session-type">Session Type</label>
          <select id="session-type" name="session-type" required>
            <option value="">Select session type</option>
            <option value="individual">Individual Therapy</option>
            <option value="couples">Couples Therapy</option>
            <option value="family">Family Therapy</option>
          </select>
        </div>

        <div className="form-section">
          <label htmlFor="date">Preferred Date</label>
          <input type="date" id="date" name="date" required />
        </div>

        <div className="form-section">
          <label htmlFor="time">Preferred Time</label>
          <select id="time" name="time" required>
            <option value="">Select time</option>
            <option value="09:00:00">9:00 AM</option>
            <option value="10:00:00">10:00 AM</option>
            <option value="11:00:00">11:00 AM</option>
            <option value="13:00:00">1:00 PM</option>
            <option value="14:00:00">2:00 PM</option>
            <option value="15:00:00">3:00 PM</option>
            <option value="16:00:00">4:00 PM</option>
          </select>
        </div>

        <div className="form-section">
          <label htmlFor="concerns">Brief Description of Concerns</label>
          <textarea id="concerns" name="concerns" placeholder="Describe your concerns or goals for the session..." rows="4"></textarea>
        </div>
        {/* Removed reviews section as per user request */}

        <button type="submit" className="booking-button">Book Session</button>
        </form>
      </div>

      {/* Alert shown at top center */}
      <Alert
        type={alertType}
        message={message}
        onClose={() => setMessage("")}
      />
    </div>
  );
};

export default Booking;
