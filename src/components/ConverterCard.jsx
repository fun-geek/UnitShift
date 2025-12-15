import React from 'react';
import './ConverterCard.css';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const ConverterCard = ({ category, onClick, id }) => {
    const IconComponent = Icons[category.icon] || Icons.HelpCircle;

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className={`converter-card gradient-${id}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
            variants={item}
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Dynamic Gradient Background */}
            <div className={`card-gradient-bg ${category.gradient}`}></div>

            <div className="card-content">
                <div className="card-icon-wrapper">
                    <IconComponent size={48} strokeWidth={1.5} />
                </div>
                <h3>{category.label}</h3>
                <p>Convert {category.label.toLowerCase()} units</p>
            </div>

            <div className="card-glow"></div>
        </motion.div>
    );
};

export default ConverterCard;
