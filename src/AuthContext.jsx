import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("jwt"));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("userData");
    return stored ? JSON.parse(stored) : null;
  });
  const [expirationDate, setExpirationDate] = useState(() => {
    const stored = localStorage.getItem("expirationDate");
    return stored !== null ? JSON.parse(stored) : null; 
  });
  const [proposalCount, setProposalCount] = useState(() => {
    const stored = localStorage.getItem("proposalCount");
    return stored !== null ? JSON.parse(stored) : null; 
  });

  // Keep localStorage in sync when token/user changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt", token);
    } else {
      localStorage.removeItem("jwt");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
    } else {
      localStorage.removeItem("userData");
    }
  }, [user]);

  useEffect(() => {
    if (expirationDate) {
      localStorage.setItem("expirationDate", JSON.stringify(expirationDate));
    } else {
      localStorage.removeItem("expirationDate");
    }
  }, [expirationDate]);

  useEffect(() => {
    if (proposalCount) {
      localStorage.setItem("proposalCount", JSON.stringify(proposalCount));
    } else {
      localStorage.removeItem("proposalCount");
    }
  }, [proposalCount]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, expirationDate, setExpirationDate, proposalCount, setProposalCount }}>
      {children}
    </AuthContext.Provider>
  );
};
