import React from "react";
import "./PastBookings.css";
import FindTherapistIntro from "./FindTherapistIntro";

// Import therapist images
import Priya from "../../assets/therapists/Priya.jpg";
import Michael from "../../assets/therapists/Michael.jpg";
import Rajesh from "../../assets/therapists/Rajesh.jpg";
import Emily from "../../assets/therapists/emily.jpg";
import Aarav from "../../assets/therapists/Aarav.jpg";
import Olivia from "../../assets/therapists/Olivia.jpg";
import Anjali from "../../assets/therapists/Anjali.jpg";
import David from "../../assets/therapists/David.jpg";
import Kavita from "../../assets/therapists/Kavita.jpg";
import Ethan from "../../assets/therapists/Ethan.jpg";
import Meera from "../../assets/therapists/Meera.jpg";
import Kevin from "../../assets/therapists/Kevin.jpg";
import Rohan from "../../assets/therapists/Rohan.jpg";
import Sophia from "../../assets/therapists/Sophia.jpg";
import Arjun from "../../assets/therapists/Arjun.jpg";
import Lisa from "../../assets/therapists/Lisa.jpg";

const therapistImages = {
  Priya,
  Michael,
  Rajesh,
  Emily,
  Aarav,
  Olivia,
  Anjali,
  David,
  Kavita,
  Ethan,
  Meera,
  Kevin,
  Rohan,
  Sophia,
  Arjun,
  Lisa,
};

const PastBookings = ({ pastBookings, onBookAgain }) => {
  const getTherapistImage = (name) => {
    // Extract the first name from the therapist name (e.g., 'Dr. Priya Sharma' -> 'Priya')
    const firstName = name.split(' ')[1] || name.split(' ')[0];
    return therapistImages[firstName] || "/assets/avatar.png";
  };

  return (
    <section>
      {/* Removed FindTherapistIntro as per user request */}
      <h2>Past Booking</h2>
      <p>Check your completed therapy session history.</p>
      {pastBookings.length ? (
        <div className="booking-list">
          {pastBookings.map(b => (
            <div className="booking-card past" key={b.booking_id}>
              <img
                src={getTherapistImage(b.therapist_name)}
                alt={b.therapist_name}
                className="therapist-photo"
              />
              <h4>{b.therapist_name}</h4>
              <p><span>Date:</span> {b.booking_date}</p>
              <p><span>Time:</span> {b.booking_time}</p>
              <p><span>Session:</span> {b.session_type}</p>
              <p><span>Reason:</span> N/A</p>
              <button onClick={() => onBookAgain(b.therapist_id)} className="book-again-btn">Book Again</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No past bookings</p>
      )}
    </section>
  );
};

export default PastBookings;
