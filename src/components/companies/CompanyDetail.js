import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import JoblyApi from '../../api/api';
import LoadingSpinner from '../common/loadingSpinner/LoadingSpinner'; 
import JobCardList from '../jobs/JobCardList';
import './CompanyDetail.css';

const CompanyDetail = () => {
    const {handle} = useParams();

    const [companyDetail, setCompanyDetail] = useState(null);

    useEffect(() => {
        const getCompanyDetail = async () => {
            let resultCompany = await JoblyApi.getCompany(handle);
            setCompanyDetail(resultCompany);
        }

        getCompanyDetail();

    }, [handle])

    if (!companyDetail) {
        return <LoadingSpinner/>
    }

    return (    
        <div className="CompanyDetail col-md-8 offset-md-2">
            <h4>{companyDetail.name}</h4>
            <p>{companyDetail.description}</p>
            <JobCardList jobs={companyDetail.jobs}/>
        </div>
    );
}

export default CompanyDetail;