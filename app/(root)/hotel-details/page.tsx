import Section from '@/app/components/shared/section';
import HotelHeader from '@/app/components/website/hotel-details/HotelHeader'
import Tabs from '@/app/components/website/hotel-details/Tabs';
import React from 'react'
import i1 from "/public/assets/hotels/hd1.png";
import i2 from "/public/assets/hotels/hd2.png";
import i3 from "/public/assets/hotels/hd3.png";
import i4 from "/public/assets/hotels/hd4.png";
import i5 from "/public/assets/hotels/hd5.png";
import Image from 'next/image';
import WeekendDeals from '@/app/components/website/flight-details/WeekendDeals';

const Page = () => {

    const data = {
        airline: "Ramada Plaza by Wyndham Istanbul City Center Adults Only",
        location: "Halaskargazi Cad No 63",
        reviews: "Very Good 54 reviews",
        rating: 4.2,
        price: "$240",
        images: [i1, i2, i3, i4, i5],
        // featureImages: [f1, f2, f3, f4, f5, f6, f1, f2, f3, f4, f5, f6, f1, f2, f3, f4, f5, f6, f1, f2, f3, f4, f5, f6],
    };

    const tabs = [
        { id: "photos", label: "Photos" },
        { id: "room-choices", label: "Room Choices" },
        { id: "reviews", label: "Reviews" },
        { id: "amenities", label: "Amenities" },
        { id: "faqs", label: "FAQs" },
        { id: "attractions", label: "Attractions" },
        { id: "about-property", label: "About The Property" },
        { id: "similar-properties", label: "Similar Properties" },
    ];
    

    return (
        <Section>
            <HotelHeader data={data} />
            <div className='my-5'>
                <Tabs tabs={tabs} />
            </div>

            {/* photos */}
            <div id='photos' className='grid my-10 sm:grid-cols-2 grid-cols-1 gap-3'>
                <div>
                    <div className="rounded-lg shadow-sm ">
                        <Image src={data.images[0]} alt='' width={500} height={600} className="object-cover w-full" />
                    </div>
                </div>
                <div className=" [column-fill:_balance] sm:columns-2 sm:gap-3  ">
                    {data.images?.slice(1).map((item, i: number) => (
                        <div key={i} className="mb-3 sm:break-inside-avoid">
                            <blockquote className="rounded-lg shadow-sm ">
                                <Image src={item} alt='' width={500} height={600} className="object-cover w-full" />
                            </blockquote>
                        </div>
                    ))}

                </div>
            </div>

            <div className="mt-8 ">
                <WeekendDeals />
            </div>

        </Section>
    )
}

export default Page
