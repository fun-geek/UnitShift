import { useState, useEffect } from 'react';
import { convert, categories } from '../utils/conversionLogic';

export function useConverter(category) {
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');
    const [result, setResult] = useState('');

    // Set default units when category changes
    useEffect(() => {
        if (category && categories[category]) {
            const units = Object.keys(categories[category].units);
            if (units.length > 0) {
                setFromUnit(units[0]);
                // Set second unit as default 'to' if available, else first
                setToUnit(units[1] || units[0]);
                setInputValue('');
                setResult('');
            }
        }
    }, [category]);

    // Recalculate result when dependencies change
    useEffect(() => {
        if (!category || !fromUnit || !toUnit) return;

        if (inputValue === '' || isNaN(inputValue)) {
            setResult('');
            return;
        }

        const res = convert(inputValue, fromUnit, toUnit, category);
        setResult(res);
    }, [inputValue, fromUnit, toUnit, category]);

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    return {
        inputValue,
        setInputValue,
        fromUnit,
        setFromUnit,
        toUnit,
        setToUnit,
        result,
        units: category ? categories[category].units : {},
        swapUnits
    };
}
