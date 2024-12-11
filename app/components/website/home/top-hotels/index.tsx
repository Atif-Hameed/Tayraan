"use client"
import { StaticImageData } from 'next/image';
import bg from '/public/assets/hotels/bg1.png';
import Section from '@/app/components/shared/section';
import ParaHeading from '@/app/components/shared/para-heading';
import HotelCard from './hotel-card';
import React from 'react';
import { HotelFilter } from './hotel-filter';

const hotels = [
    {
        image: "/assets/hotels/h1.svg",
        title: "Cairo",
        location: "Dubai, UAE",
        price: 148.25,
        guests: "4-6 guests",
        rating: 5,
        nights: "7 days 6 nights",
        discount: 25,
        category: "Trending",
    },
    {
        image: "/assets/hotels/h2.png",
        title: "Paris Luxury Hotel",
        location: "Paris, France",
        price: 200.75,
        guests: "2-4 guests",
        rating: 5,
        nights: "5 days 4 nights",
        discount: 15,
        category: "5-Star",
    },
    {
        image: "/assets/hotels/h3.png",
        title: "Dubai Budget Inn",
        location: "Dubai, UAE",
        price: 100.00,
        guests: "2-3 guests",
        rating: 4,
        nights: "3 days 2 nights",
        discount: 10,
        category: "Budget-Friendly",
    },

    {
        image: "/assets/hotels/h4.png",
        title: "Dubai Budget Inn",
        location: "Dubai, UAE",
        price: 100.00,
        guests: "2-3 guests",
        rating: 4,
        nights: "3 days 2 nights",
        discount: 10,
        category: "Budget-Friendly",
    },
    // Add more hotel data here
];

const categories = ["Trending", "5-Star", "Asian", "Europe", "Middle-East", "Budget-Friendly", "Adventure", "Family-Friendly"];

export default function TopHotels() {
    const [selectedCategory, setSelectedCategory] = React.useState<string>("Trending");

    // Filter hotels based on the selected category
    const filteredHotels = hotels.filter(hotel =>
        selectedCategory === "Trending" || hotel.category === selectedCategory
    );

    return (
        <div
            className="min-w-full flexitems-center bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${(bg as StaticImageData).src})` }}
        >
            <Section>
                <div className="lg:py-20 py-10 space-y-6">
                    <ParaHeading className="text-center">Top Hotels</ParaHeading>
                    <HotelFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                    <div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
                        {filteredHotels.map((hotel, index) => (
                            <HotelCard key={index} {...hotel} />
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
}