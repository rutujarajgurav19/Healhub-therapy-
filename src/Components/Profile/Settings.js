import React, { useState } from "react";
import { useUser } from "../../UserContext";
import Alert from "../Alert/Alert";
import "./Settings.css";

const Settings = () => {
  const { user, login } = useUser();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAlert({ type: 'error', message: 'Passwords do not match' });
      return;
    }
    if (newPassword.length < 6) {
      setAlert({ type: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost/Healhub/api/set_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, password: newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setAlert({ type: 'success', message: 'Password set successfully! You can now login with email and password.' });
        setNewPassword('');
        setConfirmPassword('');
        // Update user context to reflect password is set
        login({ ...user, password: 'set' });
      } else {
        setAlert({ type: 'error', message: data.message });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Error setting password: ' + error.message });
    }
    setLoading(false);
  };

  const handleSetPhone = async (e) => {
    e.preventDefault();
    if (!phone) {
      setAlert({ type: 'error', message: 'Phone number is required' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost/Healhub/api/set_phone.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, phone: phone }),
      });
      const data = await res.json();
      if (data.success) {
        setAlert({ type: 'success', message: 'Phone number set successfully!' });
        setPhone('');
        // Update user context to reflect phone is set
        login({ ...user, phone: phone });
      } else {
        setAlert({ type: 'error', message: data.message });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Error setting phone: ' + error.message });
    }
    setLoading(false);
  };

  return (
    <div className="settings-container">
      {alert.message && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: '', message: '' })}
        />
      )}

      <h2>Account Settings</h2>

      {!user.password ? (
        <div className="set-password-card">
          <h3>Set Your Password</h3>
          <p>Since you signed up with Google, set a password to enable email/password login.</p>
          <form onSubmit={handleSetPassword}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Setting Password...' : 'Set Password'}
            </button>
          </form>
        </div>
      ) : (
        <p>Your account is fully set up. You can login with email and password.</p>
      )}

      {!user.phone ? (
        <div className="set-phone-card">
          <h3>Add Your Phone Number</h3>
          <p>Add your phone number for account verification and notifications.</p>
          <form onSubmit={handleSetPhone}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter phone number (e.g., +1234567890)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Setting Phone...' : 'Add Phone Number'}
            </button>
          </form>
        </div>
      ) : (
        <p>Phone number: {user.phone}</p>
      )}
    </div>
  );
};

export default Settings;
