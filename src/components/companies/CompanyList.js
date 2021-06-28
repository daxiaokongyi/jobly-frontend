import React, {useState, useEffect} from 'react';
import JoblyApi from '../../api/api';
import SearchForm from '../common/searchForm/SearchForm';
import CompanyCard from './CompanyCard';
import LoadingSpinner from '../common/loadingSpinner/LoadingSpinner';

const CompanyList = () => {
    const [companies, setCompanies] = useState(null);

    // get all the companies when the companies page is loading
    useEffect(() => {
        searchByCompany();
    }, [])

    // get all the companies based on the search
    const searchByCompany = async name => {
        const companies = await JoblyApi.getCompanyBySearching(name);
        setCompanies(companies);
    }

    if (!companies) {
        return <LoadingSpinner/>
    }

    return (
        <div className="col-md-8 offset-md-2">
            <SearchForm search={searchByCompany}/>
            {companies.length !== 0  
                ? (<div>
                    {companies.map(
                        (company, index) =>
                            <CompanyCard key={index} name={company.name} description={company.description} logoUrl={company.logoUrl} handle={company.handle}/>
                        )
                    }
                    </div>)
                : 
                    (<p className="lead">Sorry, no company was found. Please try again!</p>)
            }
        </div>
    );
};

export default CompanyList;