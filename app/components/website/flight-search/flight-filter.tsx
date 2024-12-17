'use client';
import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ArrowUp, DayFilter } from '@/app/svg';

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
                    <div className="mt-2">
                        <input
                            type="range"
                            min={1000}
                            max={3800}
                            value={filterPrice}
                            onChange={(e) => onPriceChange(parseInt(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm">
                            <span>1000 SAR</span>
                            <span>{filterPrice} SAR</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Stops Filter */}
            <div className="py-3">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('stops')}>
                    <h4 className="text-base py-2 font-semibold">Stops</h4>
                    <span>{isExpanded.stops ? <ArrowUp /> : <MdKeyboardArrowDown className="text-2xl" />}</span>
                </div>
                {isExpanded.stops && (
                    <div className="space-y-2 mt-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filterStops.includes('direct')}
                                onChange={() =>
                                    onStopsChange(
                                        filterStops.includes('direct')
                                            ? filterStops.filter((stop) => stop !== 'direct')
                                            : [...filterStops, 'direct']
                                    )
                                }
                                className="mr-2"
                            />
                            Direct flights only
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filterStops.includes('1stop')}
                                onChange={() =>
                                    onStopsChange(
                                        filterStops.includes('1stop')
                                            ? filterStops.filter((stop) => stop !== '1stop')
                                            : [...filterStops, '1stop']
                                    )
                                }
                                className="mr-2"
                            />
                            1 stop point
                        </label>
                    </div>
                )}
            </div>


        </div>
    );
};

export default FlightFilter;
