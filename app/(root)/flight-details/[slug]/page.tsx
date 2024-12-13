import React from "react";
import FlightHeader from "@/app/components/website/flight-details/flight-header";
import Section from "@/app/components/shared/section";
import i1 from "/public/assets/flights/a1.png";
import i2 from "/public/assets/flights/a2.png";
import i3 from "/public/assets/flights/a3.png";
import i4 from "/public/assets/flights/a4.png";
import i5 from "/public/assets/flights/a5.png";
import Image from "next/image";

const data = {
    airline: "Kuwait International Airport (KWI)",
    location: "Gümüssuyu Mah. İnönü Cad. No:8, Istanbul 34437",
    reviews: "Very Good 54 reviews",
    rating: 4.5,
    price: "$240",
    images: [i1, i2, i3, i4, i5]
};

const FlightDetails = () => {
    return (
        <Section>
            <div className="lg:py-20 py-10 ">
                <FlightHeader data={data} />

                <div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 ">
                    {data.images?.map((item, i: number) => (
                        <div key={i} className="mb-8 sm:break-inside-avoid">
                            <blockquote className="rounded-lg shadow-sm ">
                                <Image src={item} alt='' width={500} height={600} className="object-cover w-full" />
                            </blockquote>
                        </div>
                    ))}


                </div>
            </div>
        </Section>
    );
};

export default FlightDetails;
