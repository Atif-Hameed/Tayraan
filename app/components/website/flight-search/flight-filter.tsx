'use client';
import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ArrowUp, DayFilter } from '@/app/svg';
import PriceRange from '../../shared/filter/price-range';
import CheckboxGroup from '../../shared/filter/filter-checkbox-group';

interface FlightFilterProps {
    filterPrice: number;
    filterStops: string[];
    filterDepartureTime: string;
    onPriceChange: (price: number) => void;
    onStopsChange: (stops: string[]) => void;
    onDepartureTimeChange: (departureTime: string) => void;
}

// Define the possible keys for the isExpanded state
type IsExpanded = {
    price: boolean;
    stops: boolean;
    departureTime: boolean;
};

const FlightFilter: React.FC<FlightFilterProps> = ({
    filterPrice,
    filterStops,
    filterDepartureTime,
    onPriceChange,
    onStopsChange,
    onDepartureTimeChange
}) => {
    // Initialize isExpanded with the correct type
    const [isExpanded, setIsExpanded] = React.useState<IsExpanded>({
        price: true,
        stops: true,
        departureTime: true
    });
    const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);

    const handlePriceChange = (newValue: [number, number]) => {
        console.log("Selected Price Range:", newValue);
        setPriceRange(newValue);
    };
    const toggleSection = (section: keyof IsExpanded) => {
        setIsExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Filter results...</h3>
            {/* Departure Time Filter */}
            <div className="py-3">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('departureTime')}>
                    <h4 className="text-base py-2 font-semibold">Departure Time</h4>
                    <span>{isExpanded.departureTime ? <ArrowUp /> : <MdKeyboardArrowDown className="text-2xl" />}</span>
                </div>
                {isExpanded.departureTime && (
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        {['earlyMorning', 'morning', 'afternoon', 'evening'].map((time) => (
                            <div
                                key={time}
                                className={`border p-2 rounded-md flex flex-col items-center cursor-pointer hover:shadow ${filterDepartureTime === time ? 'border-blue-500' : ''
                                    }`}
                                onClick={() => onDepartureTimeChange(time)}
                            >
                                <DayFilter />
                                <span className="text-sm text-center">{time}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Price Filter */}
            <div className="py-3">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('price')}>
                    <h4 className="text-base py-2 font-semibold">Price range</h4>
                    <span>{isExpanded.price ? <ArrowUp /> : <MdKeyboardArrowDown className="text-2xl" />}</span>
                </div>
                {isExpanded.price && (
                    <PriceRange
                        title=""
                        min={50}
                        max={1000}
                        unit="SAR"
                        value={priceRange}
                        onChange={handlePriceChange}
                    />
                )}
            </div>

            {/* Stops Filter */}
            <div className="py-3 space-y-5">
                <CheckboxGroup
                    title="خطوط الطيران"
                    options={[
                        { label: "طيران ناس", logo: "/jazeera.png" },
                        { label: "طيران ناس", logo: "/jazeera.png" },
                    ]}
                />
                <CheckboxGroup
                    title="المطارات"
                    options={[
                        { label: "مطار الملك خالد الدولي (RUH)" },
                        { label: "مطار حمد الدولي (DOH)" },
                    ]}
                />
            </div>


        </div>
    );
};

export default FlightFilter;
