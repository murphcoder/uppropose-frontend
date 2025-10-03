import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from './api';
import { AuthContext } from '/src/AuthContext';

const Logout = () => {
  const { setToken, setUser, setExpirationDate, setProposalCount } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await api.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/sign_out`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
          }
        );
      } catch (err) {
        console.error(err);
        setError('Logout failed.');
      } finally {
        // Clear both context and localStorage
        setToken(null);
        setUser(null);
        setProposalCount(null);
        setExpirationDate(null);

        // Redirect back to login
        navigate('/login');
      }
    };

    handleLogout();
  }, [navigate, setToken, setUser, setProposalCount, setExpirationDate]);

  return <div>{error ? error : "Logging out..."}</div>;
};

export default Logout;
