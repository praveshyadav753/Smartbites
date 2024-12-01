// AgeRangeSlider.js
import React, { useState } from 'react';
import { useEffect } from 'react';
import './AgeRangeSlider.css'; // Import the CSS for styling

const AgeRangeSlider = ({ min, max, value, onChange }) => {
    const [rangeValue, setRangeValue] = useState(value);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setRangeValue(newValue);
        onChange(newValue); // Call the onChange function passed as prop
    };
    useEffect(() => {
        const percentage = ((rangeValue - min) / (max - min)) * 100; // Calculate percentage
        document.documentElement.style.setProperty('--value', `${percentage}%`);
    }, [rangeValue, min, max]);

    return (
        <div className="age-range-slider">
            <input
                type="range"
                min={min}
                max={max}
                value={rangeValue}
                onChange={handleChange}
                className="slider-range"
            />
            <div className="value-display">
                <span>{rangeValue}</span>
            </div>
        </div>
    );
};

export default AgeRangeSlider;
