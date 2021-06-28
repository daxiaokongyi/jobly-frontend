import React, {useState, useContext, useEffect} from 'react';
import './JobCard.css';
import UserContext from '../users/UserContext';

const JobCard = ({companyName, equity, id, salary, title}) => {
    const [applied, setApplied] = useState();
    const {hasAppliedToJobs, applyToJob} = useContext(UserContext);

    // 
    useEffect(() => {   
        setApplied(hasAppliedToJobs(id));
    }, [id, hasAppliedToJobs])

    // Apply a job
    const handleApply = async () => {
        // check if the current job has been applied
        if (hasAppliedToJobs(id)) {
            return;
        } else {
            applyToJob(id);
            setApplied(true);
        }
    }   

    return (
        <div className="JobCard card">
            <div className="card-body">
                <h6 className="card-title">{title}</h6>
                <p>{companyName}</p>
                <div>
                    <small> Salary: 
                        {salary
                            ? ` ${salary}`
                            : " N/A"
                        }
                    </small>
                </div>
                <div>
                    <small>Equity: 
                        {equity
                            ? ` ${equity}`
                            : " N/A"
                        }
                    </small>
                </div>
                <button 
                    className="btn btn-danger font-weight-bold text-uppercase float-right"
                    onClick={handleApply}
                    disabled={applied}
                >
                    {applied ? "Applied" : "Apply"}
                </button>
            </div>
        </div>
    )
}

export default JobCard;