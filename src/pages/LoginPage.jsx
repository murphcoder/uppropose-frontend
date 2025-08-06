import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle normal email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send the login request to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/sign_in`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const { token } = response.data; // Receive JWT token from the backend

      if (token) {
        // Store the JWT token in localStorage for use in subsequent requests
        localStorage.setItem('jwt', token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        navigate('/'); // Redirect to the dashboard or another protected page
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  // Handle Google OAuth2 login
  const handleGoogleOAuth = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${window.location.origin}/google/callback` + // Frontend callback URL
      `&response_type=code` +
      `&scope=openid%20email%20profile`;

    // Redirect the user to Google OAuth2
    window.location.href = googleAuthUrl;
  };

  // Redirect to the registration page
  const goToRegistration = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>

      <hr />

      {/* Google Login Button */}
      <button onClick={handleGoogleOAuth}>Login with Google</button>

      <p>
        Don't have an account? 
        <span className="link" onClick={goToRegistration}>Sign up here</span>
      </p>
    </div>
  );
};

export default LoginPage;
