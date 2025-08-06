import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Onboard = () => {
  const [workExperience, setWorkExperience] = useState("");  // State to hold work experience text
  const [error, setError] = useState("");  // State to hold error message
  const [success, setSuccess] = useState("");  // State to hold success message
  const navigate = useNavigate();  // Use navigate for routing after successful submission

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure work experience is not empty
    if (!workExperience.trim()) {
      setError("Work experience cannot be empty.");
      return;
    }

    try {
      // Send the work experience to the backend
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/update`,
        {
          user: {work_experience: workExperience},
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,  // Attach the JWT token for authorization
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem('userData', JSON.stringify(response.data.user));
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
    <div className="onboard-container">
      <h2>Onboard: Enter Your Work Experience</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Work Experience</label>
          <textarea
            rows="6"
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
            placeholder="Describe your work experience..."
            required
          />
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Save Work Experience</button>
      </form>
    </div>
  );
};

export default Onboard;
