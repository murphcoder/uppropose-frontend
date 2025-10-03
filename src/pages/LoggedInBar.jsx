import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AccountStatus from "./AccountStatus";
import { AuthContext } from '/src/AuthContext';

function LoggedInBar() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (user.work_experience === null) {
        navigate('/onboard')
    };

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