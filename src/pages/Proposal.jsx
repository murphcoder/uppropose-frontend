import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Proposal = () => {
  const { id } = useParams();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch proposal details by ID
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/proposals/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,  // Attach the JWT token for authorization
          },
        }
      )  // Replace with your API endpoint
      .then((response) => {
        setProposal(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching proposal:", err);
        setError("Failed to load proposal.");
        setLoading(false);
      });
  }, [id]);  // Effect will re-run if the `id` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(proposal);

  return (
    <div>
      <h2>Proposal Details</h2>
      {proposal ? (
        <div>
          <h3>{proposal.title}</h3>
          <h3>{proposal.addresse}</h3>
          <h3>Job Description</h3>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", overflow: "auto" }}>{proposal.job_description}</pre>
          <h3>Body</h3>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", overflow: "auto" }}>{proposal.body}</pre>
          {/* Display other proposal details */}
        </div>
      ) : (
        <p>No proposal found.</p>
      )}
    </div>
  );
};

export default Proposal;
