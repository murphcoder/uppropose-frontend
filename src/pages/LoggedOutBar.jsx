import React from 'react';
import {NavLink} from 'react-router-dom'

const LoggedOutBar = () => {
  return (
    <div className='link-container logged-out'>
      <NavLink className="login" to="/login">Login</NavLink>
      <NavLink className="sign-up" to="/register">Sign Up</NavLink>
    </div>
  );
};
export default LoggedOutBar;