import React from 'react';

interface CustomRadioProps {
    label: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomRadio: React.FC<CustomRadioProps> = ({ label, name, value, checked, onChange }) => {
    return (
        <label className="custom-radio-container">
            {label}
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span className="custom-radio"></span>
        </label>
    );
};

export default CustomRadio;
