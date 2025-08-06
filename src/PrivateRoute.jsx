import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// This component checks if the user is authenticated and redirects accordingly
const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('jwt');
  const location = useLocation();  // Get the current location to handle redirection

  // If no token exists, redirect to the login page
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If token exists, render the requested element
  return element;
};

export default PrivateRoute;
