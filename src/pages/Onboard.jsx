import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      const response = await axios.put(
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
        setExpirationDate(new Date(expirationDate));
        setProposals(proposals);
        setSuccess("Work experience saved successfully!");
        // Optionally, redirect to another page (e.g., dashboard) after success
        navigate("/");
      }
    } catch (err) {
      setError("Failed to save work experience. Please try again.");
      console.error("Error saving work experience:", err);
    }
  };

  return (
    <div>
      <h3>Onboard</h3>
      <form onSubmit={handleSubmit} className="onboard-form">
        <div className="form-group">

          {user.first_name == null ? (
            <div>
              <label>First Name</label><br />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              /><br />
            </div>
          ) : (null)}

          {user.last_name == null ? (
            <div>
              <label>Last Name</label><br />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              /><br />
            </div>
          ) : (null)}

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

          <button type="submit">Save Work Experience</button>
        </div>
      </form>
    </div>
  );
};

export default Onboard;
