import React, {useContext} from 'react';
import {NavLink, Link} from 'react-router-dom';
import UserContext from '../components/users/UserContext';

const Navigation = ({logout}) => {
    const {currentUser} = useContext(UserContext);

    const loggedInNav = () => {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/companies">Companies</NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/" onClick={logout}>{`Log Out ${currentUser.firstName || currentUser.lastName}`}</NavLink>
                </li>
            </ul>
        ) 
    }

    const loggedOutNav = () => {
        return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
            </li>
        </ul>
        )
    }

    return (
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand" to="/">Jobly</Link>
            {currentUser 
                ? loggedInNav() 
                : loggedOutNav()
            }
        </nav>
    )
}

export default Navigation;