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
import Logout from './pages/Logout';
import Navbar from './pages/Navbar';
import Account from './pages/Account';
import uppropose_logo from "/src/assets/uppropose_logo.png"
import { AuthProvider } from "/src/AuthContext"
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Footer from './pages/Footer';
import TermsAndConditions from './pages/TermsAndConditions';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='app-container'>
          <img src={uppropose_logo} alt="UpPropose Logo" width="200" />
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/google/callback" element={<GoogleOAuthCallback />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

            <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/onboard" element={<PrivateRoute element={<Onboard />} />} />
            <Route path="/proposal/:id" element={<PrivateRoute element={<Proposal />} />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;