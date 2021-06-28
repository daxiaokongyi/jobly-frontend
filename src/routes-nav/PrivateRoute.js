import React, {useContext} from 'react';
import UserContext from '../components/users/UserContext';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({exact, path, children}) => {
    const {currentUser} = useContext(UserContext);

    // console.debug(
    //     "PrivateRoute",
    //     "exact=", exact,
    //     "path=", path,
    //     "currentUser=", currentUser, 
    //     "children=", children
    // );

    return (
        <div>
            {currentUser 
                ? (<Route exact={exact} path={path}>{children}</Route>)
                : <Redirect to="/login"/>
            }
        </div>
    );
};

export default PrivateRoute;