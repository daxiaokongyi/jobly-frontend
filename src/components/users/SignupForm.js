import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Alert from '../common/alert/Alert';
import './SignupForm.css'
import UserContext from './UserContext';

const SignupForm = ({signup}) => {
    
    let {currentUser} = useContext(UserContext); 
    let history = useHistory();

    if(currentUser) {
        history.push("/");
    }

    const initialState = {
        "username":"",
        "password":"",
        "firstName":"",
        "lastName":"",
        "email":""
    }

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    );
        
    const handleSubmit = async evt => {
        evt.preventDefault();
        let result = await signup(formData);
        // check if result exists
        if (result.success) {
            history.push("/companies");
        } else {
            setFormErrors(result.errors);
        }
    }

    const handleChange = evt => {
        const {name, value} = evt.target;
        setFormData({...formData, [name]:value});
    }

    return (
        <div className="SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Sign Up</h3>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>   
                            <div className="form-group">
                                <label className="float-left" htmlFor="username" >Name: </label>
                                <input 
                                    name="username"
                                    type="text" 
                                    onChange={handleChange}
                                    className="form-control"
                                    value={formData.username}
                                    required
                                    autoComplete="username"
                                />
                            </div>
                            <div className="form-group">
                                <label className="float-left" htmlFor="password">Password: </label>
                                <input 
                                    name="password"
                                    type="password" 
                                    onChange={handleChange}
                                    className="form-control"
                                    value={formData.password}   
                                    required
                                    autoComplete="password"
                                />
                            </div>
                            <div className="form-group">
                                <label className="float-left" htmlFor="firstName">First Name: </label>
                                <input 
                                    name="firstName"
                                    type="text" 
                                    onChange={handleChange}
                                    className="form-control"
                                    value={formData.firstName}   
                                    required
                                    autoComplete="firstName"
                                />
                            </div>
                            <div className="form-group">
                                <label className="float-left" htmlFor="lastName">Last Name: </label>
                                <input 
                                    name="lastName"
                                    type="text" 
                                    onChange={handleChange}
                                    className="form-control"
                                    value={formData.lastName}   
                                    required
                                    autoComplete="lastName"
                                />
                            </div>
                            <div className="form-group">
                                <label className="float-left" htmlFor="email">Email: </label>
                                <input 
                                    name="email"
                                    type="email" 
                                    onChange={handleChange}
                                    className="form-control"
                                    value={formData.email}   
                                    required
                                    autoComplete="email"
                                />
                            </div>

                            {formErrors.length 
                                ? <Alert type="danger" messages={formErrors}/> 
                                : null
                            }
                            <button className="btn btn-primary float-right" onSubmit={handleSubmit}>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;