import React from 'react'
import bg from '../../assets/images/insta.jpg'
import { Button } from '../../components/ui/button.jsx'

export default function InstagramSection() {
  return (
    <div className=' h-50 md:h-70 lg:h-80 w-full bg-cover bg-center p-0'
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className='h-full w-full bg-[#FAF4F4]/80 flex items-center justify-center'>
        <div className='w-2xs md:w-xs p-1 flex flex-col gap-2 items-center'>
          <p className="text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            Our Instagram
          </p>
          <p className="text-xs text-center md:text-sm font-normal">
            Follow our store on instagram
          </p>
          <Button variant="outline" className="hover:bg-[#FAF4F4] focus:bg-[#FAF4F4] bg-[#FAF4F4] font-semibold  cursor-pointer rounded-4xl inline-flex px-8">
            Follow Us
          </Button>
        </div>
      </div>

    </div>
  )
}
