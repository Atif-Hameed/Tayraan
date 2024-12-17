'use client'
import React, { useState } from 'react';
import FlightFilter from '@/app/components/website/flight-search/flight-filter';
import FlightCard from '@/app/components/website/flight-details/flight-card';
import Section from '@/app/components/shared/section';
interface FilterSection {
    id: string;
    title: string;
    type: 'range' | 'checkbox' | 'time'; // Different types of filters
    options?: FilterOption[];
    min?: number; // For range sliders
    max?: number;
    value?: any; // Default value for each filter
}
interface FilterOption {
    label: string;
    value: string | number;
}

const Page: React.FC = () => {
    const [filters, setFilters] = useState<{ [key: string]: any }>({});
    const filterSections: FilterSection[] = [
        {
            id: 'price',
            title: 'Price range',
            type: 'range',
            min: 1000,
            max: 3800,
        },
        {
            id: 'stops',
            title: 'Stops',
            type: 'checkbox',
            options: [
                { label: 'Direct flights only', value: 'direct' },
                { label: '1 stop point', value: '1stop' },
            ],
        },
        {
            id: 'departureTime',
            title: 'Departure Time',
            type: 'time',
            options: [
                { label: 'Early morning (00:00 - 5:59)', value: 'earlyMorning' },
                { label: 'Morning (6:00 - 11:59)', value: 'morning' },
                { label: 'Afternoon (12:00 - 17:59)', value: 'afternoon' },
                { label: 'Evening (18:00 - 23:59)', value: 'evening' },
            ],
        },
    ];

    return (
        <Section>
            <div className="py-20">
                <div className="flex flex-wrap justify-between gap-5 py-10">
                    <div className="lg:w-1/5 w-full">
                        <FlightFilter
                            sections={filterSections}
                            filters={filters}
                            onFilterChange={(updatedFilters) => setFilters(updatedFilters)}
                        />
                    </div>
                    <div className="lg:w-3/4 w-full space-y-6">
                        {[1, 2, 3, 4, 5, 6].map((_, index) => (
                            <FlightCard key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Page;
