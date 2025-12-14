import React from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="search-wrapper">
            <input
                type="text"
                className="search-input"
                placeholder="Find a converter..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <div className="search-icon">🔍</div>
        </div>
    );
};

export default SearchBar;
