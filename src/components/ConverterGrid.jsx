import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConverterCard from './ConverterCard';
import './ConverterGrid.css';
import { categories } from '../utils/conversionLogic';
import { motion } from 'framer-motion';

const ConverterGrid = ({ searchTerm }) => {
    const navigate = useNavigate();

    const filteredCategories = Object.entries(categories).filter(([key, value]) => {
        const lowerTerm = searchTerm.toLowerCase();
        // Smart Search: Check label OR keywords
        return (
            value.label.toLowerCase().includes(lowerTerm) ||
            (value.keywords && value.keywords.some(k => k.toLowerCase().includes(lowerTerm)))
        );
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            className="grid-container"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {filteredCategories.length > 0 ? (
                filteredCategories.map(([key, value], index) => (
                    <ConverterCard
                        key={key}
                        id={key}
                        category={value}
                        onClick={() => navigate(`/converter/${key}`)}
                    />
                ))
            ) : (
                <div className="no-results">
                    <p>No converters found for "{searchTerm}"</p>
                    <small>Try "weight", "lbs", or "distance"</small>
                </div>
            )}
        </motion.div>
    );
};

export default ConverterGrid;
