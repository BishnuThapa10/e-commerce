import React from 'react'
import { Button } from '../../components/ui/button.jsx'
import { useNavigate } from 'react-router'

export default function TopSection({ category }) {
  const nav = useNavigate();
  return (
    <div className='p-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 items-center justify-center bg-[#FAF4F4] px-8 py-4'>

      {category && category.furnitures.map((furniture) => (
        <div key={furniture._id} className='flex flex-col items-center justify-center gap-2 overflow-hidden'>
          <div className='h-40 w-50 md:h-70 md:w-80'>
            <img src={furniture.images[0].url} alt={furniture.name} className='w-full h-full object-cover object-center' />
          </div>
          <div className='w-32 md:w-40 p-1 flex flex-col gap-2 items-center'>
            <p className="text-sm text-center sm:text-md md:text-lg lg:text-xl font-semibold">
              {furniture.name}
            </p>
            <Button
              onClick={() => nav(`/search?q=${furniture.category}`)}
              variant="ghost"
              className="hover:bg-transparent focus:bg-transparent border-b-2 font-semibold border-black cursor-pointer rounded-none inline-flex px-0">
              View More
            </Button>
          </div>
        </div>
      ))}

    </div>
  )
}
