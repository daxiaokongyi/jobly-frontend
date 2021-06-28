import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Homepage from '../components/homepage/Homepage';
import CompanyList from '../components/companies/CompanyList';
import CompanyDetail from '../components/companies/CompanyDetail';
import LoginForm from '../components/users/LoginForm';
import SignupForm from '../components/users/SignupForm';
import ProfilePage from '../components/users/ProfilePage';
import JobList from '../components/jobs/JobList';
import PrivateRoute from './PrivateRoute';


const Routes = ({login, signup}) => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Homepage/>
                </Route>
                <PrivateRoute exact path="/companies">
                    <CompanyList/>
                </PrivateRoute>
                <PrivateRoute exact path="/companies/:handle">
                    <CompanyDetail/>
                </PrivateRoute>         
                <Route exact path="/signup">
                    <SignupForm signup={signup}/>
                </Route>    
                <Route exact path="/login">
                    <LoginForm login={login}/>
                </Route>    
                <PrivateRoute exact path="/profile">
                    <ProfilePage/>
                </PrivateRoute>   
                <PrivateRoute exact path="/jobs">
                    <JobList/>
                </PrivateRoute>
                <Redirect to='/'/>
            </Switch>
        </div>
    )
}

export default Routes;