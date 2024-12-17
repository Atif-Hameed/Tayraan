'use client';
import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ArrowUp, DayFilter } from '@/app/svg';

interface FilterOption {
    label: string;
    value: string | number;
}

interface FilterSection {
    id: string;
    title: string;
    type: 'range' | 'checkbox' | 'time'; // Different types of filters
    options?: FilterOption[];
    min?: number; // For range sliders
    max?: number;
    value?: any; // Default value for each filter
}

interface FlightFilterProps {
    sections: FilterSection[];
    filters: { [key: string]: any }; // External state
    onFilterChange: (updatedFilters: { [key: string]: any }) => void;
}

const FlightFilter: React.FC<FlightFilterProps> = ({ sections, filters, onFilterChange }) => {
    const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>(
        sections.reduce((acc, section) => ({ ...acc, [section.id]: true }), {})
    );

    const toggleSection = (id: string) => {
        setIsExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleRangeChange = (id: string, value: number) => {
        onFilterChange({ ...filters, [id]: [filters[id][0], value] });
    };

    const handleCheckboxChange = (id: string, value: string) => {
        const updatedStops = filters[id]?.includes(value)
            ? filters[id].filter((item: string) => item !== value)
            : [...(filters[id] || []), value];
        onFilterChange({ ...filters, [id]: updatedStops });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Filter results...</h3>

            {sections.map((section) => (
                <div key={section.id} className="py-3">

                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection(section.id)}
                    >
                        <h4 className="text-base py-2 font-semibold">{section.title}</h4>
                        <span>
                            {isExpanded[section.id] ? <ArrowUp /> : <MdKeyboardArrowDown className="text-2xl" />}
                        </span>
                    </div>

                    {/* Time Options */}
                    {isExpanded[section.id] && section.type === 'time' && section.options && (
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {section.options.map((option) => (
                                <div
                                    key={option.value}
                                    className={`border p-2 rounded-md flex flex-col items-center cursor-pointer hover:shadow ${filters[section.id] === option.value ? 'border-blue-500' : ''
                                        }`}
                                    onClick={() => onFilterChange({ ...filters, [section.id]: option.value })}
                                ><DayFilter />
                                    <span className="text-sm text-center">{option.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Section Header */}

                    {/* Range Slider */}
                    {isExpanded[section.id] && section.type === 'range' && (
                        <div className="mt-2">
                            <input
                                type="range"
                                min={section.min}
                                max={section.max}
                                value={filters[section.id]}
                                onChange={(e) => handleRangeChange(section.id, parseInt(e.target.value))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm">
                                <span>{section.min} SAR</span>
                                <span>{filters[section.id]} SAR</span>
                            </div>
                        </div>
                    )}

                    {/* Checkboxes */}
                    {isExpanded[section.id] && section.type === 'checkbox' && section.options && (
                        <div className="space-y-2">
                            {section.options.map((option) => (
                                <label key={option.value} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filters[section.id]?.includes(option.value)}
                                        onChange={() => handleCheckboxChange(section.id, option.value as string)}
                                        className="mr-2"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    )}

                </div>
            ))}
        </div>
    );
};

export default FlightFilter;
