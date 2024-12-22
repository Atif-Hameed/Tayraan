'use client';

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import fromImg from "/public/assets/from.png";
import toImg from "/public/assets/to.png";
import { Search } from "lucide-react";
import AirportSearchField from "../../shared/airport-search-field";

interface FlightSearchFormProps {
    setFlights?: React.Dispatch<React.SetStateAction<any[]>>;
    flights?: any[];
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
    setFlights,
    flights
}) => {
    const [tripType, setTripType] = useState("roundtrip");
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [departureDate, setDepartureDate] = useState<string>("");
    const [returnDate, setReturnDate] = useState<string>("");
    const [travelers, setTravelers] = useState<string>("1");
    const [flightClass, setFlightClass] = useState<string>("ECONOMY");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/search-flights`, {
                params: {
                    origin: from,
                    destination: to,
                    departureDate,
                    returnDate: tripType === "roundtrip" ? returnDate : undefined,
                    travelers,
                    flightClass
                }
            });
            setFlights?.(response.data.data);
        } catch (err) {
            setError("There was an error fetching flight data.");
        } finally {
            setLoading(false);
        }
    };

    const flightClassOptions = [
        { label: "Economy", value: "ECONOMY" },
        { label: "Premium Economy", value: "PREMIUM_ECONOMY" },
        { label: "Business", value: "BUSINESS" },
        { label: "First Class", value: "FIRST" },
    ];

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
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                            {num} {num > 1 ? "passengers" : "passenger"}
                        </option>
                    ))}
                </select>
                <select
                    className="px-4 py-3 rounded-full border border-borderColor"
                    name="class"
                    aria-label="Class"
                    value={flightClass}
                    onChange={(e) => setFlightClass(e.target.value)}
                >
                    {flightClassOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* From, To, and Dates */}
            <div className="flex gap-4 justify-between flex-wrap items-center">
                <div className="relative lg:w-1/5 w-full">
                    <AirportSearchField
                        label=""
                        placeholder="From"
                        className="border rounded-full py-3 !border-borderColor"
                        onSelect={(value) => setFrom(value)}
                        icon={fromImg}
                    />
                </div>

                <button
                    type="button"
                    aria-label="Swap Locations"
                    className="py-3 px-5 bg-green lg:block hidden rounded-md text-white"
                    onClick={() => {
                        const temp = from;
                        setFrom(to);
                        setTo(temp);
                    }}
                >
                    &#8644;
                </button>

                <div className="relative lg:w-1/5 w-full">
                    <AirportSearchField
                        label=""
                        placeholder="To"
                        className="border rounded-full py-3 !border-borderColor"
                        onSelect={(value) => setTo(value)}
                        icon={toImg}
                        filterItem={from}
                    />
                </div>

                <div className="relative lg:w-1/5 w-full">
                    <input
                        placeholder="Departure"
                        type="date"
                        value={departureDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="px-4 py-3 w-full rounded-full border border-borderColor"
                        aria-label="Departure Date"
                    />
                </div>

                {tripType === "roundtrip" && (
                    <div className="relative lg:w-1/5 w-full">
                        <input
                            placeholder="Return"
                            type="date"
                            value={returnDate}
                            min={departureDate || new Date().toISOString().split("T")[0]}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="px-4 py-3 w-full rounded-full border border-borderColor"
                            aria-label="Return Date"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 text-white hover:bg-emerald-600"
                    aria-label="Search Flights"
                >
                    {loading ? "Searching..." : "Search"} <Search />
                </button>
            </div>

            {/* Error Handling */}
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
};

export default FlightSearchForm;
