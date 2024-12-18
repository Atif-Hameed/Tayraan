'use client';

import { useState } from "react";
import axios from "axios"; // Import axios
import Image from "next/image";
import fromImg from "/public/assets/from.png";
import toImg from "/public/assets/to.png";
import { Search } from "lucide-react";

interface FlightSearchFormProps {
    setFlights?: React.Dispatch<React.SetStateAction<any[]>>; // Updated for correct type
    flights?: any[];
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
    setFlights,
    flights
}) => {
    const [tripType, setTripType] = useState('roundtrip');
    const [from, setFrom] = useState<string>(''); // Added types
    const [to, setTo] = useState<string>(''); // Added types
    const [departureDate, setDepartureDate] = useState<string>(''); // Added types
    const [returnDate, setReturnDate] = useState<string>(''); // Added types
    const [loading, setLoading] = useState(false); // For loading state
    const [error, setError] = useState<string | null>(null); // Fixed typo in state initialization

    // Handle form submit and API call
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null); // Reset error before making a new request

        try {
            const originIATA = origin === 'lahore' ? 'LHE' : origin;  // Use 'LHE' for Lahore
            const destinationIATA = from === 'Dubai' ? 'DXB' : from;  // Use 'DXB' for Dubai

            // Make the GET request to the server API
            const response = await axios.get('/api/search-flights', {
                params: {
                    origin: originIATA, // e.g., "LHE"
                    destination: destinationIATA, // e.g., "DXB"
                    departureDate: departureDate, // e.g., "2024-12-20"
                    returnDate: tripType === "roundtrip" ? returnDate : null, // Only add for roundtrip
                },
            });



            // Store the fetched flight data
            setFlights?.(response.data);
            console.log('flight', response.data)
        } catch (err) {
            setError('There was an error fetching flight data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Trip Type Selection */}
            <div className="flex gap-4 flex-wrap w-full">
                {["roundtrip", "oneway", "multiCities"].map((type) => (
                    <button
                        key={type}
                        type="button"
                        aria-label={type}
                        onClick={() => setTripType(type)}
                        className={`px-4 py-2 font-medium text-lg rounded-full ${tripType === type
                            ? "bg-greenGradient text-white"
                            : "bg-[#EEEEEE] text-black"
                            }`}
                    >
                        {type === "roundtrip"
                            ? "Back and forth"
                            : type === "oneway"
                                ? "One way only"
                                : "Multiple cities"}
                    </button>
                ))}
            </div>

            {/* Passenger and Class Selection */}
            <div className="flex gap-4 my-4">
                <select
                    className="px-4 py-3 rounded-full border border-borderColor"
                    name="passengers"
                    aria-label="Passengers"
                >
                    <option value="1">1 passenger</option>
                    <option value="2">2 passengers</option>
                    <option value="3">3 passengers</option>
                    <option value="4">4 passengers</option>
                </select>
                <select
                    className="px-4 py-3 rounded-full border border-borderColor"
                    name="class"
                    aria-label="Class"
                >
                    <option value="economy">Economy class</option>
                    <option value="business">Business class</option>
                    <option value="first">First class</option>
                </select>
            </div>

            {/* From, To, Date Inputs */}
            <div className="flex gap-4 justify-between flex-wrap items-center">
                <div className="relative lg:w-1/5 w-full">
                    <input
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="From"
                        className="w-full px-4 py-3 rounded-full border border-borderColor"
                        aria-label="From"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <Image src={fromImg} alt="From Icon" />
                    </div>
                </div>

                <button
                    type="button"
                    aria-label="Swap Locations"
                    className="py-3 px-5 bg-green lg:block hidden rounded-md text-white"
                >
                    &#8644;
                </button>

                <div className="relative lg:w-1/5 w-full">
                    <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="To"
                        className="w-full px-4 py-3 rounded-full border border-borderColor"
                        aria-label="To"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <Image src={toImg} alt="To Icon" />
                    </div>
                </div>

                <div className="relative lg:w-1/5 w-full">
                    <input
                        placeholder="GO"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        type="date"
                        className="px-4 py-3 w-full rounded-full border border-borderColor"
                        aria-label="Departure Date"
                    />
                </div>

                {/* Conditional Return Date */}
                {tripType === "roundtrip" && (
                    <div className="relative lg:w-1/5 w-full">
                        <input
                            placeholder="Return"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            type="date"
                            className="px-4 py-3 w-full rounded-full border border-borderColor"
                            aria-label="Return Date"
                        />
                    </div>
                )}

                {/* Search Button */}
                <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 text-white hover:bg-emerald-600"
                    aria-label="Search Flights"
                >
                    {loading ? 'Searching...' : 'Search'} <Search />
                </button>
            </div>

            {/* Error handling */}
            {error && <p className="text-red-500">{error}</p>}


        </form>
    );
};

export default FlightSearchForm;
