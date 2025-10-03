import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import api from './api';
import { AuthContext } from '/src/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken, setUser, setExpirationDate, setProposalCount } = useContext(AuthContext);

  // Handle normal email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/sign_in`,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const { token, user, proposalCount, expirationDate } = response.data;

      if (token) {
        setToken(token);
        setUser(user);
        setExpirationDate(new Date(expirationDate));
        setProposalCount(proposalCount);
        navigate('/');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleOAuth = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${window.location.origin}/google/callback` +
      `&response_type=code` +
      `&scope=openid%20email%20profile`;
    window.location.href = googleAuthUrl;
  };

  const goToRegistration = () => {
    navigate('/register');
  };

  const goToPasswordRecovery = () => {
    navigate('/password_recovery');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div><br />
        {error && <p className="error">{error}</p>}
        <button className='local' type="submit">Login</button>
      </form>

      <hr />
      <div>
        <button className='google-sign-in-button' onClick={handleGoogleOAuth}>
          Login with Google
        </button>
      </div>
      <p>
      <span className="link" onClick={goToPasswordRecovery}>Forgot Your Password?</span><br /><br />
        Don't have an account?<br /><br />
        <span className="link" onClick={goToRegistration}>Sign up here</span>
      </p>
    </div>
  );
};

export default LoginPage;
