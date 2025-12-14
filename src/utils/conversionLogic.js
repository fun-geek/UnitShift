export const categories = {
    length: {
        label: 'Length',
        units: {
            m: { label: 'Meters', factor: 1 },
            km: { label: 'Kilometers', factor: 1000 },
            cm: { label: 'Centimeters', factor: 0.01 },
            mm: { label: 'Millimeters', factor: 0.001 },
            mi: { label: 'Miles', factor: 1609.344 },
            yd: { label: 'Yards', factor: 0.9144 },
            ft: { label: 'Feet', factor: 0.3048 },
            in: { label: 'Inches', factor: 0.0254 },
            nm: { label: 'Nanometers', factor: 1e-9 }
        }
    },
    weight: {
        label: 'Weight',
        units: {
            kg: { label: 'Kilograms', factor: 1 },
            g: { label: 'Grams', factor: 0.001 },
            mg: { label: 'Milligrams', factor: 0.000001 },
            lb: { label: 'Pounds', factor: 0.45359237 },
            oz: { label: 'Ounces', factor: 0.028349523125 },
            st: { label: 'Stones', factor: 6.35029318 },
            t: { label: 'Tonnes (Metric)', factor: 1000 }
        }
    },
    temperature: {
        label: 'Temperature',
        type: 'function', // Special handling for non-linear
        units: {
            C: { label: 'Celsius' },
            F: { label: 'Fahrenheit' },
            K: { label: 'Kelvin' }
        }
    },
    area: {
        label: 'Area',
        units: {
            sqm: { label: 'Square Meters', factor: 1 },
            sqkm: { label: 'Square Kilometers', factor: 1e6 },
            sqmi: { label: 'Square Miles', factor: 2.58999e6 },
            sqft: { label: 'Square Feet', factor: 0.092903 },
            acre: { label: 'Acres', factor: 4046.86 },
            ha: { label: 'Hectares', factor: 10000 }
        }
    },
    volume: {
        label: 'Volume',
        units: {
            l: { label: 'Liters', factor: 1 },
            ml: { label: 'Milliliters', factor: 0.001 },
            gal: { label: 'Gallons (US)', factor: 3.78541 },
            qt: { label: 'Quarts (US)', factor: 0.946353 },
            pt: { label: 'Pints (US)', factor: 0.473176 },
            cup: { label: 'Cups (US)', factor: 0.236588 },
            floz: { label: 'Fluid Ounces (US)', factor: 0.0295735 }
        }
    },
    speed: {
        label: 'Speed',
        units: {
            mps: { label: 'Meters/Second', factor: 1 },
            kmh: { label: 'Kilometers/Hour', factor: 0.277778 },
            mph: { label: 'Miles/Hour', factor: 0.44704 },
            kn: { label: 'Knots', factor: 0.514444 }
        }
    },
    time: {
        label: 'Time',
        units: {
            s: { label: 'Seconds', factor: 1 },
            min: { label: 'Minutes', factor: 60 },
            h: { label: 'Hours', factor: 3600 },
            d: { label: 'Days', factor: 86400 },
            wk: { label: 'Weeks', factor: 604800 },
            mo: { label: 'Months (Avg)', factor: 2.628e6 },
            y: { label: 'Years', factor: 3.1536e7 }
        }
    },
    digital: {
        label: 'Digital Storage',
        units: {
            b: { label: 'Bytes', factor: 1 },
            kb: { label: 'Kilobytes', factor: 1024 },
            mb: { label: 'Megabytes', factor: 1048576 },
            gb: { label: 'Gigabytes', factor: 1073741824 },
            tb: { label: 'Terabytes', factor: 1099511627776 }
        }
    }
};

export function convert(value, fromUnit, toUnit, category) {
    const val = parseFloat(value);
    if (isNaN(val)) return '';

    const catData = categories[category];
    if (!catData) return null;

    // Temperature special case
    if (catData.type === 'function') {
        return convertTemperature(val, fromUnit, toUnit);
    }

    // Linear conversion
    const fromFactor = catData.units[fromUnit].factor;
    const toFactor = catData.units[toUnit].factor;

    // Calculate base unit then convert to target
    const baseValue = val * fromFactor;
    const result = baseValue / toFactor;

    return parseFloat(result.toPrecision(10)); // Avoid floating point errors
}

function convertTemperature(val, from, to) {
    let celsius;

    // Convert to Celsius first
    if (from === 'C') celsius = val;
    else if (from === 'F') celsius = (val - 32) * (5 / 9);
    else if (from === 'K') celsius = val - 273.15;

    // Convert Celsius to target
    if (to === 'C') return parseFloat(celsius.toPrecision(10));
    if (to === 'F') return parseFloat(((celsius * 9 / 5) + 32).toPrecision(10));
    if (to === 'K') return parseFloat((celsius + 273.15).toPrecision(10));
}
