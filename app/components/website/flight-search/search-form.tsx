"use client";

import { useState } from "react";
import Image from "next/image";
import fromImg from "/public/assets/from.png";
import toImg from "/public/assets/to.png";
import { Search } from "lucide-react";

interface FlightSearchFormProps {
    defaultTripType?: string; // roundtrip, oneway, multiCities
    defaultFrom?: string;
    defaultTo?: string;
    defaultDepartureDate?: string;
    defaultReturnDate?: string;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
    defaultTripType = "roundtrip",
    defaultFrom = "",
    defaultTo = "",
    defaultDepartureDate = "",
    defaultReturnDate = "",
}) => {
    const [tripType, setTripType] = useState(defaultTripType);
    const [from, setFrom] = useState(defaultFrom);
    const [to, setTo] = useState(defaultTo);
    const [departureDate, setDepartureDate] = useState(defaultDepartureDate);
    const [returnDate, setReturnDate] = useState(defaultReturnDate);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log({
            tripType,
            from,
            to,
            departureDate,
            returnDate: tripType === "roundtrip" ? returnDate : null,
        });
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
            <div className="flex gap-4  my-4">
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
                    Search <Search />
                </button>
            </div>
        </form>
    );
};

export default FlightSearchForm;
