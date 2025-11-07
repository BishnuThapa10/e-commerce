import React from 'react'
import asgardSofa from '../../assets/images/asgaardSofa.png'
import { Button } from '../../components/ui/button.jsx'


export default function NewArrivals() {
  return (
    <div className='bg-[#FFF9E5] p-2 pb-4 flex flex-col md:flex-row items-center justify-evenly overflow-hidden'>
      <div className='h-auto w-2xs sm:w-md md:w-lg lg:w-xl'>
        <img src={asgardSofa} alt="asgardSofa" className='w-full  h-full object-cover' />
      </div>
      <div className='flex flex-col gap-4 items-center p-0'>
        <div className='flex flex-col gap-0'>
        <p className="text-xs text-center sm:text-sm md:text-md lg:text-lg font-medium">
          New Arrivals
        </p>
        <p className="text-md text-center sm:text-lg md:text-xl lg:text-2xl font-bold">
          Asgaard Sofa
        </p>
        </div>
        <Button variant="outline" className="font-semibold border-black cursor-pointer rounded-none">
          View More
        </Button>
      </div>
    </div>
  )
}
