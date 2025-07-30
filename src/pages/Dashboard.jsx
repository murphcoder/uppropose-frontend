import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fullName = `${userData?.first_name} ${userData?.last_name}`

  useEffect(() => {
    // Check if the JWT token exists in localStorage
    const token = localStorage.getItem("jwt");

    if (!token) {
      // Redirect to login if no JWT token is found
      navigate("/login");
    } else {
      // Make an authenticated API request to fetch user data
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass JWT token in Authorization header
          },
        })
        .then((response) => {
          setUserData(response.data.user); // Set the user data from response
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load user data. Please try again.");
        });
    }
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>

      {userData ? (
        <div>
          <h3>Welcome, {fullName}!</h3>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading your profile...</p>
      )}
    </div>
  );
};

export default Dashboard;
