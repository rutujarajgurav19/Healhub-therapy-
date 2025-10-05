import React from "react";
import "./TherapistsBooked.css";

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

const TherapistsBooked = ({ therapists, onBookAgain, onDelete }) => {
  const getTherapistImage = (name) => {
    // Extract the first name from the therapist name (e.g., 'Dr. Priya Sharma' -> 'Priya')
    const firstName = name.split(' ')[1] || name.split(' ')[0];
    return therapistImages[firstName] || "/assets/avatar.png";
  };

  return (
    <section>
      <h2>Therapists I Booked</h2>
      <p>see the therapists you have booked so far.</p>
      <h3>Therapists I Booked</h3>
      {therapists && therapists.length ? (
        <div className="therapists-list">
          {therapists.map(t => (
            <div className="therapist-card" key={t.therapist_id}>
              <img
                src={getTherapistImage(t.name)}
                alt={t.name}
                className="therapist-photo"
                onError={(e) => { e.target.src = "/assets/avatar.png"; }} // Fallback to default avatar
              />
              <h4>{t.name}</h4>
              <p>{t.title}</p>
              <button
                className="book-again-btn"
                onClick={() => onBookAgain && onBookAgain(t.therapist_id)}
                style={{ marginRight: '10px' }}
              >
                Book Again
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this therapist?')) {
                    onDelete && onDelete(t.therapist_id);
                  }
                }}
              >
                Delete Therapist
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No therapists booked yet.</p>
      )}
    </section>
  );
};

export default TherapistsBooked;
