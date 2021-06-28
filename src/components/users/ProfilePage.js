import React, {useState, useContext} from 'react';
import Alert from '../common/alert/Alert';
import UserContext from './UserContext';
import './ProfilePage.css';
import JoblyApi from '../../api/api';

const ProfilePage = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext);

    const initialState = {
        "userName": currentUser.username,
        "firstName": currentUser.firstName,
        "lastName": currentUser.lastName,
        "email": currentUser.email,
        "password":""
    }

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveComfirmed] = useState(false);
        
    const handleSubmit = async evt => {
        evt.preventDefault();

        // update the user's data, get username firstly
        let username = formData.userName;
        // create object profileData used to update the user's profile
        let profileData = {
            firstName : formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        }    

        // try update the profile
        let updatedUser;
        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData);
        } catch (errors) {
            setFormErrors(errors);
            return;
        }

        // after updating the user's data successfully

        // show the updated profile data of first, last, and email, and make password blank
        setFormData(formData => ({...formData, password:""}));
        // set errors back to none
        setFormErrors([]);
        // data is updated and confirmed
        setSaveComfirmed(true);
        // set current user with the updated data
        setCurrentUser(updatedUser);
    }

    const handleChange = evt => {
        const {name, value} = evt.target;
        setFormData({...formData, [name]:value});
        setFormErrors([]);
    }

    return (
        <div className="loginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Profile</h3>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>   
                            <div className="form-group" style={{textAlign: "left"}}>
                                <label htmlFor="username">Name: </label>
                                <p className="form-control-plaintext" >{currentUser.firstName || currentUser.lastname}</p>
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
                            <div className="form-group"  style={{textAlign: "left"}}>
                                <label className="float-left" htmlFor="password">Confirm password to make changes: </label>
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

                            {saveConfirmed 
                                ? <Alert type="success" messages={['Updated successfully!']}/>
                                : null
                            }

                            <button className="btn btn-primary float-right" onSubmit={handleSubmit}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;