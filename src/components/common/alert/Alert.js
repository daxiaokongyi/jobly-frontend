import React from 'react';

const Alert = ({type="danger", messages=[]}) => {
    return (
        <div className={`alert alert-${type}`} role="alert">
            {messages.map(errorMessage => (
                <p className="form-group mb-0 small" key={errorMessage}>
                    <small>
                        {errorMessage}
                    </small>
                </p>
            ) )}
        </div>
    )
}

export default Alert;