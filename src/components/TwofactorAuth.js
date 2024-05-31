// src/components/TwoFactorAuth.js
import React, { useState, useEffect } from 'react';

import './TwoFactorAuth.css';

const TwoFactorAuth = () => {
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the QR code and secret from the server
    const fetchQrCode = async () => {
      try {
        const response = await fetch.get('');
        setQrCode(response.data.qrCode);
        setSecret(response.data.secret);
      } catch (error) {
        console.error('Error generating QR code', error);
      }
    };

    fetchQrCode();
  }, []);

  const handleVerify = async () => {
    try {
      const response = await fetch.post('', { token, secret });
      if (response.data.verified) {
        setMessage('2FA enabled successfully');
      } else {
        setMessage('Invalid token, please try again');
      }
    } catch (error) {
      console.error('Error verifying token', error);
      setMessage('Error verifying token');
    }
  };

  return (
    <div className="two-factor-auth">
      <h2>Two Factor Authentication</h2>
      <p>
        Two factor authentication (2FA) strengthens access security by requiring
        two methods (also referred to as factors) to verify your identity. Two
        factor authentication protects against phishing, social engineering and
        password brute force attacks and secures your logins from attackers
        exploiting weak or stolen credentials.
      </p>
      <p>1. Scan this QR code with your Google Authenticator app:</p>
      {qrCode && <img src={qrCode} alt="QR Code" />}
      <p>2. Enter the pin from Google Authenticator app:</p>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Authenticator Code"
      />
      <button onClick={handleVerify}>Enable 2FA</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TwoFactorAuth;
