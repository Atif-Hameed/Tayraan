"use client";
import Image, { StaticImageData } from "next/image";
import bg from "/public/assets/flights/bg.png";
import Section from "@/app/components/shared/section";
import ParaHeading from "@/app/components/shared/para-heading";
import React, { useState } from "react";
import Link from "next/link";

// Sample flight data
const flights = [
    {
        image: "/assets/flights/f1.png",
        routeFrom: "Riyadh",
        routeTO: "Kuwait",
        date: "Nov - Nov 12",
        price: 148.25,
        type: "Round trip",
        rating: 5,
        category: "International",
    },
    {
        image: "/assets/flights/f2.png",
        routeFrom: "Riyadh",
        routeTO: "Kuwait",
        date: "Nov - Nov 12",
        price: 148.25,
        type: "Round trip",
        rating: 5,
        category: "International",
    },
    {
        image: "/assets/flights/f3.png",
        routeFrom: "Riyadh",
        routeTO: "Kuwait",
        date: "Nov - Nov 12",
        price: 148.25,
        type: "Round trip",
        rating: 5,
        category: "International",
    },
    {
        image: "/assets/flights/f4.png",
        routeFrom: "Riyadh",
        routeTO: "Kuwait",
        date: "Nov - Nov 12",
        price: 148.25,
        type: "Round trip",
        rating: 5,
        category: "International",
    },
    {
        image: "/assets/flights/f5.png",
        routeFrom: "Riyadh",
        routeTO: "Kuwait",
        date: "Nov - Nov 12",
        price: 148.25,
        type: "Round trip",
        rating: 5,
        category: "International",
    }, {
        image: "/assets/flights/f6.png",
        routeFrom: "Riyadh",
        routeTO: "Kuwait",
        date: "Nov - Nov 12",
        price: 148.25,
        type: "Round trip",
        rating: 5,
        category: "International",
    },
    {
        image: "/assets/flights/f2.png",
        routeFrom: "Riyadh",
        routeTO: "Kuwait",
        date: "Nov - Nov 12",
        price: 148.25,
        type: "Round trip",
        rating: 5,
        category: "Domestic",
    },
    {
        image: "/assets/flights/f1.png",
        routeFrom: "Riyadh",
        routeTO: "Kuwait",
        date: "Nov - Nov 12",
        price: 148.25,
        type: "Round trip",
        rating: 5,
        category: "Domestic",
    },
    // Add more flight data here
];

const categories = ["International", "Domestic"];

export default function TopFlights() {
    const [selectedCategory, setSelectedCategory] = useState<string>("International");

    // Filter flights based on the selected category
    const filteredFlights = flights.filter(
        (flight) =>
            selectedCategory === "Trending" || flight.category === selectedCategory
    );

    // Function to handle category selection
    const onSelectCategory = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <div
            className="min-w-full flex items-center bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${(bg as StaticImageData).src})` }}
        >
            <Section>
                <div className="lg:py-20 py-10 space-y-6">
                    <ParaHeading className="text-center">Popular flights near you</ParaHeading>
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => onSelectCategory(category)}
                                className={`px-6 py-3 rounded-full text-sm  ${category === selectedCategory
                                    ? "bg-orange text-white"
                                    : "bg-white text-gray-700"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div data-aos="zoom-in-up" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 py-5">
                        {filteredFlights.map((flight, index) => (
                            <Link href={`/flight-details/${flight.routeFrom}`} key={index} className="space-y-5 block">
                                <Image
                                    src={flight.image}
                                    alt={`Flight from ${flight.routeFrom} to ${flight.routeTO}`}
                                    className="rounded-lg"
                                    width={400}
                                    height={300}
                                />
                                <div className="flex flex-col gap-5 mt-4">
                                    <h2 className="lg:text-[35px] text-2xl font-bold text-white font-cairo">
                                        {flight.routeFrom} To {flight.routeTO}
                                    </h2>
                                    <h2 className="lg:text-lg text-sm font-semibold text-white font-cairo">
                                        {flight.date}  {flight.type}
                                    </h2>

                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
}
