import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { useUser } from "../../UserContext";

import CurrentBookings from "./CurrentBookings";
import PastBookings from "./PastBookings";
import TherapistsBooked from "./TherapistsBooked";
import ForgotPassword from "./ForgotPassword";
import AssessmentResults from "./AssessmentResults";
import PaymentDetails from "./PaymentDetails";
import Settings from "./Settings";
import Alert from "../Alert/Alert";

const ProfilePage = () => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentBookings, setCurrentBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [activeTab, setActiveTab] = useState('current');
  const [alert, setAlert] = useState({ type: '', message: '' });

  const deleteTherapist = async (therapistId) => {
    try {
      const res = await fetch('http://localhost/Healhub/api/delete_therapist_bookings.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, therapist_id: therapistId }),
      });
      const data = await res.json();
      if (data.success) {
        // Refetch bookings after delete
        const fetchBookings = async () => {
          try {
            const res = await fetch(`http://localhost/Healhub/api/bookings.php?user_id=${user.id}`);
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log("Fetched data:", data);
            if (data.error) {
              console.error("API error:", data.error);
              return;
            }
            setCurrentBookings(data.currentBookings || []);
            setPastBookings(data.pastBookings || []);
            setTherapists(data.therapists || []);
          } catch (error) {
            console.error("Failed to fetch bookings:", error);
            setAlert({ type: 'error', message: 'Failed to load profile data. Please check console for details.' });
          }
        };
        fetchBookings();
        setAlert({ type: 'success', message: 'Therapist deleted successfully' });
      } else {
        setAlert({ type: 'error', message: 'Failed to delete therapist: ' + data.error });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Error deleting therapist: ' + error.message });
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const res = await fetch('http://localhost/Healhub/api/cancel_booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_id: bookingId }),
      });
      const data = await res.json();
      if (data.success) {
        // Refetch bookings after cancel
        const fetchBookings = async () => {
          try {
            const res = await fetch(`http://localhost/Healhub/api/bookings.php?user_id=${user.id}`);
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log("Fetched data:", data);
            if (data.error) {
              console.error("API error:", data.error);
              return;
            }
            setCurrentBookings(data.currentBookings || []);
            setPastBookings(data.pastBookings || []);
            setTherapists(data.therapists || []);
          } catch (error) {
            console.error("Failed to fetch bookings:", error);
            setAlert({ type: 'error', message: 'Failed to load profile data. Please check console for details.' });
          }
        };
        fetchBookings();
        setAlert({ type: 'success', message: 'Booking cancelled successfully' });
      } else {
        setAlert({ type: 'error', message: 'Failed to cancel booking: ' + data.error });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Error cancelling booking: ' + error.message });
    }
  };



  useEffect(() => {
    const path = location.pathname;
    if (path === '/profile/past') setActiveTab('past');
    else if (path === '/profile/therapists') setActiveTab('therapists');
    else if (path === '/forgot-password') setActiveTab('forgot');
    else if (path === '/profile/assessment') setActiveTab('assessment');
    else if (path === '/profile/payments') setActiveTab('payments');
    else if (path === '/profile/settings') setActiveTab('settings');
    else setActiveTab('current');
  }, [location.pathname]);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost/Healhub/api/bookings.php?user_id=${user.id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched data:", data); // Debug log
        if (data.error) {
          console.error("API error:", data.error);
          return;
        }
        setCurrentBookings(data.currentBookings || []);
        setPastBookings(data.pastBookings || []);
        setTherapists(data.therapists || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setAlert({ type: 'error', message: 'Failed to load profile data. Please check console for details.' });
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      {alert.message && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: '', message: '' })}
        />
      )}

      {activeTab === 'current' && (
        <CurrentBookings currentBookings={currentBookings} onCancel={cancelBooking} />
      )}

      {activeTab === 'past' && (
        <PastBookings pastBookings={pastBookings} onBookAgain={(therapistId) => navigate('/booking', { state: { therapistId } })} />
      )}

      {activeTab === 'therapists' && (
        <TherapistsBooked therapists={therapists} onBookAgain={(therapistId) => navigate('/booking', { state: { therapistId } })} onDelete={deleteTherapist} />
      )}

      {activeTab === 'forgot' && (
        <ForgotPassword />
      )}

      {activeTab === 'assessment' && (
        <AssessmentResults />
      )}

      {activeTab === 'payments' && (
        <PaymentDetails bookings={{ currentBookings, pastBookings }} />
      )}

      {activeTab === 'settings' && !user.password && (
        <Settings />
      )}
    </div>
  );
};

export default ProfilePage;
