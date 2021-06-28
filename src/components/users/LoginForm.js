import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Alert from '../common/alert/Alert';
import './LoginForm.css';
import UserContext from './UserContext';

const LoginForm = ({login}) => {

    let {currentUser} = useContext(UserContext);

    let history = useHistory();

    if (currentUser) {
        history.push('/');
    }

    const initialState = {
        "username":"",
        "password":""
    }

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);
        
    const handleSubmit = async evt => {
        evt.preventDefault();
        let result = await login(formData);
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
        <div className="loginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Log In</h3>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>   
                            <div className="form-group">
                                <label className="float-left" htmlFor="username">Name: </label>
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

                            {formErrors.length 
                                ? <Alert type="danger" messages={formErrors}/> 
                                : null
                            }
                            <button className="btn btn-primary float-right" onSubmit={handleSubmit}>Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;