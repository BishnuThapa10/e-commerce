import React from 'react'

export default function PolicySection() {
  return (
    <div className='flex justify-evenly items-start gap-4 p-4 sm:p-6 md:p-8 lg:p-10 bg-[#FAF4F4] max-w-full overflow-hidden'>
      <div>
        <h3 className='lg:text-xl md:text-lg sm:text-md text-sm font-semibold'>Free Delivery</h3>
        <p className='text-[#9F9F9F] text-xs'>For all oders over $50, consectetur <br/> adipim scing elit.</p>
      </div>

      <div>
        <h3 className='lg:text-xl md:text-lg sm:text-md text-sm font-semibold'>90 Days Return</h3>
        <p className='text-[#9F9F9F] text-xs'>If goods have problems, consectetur <br/> adipim scing elit.</p>
      </div>

      <div>
        <h3 className='lg:text-xl md:text-lg sm:text-md text-sm font-semibold'>Secure Payment</h3>
        <p className='text-[#9F9F9F] text-xs'>100% secure payment, consectetur <br/> adipim scing elit.</p>
      </div>
    </div>
  )
}
