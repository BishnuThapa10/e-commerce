import React from 'react'
import { Button } from '../ui/button.jsx'
import mirror from '../../assets/images/mirror.png'

export default function FourItemList() {
  return (
    <div className='flex flex-col gap-4 items-center justify-center p-2 pb-8'>
      <div className='flex flex-col items-center justify-center gap-2 overflow-hidden'>
        <div className='h-40 w-50 md:h-70 md:w-80'>
          <img src={mirror} alt="" className='w-full h-full object-cover object-center' />
        </div>
        <p className='w-30 text-sm'>Plain console with teak mirror</p>
        <p className='w-30 font-semibold'>Rs. 25,000.00</p>
      </div>
      <Button variant="ghost" className="hover:bg-transparent focus:bg-transparent border-b-2 font-semibold border-black cursor-pointer rounded-none inline-flex px-0">
        View More
      </Button>
    </div>
  )
}
