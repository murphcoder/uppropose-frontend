import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import GoogleOAuthCallback from "./GoogleOAuthCallback";
import Dashboard from "./Dashboard";
import Onboard from "./Onboard";
import Proposal from "./Proposal";
import PrivateRoute from "/src/PrivateRoute";
import Logout from './Logout';
import Navbar from './Navbar';
import Account from './Account';
import uppropose_logo from "/src/assets/uppropose_logo.png";
import CookiePolicy from './CookiePolicy';
import PrivacyPolicy from './PrivacyPolicy';
import Footer from './Footer';
import TermsAndConditions from './TermsAndConditions';

function AppContent() {
  const location = useLocation();
  
  const excludedPaths = ['/onboard'];
  const hideNavbar = excludedPaths.includes(location.pathname);

  return (
    <div className='app-container'>
      <img src={uppropose_logo} alt="UpPropose Logo" width="200" />
      {!hideNavbar && <Navbar />}
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
  );
}

export default AppContent;