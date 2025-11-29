import React from 'react'
import { Button } from '../../components/ui/button.jsx'
import { useNavigate } from 'react-router';

export default function HeroSection({ hero }) {
  const nav = useNavigate();
  return (
    <div className='flex flex-col-reverse md:flex-row items-center justify-center overflow-hidden bg-[#FBEBB5] w-full p-4'>
      <div className='w-2xs md:w-xs p-1 flex flex-col gap-2 items-center'>
        <p className="text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
          {hero.hero.name}
        </p>
        <Button
          onClick={() => nav(`/furniture/${hero.hero._id}`)}
          variant="ghost"
          className="hover:bg-transparent focus:bg-transparent border-b-2 font-semibold border-black cursor-pointer rounded-none inline-flex px-0">
          Shop Now
        </Button>
      </div>
      <div className='h-auto w-sm sm:w-md md:w-lg lg:w-xl'>
        <img src={hero.hero.images[0].url} alt={hero.hero.name} className='w-full  h-full object-cover transform -scale-x-100' />
      </div>
    </div>
  )
}
