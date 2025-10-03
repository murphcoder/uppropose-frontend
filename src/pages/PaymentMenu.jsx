import { useState } from 'react';
import api from "./api/";

const PaymentMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Click Here To Subscribe');

  const options = [
    'Monthly : $15/month',
    'Yearly : $150/year'
  ];

  const handleSelect = (option) => {
    if (option === 'Monthly : $15/month') {
        api
          .get(`${import.meta.env.VITE_API_BASE_URL}/monthly_url`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,  // Attach the JWT token for authorization
              },
            }) // Replace with your API endpoint
          .then((response) => {
            // Set the proposals data to state
            let url = response.data.url;
            window.location.href = url;
          })
          .catch((err) => {
            console.error("Stripe error:", err);
            setError("Failed to load Stripe.")
          });
    } else if (option === 'Yearly : $150/year') {
        api
          .get(`${import.meta.env.VITE_API_BASE_URL}/yearly_url`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
              },
            })
          .then((response) => {
            let url = response.data.url;
            window.location.href = url;
          })
          .catch((err) => {
            console.error("Stripe error:", err);
            setError("Failed to load Stripe.")
          });
    }
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-wrapper">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="dropdown-button"
        >
          <span className="dropdown-text">{selected}</span>
          <span className={`dropdown-icon ${isOpen ? 'open' : ''}`}>▼</span>
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="dropdown-item"
              >
                <span>{option}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMenu;