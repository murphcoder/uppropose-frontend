import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GoogleOAuthCallback from "./pages/GoogleOAuthCallback";
import Dashboard from "./pages/Dashboard";
import Onboard from "./pages/Onboard";
import Proposal from "./pages/Proposal";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/google/callback" element={<GoogleOAuthCallback />} />

        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/onboard" element={<PrivateRoute element={<Onboard />} />} />
        <Route path="/proposal/:id" element={<PrivateRoute element={<Proposal />} />} />
      </Routes>
    </Router>
  );
}

export default App;