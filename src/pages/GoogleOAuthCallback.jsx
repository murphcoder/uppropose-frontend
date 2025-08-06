import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleOAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleAuthCode = urlParams.get("code");

    if (googleAuthCode) {
      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/api/users/auth/google_oauth2/callback`, { code: googleAuthCode })
        .then((response) => {
          const { token } = response.data;

          if (token) {
            localStorage.setItem("jwt", token);
            localStorage.setItem('userData', JSON.stringify(response.data.user));
            navigate("/"); // Redirect to dashboard after successful login
          } else {
            console.error("Authentication failed, no token received.");
          }
        })
        .catch((err) => {
          console.error("Error during Google OAuth callback:", err);
        });
    } else {
      console.error("No authorization code found in the URL.");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GoogleOAuthCallback;
