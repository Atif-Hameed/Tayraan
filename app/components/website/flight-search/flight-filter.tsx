'use client'
import { useState } from 'react';

interface FilterItem {
    label: string;
    count?: number;
    value: any | number;
    type: 'checkbox' | 'range';
}

const FlightFilter: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const [filterState, setFilterState] = useState({
        arrivalTime: '',
        priceRange: [200, 2000], // Example range
        stops: ['direct'],
        airlines: [],
        airports: [],
    });

    const filterItems: FilterItem[] = [
        { label: 'Early morning (00:00 - 5:59)', value: 'earlyMorning', type: 'checkbox' },
        { label: 'The morning (6:00 - 11:59)', value: 'morning', type: 'checkbox' },
        { label: 'Afternoon (12:00 - 17:59)', value: 'afternoon', type: 'checkbox' },
        { label: 'Evening (18:00 - 23:59)', value: 'evening', type: 'checkbox' },
        { label: 'Direct flights only', value: 'direct', type: 'checkbox', count: 23 },
        { label: '1 stop point', value: 'onestop', type: 'checkbox', count: 23 },
        { label: 'Airline A', value: 'airlineA', type: 'checkbox', count: 23 },
        { label: 'Airline B', value: 'airlineB', type: 'checkbox', count: 23 },
        // ... more filter items
        { label: 'Price range', value: 'price', type: 'range' },
        { label: 'Duration', value: 'duration', type: 'range' },
    ];


    const handleCheckboxChange = (value: string) => {
        setFilterState((prevState) => ({
            ...prevState,
            stops: prevState.stops.includes(value) ? prevState.stops.filter((s) => s !== value) : [...prevState.stops, value],
        }));
    };

    const handleRangeChange = (value: number[], type: string) => {
        setFilterState((prevState) => ({ ...prevState, [type]: value }));
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 w-64">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setIsExpanded(!isExpanded)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                    </svg>
                </button>
            </div>

            {isExpanded && (
                <div>
                    {filterItems.map((item) => (
                        <div key={item.label} className="mb-2">
                            {item.type === 'checkbox' ? (
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={item.value}
                                        checked={filterState.stops.includes(item.value)}
                                        onChange={() => handleCheckboxChange(item.value)}
                                        className="mr-2"
                                    />
                                    <label >{item.label} {item.count && `(${item.count})`}</label>
                                </div>
                            ) : item.type === 'range' ? (
                                <div>
                                    <label >{item.label}</label>
                                    <input
                                        type="range"
                                        id={item.value}
                                        min={item.value === 'price' ? 200 : 0}
                                        max={item.value === 'price' ? 2000 : 720}
                                        // value={filterState[item.value as 'priceRange' | 'duration']}
                                        onChange={(e) => handleRangeChange([parseInt(e.target.value, 10), 2000], item.value as 'priceRange' | 'duration')}
                                    />
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FlightFilter;
