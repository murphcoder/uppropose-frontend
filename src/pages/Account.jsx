import React, { useEffect, useContext, useState } from "react";
import api from "./api/";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '/src/AuthContext';

const Account = () => {
  const [workExperience, setWorkExperience] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!!user?.uid && user.email === null) {
        setError("Email  cannot be empty.");
        return;
    } else if (!firstName.trim() && user.first_name === null) {
        setError("First name cannot be empty.");
        return;
    } else if (!lastName.trim() && user.last_name === null) {
        setError("Last name cannot be empty.");
        return;
    } else if (!workExperience.trim()) {
        setError("Work experience cannot be empty.");
        return;
    } else if (!password !== null && password !== confirmation) {
        setError("Passwords must match.");
        return;
      }

    try {
      // Send the work experience to the backend
      const response = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/update_current_user`,
        {
          user: {
            email: email, 
            password: password, 
            password_confirmation: confirmation,
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
      )
      .then((response) => {
        setUser(response.data.user);
        navigate("/")
      })
    } catch (err) {
      setError("Failed to update user. Please try again.");
      console.error("Error updating user:", err);
    }
  };

  useEffect(() => {
    // Fetch proposal details by ID
    api.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/show_current_user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,  // Attach the JWT token for authorization
          },
        }
      )  // Replace with your API endpoint
      .then((response) => {
        setUser(response.data.user);
        setEmail(user.email);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setWorkExperience(user.work_experience);
      })
      .catch((err) => {
        console.error("Error fetching proposal:", err);
        setError("Failed to load proposal.");
      });
  }, []);  // Effect will re-run if the `id` changes

  return (
    <div className="account-container">
      <h3>Account Details</h3>
      <form onSubmit={handleSubmit} className="account-form">
        <div className="form-group">
            <div className="form-columns">
              <div>
                <label>Email</label><br />
                <input
                type="text"
                value={email}
                placeholder={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                /><br />
              </div>
            
              <div>
                <label>First Name</label><br />
                <input
                  type="text"
                  value={firstName}
                  placeholder={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                /><br />
              </div>

              <div>
                <label>Last Name</label><br />
                <input
                  type="text"
                  value={lastName}
                  placeholder={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                /><br />
              </div>

              <div>
                <label>Password</label><br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
              </div>

              <div>
                <label>Password Confirmation</label><br />
                <input
                    type="password"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                /><br />
              </div>

              <div>
                  <label>Work Experience</label><br />
                  <textarea
                      rows="10"
                      columns="10"
                      value={workExperience}
                      onChange={(e) => setWorkExperience(e.target.value)}
                      placeholder={workExperience}
                      required
                  /><br />
              </div>
            </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="submit-button">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default Account;
