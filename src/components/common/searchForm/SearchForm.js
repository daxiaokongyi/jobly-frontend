import React, {useState} from 'react';
import './SearchForm.css';

const SearchForm = ({search}) => {
    // use hook useState for search term
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = evt => {
        evt.preventDefault();
        search(searchTerm.trim() || undefined);
    }

    // update the search term
    const handleChange = evt => {
        setSearchTerm(evt.target.value);
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input 
                    className="form-control form-control-lg flex-grow-1"
                    type="text"
                    placeholder="Enter your term..."
                    name="searchTerm"
                    value={searchTerm}
                    onChange={handleChange} 
                />
                <button type="submit" className="btn btn-lg btn-primary">Search</button>
            </form>
        </div>
    )
}

export default SearchForm;