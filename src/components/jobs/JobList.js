import React, {useState, useEffect} from 'react';
import JoblyApi from '../../api/api';
import LoadingSpinner from '../common/loadingSpinner/LoadingSpinner';
import SearchForm from '../common/searchForm/SearchForm';
import JobCardList from './JobCardList';

const Jobs = () => {
    const [jobs, setJobs] = useState(null);

    // search function used to get jobs
    const searchJobs = async (title) => {
        const resultJobs = await JoblyApi.getJobsBySearching(title);
        // reset jobs state
        setJobs(resultJobs);
    }   

    // searchJobs("accountant");

    // get all the jobs when rendering the page
    useEffect(() => {
        searchJobs();
    }, []);

    // show loading component when jobs result is loading
    if (!jobs) {
        return <LoadingSpinner/>
    }

    return (
        <div className="col-md-8 offset-md-2">   
            <SearchForm search={searchJobs}/>
            {jobs
                ? <JobCardList jobs={jobs}/>
                : <p className="lead">Sorry, no jobs was found. Please try it again!</p>
            }
        </div>
    )
}

export default Jobs;