import React from "react";
import "./PaymentDetails.css";

const PaymentDetails = ({ bookings }) => {
  // Combine current and past bookings, filter for those with payment_id
  const allBookings = [...(bookings.currentBookings || []), ...(bookings.pastBookings || [])].filter(b => b.payment_id);

  return (
    <section>
      <h2>Payment Details</h2>
      <p>View all your payment transactions.</p>
      {allBookings.length ? (
        <div className="payment-list">
          {allBookings.map(b => (
            <div className="payment-card" key={b.booking_id}>
              <h4>Booking ID: {b.booking_id}</h4>
              <p><span>Therapist:</span> {b.therapist_name}</p>
              <p><span>Date:</span> {b.booking_date}</p>
              <p><span>Time:</span> {b.booking_time}</p>
              <p><span>Session:</span> {b.session_type}</p>
              <p><span>Status:</span> {b.status}</p>
              <p><span>Payment Method:</span> {b.payment_method || 'N/A'}</p>
              <p><span>Payment ID:</span> {b.payment_id || 'N/A'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No payments found</p>
      )}
    </section>
  );
};

export default PaymentDetails;
