import React from 'react';
import jazeeraLogo from '@/public/assets/images/jazeeraLogo.png'
import Image from 'next/image';
import { BaggageIcon } from '@/app/svg';


const FlightCard = () => {

    return (
        <div className="bg-white p-4 border rounded-xl shadow-md  border-bordered">
            <div className="flex justify-between gap-2 w-full flex-wrap items-center">
                <h2 className="text-xl font-semibold">Departure</h2>
                    <p className="text-grayDark text-sm">Mon - November 04</p>
                    <p className="">Flight Details</p>
            </div>

            <div className="mt-4 gap-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Image src={jazeeraLogo} alt="Jazeera Airways" className="" />
                </div>

                <div className='flex flex-col gap-2  items-start w-full'>
                    <div className='flex pb-1 items-center w-full justify-between border-b-2 border-dashed border-grayDark'>
                        <p className="text-sm font-semibold">10:10am</p>
                        <p className="text-sm font-semibold">Direct</p>
                        <p className="text-sm font-semibold">10:10am</p>
                    </div>
                    <div className='flex items-center w-full text-grayDark justify-between '>
                        <p className="text-xs ">KWI</p>
                        <p className="text-xs ">02h 25m</p>
                        <p className="text-xs ">KWI</p>
                    </div>
                </div>

            </div>

            <div className="bg-secondary text-white mt-6 p-2 rounded-lg flex justify-between items-center">
                <p className="text-sm">Jazeera Airways J9-209</p>
                <div className="flex items-center space-x-2">
                    <BaggageIcon />
                    <p className='text-sm'>Baggage Included</p>
                </div>
            </div>
        </div>
    );
};

export default FlightCard;
