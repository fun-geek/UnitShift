import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useConverter } from '../hooks/useConverter';
import { categories } from '../utils/conversionLogic';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import './Converter.css';

const Converter = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    // Convert logic
    const {
        inputValue,
        setInputValue,
        fromUnit,
        setFromUnit,
        toUnit,
        setToUnit,
        result,
        units,
        swapUnits,
        loading
    } = useConverter(categoryId);

    const categoryData = categories[categoryId];

    if (!categoryData) {
        return <div className="error">Category not found</div>;
    }

    const IconComponent = Icons[categoryData.icon] || Icons.HelpCircle;

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <motion.div
            className="converter-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            <button className="back-btn" onClick={() => navigate('/')}>
                <Icons.ArrowLeft size={20} /> Back
            </button>

            <header className="converter-header">
                <div className={`icon-badge ${categoryData.gradient}`}>
                    <IconComponent size={24} color="white" />
                </div>
                <div>
                    <h2 className="converter-title">{categoryData.label}</h2>
                    {categoryId === 'currency' && (
                        <span className={`status-badge ${loading ? 'loading' : 'live'}`}>
                            {loading ? 'Fetching...' : '• Live Rates'}
                        </span>
                    )}
                </div>
            </header>

            <div className="converter-box glass-panel">
                <div className="input-group">
                    <label>From</label>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="0"
                        className="glow-input"
                        autoFocus
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

                <div className="swap-container">
                    <button className="swap-btn" onClick={swapUnits} aria-label="Swap units">
                        <Icons.ArrowUpDown size={20} />
                    </button>
                </div>

                <div className="input-group">
                    <label>To</label>
                    <div className="result-wrapper">
                        <div className="result-display">{result || '0'}</div>
                        <button
                            className={`copy-btn ${copied ? 'copied' : ''}`}
                            onClick={handleCopy}
                            title="Copy to clipboard"
                        >
                            {copied ? <Icons.Check size={18} /> : <Icons.Copy size={18} />}
                        </button>
                    </div>
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
        </motion.div>
    );
};

export default Converter;
