import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setAlertType('error');
      setMessage('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setAlertType('error');
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('http://localhost/Healhub/api/forgot_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setAlertType('success');
        setMessage('Password reset successfully.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setAlertType('error');
        setMessage(data.message || 'Failed to reset password.');
      }
    } catch (error) {
      setAlertType('error');
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="profile-container">
      <h2>Forgot Password</h2>
      <p>Reset your account password securely.</p>
      <div className="forgot-password-container">
        <h3>Forgot Password</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        {message && <p className={alertType}>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
