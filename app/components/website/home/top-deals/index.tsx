'use client';
import React from 'react';
import { StaticImageData } from 'next/image';
import bg from '/public/assets/hotels/Travel.png';
import Section from '@/app/components/shared/section';
import ParaHeading from '@/app/components/shared/para-heading';
import DealCard from './deal-card';

const hotels = [
    {
        image: '/assets/hotels/d1.PNG',
        title: 'Cairo',
        location: 'London',
        price: 148.25,
        guests: '4-6 guests',
        rating: 9.0,
        reviews: 'Wonderful (769 reviews)',
        nights: 'SAR 2,542 total',
        discount: 20, // Optional field
    },
    {
        image: '/assets/hotels/d4.PNG',
        title: 'Cairo',
        location: 'London',
        price: 148.25,
        guests: '4-6 guests',
        rating: 9.0,
        reviews: 'Wonderful (769 reviews)',
        nights: 'SAR 2,542 total',
        discount: 20, // Optional field
    },
    {
        image: '/assets/hotels/d3.PNG',
        title: 'Cairo',
        location: 'London',
        price: 148.25,
        guests: '4-6 guests',
        rating: 9.0,
        reviews: 'Wonderful (769 reviews)',
        nights: 'SAR 2,542 total',
        discount: 20, // Optional field
    },
    {
        image: '/assets/hotels/d2.PNG',
        title: 'Cairo',
        location: 'London',
        price: 148.25,
        guests: '4-6 guests',
        rating: 9.0,
        reviews: 'Wonderful (769 reviews)',
        nights: 'SAR 2,542 total',
        discount: 20, // Optional field
    },
    // Add more hotel data here...
];

const TopDeals: React.FC = () => {
    return (
        <div
            className="min-w-full flex items-center bg-contain bg--top-center bg-no-repeat"
            style={{ backgroundImage: `url(${(bg as StaticImageData).src})` }}
        >
            <Section>
                <div className="lg:py-20 py-10 space-y-6">
                    <ParaHeading className="text-center !text-black">
                        Last Minute Weekend Deals
                    </ParaHeading>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {hotels.map((hotel, index) => (
                            <DealCard key={index} {...hotel} />
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default TopDeals;
