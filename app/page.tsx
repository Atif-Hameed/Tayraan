'use client'
import card from '@/public/assets/images/hero-card.png'
import Image from 'next/image';
import Button from './components/shared/Button';
import { BedIcon } from './svg';


export default function Home() {
  return (
    <div>
      <div className="h-screen w-full bg-heroBanner pt-32 lg:px-24 md:px-16 px-5 gap-8 flex xl:flex-row flex-col items-center bg-no-repeat bg-cover" >
        <div className='xl:w-1/2 w-full text-white flex flex-col gap-6'>
          <h1 className="font-cairo font-bold text-7xl">Let’s book your next trip!</h1>
          <p className="font-montserrat font-bold text-lg">Choose from over 1.5 million hotels & 450+ airlines</p>
        </div>
        <div className=''>
          <div className='relative bg-heroCard md:h-[390px] h-[350px] bg-no-repeat w-[600px] bg-contain'>
            <div className='flex justify-end w-full '>
              <button
                className={`py-4 px-5  md:text-[22px] mt-2 text-base font-semibold rounded-full text-white  bg-greenGradient flex gap-2 items-center hover:scale-105 duration-300 transition-all`}
              >
                <BedIcon/>
                Hotels
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
