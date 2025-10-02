import React from 'react';
import {NavLink} from 'react-router-dom';
import AccountStatus from "./AccountStatus";

function LoggedInBar() {
    return (
        <div>
            <div className='link-container logged-in'>
                <NavLink className="home" to="/">Home</NavLink>
                <NavLink className="account" to="/account">Account</NavLink>
                <NavLink className="logout" to="/logout">Logout</NavLink>
            </div>
            <br />
            <AccountStatus />
        </div>
    );
}

export default LoggedInBar;