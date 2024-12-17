'use client'
import React, { useState } from 'react';
import axios from 'axios';
import FlightFilter from '@/app/components/website/flight-search/flight-filter';
import FlightCard from '@/app/components/website/flight-details/flight-card';
import Section from '@/app/components/shared/section';
import FlightSearchForm from '@/app/components/website/flight-search/search-form';

const Page: React.FC = () => {
    const [filters, setFilters] = useState<{ [key: string]: any }>({
        price: 2000,
        stops: ['direct'],
        departureTime: 'morning'
    });
    const [flights, setFlights] = useState<any[]>([]);


    return (
        <Section>
            <div className="py-20">
                <FlightSearchForm flights={flights} setFlights={setFlights} />
                <div className="flex flex-wrap justify-between gap-5 py-10">
                    <div className="lg:w-1/5 w-full">
                        {/* Pass individual filter props */}
                        <FlightFilter
                            filterPrice={filters.price}
                            filterStops={filters.stops}
                            filterDepartureTime={filters.departureTime}
                            onPriceChange={(newPrice) => setFilters({ ...filters, price: newPrice })}
                            onStopsChange={(newStops) => setFilters({ ...filters, stops: newStops })}
                            onDepartureTimeChange={(newTime) => setFilters({ ...filters, departureTime: newTime })}
                        />
                    </div>
                    <div className="lg:w-3/4 w-full space-y-6">
                        {flights.length === 0 && <p>No flights found.</p>}
                        {/* {flights.map((flight, index) => (
                            <FlightCard key={index} flight={flight} />
                        ))} */}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Page;
