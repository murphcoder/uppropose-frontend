import React, { useContext, useEffect, useState } from "react";
import api from "./api/";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '/src/AuthContext';

const Onboard = () => {
  const [workExperience, setWorkExperience] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { user, setUser, setExpirationDate, setProposals } = useContext(AuthContext);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName.trim() && user.first_name === null) {
      setError("First name cannot be empty.");
      return;
    } else if (!lastName.trim() && user.last_name === null) {
      setError("Last name cannot be empty.");
      return;
    } else if (!workExperience.trim()) {
      setError("Work experience cannot be empty.");
      return;
    }

    try {
      // Send the work experience to the backend
      const response = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/update_current_user`,
        {
          user: {
            first_name: firstName, 
            last_name: lastName,
            work_experience: workExperience, 
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,  // Attach the JWT token for authorization
          },
        }
      );

      if (response.status === 200) {
        setUser(user);
        setSuccess("Work experience saved successfully!");
        // Optionally, redirect to another page (e.g., dashboard) after success
        navigate("/");
      }
    } catch (err) {
      setError("Failed to save work experience. Please try again.");
      console.error("Error saving work experience:", err);
    }
  };

  useEffect(() => {
    api.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/show_current_user`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    )
    .then((response) => {
      setUser(response.data.user);
      setFirstName(user.first_name);
      setLastName(user.last_name);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      setError("Failed to load user.");
    });
  }, []);

  if (user.work_experience != null) {
      navigate('/')
  };

  return (
    <div>
      <div className="navbar">
        <div className='link-container logged-in'>
          <NavLink className="logout" to="/logout">Logout</NavLink>
        </div>
      </div>
      <h3>Onboard</h3>
      <form onSubmit={handleSubmit} className="onboard-form">
        <div className="form-group">

          <div>
            <label>First Name</label><br />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            /><br />
          </div>

          <div>
            <label>Last Name</label><br />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            /><br />
          </div>

          <label>
            Please write a brief description of your work experience below.
            This will be used by the AI to construct proposals specific to you and your skills.
          </label><br />
          <textarea
            rows="10"
            columns="10"
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
            placeholder="Describe your work experience..."
            required
          /><br />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button type="submit" className="submit-button">Save Work Experience</button>
        </div>
      </form>
    </div>
  );
};

export default Onboard;
