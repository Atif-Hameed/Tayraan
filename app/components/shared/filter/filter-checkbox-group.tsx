// components/CheckboxGroup.tsx
import React from "react";

interface Option {
    label: string;
    count?: number;
    logo?: string;
}

interface CheckboxGroupProps {
    title: string;
    options: Option[];
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ title, options }) => {
    return (
        <div className="mb-4">
            <h3 className="font-semibold pb-2">{title}</h3>
            <ul className="mt-2 space-y-2">
                {options.map((option, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <input type="checkbox" className="mr-2 w-6 h-6 accent-green" />
                        <span className="flex items-center text-xs gap-2">
                            {option.logo && <img src={option.logo} alt={option.label} className="w-6 h-6" />}
                            {option.label}
                        </span>
                        {option.count && <span className="ml-auto text-xs text-black">({option.count})</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CheckboxGroup;
