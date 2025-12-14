import React from 'react';
import './ConverterCard.css';

const ConverterCard = ({ category, label, onClick }) => {
    return (
        <div className="converter-card" onClick={onClick} role="button" tabIndex={0}>
            <div className="card-content">
                <div className="card-icon">{label[0]}</div>
                <h3>{label}</h3>
                <p>Convert {label.toLowerCase()} units</p>
            </div>
            <div className="card-glow"></div>
        </div>
    );
};

export default ConverterCard;
