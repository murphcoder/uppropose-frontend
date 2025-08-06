import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProposalList from "./ProposalList";

const Dashboard = () => {
  const divRef = useRef(null);
  const [addresse, setAddresse] = useState("");
  const [title, setTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  const fullName = `${userData?.first_name} ${userData?.last_name}`

  const handleSubmit = async (e) => {
    e.preventDefault();

    divRef.current.innerHTML = "<h3>Please wait, your proposal is being generated...</h3>";

    // Validation: Ensure work experience is not empty
    if (!jobDescription?.trim()) {
      setError("Job Description cannot be empty.");
      return;
    }

    if (!addresse?.trim()) {
      setError("Addresse cannot be empty.");
      return;
    }

    axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/proposals`,
      {
        proposal: {job_description: jobDescription, title: title, addresse: addresse},
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,  // Attach the JWT token for authorization
        },
      }
    )
    .then((response) => {
      if (response.status === 201) {
        setSuccess("Proposal generated successfully!");
        // Optionally, redirect to another page (e.g., dashboard) after success
        navigate(`/proposal/${response.data.proposal.id}`);
      }
    })
    .catch((err) => {
      return <div>{error}</div>;
    })
  }

  return (
    <div ref={divRef}>
      <h2>Dashboard</h2>

      {userData ? (
        <div>
          <h3>Welcome, {fullName}!</h3>
          <p>Email: {userData.email}</p>
          <p>Please copy and paste the UpWork job description below to generate a proposal.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Addresse</label><br />
              <input
                type="text"
                value={addresse}
                onChange={(e) => setAddresse(e.target.value)}
                required
              /><br />
              <label>Title (Optional)</label><br />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              /><br />
              <label>Job Description</label><br />
              <textarea
                rows="6"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste Your Job Description Here"
                required
              /><br />
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button type="submit">Generate Proposal</button>
          </form>
          <h3>Your Proposals</h3>
          <ProposalList />
        </div>
      ) : (
        <p>Loading your profile...</p>
      )}
    </div>
  );
};

export default Dashboard;
