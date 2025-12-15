import { useState, useEffect } from 'react';
import { convert, categories } from '../utils/conversionLogic';

export function useConverter(category) {
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');
    const [result, setResult] = useState('');
    const [rates, setRates] = useState(null); // Store fetched rates
    const [loading, setLoading] = useState(false);

    // Fetch rates if category is currency
    useEffect(() => {
        if (category === 'currency') {
            setLoading(true);
            fetch('https://api.frankfurter.app/latest?from=USD')
                .then(res => res.json())
                .then(data => {
                    setRates(data.rates);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch rates:", err);
                    setLoading(false);
                });
        }
    }, [category]);

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

        // Special handling for Live Currency
        if (category === 'currency' && rates) {
            const fromRate = fromUnit === 'USD' ? 1 : rates[fromUnit];
            const toRate = toUnit === 'USD' ? 1 : rates[toUnit];

            if (fromRate && toRate) {
                const baseUSD = parseFloat(inputValue) / fromRate;
                const finalVal = baseUSD * toRate;
                setResult(parseFloat(finalVal.toPrecision(10)));
                return;
            }
        }

        // Standard Unit Conversion
        const res = convert(inputValue, fromUnit, toUnit, category);
        setResult(res);
    }, [inputValue, fromUnit, toUnit, category, rates]);

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
        swapUnits,
        loading
    };
}
