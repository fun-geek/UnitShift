import React from 'react';
import ConverterCard from './ConverterCard';
import './ConverterGrid.css';
import { categories } from '../utils/conversionLogic';

const ConverterGrid = ({ onSelect, searchTerm }) => {
    const filteredCategories = Object.entries(categories).filter(([key, value]) =>
        value.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="grid-container">
            {filteredCategories.length > 0 ? (
                filteredCategories.map(([key, value]) => (
                    <ConverterCard
                        key={key}
                        category={key}
                        label={value.label}
                        onClick={() => onSelect(key)}
                    />
                ))
            ) : (
                <div className="no-results">No converters found.</div>
            )}
        </div>
    );
};

export default ConverterGrid;
