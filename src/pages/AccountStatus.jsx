import React, { useEffect, useContext, useState } from "react";
import api from "./api/";
import { AuthContext } from '/src/AuthContext';
import PaymentMenu from './PaymentMenu';

const AccountStatus = () => {
    const { expirationDate, setExpirationDate, proposalCount, setProposalCount } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/show_current_user`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,  // Attach the JWT token for authorization
              },
            }) // Replace with your API endpoint
          .then((response) => {
            // Set the proposals data to state
            setExpirationDate(new Date(response.data.expirationDate)); 
            setProposalCount(response.data.proposalCount);
            setLoading(false); // Data loaded, stop loading
          })
          .catch((err) => {
            console.error("Error fetching proposals:", err);
            setError("Failed to load proposals."); // Error handling
            setLoading(false); // Stop loading even if there's an error
          });
    }, []); // Empty dependency array ensures this runs only once on component mount

    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }

    let today = new Date();
    console.log(proposalCount);
    
    return (
        <div className="status-bar">
          <div>{expirationDate > today ? `Subscription Expires On : ${expirationDate.toLocaleDateString()}` : proposalCount < 5 ? `${5 - proposalCount} Free Proposals Remaining` : 'No Free Proposals Remaining' }</div>
          <div>{expirationDate > today ? 'Paid' : <PaymentMenu />}</div>
        </div>
    );
};

export default AccountStatus;