import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../users/UserContext';
import './Homepage.css';

const Homepage = () => {
    // check if the current user exists
    const {currentUser} = useContext(UserContext);

    // if no user has logged in yet
    const noUser = () => {
        return (
            <div>  
                <div>
                    <Link to="/login" className="btn btn-primary mr-3">Login</Link>
                    <Link to="signup" className="btn btn-primary mr-3">Sign Up</Link>
                </div>
            </div>
        )
    }

    // if user exists and logged in
    const hasUser = () => {
        return (
            <div>
                <h2>Welcome Back, {currentUser.firstName || currentUser.userName} </h2>
            </div>
        )
    }

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Jobly</h1>
                <p className="lead">All the jobs in one, convenient place.</p> 
                {currentUser 
                    ? hasUser()
                    : noUser()
                }
            </div>
        </div>
    )
}

export default Homepage;