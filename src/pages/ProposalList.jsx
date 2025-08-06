import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const ProposalList = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch proposals from the API when the component mounts
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/proposals`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,  // Attach the JWT token for authorization
          },
        }) // Replace with your API endpoint
      .then((response) => {
        // Set the proposals data to state
        setProposals(response.data); 
        setLoading(false); // Data loaded, stop loading
      })
      .catch((err) => {
        console.error("Error fetching proposals:", err);
        setError("Failed to load proposals."); // Error handling
        setLoading(false); // Stop loading even if there's an error
      });
  }, []); // Empty dependency array ensures this runs only once on component mount

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  if (proposals.length === 0) {
    return <div>You currently have no proposals stored.</div>; // Custom message for no proposals
  }

  return (
    <div>
      <ul>
        {proposals.map((proposal) => (
          <li><Link key={proposal.id} to={{pathname: `/proposal/${proposal.id}`}}>{proposal.title}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default ProposalList;
