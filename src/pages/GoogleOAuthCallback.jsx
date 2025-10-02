import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '/src/AuthContext';

const GoogleOAuthCallback = () => {
  const navigate = useNavigate();
  const { setToken, setUser, setExpirationDate, setProposalCount } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleAuthCode = urlParams.get("code");

    if (googleAuthCode) {
      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/api/users/auth/google_oauth2/callback`, { code: googleAuthCode })
        .then((response) => {
          const { token, user, expirationDate, proposalCount } = response.data;

          if (token && user) {
            // Update global auth state
            setToken(token);
            setUser(user);
            setExpirationDate(new Date(expirationDate));
            setProposalCount(proposalCount);
            navigate("/"); // Redirect to dashboard
          } else {
            console.error("Authentication failed, no token or user data received.");
          }
        })
        .catch((err) => {
          console.error("Error during Google OAuth callback:", err);
        });
    } else {
      console.error("No authorization code found in the URL.");
    }
  }, [navigate, setToken, setUser]);

  return <div>Loading...</div>;
};

export default GoogleOAuthCallback;
