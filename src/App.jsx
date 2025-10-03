import './App.css';
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "/src/AuthContext";
import AppContent from './pages/AppContent';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;