import React from 'react';
import { useConverter } from '../hooks/useConverter';
import { categories } from '../utils/conversionLogic';
import './Converter.css';

const Converter = ({ category, onBack }) => {
    const {
        inputValue,
        setInputValue,
        fromUnit,
        setFromUnit,
        toUnit,
        setToUnit,
        result,
        units,
        swapUnits
    } = useConverter(category);

    if (!category) return null;

    return (
        <div className="converter-container">
            <button className="back-btn" onClick={onBack}>← Back</button>
            <h2 className="converter-title">{categories[category].label}</h2>

            <div className="converter-box">
                <div className="input-group">
                    <label>From</label>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="0"
                        className="glow-input"
                    />
                    <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="glow-select"
                    >
                        {Object.entries(units).map(([key, unit]) => (
                            <option key={key} value={key}>{unit.label}</option>
                        ))}
                    </select>
                </div>

                <button className="swap-btn" onClick={swapUnits} aria-label="Swap units">
                    ⇅
                </button>

                <div className="input-group">
                    <label>To</label>
                    <div className="result-display">{result || '0'}</div>
                    <select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="glow-select"
                    >
                        {Object.entries(units).map(([key, unit]) => (
                            <option key={key} value={key}>{unit.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Converter;
