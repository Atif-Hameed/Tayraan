'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FlightFilter from '@/app/components/website/flight-search/flight-filter';
import FlightCard from '@/app/components/website/flight-details/flight-card';
import Section from '@/app/components/shared/section';
import FlightSearchForm from '@/app/components/website/flight-search/search-form';
import { useSearchParams } from 'next/navigation';

const Page: React.FC = () => {
    const searchParams = useSearchParams()
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const departureDate = searchParams.get("departureDate");
    const returnDate = searchParams.get("returnDate");
    const travelers = searchParams.get("travelers") || "1";
    const flightClass = searchParams.get("class");

    const [filters, setFilters] = useState<{ [key: string]: any }>({
        price: 2000,
        stops: ['direct'],
        departureTime: 'morning'
    });
    const [flights, setFlights] = useState<any[]>([]);
    const [carriers, setCarriers] = useState<any[]>([]);

    const GetFlights = async () => {
        try {
            const data = await axios.get(`/api/search-flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&travelers=${travelers}&flightClass=${flightClass}`)
            setFlights(data.data.flights)
            setCarriers(data.data.carriers)

        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (origin) {
            GetFlights()
        }

    }, [origin])

    console.log("flight", flights)
    console.log("carrie", carriers)


    return (
        <Section>
            <div className="py-20">
                <FlightSearchForm flights={flights} setFlights={setFlights} />
                <div className="flex flex-wrap justify-between gap-5 py-10">
                    <div className="lg:w-1/4 w-full">
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
                    <div className="lg:w-[72%] w-full space-y-6">
                        {flights.length === 0 && <p>No flights found.</p>}
                        {flights && flights.map((flight, index) => (
                            <FlightCard key={flight.id} flight={flight} airlineName={carriers[flight.validatingAirlineCodes[0]]} />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Page;
