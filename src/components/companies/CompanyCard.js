import React from 'react';
import {Link} from 'react-router-dom';
import './CompanyCard.css';

const CompanyCard = ({name, description, logoUrl, handle}) => {
    return (
        <Link className="CompanyCard card" to={`companies/${handle}`}>
            <div className="card-body">
                <h6 className="card-title">
                    {name}
                    {logoUrl && <img src={`https://joelburton-jobly.surge.sh/${logoUrl}`}
                                     alt={name}
                                     className="float-right ml-5"
                    />}
                </h6>
                <p className="description"><small>{description}</small></p>
            </div>
        </Link>
    )
}

export default CompanyCard;