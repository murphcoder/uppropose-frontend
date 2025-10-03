import React, { useEffect, useContext } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '/src/AuthContext';

const GoogleOAuthCallback = () => {
  const navigate = useNavigate();
  const { setToken, setUser, setExpirationDate, setProposalCount } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleAuthCode = urlParams.get("code");

    if (googleAuthCode) {
      api
        .post(`${import.meta.env.VITE_API_BASE_URL}/api/users/auth/google_oauth2/callback`, { code: googleAuthCode })
        .then((response) => {
          const { token, user, expirationDate, proposalCount } = response.data;

          if (token && user) {
            // Update context state - the useEffect hooks in AuthContext
            // will automatically sync to localStorage with the correct keys
            setToken(token);
            setUser(user);
            setExpirationDate(new Date(expirationDate));
            setProposalCount(proposalCount);

            // Small delay to ensure state updates complete before navigation
            setTimeout(() => {
              if (user.work_experience === null) {
                navigate("/onboard")
              } else {
                navigate("/")
              }
            }, 0);
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
  }, [navigate, setToken, setUser, setExpirationDate, setProposalCount]);

  return <div>Loading...</div>;
};

export default GoogleOAuthCallback;