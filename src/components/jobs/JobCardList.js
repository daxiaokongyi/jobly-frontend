import React from 'react';
import JobCard from './JobCard';

const JobCardList = ({jobs}) => {
    return (
        <div className="JobCardList">
            {jobs.map((job, index) => (
                <JobCard 
                    companyhandle={job.companyhandle}
                    companyName={job.companyName}
                    equity={job.equity}
                    id={job.id}
                    salary={job.salary}
                    title={job.title}
                    key={job.id}
                />
            ))}
        </div>
    )
}

export default JobCardList;