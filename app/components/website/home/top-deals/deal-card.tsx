'use client';
import React from 'react';
import Image from 'next/image';
import { StarIcon } from '@/app/svg';

interface HotelCardProps {
    image: string;
    title: string;
    location: string;
    price: number;
    guests: string;
    rating: number;
    reviews: string;
    nights: string;
    discount?: number;
}

const DealCard: React.FC<HotelCardProps> = ({
    image,
    title,
    location,
    price,
    guests,
    rating,
    reviews,
    nights,
    discount
}) => {
    return (
        <div className="border bg-white border-[#D2D2D2] p-3 rounded-xl">
            {/* Image Section */}
            <div className="relative w-full h-48">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-t-xl"
                />

            </div>

            {/* Content Section */}
            <div className="p-4 bg-white rounded-b-xl">
                <p className="text-sm ">{location}</p>
                <h3 className="text-lg lg:text-2xl font-semibold text-black">{title}</h3>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-2 mt-2">
                    <div className="flex bg-green text-white px-4 rounded-full items-center gap-1 text-sm">
                        {rating}
                    </div>
                    <p className="text-sm font-medium">{reviews}</p>
                </div>

                {/* Price Section */}
                <p className="text-lg font-bold text-black mt-2">${price.toFixed(2)} </p>
                <p className="text-sm text-grayText">
                    Per night <br />
                    SAR 2,542 total <br /> Include taxes & fees
                </p>

                {/* CTA Button */}
                <button className="bg-orange lg:w-3/4 text-white px-4 py-2 mt-4 rounded-full w-full text-sm">
                    Member Price Available
                </button>
            </div>
        </div>
    );
};

export default DealCard;