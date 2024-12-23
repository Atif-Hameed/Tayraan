'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FlightFilter from '@/app/components/website/flight-search/flight-filter';
import FlightCard from '@/app/components/website/flight-details/flight-card';
import Section from '@/app/components/shared/section';
import FlightSearchForm from '@/app/components/website/flight-search/search-form';
import { useSearchParams } from 'next/navigation';

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const departureDate = searchParams.get("departureDate");
    const returnDate = searchParams.get("returnDate");
    const travelers = searchParams.get("travelers") || "1";
    const flightClass = searchParams.get("class");

    const [filters, setFilters] = useState<{ [key: string]: any }>({
        price: Infinity, // Default to no price limit
        stops: [], // Default to show all stops
        airlines: [], // Default to show all airlines
        departureTime: 'any', // Default to any time
    });
    const [flights, setFlights] = useState<any[]>([]);
    const [carriers, setCarriers] = useState<any>({});

    const getFlights = async () => {
        try {
            const data = await axios.get(
                `/api/search-flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&travelers=${travelers}&flightClass=${flightClass}`
            );
            setFlights(data.data.flights);
            setCarriers(data.data.carriers);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (origin) {
            getFlights();
        }
    }, [origin]);

    // Filter Flights Function
    const filteredFlights = flights.filter((flight) => {
        // Filter by price
        const isPriceValid = parseFloat(flight.price.grandTotal) <= filters.price;

        // Filter by stops
        const isStopsValid =
            filters.stops.length === 0 ||
            filters.stops.includes(
                flight.itineraries.some((itinerary: any) =>
                    itinerary.segments.length === 1 ? 'direct' : '1+ stops'
                )
            );

        // Filter by departure time
        const isDepartureTimeValid =
            filters.departureTime === 'any' ||
            flight.itineraries.some((itinerary: any) =>
                itinerary.segments.some((segment: any) => {
                    const departureHour = new Date(segment.departure.at).getHours();
                    if (filters.departureTime === 'morning') {
                        return departureHour >= 6 && departureHour < 12;
                    }
                    if (filters.departureTime === 'afternoon') {
                        return departureHour >= 12 && departureHour < 18;
                    }
                    if (filters.departureTime === 'evening') {
                        return departureHour >= 18 && departureHour < 24;
                    }
                    if (filters.departureTime === 'night') {
                        return departureHour >= 0 && departureHour < 6;
                    }
                    return true; // default to any time
                })
            );

        // Filter by airlines
        const isAirlinesValid =
            filters.airlines.length === 0 || filters.airlines.includes(carriers[flight.validatingAirlineCodes[0]]);

        return isPriceValid && isStopsValid && isDepartureTimeValid && isAirlinesValid;
    });

    return (
        <Section>
            <div className="py-20">
                <FlightSearchForm flights={flights} setFlights={setFlights} />
                <div className="flex flex-wrap justify-between gap-5 py-10">
                    <div className="lg:w-1/4 w-full">
                        <FlightFilter
                            filterPrice={filters.price}
                            filterStops={filters.stops}
                            airlines={Object.values(carriers)}
                            filterDepartureTime={filters.departureTime}
                            onPriceChange={(newPrice) => setFilters({ ...filters, price: newPrice })}
                            onStopsChange={(newStops) => setFilters({ ...filters, stops: newStops })}
                            onDepartureTimeChange={(newTime) => setFilters({ ...filters, departureTime: newTime })}
                            onAirlinesChange={(newAirlines) => setFilters({ ...filters, airlines: newAirlines })}
                            filterAirlines={filters.airlines}
                            filterBaggage={[]} // Add baggage filter functionality if needed
                            onBaggageChange={(baggage: string[]) => {
                                console.log('Baggage updated:', baggage);
                            }}
                        />
                    </div>
                    <div className="lg:w-[72%] w-full space-y-6">
                        {filteredFlights.length === 0 && <p>No flights found matching your criteria.</p>}
                        {filteredFlights.map((flight) => (
                            <FlightCard
                                key={flight.id}
                                flight={flight}
                                airlineName={carriers[flight.validatingAirlineCodes[0]]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Page;
