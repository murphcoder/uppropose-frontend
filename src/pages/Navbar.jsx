import React, { useContext } from "react";
import LoggedInBar from "./LoggedInBar";
import LoggedOutBar from "./LoggedOutBar";
import { AuthContext } from "/src/AuthContext";

export default function Navbar() {
  const { token } = useContext(AuthContext);

  return (
    <div className="navbar-container">
      <div className="navbar">
        {token ? <LoggedInBar /> : <LoggedOutBar />}
      </div>
    </div>
  );
}
