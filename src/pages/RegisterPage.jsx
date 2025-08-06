import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle normal registration with email and password
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/sign_up`,  // Send to backend for registration
        {
          email,
          password,
          password_confirmation: confirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data; // Get the JWT token from the response

      if (token) {
        localStorage.setItem("jwt", token); // Store the JWT token in localStorage
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        navigate("/"); // Redirect to the dashboard after successful registration
      } else {
        setError("Registration succeeded, but no token received.");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  // Handle Google OAuth2 registration
  const handleGoogleOAuth = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}` + // Your Google OAuth2 client ID
      `&redirect_uri=${window.location.origin}/google/callback` + // Frontend callback URL
      `&response_type=code` +
      `&scope=openid%20email%20profile`; // Requested scopes

    // Redirect user to Google OAuth2 authorization page
    window.location.href = googleAuthUrl;
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          required
        /><br />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Register</button>
      </form>

      <hr />

      <button onClick={handleGoogleOAuth}>Register with Google</button>
    </div>
  );
};

export default RegisterPage;
