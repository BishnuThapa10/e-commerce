import React from 'react'
import { Button } from '../../components/ui/button.jsx'
import { useNavigate } from 'react-router'


export default function NewArrivals({ newArrival }) {
  const nav  = useNavigate();
  return (
    <div className='bg-[#FFF9E5] p-2 pb-4 flex flex-col md:flex-row items-center justify-evenly gap-4 overflow-hidden'>
      <div className='aspect-4/3 w-2xs sm:w-md md:w-lg lg:w-xl overflow-hidden'>
        <img src={newArrival.furniture.images[0].url} alt={newArrival.furniture.name} className='w-full  h-full object-cover object-center' />
      </div>
      <div className='flex flex-col gap-4 items-center p-0'>
        <div className='flex flex-col gap-0'>
          <p className="text-xs text-center sm:text-sm md:text-md lg:text-lg font-medium">
            New Arrivals
          </p>
          <p className="text-md text-center sm:text-lg md:text-xl lg:text-2xl font-bold">
            {newArrival.furniture.name}
          </p>
        </div>
        <Button
          onClick={() => nav(`/furniture/${newArrival.furniture._id}`)}
          variant="outline"
          className="font-semibold border-black cursor-pointer rounded-none">
          View More
        </Button>
      </div>
    </div>
  )
}
